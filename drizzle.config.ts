import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.ts", // スキーマがあって、スキーマはこれですよ
  dialect: "sqlite", // sqliteを使いますよ
  dbCredentials: {
    // ここにデータベースを作りますよ
    url: "./data/koko.db",
  },
});
