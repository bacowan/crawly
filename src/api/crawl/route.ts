import sql from '../../db/db'

export async function GET(request: Request) {
    const history = await sql`select * from crawl_history`
  return new Response(JSON.stringify(history))
}