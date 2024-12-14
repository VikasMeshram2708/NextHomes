import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema/user";

const DB_URL = process.env.DATABASE_URL!;

if (!DB_URL) {
  throw new Error("Database Url Not Found");
}

const sql = neon(DB_URL);

export const db = drizzle({ client: sql, schema });
