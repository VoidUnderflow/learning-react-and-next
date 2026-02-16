import { create } from "zustand";
import { persist } from "zustand/middleware";

export type TemperatureUnit = "celsius" | "fahrenheit";
export type SpeedUnit = "kmh" | "mph";
export type PrecipitationUnit = "mm" | "in";

interface UnitStore {
  temperatureUnit: TemperatureUnit;
  speedUnit: SpeedUnit;
  precipitationUnit: PrecipitationUnit;

  setTemperatureUnit: (unit: TemperatureUnit) => void;
  setSpeedUnit: (unit: SpeedUnit) => void;
  setPrecipitationUnit: (unit: PrecipitationUnit) => void;
  setAllToMetric: () => void;
}

export const useUnitStore = create<UnitStore>()(
  persist(
    (set) => ({
      temperatureUnit: "celsius",
      speedUnit: "kmh",
      precipitationUnit: "mm",

      setTemperatureUnit: (unit) => set({ temperatureUnit: unit }),
      setSpeedUnit: (unit) => set({ speedUnit: unit }),
      setPrecipitationUnit: (unit) => set({ precipitationUnit: unit }),
      setAllToMetric: () =>
        set({
          temperatureUnit: "celsius",
          speedUnit: "kmh",
          precipitationUnit: "mm",
        }),
    }),
    {
      name: "weather-units",
    }
  )
);
