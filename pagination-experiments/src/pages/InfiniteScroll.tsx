import { PokemonCard } from "@/components/PokemonCard";
import { SAMPLE_POKEMON } from "@/schemas/pokemon.schema";

export default function InfiniteScroll() {
    return (
        <div className="page-layout">
            <h1 className="p-1 text-2xl underline">Page-based pagination</h1>
            <PokemonCard pokemon={SAMPLE_POKEMON} />
        </div>
    );
}
