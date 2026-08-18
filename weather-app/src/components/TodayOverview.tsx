import type { CurrentWeather } from "@/services/forecast";
import { weatherIconForCode } from "@/lib/weatherIcon";
import { formatFullDate } from "@/lib/dateFormatters";
import { speedUnitLabel, precipitationUnitLabel } from "@/lib/unitLabels";
import { useUnitStore } from "@/stores/unitStore";
import { LoadingDots } from "./LoadingDots";

const PLACEHOLDER_VALUE = "—";

interface TodayOverviewProps {
  locationName: string;
  todayISODate: string;
  current?: CurrentWeather;
  isLoading?: boolean;
}

export function TodayOverview({
  locationName,
  todayISODate,
  current,
  isLoading = false,
}: TodayOverviewProps) {
  const speedUnit = useUnitStore((state) => state.speedUnit);
  const precipitationUnit = useUnitStore((state) => state.precipitationUnit);

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-6">
      <div
        className={
          isLoading || !current
            ? "bg-neutral-800 flex min-h-0 flex-1 items-center justify-between rounded-xl p-8"
            : "flex min-h-0 flex-1 items-center justify-between rounded-xl bg-cover bg-center p-8"
        }
        style={
          isLoading || !current
            ? undefined
            : { backgroundImage: "url(/images/bg-today-large.svg)" }
        }
      >
        {isLoading || !current ? (
          <div className="flex w-full flex-col items-center justify-center gap-4">
            <LoadingDots />
            <p className="text-neutral-200">Loading...</p>
          </div>
        ) : (
          <>
            <div className="min-w-0 text-center lg:text-left">
              <p className="text-2xl font-medium wrap-break-word">
                {locationName}
              </p>
              <p className="text-neutral-200">{formatFullDate(todayISODate)}</p>
            </div>
            <div className="flex shrink-0 items-center gap-4">
              <img
                src={weatherIconForCode(current.weather_code)}
                alt=""
                className="size-16 lg:size-20"
              />
              <p className="font-display text-5xl italic lg:text-6xl">
                {Math.round(current.temperature_2m)}°
              </p>
            </div>
          </>
        )}
      </div>

      <div className="grid shrink-0 grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-8">
        <div className="bg-neutral-800 flex flex-col gap-2 rounded-md p-4">
          <p className="text-neutral-200">Feels Like</p>
          <p className="text-2xl">
            {current ? `${Math.round(current.apparent_temperature)}°` : PLACEHOLDER_VALUE}
          </p>
        </div>
        <div className="bg-neutral-800 flex flex-col gap-2 rounded-md p-4">
          <p className="text-neutral-200">Humidity</p>
          <p className="text-2xl">
            {current ? `${Math.round(current.relative_humidity_2m)}%` : PLACEHOLDER_VALUE}
          </p>
        </div>
        <div className="bg-neutral-800 flex flex-col gap-2 rounded-md p-4">
          <p className="text-neutral-200">Wind</p>
          <p className="text-2xl">
            {current
              ? `${Math.round(current.wind_speed_10m)} ${speedUnitLabel(speedUnit)}`
              : PLACEHOLDER_VALUE}
          </p>
        </div>
        <div className="bg-neutral-800 flex flex-col gap-2 rounded-md p-4">
          <p className="text-neutral-200 wrap-break-word">Precipitation</p>
          <p className="text-2xl">
            {current
              ? `${current.precipitation} ${precipitationUnitLabel(precipitationUnit)}`
              : PLACEHOLDER_VALUE}
          </p>
        </div>
      </div>
    </div>
  );
}
