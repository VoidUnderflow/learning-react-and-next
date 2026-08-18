import type { DailyForecast as DailyForecastData } from "@/services/forecast";
import { weatherIconForCode } from "@/lib/weatherIcon";
import { formatShortDayLabel } from "@/lib/dateFormatters";

const PLACEHOLDER_DAY_COUNT = 7;

interface DailyForecastProps {
  daily?: DailyForecastData;
}

export function DailyForecast({ daily }: DailyForecastProps) {
  if (!daily) {
    return (
      <div className="flex shrink-0 flex-col gap-4">
        <p className="text-xl font-bold">Daily forecast</p>
        <div className="grid grid-cols-[repeat(auto-fit,8rem)] justify-start gap-4 lg:grid-cols-7 lg:justify-items-stretch">
          {Array.from({ length: PLACEHOLDER_DAY_COUNT }, (_unused, idx) => (
            <div
              key={idx}
              className="bg-neutral-800 h-44 w-full rounded-md"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex shrink-0 flex-col gap-4">
      <p className="text-xl font-bold">Daily forecast</p>
      <div className="grid grid-cols-[repeat(auto-fit,8rem)] justify-start gap-4 lg:grid-cols-7 lg:justify-items-stretch">
        {daily.time.map((isoDate, idx) => (
          <div
            key={isoDate}
            className="bg-neutral-800 flex h-44 w-full flex-col items-center justify-between gap-1 rounded-md p-4"
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
