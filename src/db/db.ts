import postgres from 'postgres'
const sql = postgres({
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    types: {
        vector: {               // allow adding vectors via postgres.js
            to: 25,             // OID for text
            from: [],           // we aren't mapping from db -> app, so we can leave this for now
            serialize: (v: number[]) => `[${v.join(',')}]`,
            parse: (s: string) => JSON.parse(s)
        }
    }
})
export default sql