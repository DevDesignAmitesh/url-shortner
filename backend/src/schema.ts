import { integer, pgTable, varchar, timestamp } from "drizzle-orm/pg-core";

export const urlsTable = pgTable("urls", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  orignalUrl: varchar({ length: 255 }).notNull(),
  uniqueId: varchar({ length: 255 }).notNull(),
  uniqueUrl: varchar({ length: 255 }).notNull(),
  clicks: integer().notNull(),

  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});
