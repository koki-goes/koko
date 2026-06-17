export type DateTimeInput = {
  d?: string;
  t?: string;
};

export type DateRange = {
  from: Date;
  to: Date;
};

export function parseDateTimeInput(input: DateTimeInput): Date | undefined {
  if (!input.d && !input.t) {
    return undefined;
  }

  const now = new Date();
  const { month, day } = input.d
    ? parseMonthDay(input.d)
    : { month: now.getMonth() + 1, day: now.getDate() };
  const { hour, minute } = input.t
    ? parseTime(input.t)
    : { hour: 23, minute: 59 };

  const date = new Date(now.getFullYear(), month - 1, day, hour, minute, 0, 0);

  if (
    date.getFullYear() !== now.getFullYear() ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day ||
    date.getHours() !== hour ||
    date.getMinutes() !== minute
  ) {
    throw new Error("Invalid date or time.");
  }

  return date;
}

export function getTodayRange(): DateRange {
  const now = new Date();
  const from = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const to = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);

  return { from, to };
}

export function getWeekRange(): DateRange {
  const now = new Date();
  const from = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const to = new Date(from);
  to.setDate(from.getDate() + 7);
  to.setHours(23, 59, 59, 999);

  return { from, to };
}

export function getMonthRange(): DateRange {
  const now = new Date();
  const from = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const to = new Date(from);
  to.setMonth(from.getMonth() + 1);
  to.setHours(23, 59, 59, 999);

  return { from, to };
}

export function getDaysAgo(days: number): Date {
  const now = new Date();
  const date = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  date.setDate(date.getDate() - days);
  return date;
}

export function formatDateTime(value: Date): string {
  const month = value.getMonth() + 1;
  const day = value.getDate();
  const hour = value.getHours().toString().padStart(2, "0");
  const minute = value.getMinutes().toString().padStart(2, "0");

  return `${month}/${day} ${hour}:${minute}`;
}

function parseMonthDay(value: string): { month: number; day: number } {
  if (!/^\d{4}$/.test(value)) {
    throw new Error("Date must be MMDD format, for example 0630.");
  }

  const month = Number(value.slice(0, 2));
  const day = Number(value.slice(2, 4));

  return { month, day };
}

function parseTime(value: string): { hour: number; minute: number } {
  if (!/^\d{1,2}:\d{2}$/.test(value)) {
    throw new Error("Time must be HH:mm format, for example 17:00.");
  }

  const [hourText, minuteText] = value.split(":");
  const hour = Number(hourText);
  const minute = Number(minuteText);

  if (hour < 0 || hour > 23 || minute < 0 || minute > 59) {
    throw new Error("Invalid time.");
  }

  return { hour, minute };
}
