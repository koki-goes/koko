import { Command } from "commander";

import { createBrief } from "../core/brief.js";
import { formatEntry, formatTaskEntry, printBriefSection } from "../core/format.js";
import { exitWithError } from "../utils/errors.js";

export type BriefInput = {
  week?: boolean;
  month?: boolean;
};

export function createBriefCommand(): Command {
  return new Command("brief")
    .description("Display a brief overview of today's entries")
    .option("--week", "Display a weekly brief")
    .option("--month", "Display a monthly brief")
    .action(async (options: BriefInput) => {
      await runBrief(options);
    });
}

export async function runBrief(input: BriefInput) {
  if (input.week && input.month) {
    exitWithError("Use either --week or --month.");
  }

  const brief = await createBrief(input.month ? "month" : "week");

  console.log("Morning Briefing");
  console.log("");
  printBriefSection("Overdue", brief.overdueTasks.map(formatTaskEntry));
  printBriefSection("Today", brief.todayTasks.map(formatTaskEntry));
  printBriefSection("Due Soon", brief.dueSoonTasks.map(formatTaskEntry));
  printBriefSection("Recent Memos", brief.recentMemos.map(formatEntry));
  printBriefSection("Recent Journals", brief.recentJournals.map(formatEntry));
}
