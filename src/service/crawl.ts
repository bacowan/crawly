import sql from "@/db/db";
import config from '../../config.json'
import { isUrlCrawlable } from "./robots";

export default async function crawl(botId: string) {

    // 1. If there are no URLs in crawl history, start from an arbitrary page
    // (configurable in .env, maybe start with a random wikipedia page).
    // If there are, then read the lastest page.

    const [latestEntry] = await sql`
        select ch.* from crawl_history ch
        inner join bot on bot.id = ch.bot_id
        where bot.public_id = ${botId}
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
    


    // 2. Insert any links into page_links including a summary of them.

    // 3. Consider what is on page given the current personality and
    // interests.

    // 4. Update interests and personality accordingly.

    // 5. Decide if any of the links on that page are of interest. Rank them in order of interest.

    // 5a. If there are, insert the most interesting link that can be crawled according to robots.txt into crawl history
    
    // 5b. If not, search page_links for any links that seem interesting
}