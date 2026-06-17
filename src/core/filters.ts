import type { DateRange } from "./datetime.js";
import { getTodayRange, getWeekRange } from "./datetime.js";

export type TimeFilterOptions = {
  today?: boolean;
  week?: boolean;
};

export function parseTimeFilter(options: TimeFilterOptions): DateRange | undefined {
  if (options.today && options.week) {
    throw new Error("Use either --today or --week, not both.");
  }

  if (options.today) {
    return getTodayRange();
  }

  if (options.week) {
    return getWeekRange();
  }

  return undefined;
}
