import type { Pokemon } from "@/schemas/pokemon.schema";

const TYPE_CLASSES: Record<string, string> = {
    normal: "bg-[#A8A878] text-[#111]",
    fire: "bg-[#F08030] text-[#111]",
    water: "bg-[#6890F0] text-white",
    electric: "bg-[#F8D030] text-[#111]",
    grass: "bg-[#78C850] text-[#111]",
    ice: "bg-[#98D8D8] text-[#111]",
    fighting: "bg-[#C03028] text-white",
    poison: "bg-[#A040A0] text-white",
    ground: "bg-[#E0C068] text-[#111]",
    flying: "bg-[#A890F0] text-[#111]",
    psychic: "bg-[#F85888] text-white",
    bug: "bg-[#A8B820] text-[#111]",
    rock: "bg-[#B8A038] text-[#111]",
    ghost: "bg-[#705898] text-white",
    dragon: "bg-[#7038F8] text-white",
    dark: "bg-[#705848] text-white",
    steel: "bg-[#B8B8D0] text-[#111]",
    fairy: "bg-[#EE99AC] text-[#111]",
};

interface PokemonTypesProps {
    types: Pokemon["types"];
}

export function PokemonTypes({ types }: PokemonTypesProps) {
    const pairs: Pokemon["types"][] = [];
    for (let idx = 0; idx < types.length; idx += 2) {
        pairs.push(types.slice(idx, idx + 2));
    }

    return (
        <div className="flex flex-col gap-1">
            {pairs.map((pair, pairIdx) => (
                <div
                    key={pairIdx}
                    className={`flex gap-2 ${pair.length === 1 ? "justify-center" : ""}`}
                >
                    {pair.map(({ type }) => (
                        <span
                            key={type.name}
                            className={`${TYPE_CLASSES[type.name]} flex-1 rounded px-2 py-0.5 text-center text-xs font-semibold tracking-wide uppercase`}
                        >
                            {type.name}
                        </span>
                    ))}
                </div>
            ))}
        </div>
    );
}
