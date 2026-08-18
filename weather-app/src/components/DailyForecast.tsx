import type { DailyForecast as DailyForecastData } from "@/services/forecast";
import { weatherIconForCode } from "@/lib/weatherIcon";
import { formatShortDayLabel } from "@/lib/dateFormatters";

interface DailyForecastProps {
  daily: DailyForecastData;
}

export function DailyForecast({ daily }: DailyForecastProps) {
  return (
    <div className="flex shrink-0 flex-col gap-4">
      <p className="text-xl font-bold">Daily forecast</p>
      <div className="flex h-44 justify-between gap-4">
        {daily.time.map((isoDate, idx) => (
          <div
            key={isoDate}
            className="bg-neutral-800 flex flex-1 flex-col items-center justify-between gap-1 rounded-md p-4"
          >
            <p>{formatShortDayLabel(isoDate)}</p>
            <img
              src={weatherIconForCode(daily.weather_code[idx])}
              alt=""
              className="size-20"
            />
            <div className="flex w-full justify-between">
              <span>{Math.round(daily.temperature_2m_max[idx])}°</span>
              <span className="text-neutral-200">
                {Math.round(daily.temperature_2m_min[idx])}°
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
