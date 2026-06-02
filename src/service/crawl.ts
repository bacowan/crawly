import sql from "@/db/db";
import config from '../../config.json'
import { isUrlCrawlable } from "./robots";

export default async function crawl() {
    const [latestBot] = await sql`
        select id from bot
        order by created_at desc
        limit 1
    `
    if (!latestBot) {
        throw "No bot found"
    }
    const botId = latestBot.id

    // 1. If there are no URLs in crawl history, start from an arbitrary page
    // (configurable in .env, maybe start with a random wikipedia page).
    // If there are, then read the lastest page.

    const [latestEntry] = await sql`
        select ch.* from crawl_history ch
        where ch.bot_id = ${botId}
        order by ch.log_time desc
        limit 1
    `
    let latestUrl = latestEntry?.url
    if (!latestUrl) {
        latestUrl = config["default-crawl-url"]
    }

    // double check that the url is okay to crawl
    if (!isUrlCrawlable(latestUrl)) {
        throw `URL blocked by robots.txt: ${latestUrl}`
    }

    // read the page
    const response = await fetch(latestUrl)
    if (!response.ok) {
        throw `Failed to fetch ${latestUrl}: ${response.status} ${response.statusText}`
    }
    const pageHtml = await response.text()

    // 2. Insert any links into page_links including a summary of them.
    const hrefPattern = /<a\s[^>]*href="([^"]+)"/gi
    const links: string[] = []
    let match: RegExpExecArray | null
    while ((match = hrefPattern.exec(pageHtml)) !== null) {
        try {
            links.push(new URL(match[1], latestUrl).href)
        } catch {
            // skip malformed URLs
        }
    }

    if (links.length > 0) {
        const crawlHistoryId = latestEntry?.id ?? null
        await sql`
            insert into page_links ${sql(links.map(url => ({ url, parent_page: crawlHistoryId })))}
        `
    }

    // 5. Decide if any of the links on that page are of interest. Rank them in order of interest.

    // 5a. If there are, insert the most interesting link that can be crawled according to robots.txt into crawl history
    
    // 5b. If not, search page_links for any links that seem interesting
}