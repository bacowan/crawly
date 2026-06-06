import sql from "@/db/db";
import config from '../config.json'
import { isUrlCrawlable } from "../src/utils/robots";
import GeminiLlmService from "@/service/gemini_llm_service";
import { Readability } from "@mozilla/readability";
import { JSDOM } from "jsdom";

const llmService = GeminiLlmService

const getRandomPageUrl = async () => {
    const randomWikiPageUrl = "https://en.wikipedia.org/w/api.php?list=random&format=json&action=query&rnlimit=1&rnnamespace=0"
    const result = await fetch(randomWikiPageUrl)
    if (result.ok) {
        const body = await result.json()
        const pageName = body.query.random[0]?.title
        if (pageName) {
            return `https://en.wikipedia.org/wiki/${encodeURIComponent(pageName)}`
        }
    }
}


function extractText(html: string, url: string) {
  const dom = new JSDOM(html, { url });

  // Convert links to inline markdown-style before Readability strips them
  dom.window.document.querySelectorAll("a[href]").forEach(a => {
    const text = a.textContent?.trim();
    const href = (a as HTMLAnchorElement).href;
    if (text && href?.startsWith("http")) {
      a.textContent = `${text} [${href}]`;
    }
  });

  const reader = new Readability(dom.window.document);
  const article = reader.parse();
  return article?.textContent?.trim() ?? "";
}

export default async function crawl(logTime: Date) {
    // Get the currently active bot, which is the latest one added
    const [latestBot] = await sql`
        select id, personality_summary from bot
        order by created_at desc
        limit 1
    `
    if (!latestBot) {
        throw "No bot found"
    }
    const botId = latestBot.id

    // try pages until we find one that we can load
    let page: { html: string, url: string } | null = null
    while (!page) {
        // Look through all the links of the latest page to select one to crawl.
        const pageLinks = (await sql<{ url: string }[]>`
            select pl.url
            from crawl_history as ch
            inner join page_links as pl on ch.id = pl.parent_page
            where ch.bot_id = ${botId}
            and pl.is_crawling_okay = true
            and ch.log_time = (select max(log_time) from crawl_history where bot_id = ${botId})
        `).map(r => r.url)

        let interestingLink: string | null = null
        if (pageLinks.length > 0) {
            // from the links in the latest page, pick the most interesting one
            // TODO: ask the llm to pick one
            interestingLink = pageLinks[0]
        }

        if (interestingLink === null) {
            // there are no interesting links in the latest page. Pick one from the other pages
            // TODO: use embeddings to find interesting links
            const pageLinks = (await sql<{ url: string }[]>`
                select pl.url
                from crawl_history as ch
                inner join page_links as pl on ch.id = pl.parent_page
                where ch.bot_id = ${botId}
                and pl.is_crawling_okay = true
            `).map(r => r.url)
            interestingLink = pageLinks[0]

            if (interestingLink === undefined) {
                // there are no links at all for this bot. Go to the default page.
                const randomPageUrl = await getRandomPageUrl()
                if (randomPageUrl) {
                    interestingLink = randomPageUrl
                }
                else {
                    // TODO: Error handling
                    return
                }
            }
        }

        // double check that the url is okay to crawl
        if (await isUrlCrawlable(interestingLink)) {
            const pageResponse = await fetch(interestingLink)
            if (pageResponse.ok) {
                page= {
                    url: interestingLink,
                    html: await pageResponse.text()
                }
            }
            else {
                // todo: log
                const result = await sql`
                    update page_links set is_crawling_okay = false where url = ${interestingLink}
                `
            }
        }
        else {
            // todo: log
            const result = await sql`
                update page_links set is_crawling_okay = false where url = ${interestingLink}
            `
            if (result.count === 0) {
                // todo: log
            }
        }
    }

    const profileRows = await sql<{ name: string | null, magnitude: number | null, topic: string | null, summary: string | null, type: string }[]>`
        select name, magnitude, null as topic, null as summary, 'interest' as type from interests where bot_id = ${botId}
        union all
        select name, magnitude, null as topic, null as summary, 'trait' as type from personality where bot_id = ${botId}
        union all
        select null as name, null as magnitude, topic, summary, 'knowledge' as type from knowledge where bot_id = ${botId}
    `
    const personalityProfile = {
        summary: latestBot.personality_summary ?? "",
        interests: profileRows.filter(r => r.type === 'interest').map(r => ({ name: r.name!, weight: r.magnitude! })),
        traits: profileRows.filter(r => r.type === 'trait').map(r => ({ name: r.name!, weight: r.magnitude! })),
        knowledge: profileRows.filter(r => r.type === 'knowledge').map(r => ({ topic: r.topic!, knowledge: r.summary! })),
    }

    // Now that the page has been read, do some processing on it.
    const pageText = extractText(page.html, page.url)
    const result = await llmService.processPage(pageText, personalityProfile)
    
    await sql.begin(async tx => {
        // update the page info
        const [crawlRow] = await tx`
            insert into crawl_history ${sql({
                bot_id: botId,
                url: page.url,
                thoughts: result.memory.thoughts,
                summary: result.memory.summary,
                log_time: logTime
            })} returning id
        `
        await tx`
            insert into page_links ${sql(result.next_links.map((link, index) => ({
                url: link.url,
                summary: link.summary,
                parent_page: crawlRow.id,
                initial_interest: index
            })))}
        `
        
        // update personality and interests
        const ADJUST = 0.1;
        const DECAY = 0.05;

        const { interests: interestUpdates, disinterests: disinterestUpdates, traits: traitUpdates } = result.personality_updates;
        const interestLower = interestUpdates.map(n => n.toLowerCase());
        const disinterestLower = disinterestUpdates.map(n => n.toLowerCase());
        const traitLower = traitUpdates.map(n => n.toLowerCase());
        const mentionedInterestLower = [...interestLower, ...disinterestLower];

        const existingInterestNames = new Set(
            (await tx<{ name: string }[]>`select name from interests where bot_id = ${botId}`).map(r => r.name.toLowerCase())
        );
        const existingTraitNames = new Set(
            (await tx<{ name: string }[]>`select name from personality where bot_id = ${botId}`).map(r => r.name.toLowerCase())
        );

        // Batch-update existing interests and disinterests (one query each)
        if (interestLower.length > 0)
            await tx`update interests set magnitude = least(1, magnitude + ${ADJUST}) where bot_id = ${botId} and lower(name) = any(${interestLower})`;
        if (disinterestLower.length > 0)
            await tx`update interests set magnitude = greatest(-1, magnitude - ${ADJUST}) where bot_id = ${botId} and lower(name) = any(${disinterestLower})`;

        // Insert all new interest/disinterest rows in one query
        const newInterestRows = [
            ...interestUpdates.filter(n => !existingInterestNames.has(n.toLowerCase())).map(name => ({ bot_id: botId, name, magnitude: ADJUST })),
            ...disinterestUpdates.filter(n => !existingInterestNames.has(n.toLowerCase())).map(name => ({ bot_id: botId, name, magnitude: -ADJUST }))
        ];
        if (newInterestRows.length > 0)
            await tx`insert into interests ${sql(newInterestRows)}`;

        // Decay all non-mentioned interests in one query
        const interestDecayFilter = mentionedInterestLower.length > 0 ? sql`and lower(name) != all(${mentionedInterestLower})` : sql``;
        await tx`
            update interests set magnitude = case
                when magnitude > 0 then greatest(0, magnitude - ${DECAY})
                when magnitude < 0 then least(0, magnitude + ${DECAY})
                else 0
            end
            where bot_id = ${botId} ${interestDecayFilter}
        `;

        // Batch-update existing traits (one query)
        if (traitLower.length > 0)
            await tx`update personality set magnitude = least(1, magnitude + ${ADJUST}) where bot_id = ${botId} and lower(name) = any(${traitLower})`;

        // Insert new traits in one query
        const newTraitRows = traitUpdates.filter(n => !existingTraitNames.has(n.toLowerCase())).map(name => ({ bot_id: botId, name, magnitude: ADJUST }));
        if (newTraitRows.length > 0)
            await tx`insert into personality ${sql(newTraitRows)}`;

        // Decay all non-mentioned traits in one query
        const traitDecayFilter = traitLower.length > 0 ? sql`and lower(name) != all(${traitLower})` : sql``;
        await tx`
            update personality set magnitude = case
                when magnitude > 0 then greatest(0, magnitude - ${DECAY})
                when magnitude < 0 then least(0, magnitude + ${DECAY})
                else 0
            end
            where bot_id = ${botId} ${traitDecayFilter}
        `;

        // Update knowledge: overwrite existing topics, insert new ones
        const knowledgeUpdates = result.personality_updates.knowledge;
        if (knowledgeUpdates.length > 0) {
            const existingKnowledgeTopics = new Set(
                (await tx<{ topic: string }[]>`select topic from knowledge where bot_id = ${botId}`).map(r => r.topic.toLowerCase())
            );
            const existingKnowledge = knowledgeUpdates.filter(k => existingKnowledgeTopics.has(k.topic.toLowerCase()));
            const newKnowledge = knowledgeUpdates.filter(k => !existingKnowledgeTopics.has(k.topic.toLowerCase()));

            if (existingKnowledge.length > 0) {
                const topics = existingKnowledge.map(k => k.topic.toLowerCase());
                const summaries = existingKnowledge.map(k => k.knowledge);
                await tx`
                    update knowledge set summary = updates.summary
                    from unnest(${topics}::text[], ${summaries}::text[]) as updates(topic, summary)
                    where knowledge.bot_id = ${botId} and lower(knowledge.topic) = updates.topic
                `;
            }

            if (newKnowledge.length > 0)
                await tx`insert into knowledge ${sql(newKnowledge.map(k => ({ bot_id: botId, topic: k.topic, summary: k.knowledge })))}`;
        }
    })





}

(async () => {
    const now = new Date()
    try {
        for (let i = 0; i < 1; i++) {
            const logHour = new Date(now.getTime() + i * 60 * 60 * 1000);
            await crawl(logHour);
        }
    } catch (err) {
        console.error(err);
        process.exit(1);
    } finally {
        sql.end();
    }
})();