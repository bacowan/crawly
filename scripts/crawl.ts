import sql from "@/db/db";
import { isUrlCrawlable } from "../src/utils/robots";
import GeminiLlmService from "@/service/gemini_llm_service";
import { PageAnalysis, PersonalityProfile } from "@/service/llm_service";
import { Readability } from "@mozilla/readability";
import { JSDOM } from "jsdom";

const llmService = GeminiLlmService

// --- helpers ---

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

async function getBot() {
    const [bot] = await sql`select id, personality_summary from bot order by created_at desc limit 1`
    if (!bot) throw "No bot found"
    return bot
}

async function getNextUrl(botId: string): Promise<string> {
    const [fromLatestPage] = await sql<{ url: string }[]>`
        select pl.url
        from crawl_history as ch
        inner join page_links as pl on ch.id = pl.parent_page
        where ch.bot_id = ${botId}
        and pl.is_crawling_okay = true
        and ch.log_time = (select max(log_time) from crawl_history where bot_id = ${botId})
        order by pl.initial_interest asc
        limit 1
    `
    if (fromLatestPage) return fromLatestPage.url

    const [fromAnyPage] = await sql<{ url: string }[]>`
        select pl.url
        from crawl_history as ch
        inner join page_links as pl on ch.id = pl.parent_page
        where ch.bot_id = ${botId}
        and pl.is_crawling_okay = true
    `
    if (fromAnyPage) return fromAnyPage.url

    const random = await getRandomPageUrl()
    if (!random) throw "Could not find a page to crawl"
    return random
}

async function tryFetchPage(url: string): Promise<{ html: string, url: string } | null> {
    if (!await isUrlCrawlable(url)) return null
    const response = await fetch(url)
    if (!response.ok) return null
    return { url, html: await response.text() }
}

async function markUrlUncrawlable(url: string) {
    await sql`update page_links set is_crawling_okay = false where url = ${url}`
}

async function fetchNextPage(botId: string): Promise<{ html: string, url: string }> {
    while (true) {
        const url = await getNextUrl(botId)
        const page = await tryFetchPage(url)
        if (page) return page
        await markUrlUncrawlable(url)
    }
}

async function getPersonalityProfile(botId: string, summary: string): Promise<PersonalityProfile> {
    const rows = await sql<{ name: string, magnitude: number, type: string }[]>`
        select name, magnitude, 'interest' as type from interests where bot_id = ${botId}
        union all
        select name, magnitude, 'trait' as type from personality where bot_id = ${botId}
    `
    return {
        summary: summary ?? "",
        interests: rows.filter(r => r.type === 'interest').map(r => ({ name: r.name, weight: r.magnitude })),
        traits: rows.filter(r => r.type === 'trait').map(r => ({ name: r.name, weight: r.magnitude })),
    }
}

async function saveResults(botId: string, page: { html: string, url: string }, analysis: PageAnalysis, logTime: Date) {
    await sql.begin(async tx => {
        const [crawlRow] = await tx`
            insert into crawl_history ${sql({
                bot_id: botId,
                url: page.url,
                thoughts: analysis.memory.thoughts,
                summary: analysis.memory.summary,
                log_time: logTime
            })} returning id
        `
        await tx`
            insert into page_links ${sql(analysis.next_links.map((link, index) => ({
                url: link.url,
                summary: link.summary,
                parent_page: crawlRow.id,
                initial_interest: index
            })))}
        `

        const ADJUST = 0.1;
        const DECAY = 0.05;

        const { interests: interestUpdates, disinterests: disinterestUpdates, traits: traitUpdates } = analysis.personality_updates;
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

        if (interestLower.length > 0)
            await tx`update interests set magnitude = least(1, magnitude + ${ADJUST}) where bot_id = ${botId} and lower(name) = any(${interestLower})`;
        if (disinterestLower.length > 0)
            await tx`update interests set magnitude = greatest(-1, magnitude - ${ADJUST}) where bot_id = ${botId} and lower(name) = any(${disinterestLower})`;

        const newInterestRows = [
            ...interestUpdates.filter(n => !existingInterestNames.has(n.toLowerCase())).map(name => ({ bot_id: botId, name, magnitude: ADJUST })),
            ...disinterestUpdates.filter(n => !existingInterestNames.has(n.toLowerCase())).map(name => ({ bot_id: botId, name, magnitude: -ADJUST }))
        ];
        if (newInterestRows.length > 0)
            await tx`insert into interests ${sql(newInterestRows)}`;

        const interestDecayFilter = mentionedInterestLower.length > 0 ? sql`and lower(name) != all(${mentionedInterestLower})` : sql``;
        await tx`
            update interests set magnitude = case
                when magnitude > 0 then greatest(0, magnitude - ${DECAY})
                when magnitude < 0 then least(0, magnitude + ${DECAY})
                else 0
            end
            where bot_id = ${botId} ${interestDecayFilter}
        `;

        if (traitLower.length > 0)
            await tx`update personality set magnitude = least(1, magnitude + ${ADJUST}) where bot_id = ${botId} and lower(name) = any(${traitLower})`;

        const newTraitRows = traitUpdates.filter(n => !existingTraitNames.has(n.toLowerCase())).map(name => ({ bot_id: botId, name, magnitude: ADJUST }));
        if (newTraitRows.length > 0)
            await tx`insert into personality ${sql(newTraitRows)}`;

        const traitDecayFilter = traitLower.length > 0 ? sql`and lower(name) != all(${traitLower})` : sql``;
        await tx`
            update personality set magnitude = case
                when magnitude > 0 then greatest(0, magnitude - ${DECAY})
                when magnitude < 0 then least(0, magnitude + ${DECAY})
                else 0
            end
            where bot_id = ${botId} ${traitDecayFilter}
        `;
    })
}

// --- pipeline ---

export default async function crawl(logTime: Date) {
    const bot = await getBot()
    const page = await fetchNextPage(bot.id)
    const profile = await getPersonalityProfile(bot.id, bot.personality_summary)
    const analysis = await llmService.processPage(extractText(page.html, page.url), profile)
    await saveResults(bot.id, page, analysis, logTime)
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
