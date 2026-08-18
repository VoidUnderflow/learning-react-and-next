import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { GeocodingResult } from "@/services/geocoding";

interface LocationStore {
  selectedLocation: GeocodingResult | null;
  hasNoSearchResults: boolean;
  setSelectedLocation: (location: GeocodingResult | null) => void;
  setHasNoSearchResults: (hasNoResults: boolean) => void;
}

export const useLocationStore = create<LocationStore>()(
  persist(
    (set) => ({
      selectedLocation: null,
      hasNoSearchResults: false,
      setSelectedLocation: (location) => set({ selectedLocation: location }),
      setHasNoSearchResults: (hasNoResults) =>
        set({ hasNoSearchResults: hasNoResults }),
    }),
    {
      name: "weather-location",
      partialize: (state) => ({ selectedLocation: state.selectedLocation }),
    }
  )
);
