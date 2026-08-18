import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { GeocodingResult } from "@/services/geocoding";

interface LocationStore {
  selectedLocation: GeocodingResult | null;
  setSelectedLocation: (location: GeocodingResult | null) => void;
}

export const useLocationStore = create<LocationStore>()(
  persist(
    (set) => ({
      selectedLocation: null,
      setSelectedLocation: (location) => set({ selectedLocation: location }),
    }),
    {
      name: "weather-location",
    }
  )
);
