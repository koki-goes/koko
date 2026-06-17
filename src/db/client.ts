// 実行時にdbに接続する

import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";

const sqlite = new Database("./data/koko.db");
export const db = drizzle(sqlite);
