import { DropdownSettings } from "./components/DropdownSettings";
import { SearchInput } from "./components/SearchInput";
import { TodayOverview } from "./components/TodayOverview";
import { DailyForecast } from "./components/DailyForecast";
import { HourlyForecast } from "./components/HourlyForecast";
import { useLocationStore } from "@/stores/locationStore";
import { useForecast } from "@/hooks/useForecast";
import { displayCityCountry } from "@/services/geocoding";

function App() {
  const selectedLocation = useLocationStore((state) => state.selectedLocation);
  const hasNoSearchResults = useLocationStore(
    (state) => state.hasNoSearchResults
  );
  const { data, isLoading, isError } = useForecast(selectedLocation);

  return (
    <div className="text-neutral-0 flex min-h-screen flex-col overflow-x-hidden bg-neutral-900 px-4 pt-8 pb-8 lg:h-screen lg:min-h-0 lg:overflow-hidden lg:px-24 lg:pb-24">
      {/* Header */}
      <div className="flex shrink-0 justify-between">
        <div>
          <img src="images/logo.svg"></img>
        </div>
        <DropdownSettings />
      </div>
      <div className="flex shrink-0 flex-col items-center gap-10 py-8">
        <h1 className="font-display text-center text-5xl lg:text-4xl">
          How's the sky looking today?
        </h1>
        <SearchInput />
      </div>
      {/* Search bar */}
      {isError && <p>Something went wrong fetching the forecast.</p>}
      {hasNoSearchResults && (
        <p className="text-center text-2xl font-bold">
          No search results found!
        </p>
      )}
      {selectedLocation && !isError && !hasNoSearchResults && (
        <div className="mx-auto mt-8 grid w-full max-w-7xl min-h-0 flex-1 grid-cols-1 items-stretch gap-6 lg:grid-cols-3">
          <div className="mx-auto flex w-full max-w-176 min-h-0 flex-col gap-8 lg:col-span-2 lg:mx-0 lg:max-w-none">
            <TodayOverview
              locationName={displayCityCountry(selectedLocation)}
              todayISODate={data?.daily.time[0] ?? ""}
              current={data?.current}
              isLoading={isLoading}
            />
            <DailyForecast daily={data?.daily} />
          </div>
          <div className="mx-auto flex w-full max-w-176 min-h-0 flex-col lg:mx-0 lg:max-w-none">
            <HourlyForecast
              hourly={data?.hourly}
              availableISODates={data?.daily.time}
              defaultISODate={data?.daily.time[0]}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
