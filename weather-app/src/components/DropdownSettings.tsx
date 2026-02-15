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
import { useState } from "react";

export function DropdownSettings() {
  const [temperatureUnit, setTemperatureUnit] = useState("Celsius");
  const [speedUnit, setSpeedUnit] = useState("km/h");
  const [precipitationUnit, setPrecipitationUnit] = useState("mm");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default">Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuGroup>
          <DropdownMenuItem>Switch to metric</DropdownMenuItem>
          {/* Temperature */}
          <DropdownMenuLabel>Temperature</DropdownMenuLabel>
          <DropdownMenuRadioGroup
            value={temperatureUnit}
            onValueChange={setTemperatureUnit}
          >
            <DropdownMenuRadioItem value="Celsius">
              Celsius (°C)
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="Fahrenheit">
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
            <DropdownMenuRadioItem value="kmh">km/h</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="mph">mph</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={precipitationUnit}
          onValueChange={setPrecipitationUnit}
        >
          <DropdownMenuRadioItem value="mm">
            Millimeters (mm)
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="in">Inches (in)</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
