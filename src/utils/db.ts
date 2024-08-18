import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./db-schema";

const sql = neon(process.env.DRIZZLE_DATABASE_URL!, {
  fetchOptions: { cache: "no-store" }, //fetchoptions... nie chachuje itemow i szybciej dziala po reload strony
});
const db = drizzle(sql, { schema });

export default db;
