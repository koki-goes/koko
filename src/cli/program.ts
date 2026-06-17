import { Command } from "commander";

import { createBriefCommand } from "../commands/brief.js";
import { createJournalCommand } from "../commands/journal.js";
import { createMemoCommand } from "../commands/memo.js";
import { createTagCommand } from "../commands/tag.js";
import { createTaskCommand } from "../commands/task.js";

export const program = new Command();

program
  .name("koko")
  .description("CLI tool for managing memo, journal, and task entries")
  .version("0.1.0");

program.addCommand(createMemoCommand());
program.addCommand(createJournalCommand());
program.addCommand(createTaskCommand());
program.addCommand(createTagCommand());
program.addCommand(createBriefCommand());
