export function formatDayLabel(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en-US", { weekday: "long" });
}

export function formatShortDayLabel(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en-US", { weekday: "short" });
}

export function formatFullDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatHourLabel(isoDateTime: string): string {
  return new Date(isoDateTime).toLocaleTimeString("en-US", {
    hour: "numeric",
    hour12: true,
  });
}
