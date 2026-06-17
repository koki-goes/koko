import { Command } from "commander";

import { printEntryList } from "../core/format.js";
import { parseTag } from "../core/tag.js";

export type MemoInput = {
  body?: string;
  tag?: string;
};

export function createMemoCommand(): Command {
  return new Command("memo")
    .description("Manage memo entries")
    .argument("[body]", "Memo body")
    .option("--tag <tag>", "Tag to attach or filter by")
    .action(async (body: string | undefined, options: { tag?: string }) => {
      await runMemo({
        body,
        tag: options.tag,
      });
    });
}

export async function runMemo(input: MemoInput) {
  const { createEntry, listEntries } = await import("../db/repository.js");

  if (!input.body) {
    const memos = await listEntries({
      type: "memo",
      tag: input.tag,
    });

    printEntryList(memos);

    return;
  }

  const tag = parseTag(input.tag);

  await createEntry({
    type: "memo",
    body: input.body,
    tag,
  });

  console.log(`memo saved!`);
}
