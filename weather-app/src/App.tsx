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
  const { data, isLoading, isError } = useForecast(selectedLocation);

  return (
    <div className="text-neutral-0 flex h-screen flex-col overflow-hidden bg-neutral-900 px-24 pt-8 pb-24">
      {/* Header */}
      <div className="flex shrink-0 justify-between">
        <div>
          <img src="images/logo.svg"></img>
        </div>
        <DropdownSettings />
      </div>
      <div className="flex shrink-0 flex-col items-center gap-10 py-8">
        <h1 className="font-display text-4xl">
          How's the sky looking today?
        </h1>
        <SearchInput />
      </div>
      {/* Search bar */}
      {isLoading && <p>Loading forecast...</p>}
      {isError && <p>Something went wrong fetching the forecast.</p>}
      {data && selectedLocation && (
        <div className="mx-auto mt-8 grid w-full max-w-7xl min-h-0 flex-1 grid-cols-3 items-stretch gap-6">
          <div className="col-span-2 flex min-h-0 flex-col gap-8">
            <TodayOverview
              locationName={displayCityCountry(selectedLocation)}
              todayISODate={data.daily.time[0]}
              current={data.current}
            />
            <DailyForecast daily={data.daily} />
          </div>
          <div className="flex min-h-0 flex-col">
            <HourlyForecast
              hourly={data.hourly}
              availableISODates={data.daily.time}
              defaultISODate={data.daily.time[0]}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
