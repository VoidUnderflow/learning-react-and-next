import { useGeocodingSearch } from "@/hooks/useGeocodingSearch";
import { useState } from "react";
import { Button } from "./ui/button";

export function SearchInput() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { data, isLoading, error, isError } = useGeocodingSearch(searchTerm);
  console.log("Search results: ", data);
  return (
    <div className="flex gap-2">
      {/* Icon + input */}
      <div className="relative flex-1">
        <img
          src="/images/icon-search.svg"
          alt="Search icon"
          className="absolute top-1/2 left-3 size-4 -translate-y-1/2"
        />
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a place..."
          className="w-xl rounded-md py-2 pr-4 pl-10"
        />
      </div>
      {/* Search button */}
      <Button variant={"search"}>Search</Button>
    </div>
  );
}
