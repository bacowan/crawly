import sql from "@/db/db";
import config from '../config.json'
import { isUrlCrawlable } from "../src/utils/robots";

export default async function crawl() {
    // Get the currently active bot, which is the latest one added
    const [latestBot] = await sql`
        select id from bot
        order by created_at desc
        limit 1
    `
    if (!latestBot) {
        throw "No bot found"
    }
    const botId = latestBot.id

    let pageHtml: string | undefined
    while (!pageHtml) {
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
                interestingLink = config["default-crawl-url"]
            }
        }

        // double check that the url is okay to crawl
        if (await isUrlCrawlable(interestingLink)) {
            const pageResponse = await fetch(interestingLink)
            if (pageResponse.ok) {
                pageHtml = await pageResponse.text()
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

    // Now that the page has been read, do some processing on it.

    // Come up with some thoughts on the page

    // update personality and interests

    // update the database



}

crawl().catch(err => {
  console.error(err);
  process.exit(1);
}).finally(() => sql.end());;