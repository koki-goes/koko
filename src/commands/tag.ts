import { Command } from "commander";

import { printEntryList, printTaggedEntryList, printTaskList } from "../core/format.js";
import { parseTag } from "../core/tag.js";
import { exitWithError } from "../utils/errors.js";

export type TagInput = {
  tag: string;
  memo?: boolean;
  task?: boolean;
};

export function createTagCommand(): Command {
  return new Command("tag")
    .description("List entries by tag")
    .argument("<tag>", "Tag name")
    .option("--memo", "List memo entries")
    .option("--task", "List task entries")
    .action(async (tag: string, options: Omit<TagInput, "tag">) => {
      await runTag({
        tag,
        memo: options.memo,
        task: options.task,
      });
    });
}

export async function runTag(input: TagInput) {
  const normalizedTag = parseTag(input.tag);
  if (!normalizedTag) {
    exitWithError("Tag is required.");
  }

  if (input.memo && input.task) {
    exitWithError("Use either --memo or --task.");
  }

  const { listEntries } = await import("../db/repository.js");

  if (input.memo) {
    const memos = await listEntries({
      type: "memo",
      tag: normalizedTag,
    });

    printEntryList(memos);
    return;
  }

  if (input.task) {
    const tasks = await listEntries({
      type: "task",
      tag: normalizedTag,
      status: "pending",
      sort: "dueAsc",
    });

    printTaskList(tasks);
    return;
  }

  const entries = await listEntries({
    tag: normalizedTag,
  });

  printTaggedEntryList(entries);
}
