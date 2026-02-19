import { useGeocodingSearch } from "@/hooks/useGeocodingSearch";
import { useState } from "react";
import { Button } from "./ui/button";
import { displayLocation, type GeocodingResult } from "@/services/geocoding";

export function SearchInput() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedLocation, setSelectedLocation] =
    useState<GeocodingResult | null>(null);
  const { data, isLoading, error, isError } = useGeocodingSearch(searchTerm);

  const foundLocations: boolean = data !== undefined && data.length > 0;

  return (
    <div className="w-full max-w-2xl">
      {/* Search container */}
      <div className="flex items-center gap-2 rounded-md">
        {/* Icon + input */}
        <div className="bg-popover relative flex-1 rounded-md">
          <img
            src="/images/icon-search.svg"
            alt="Search icon"
            className="absolute top-1/2 left-3 size-4 -translate-y-1/2"
          />
          <input
            value={searchTerm}
            onChange={(e) => {
              setSelectedLocation(null);
              setSearchTerm(e.target.value);
            }}
            placeholder="Search for a place..."
            className="w-full rounded-md py-2 pr-4 pl-10"
          />
        </div>
        {/* Search button */}
        <Button variant={"search"} size="lg" className="py-2">
          Search
        </Button>
      </div>
      {/* Search results for location */}
      {foundLocations && !selectedLocation && (
        <div className="bg-popover my-4 w-full rounded-md p-4">
          <li className="flex max-h-40 flex-col gap-2 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {data?.slice(0, 10).map((location: GeocodingResult) => (
              <ul
                key={location.id}
                onClick={() => {
                  setSearchTerm(displayLocation(location, false));
                  setSelectedLocation(location);
                }}
                className="hover:bg-accent rounded-md p-1"
              >
                <div className="flex justify-between">
                  <p>{location.name}</p>
                  <p>{displayLocation(location, true)}</p>
                </div>
              </ul>
            ))}
          </li>
        </div>
      )}
    </div>
  );
}
