import sql from "@/db/db";

export default async function crawl(batchSize: Number) {
    
    // 1. If there are no URLs in crawl history, start from an arbitrary page
    // (configurable in .env, maybe start with a random wikipedia page).
    // If there are, then read the lastest page instead.

    // 2. Insert any links into page_links including a summary of them.

    // 3. Consider what is on page given the current personality and
    // interests.

    // 4. Update interests and personality accordingly.

    // 5. Decide if any of the links on that page are of interest.

    // 5a. If they are, insert that link into crawl history
    
    // 5b. If not, search page_links for any links that seem interesting
}