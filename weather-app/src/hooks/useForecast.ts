import { useQuery } from "@tanstack/react-query";
import { fetchForecast } from "@/services/forecast";
import { useUnitStore } from "@/stores/unitStore";
import type { GeocodingResult } from "@/services/geocoding";

const CACHE_DURATION_MS = 3 * 60 * 60 * 1000;

export function useForecast(location: GeocodingResult | null) {
  const temperatureUnit = useUnitStore((state) => state.temperatureUnit);
  const speedUnit = useUnitStore((state) => state.speedUnit);
  const precipitationUnit = useUnitStore((state) => state.precipitationUnit);

  const units = { temperatureUnit, speedUnit, precipitationUnit };

  const { data, isLoading, error, isError } = useQuery({
    queryKey: [
      "forecast",
      location?.latitude,
      location?.longitude,
      temperatureUnit,
      speedUnit,
      precipitationUnit,
    ],
    queryFn: () =>
      fetchForecast(location!.latitude, location!.longitude, units),
    enabled: location !== null,
    staleTime: CACHE_DURATION_MS,
    gcTime: CACHE_DURATION_MS,
  });

  return { data, isLoading, error, isError };
}
