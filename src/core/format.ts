import type { Entry } from "../db/repository.js";
import { formatDateTime } from "./datetime.js";

export function formatDate(value: Date): string {
  return `${value.getFullYear()}/${value.getMonth() + 1}/${value.getDate()}`;
}

export function formatTag(tag: string | null): string {
  return tag ? ` #${tag}` : "";
}

export function formatEntry(entry: Entry): string {
  return `${formatDate(entry.createdAt)}: ${entry.body}${formatTag(entry.tag)}`;
}

export function formatTaskEntry(entry: Entry): string {
  const dueText = entry.dueAt ? formatDateTime(entry.dueAt) : "no due";

  return `${dueText}  ${entry.body}${formatTag(entry.tag)}`;
}

export function printEntryList(entries: Entry[]): void {
  for (const entry of entries) {
    console.log(formatEntry(entry));
  }
}

export function printTaskList(entries: Entry[]): void {
  for (const entry of entries) {
    console.log(formatTaskEntry(entry));
  }
}

export function printTaggedEntryList(entries: Entry[]): void {
  for (const entry of entries) {
    if (entry.type === "task") {
      console.log(formatTaskEntry(entry));
      continue;
    }

    console.log(formatEntry(entry));
  }
}

export function printBriefSection(title: string, lines: string[]): void {
  console.log(title);

  if (lines.length === 0) {
    console.log("- none");
    console.log("");
    return;
  }

  for (const line of lines) {
    console.log(`- ${line}`);
  }

  console.log("");
}
