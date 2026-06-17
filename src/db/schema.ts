import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const entries = sqliteTable("entries", {
  id: text("id").primaryKey(), // idという文字コラムを作る　primaruKey()によって行を一位に識別するための主キーにした。同じidの行は二つとない。
  type: text("type", {
    enum: ["memo", "task", "journal"],
  }).notNull(),
  body: text("body").notNull(),
  tag: text("tag"),
  status: text("status", {
    enum: ["pending", "done", "archived"],
  }),
  dueAt: integer("due_at", { mode: "timestamp_ms" }),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" }).notNull(),
});
