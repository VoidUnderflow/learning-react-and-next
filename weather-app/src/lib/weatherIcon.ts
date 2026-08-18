export function weatherIconForCode(weatherCode: number): string {
  if (weatherCode === 0) return "/images/icon-sunny.webp";
  if ([1, 2].includes(weatherCode)) return "/images/icon-partly-cloudy.webp";
  if (weatherCode === 3) return "/images/icon-overcast.webp";
  if ([45, 48].includes(weatherCode)) return "/images/icon-fog.webp";
  if ([51, 53, 55, 56, 57].includes(weatherCode))
    return "/images/icon-drizzle.webp";
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(weatherCode))
    return "/images/icon-rain.webp";
  if ([71, 73, 75, 77, 85, 86].includes(weatherCode))
    return "/images/icon-snow.webp";
  if ([95, 96, 99].includes(weatherCode)) return "/images/icon-storm.webp";
  return "/images/icon-sunny.webp";
}
