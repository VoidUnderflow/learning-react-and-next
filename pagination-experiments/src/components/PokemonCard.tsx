import type { Pokemon } from "@/schemas/pokemon.schema";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { PokemonSprite } from "./PokemonSprite";
import { PokemonStats } from "./PokemonStats";
import { PokemonTypes } from "./PokemonTypes";

interface PokemonCardProps {
    pokemon: Pokemon;
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
    return (
        <Card className="w-xs">
            <CardHeader>
                <CardTitle className="text-center capitalize">
                    {pokemon.name}
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <PokemonSprite sprites={pokemon.sprites} name={pokemon.name} />
                <Separator />
                <PokemonStats stats={pokemon.stats} />
                <Separator />
                <PokemonTypes types={pokemon.types} />
            </CardContent>
        </Card>
    );
}
