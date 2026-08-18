import { useMemo } from "react";
import type { HourlyForecast } from "@/services/forecast";

export interface HourlyEntry {
  time: string;
  temperature_2m: number;
  weather_code: number;
}

export function useHourlyForDay(
  hourly?: HourlyForecast,
  dayISODate?: string
): HourlyEntry[] {
  return useMemo(() => {
    if (!hourly || !dayISODate) return [];
    return hourly.time
      .map((time, idx) => ({
        time,
        temperature_2m: hourly.temperature_2m[idx],
        weather_code: hourly.weather_code[idx],
      }))
      .filter((entry) => entry.time.startsWith(dayISODate));
  }, [hourly, dayISODate]);
}
