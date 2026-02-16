import { create } from "zustand";
import { persist } from "zustand/middleware";

export const TemperatureUnit = {
  CELSIUS: "celsius",
  FAHRENHEIT: "fahrenheit",
};

export const SpeedUnit = {
  KMH: "kmh",
  MPH: "mph",
};

export const PrecipitationUnit = {
  MM: "mm",
  IN: "in",
};

export type TemperatureUnit =
  (typeof TemperatureUnit)[keyof typeof TemperatureUnit];
export type SpeedUnit = (typeof SpeedUnit)[keyof typeof SpeedUnit];
export type PrecipitationUnit =
  (typeof PrecipitationUnit)[keyof typeof PrecipitationUnit];

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
