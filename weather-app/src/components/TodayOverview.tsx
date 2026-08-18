import type { CurrentWeather } from "@/services/forecast";
import { weatherIconForCode } from "@/lib/weatherIcon";
import { formatFullDate } from "@/lib/dateFormatters";
import { speedUnitLabel, precipitationUnitLabel } from "@/lib/unitLabels";
import { useUnitStore } from "@/stores/unitStore";

interface TodayOverviewProps {
  locationName: string;
  todayISODate: string;
  current: CurrentWeather;
}

export function TodayOverview({
  locationName,
  todayISODate,
  current,
}: TodayOverviewProps) {
  const speedUnit = useUnitStore((state) => state.speedUnit);
  const precipitationUnit = useUnitStore((state) => state.precipitationUnit);

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-6">
      <div
        className="flex min-h-0 flex-1 items-center justify-between rounded-xl bg-cover bg-center p-8"
        style={{ backgroundImage: "url(/images/bg-today-large.svg)" }}
      >
        <div>
          <p className="text-2xl font-medium">{locationName}</p>
          <p className="text-neutral-200">{formatFullDate(todayISODate)}</p>
        </div>
        <div className="flex items-center gap-4">
          <img
            src={weatherIconForCode(current.weather_code)}
            alt=""
            className="size-20"
          />
          <p className="font-display text-6xl italic">
            {Math.round(current.temperature_2m)}°
          </p>
        </div>
      </div>

      <div className="grid shrink-0 grid-cols-4 gap-8">
        <div className="bg-neutral-800 flex flex-col gap-2 rounded-md p-4">
          <p className="text-neutral-200">Feels Like</p>
          <p className="text-2xl">
            {Math.round(current.apparent_temperature)}°
          </p>
        </div>
        <div className="bg-neutral-800 flex flex-col gap-2 rounded-md p-4">
          <p className="text-neutral-200">Humidity</p>
          <p className="text-2xl">
            {Math.round(current.relative_humidity_2m)}%
          </p>
        </div>
        <div className="bg-neutral-800 flex flex-col gap-2 rounded-md p-4">
          <p className="text-neutral-200">Wind</p>
          <p className="text-2xl">
            {Math.round(current.wind_speed_10m)} {speedUnitLabel(speedUnit)}
          </p>
        </div>
        <div className="bg-neutral-800 flex flex-col gap-2 rounded-md p-4">
          <p className="text-neutral-200">Precipitation</p>
          <p className="text-2xl">
            {current.precipitation}{" "}
            {precipitationUnitLabel(precipitationUnit)}
          </p>
        </div>
      </div>
    </div>
  );
}
