import robotsParser from 'robots-parser'

const cacheSeconds = Number(process.env.ROBOTS_TXT_CACHE_SECONDS) || 0

export const isUrlCrawlable = async (url: string) => {
    try {
        const { origin } = new URL(url)
        const robotsUrl = `${origin}/robots.txt`
        const res = await fetch(robotsUrl, {
            next: { revalidate: cacheSeconds }
        })
        if (!res.ok) return true // no robots.txt means that crawling is okay
        const robots = robotsParser(robotsUrl, await res.text())
        return robots.isAllowed(url) ?? true
    }
    catch {
        // for  now we'll assume if there was an error then it was a problem with the page and should be skipped
        return false
    }
}