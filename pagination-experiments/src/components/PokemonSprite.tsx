import { useState } from "react";
import { Skeleton } from "./ui/skeleton";
import type { Pokemon } from "@/schemas/pokemon.schema";
import { useFetchSprite } from "@/hooks/useFetchSprite";

interface PokemonSpriteProps {
    sprites: Pokemon["sprites"];
    name: string;
}

export function PokemonSprite({ sprites, name }: PokemonSpriteProps) {
    const [showShiny, setShowShiny] = useState(false);

    const { data: frontBlob, isLoading: frontLoading } = useFetchSprite(
        "front",
        sprites.front_default,
    );

    const { data: shinyBlob, isLoading: shinyLoading } = useFetchSprite(
        "shiny",
        sprites.front_shiny,
    );

    const activeBlob = showShiny ? shinyBlob : frontBlob;
    const isLoading = showShiny ? shinyLoading : frontLoading;
    const imageSrc = activeBlob ? URL.createObjectURL(activeBlob) : undefined;

    function handleClick() {
        if (sprites.front_shiny) setShowShiny((s) => !s);
    }

    return (
        <div
            className={`relative mx-auto size-32 ${sprites.front_shiny ? "cursor-pointer" : ""}`}
            onClick={handleClick}
            title={
                sprites.front_shiny
                    ? showShiny
                        ? "Click for normal"
                        : "Click for shiny"
                    : undefined
            }
        >
            {isLoading || !imageSrc ? (
                <Skeleton className="absolute inset-0 rounded-md" />
            ) : (
                <img
                    src={imageSrc}
                    alt={`${name}${showShiny ? " shiny" : ""} sprite`}
                    className="size-full object-contain"
                    style={{ imageRendering: "pixelated" }}
                />
            )}
            {showShiny && (
                <span className="absolute right-0 bottom-0 rounded bg-yellow-300 px-1 text-[10px] font-bold text-yellow-900">
                    SHINY
                </span>
            )}
        </div>
    );
}
