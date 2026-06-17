import { Command } from "commander";

import { parseDateTimeInput } from "../core/datetime.js";
import { parseTimeFilter } from "../core/filters.js";
import { printTaskList } from "../core/format.js";
import { parseTag } from "../core/tag.js";
import { exitWithError } from "../utils/errors.js";

export type TaskInput = {
  body?: string;
  tag?: string;
  d?: string;
  t?: string;
  today?: boolean;
  week?: boolean;
  all?: boolean;
};

export function createTaskCommand(): Command {
  return new Command("task")
    .description("Manage task entries")
    .argument("[body]", "Task body")
    .option("--tag <tag>", "Tag to attach or filter by")
    .option("--d <date>", "Due date")
    .option("--t <time>", "Due time")
    .option("--today", "List today's tasks")
    .option("--week", "List this week's tasks")
    .option("--all", "Include done and archived tasks")
    .action(async (body: string | undefined, options: Omit<TaskInput, "body">) => {
      await runTask({
        body,
        tag: options.tag,
        d: options.d,
        t: options.t,
        today: options.today,
        week: options.week,
        all: options.all,
      });
    });
}

export async function runTask(input: TaskInput) {
  try {
    const { createEntry, listEntries } = await import("../db/repository.js");

    if (!input.body) {
      const range = parseTimeFilter(input);
      const tasks = await listEntries({
        type: "task",
        tag: input.tag,
        status: input.all ? undefined : "pending",
        dueFrom: range?.from,
        dueTo: range?.to,
        sort: "dueAsc",
      });

      printTaskList(tasks);
      return;
    }

    const tag = parseTag(input.tag);
    const dueAt = parseDateTimeInput({
      d: input.d,
      t: input.t,
    });

    await createEntry({
      type: "task",
      body: input.body,
      tag,
      status: "pending",
      dueAt,
    });

    console.log("task saved!");
  } catch (error) {
    if (error instanceof Error) {
      exitWithError(error.message);
    }

    throw error;
  }
}
