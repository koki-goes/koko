import { getDaysAgo, getMonthRange, getTodayRange, getWeekRange } from "./datetime.js";
import type { Entry } from "../db/repository.js";

export type BriefRange = "week" | "month";

export type BriefData = {
  overdueTasks: Entry[];
  todayTasks: Entry[];
  dueSoonTasks: Entry[];
  recentMemos: Entry[];
  recentJournals: Entry[];
};

export async function createBrief(range: BriefRange = "week"): Promise<BriefData> {
  const { listEntries } = await import("../db/repository.js");
  const todayRange = getTodayRange();
  const horizonRange = range === "month" ? getMonthRange() : getWeekRange();
  const now = new Date();

  const [overdueTasks, todayTasks, dueSoonTasks, recentMemos, recentJournals] =
    await Promise.all([
      listEntries({
        type: "task",
        status: "pending",
        dueTo: new Date(todayRange.from.getTime() - 1),
        sort: "dueAsc",
      }),
      listEntries({
        type: "task",
        status: "pending",
        dueFrom: todayRange.from,
        dueTo: todayRange.to,
        sort: "dueAsc",
      }),
      listEntries({
        type: "task",
        status: "pending",
        dueFrom: new Date(todayRange.to.getTime() + 1),
        dueTo: horizonRange.to,
        sort: "dueAsc",
      }),
      listEntries({
        type: "memo",
        createdFrom: getDaysAgo(7),
        createdTo: now,
        sort: "createdDesc",
      }),
      listEntries({
        type: "journal",
        createdFrom: getDaysAgo(3),
        createdTo: now,
        sort: "createdDesc",
      }),
    ]);

  return {
    overdueTasks,
    todayTasks,
    dueSoonTasks,
    recentMemos,
    recentJournals,
  };
}
