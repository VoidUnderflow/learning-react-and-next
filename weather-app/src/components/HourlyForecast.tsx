import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import type { HourlyForecast as HourlyForecastData } from "@/services/forecast";
import { useHourlyForDay } from "@/hooks/useHourlyForDay";
import { weatherIconForCode } from "@/lib/weatherIcon";
import { formatDayLabel, formatHourLabel } from "@/lib/dateFormatters";

const VISIBLE_ROW_COUNT = 7;
/** Keep in sync with the `gap-5` class on the scroll container below. */
const ROW_GAP_REM = 1.25;

/**
 * Rows divide the list's height evenly: exactly VISIBLE_ROW_COUNT fit at any
 * container height, with the remaining entries reachable by scrolling.
 */
const rowHeight = `calc((100% - ${
  ROW_GAP_REM * (VISIBLE_ROW_COUNT - 1)
}rem) / ${VISIBLE_ROW_COUNT})`;

interface HourlyForecastProps {
  hourly: HourlyForecastData;
  availableISODates: string[];
  defaultISODate: string;
}

export function HourlyForecast({
  hourly,
  availableISODates,
  defaultISODate,
}: HourlyForecastProps) {
  const [selectedISODate, setSelectedISODate] = useState(defaultISODate);
  const entries = useHourlyForDay(hourly, selectedISODate);

  return (
    <div className="bg-neutral-800 flex h-full min-h-0 flex-col gap-6 rounded-xl p-4">
      <div className="flex items-center justify-between">
        <p className="text-xl font-bold">Hourly forecast</p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="default"
              size="sm"
              className="bg-neutral-600 h-auto rounded-md px-4 py-2"
            >
              {formatDayLabel(selectedISODate)}
              <img
                src="/images/icon-dropdown.svg"
                alt=""
                className="size-4"
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuRadioGroup
              value={selectedISODate}
              onValueChange={setSelectedISODate}
            >
              {availableISODates.map((isoDate) => (
                <DropdownMenuRadioItem
                  key={isoDate}
                  value={isoDate}
                  className="data-[state=checked]:bg-accent [&_span[data-state]]:hidden"
                >
                  {formatDayLabel(isoDate)}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="hourly-scroll -mr-4 flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto pr-4">
        {entries.map((entry) => (
          <div
            key={entry.time}
            style={{ height: rowHeight }}
            className="bg-neutral-700 border-neutral-600 flex shrink-0 items-center justify-between rounded-lg border px-3"
          >
            <div className="flex items-center gap-1">
              <img
                src={weatherIconForCode(entry.weather_code)}
                alt=""
                className="size-12"
              />
              <p>{formatHourLabel(entry.time)}</p>
            </div>
            <p>{Math.round(entry.temperature_2m)}°</p>
          </div>
        ))}
      </div>
    </div>
  );
}
