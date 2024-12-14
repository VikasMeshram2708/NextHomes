import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

const timestamps = {
  createdAt: timestamp("createdAt", { mode: "string" }).defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "string" }).defaultNow(),
};
export const user = pgTable("user", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  ...timestamps,
});
