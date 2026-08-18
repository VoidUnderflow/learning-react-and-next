import { SpeedUnit, PrecipitationUnit } from "@/stores/unitStore";

export function speedUnitLabel(unit: SpeedUnit): string {
  return unit === SpeedUnit.MPH ? "mph" : "km/h";
}

export function precipitationUnitLabel(unit: PrecipitationUnit): string {
  return unit === PrecipitationUnit.IN ? "in" : "mm";
}
