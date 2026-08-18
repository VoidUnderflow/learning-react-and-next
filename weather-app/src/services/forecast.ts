import { z } from "zod";
import axios from "axios";
import type { TemperatureUnit, SpeedUnit, PrecipitationUnit } from "@/stores/unitStore";

export const CurrentWeatherSchema = z.object({
  temperature_2m: z.number(),
  apparent_temperature: z.number(),
  wind_speed_10m: z.number(),
  precipitation: z.number(),
  relative_humidity_2m: z.number(),
  weather_code: z.number(),
});

export const DailyForecastSchema = z.object({
  time: z.array(z.string()),
  weather_code: z.array(z.number()),
  temperature_2m_max: z.array(z.number()),
  temperature_2m_min: z.array(z.number()),
});

export const HourlyForecastSchema = z.object({
  time: z.array(z.string()),
  temperature_2m: z.array(z.number()),
  weather_code: z.array(z.number()),
});

export const ForecastResponseSchema = z.object({
  current: CurrentWeatherSchema,
  daily: DailyForecastSchema,
  hourly: HourlyForecastSchema,
});

export type CurrentWeather = z.infer<typeof CurrentWeatherSchema>;
export type DailyForecast = z.infer<typeof DailyForecastSchema>;
export type HourlyForecast = z.infer<typeof HourlyForecastSchema>;
export type ForecastResponse = z.infer<typeof ForecastResponseSchema>;

export interface ForecastUnits {
  temperatureUnit: TemperatureUnit;
  speedUnit: SpeedUnit;
  precipitationUnit: PrecipitationUnit;
}

const FORECAST_DAYS = 7;

function buildForecastURL(
  latitude: number,
  longitude: number,
  units: ForecastUnits
): string {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current:
      "temperature_2m,apparent_temperature,wind_speed_10m,precipitation,relative_humidity_2m,weather_code",
    daily: "weather_code,temperature_2m_max,temperature_2m_min",
    hourly: "temperature_2m,weather_code",
    forecast_days: String(FORECAST_DAYS),
    temperature_unit: units.temperatureUnit,
    wind_speed_unit: units.speedUnit,
    precipitation_unit: units.precipitationUnit,
    timezone: "auto",
  });
  return `https://api.open-meteo.com/v1/forecast?${params.toString()}`;
}

export async function fetchForecast(
  latitude: number,
  longitude: number,
  units: ForecastUnits
): Promise<ForecastResponse> {
  const queryURL = buildForecastURL(latitude, longitude, units);
  const response = await axios.get(queryURL);
  return ForecastResponseSchema.parse(response.data);
}
