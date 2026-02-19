import { z } from "zod";
import axios from "axios";

export const GeocodingResultSchema = z.object({
  id: z.number(),
  name: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  country: z.string(),
  admin1: z.string().optional(),
  admin2: z.string().optional(),
});

export const GeocodingResponseSchema = z.object({
  results: z.array(GeocodingResultSchema).optional(),
});

export type GeocodingResult = z.infer<typeof GeocodingResultSchema>;
export type GeocodingResponse = z.infer<typeof GeocodingResponseSchema>;

function buildQueryURL(locationName: string, count: number = 10): string {
  return `https://geocoding-api.open-meteo.com/v1/search?name=${locationName}&count=${count}&language=en&format=json`;
}

export async function searchLocation(
  locationName: string
): Promise<GeocodingResult[]> {
  const queryURL = buildQueryURL(locationName);
  const response = await axios.get(queryURL);
  const parsed = GeocodingResponseSchema.parse(response.data);
  return parsed.results ?? [];
}

export function displayLocation(
  location: GeocodingResult,
  excludeName: boolean = false
): string {
  const strs: (string | undefined)[] = excludeName ? [] : [location.name];
  strs.push(...[location.country, location.admin1, location.admin2]);
  return strs.filter((x) => x !== undefined).join(", ");
}
