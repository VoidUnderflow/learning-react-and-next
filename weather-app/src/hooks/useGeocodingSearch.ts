import { useDebounce } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import { searchLocation } from "@/services/geocoding";

export function useGeocodingSearch(locationName: string) {
  const [debouncedLocationName] = useDebounce(locationName, 500);
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["geocoding", debouncedLocationName],
    queryFn: () => searchLocation(debouncedLocationName),
    enabled:
      !!debouncedLocationName.trim() &&
      debouncedLocationName.trim().length >= 1,
  });

  return { data, isLoading, error, isError };
}
