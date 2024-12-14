import { defineConfig } from "drizzle-kit";
import { config } from "dotenv";

config({ path: ".env" });

export default defineConfig({
  schema: "./db/schema",
  out: "./db/drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
