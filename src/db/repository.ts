import { and, asc, desc, eq, gte, lte, sql, type SQL } from "drizzle-orm";
import { nanoid } from "nanoid";

import { db } from "./client.js";
import { entries } from "./schema.js";

export type EntryType = "memo" | "task" | "journal";
export type EntryStatus = "pending" | "done" | "archived";

export type Entry = typeof entries.$inferSelect;

export type CreateEntryInput = {
  type: EntryType;
  body: string;
  status?: EntryStatus;
  dueAt?: Date;
  tag?: string;
};

export type ListEntriesFilter = {
  type?: EntryType;
  tag?: string;
  status?: EntryStatus;
  dueFrom?: Date;
  dueTo?: Date;
  createdFrom?: Date;
  createdTo?: Date;
  sort?: "createdDesc" | "dueAsc";
};

export async function createEntry(input: CreateEntryInput) {
  const now = new Date();
  const id = nanoid();

  await db.insert(entries).values({
    id,
    type: input.type,
    body: input.body,
    tag: input.tag ?? null,
    status: input.status ?? null,
    dueAt: input.dueAt ?? null,
    createdAt: now,
    updatedAt: now,
  });

  return { id };
}

export async function listEntries(filter: ListEntriesFilter = {}) {
  const conditions: SQL[] = [];
  const orderBy =
    filter.sort === "dueAsc"
      ? [sql`${entries.dueAt} is null`, asc(entries.dueAt), desc(entries.createdAt)]
      : [desc(entries.createdAt)];

  if (filter.type) {
    conditions.push(eq(entries.type, filter.type));
  }

  if (filter.status) {
    conditions.push(eq(entries.status, filter.status));
  }

  if (filter.tag) {
    conditions.push(eq(entries.tag, filter.tag));
  }

  if (filter.dueFrom) {
    conditions.push(gte(entries.dueAt, filter.dueFrom));
  }

  if (filter.dueTo) {
    conditions.push(lte(entries.dueAt, filter.dueTo));
  }

  if (filter.createdFrom) {
    conditions.push(gte(entries.createdAt, filter.createdFrom));
  }

  if (filter.createdTo) {
    conditions.push(lte(entries.createdAt, filter.createdTo));
  }

  return db
    .select()
    .from(entries)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(...orderBy);
}
