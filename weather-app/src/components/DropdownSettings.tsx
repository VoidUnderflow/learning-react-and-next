import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import {
  PrecipitationUnit,
  SpeedUnit,
  TemperatureUnit,
  useUnitStore,
} from "@/stores/unitStore";

export function DropdownSettings() {
  const temperatureUnit = useUnitStore((state) => state.temperatureUnit);
  const speedUnit = useUnitStore((state) => state.speedUnit);
  const precipitationUnit = useUnitStore((state) => state.precipitationUnit);

  const setTemperatureUnit = useUnitStore((state) => state.setTemperatureUnit);
  const setSpeedUnit = useUnitStore((state) => state.setSpeedUnit);
  const setPrecipitationUnit = useUnitStore(
    (state) => state.setPrecipitationUnit
  );

  const setAllToMetric = useUnitStore((state) => state.setAllToMetric);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default">
          <img src="/images/icon-units.svg" alt="" className="size-4" />
          Units
          <img src="/images/icon-dropdown.svg" alt="" className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={setAllToMetric}>
            Switch to metric
          </DropdownMenuItem>
          {/* Temperature */}
          <DropdownMenuLabel>Temperature</DropdownMenuLabel>
          <DropdownMenuRadioGroup
            value={temperatureUnit}
            onValueChange={setTemperatureUnit}
          >
            <DropdownMenuRadioItem value={TemperatureUnit.CELSIUS}>
              Celsius (°C)
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value={TemperatureUnit.FAHRENHEIT}>
              Fahrenheit (°F)
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
          <DropdownMenuSeparator />
          {/* Wind speed */}
          <DropdownMenuLabel>Wind Speed</DropdownMenuLabel>
          <DropdownMenuRadioGroup
            value={speedUnit}
            onValueChange={setSpeedUnit}
          >
            <DropdownMenuRadioItem value={SpeedUnit.KMH}>
              km/h
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value={SpeedUnit.MPH}>
              mph
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {/* Precipitation */}
        <DropdownMenuLabel>Precipitation</DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={precipitationUnit}
          onValueChange={(value) =>
            setPrecipitationUnit(value as PrecipitationUnit)
          }
        >
          <DropdownMenuRadioItem value={PrecipitationUnit.MM}>
            Millimeters (mm)
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={PrecipitationUnit.IN}>
            Inches (in)
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
