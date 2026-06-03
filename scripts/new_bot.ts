import sql from "@/db/db";
import config from '../config.json'
import { isUrlCrawlable } from "../src/utils/robots";
import { randomUUID } from "crypto";

export default async function newBot() {
    await sql`
        insert into bot ${sql({ public_id: randomUUID() })}
    `
}


newBot()
  .catch(err => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => sql.end());