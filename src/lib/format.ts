import type { GdgEvent } from "@/data/events";

const dayMonth = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
  timeZone: "UTC",
});

const full = new Intl.DateTimeFormat("en-IN", {
  weekday: "short",
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

/** "11 Oct" / "16 - 19 Sep" for the compact date block on a card. */
export function formatEventDate(event: GdgEvent): string {
  const start = new Date(`${event.date}T00:00:00Z`);
  if (!event.endDate) return dayMonth.format(start);

  const end = new Date(`${event.endDate}T00:00:00Z`);
  const sameMonth = start.getUTCMonth() === end.getUTCMonth();
  if (sameMonth) {
    return `${start.getUTCDate()} - ${dayMonth.format(end)}`;
  }
  return `${dayMonth.format(start)} - ${dayMonth.format(end)}`;
}

export function formatEventDateLong(event: GdgEvent): string {
  return full.format(new Date(`${event.date}T00:00:00Z`));
}

export function formatYear(isoDate: string): string {
  return new Date(`${isoDate}T00:00:00Z`).getUTCFullYear().toString();
}

export function formatNewsDate(isoDate: string): string {
  return dayMonth.format(new Date(`${isoDate}T00:00:00Z`));
}
