import { Command } from "commander";

import { printEntryList } from "../core/format.js";

export type JournalInput = {
  body?: string;
};

export function createJournalCommand(): Command {
  return new Command("journal")
    .description("Manage journal entries")
    .argument("[body]", "Journal body")
    .action(async (body: string | undefined) => {
      await runJournal({
        body,
      });
    });
}

export async function runJournal(input: JournalInput) {
  const { createEntry, listEntries } = await import("../db/repository.js");

  if (!input.body) {
    const journals = await listEntries({
      type: "journal",
    });

    printEntryList(journals);

    return;
  }

  await createEntry({
    type: "journal",
    body: input.body,
  });

  console.log("journal saved!");
}
