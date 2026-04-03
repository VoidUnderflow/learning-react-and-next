import type { Pokemon } from "@/schemas/pokemon.schema";

const CDN_BASE = "https://cdn.pokedb.org/cdn_assets/pokemon_assets/stats";

const STAT_CDN_SLUG: Record<string, string> = {
    hp: "hp",
    attack: "attack",
    defense: "defense",
    "special-attack": "spatk",
    "special-defense": "spdef",
    speed: "speed",
};

interface StatRowProps {
    statName: string;
    baseStat: number;
}

function StatRow({ statName, baseStat }: StatRowProps) {
    const slug = STAT_CDN_SLUG[statName] ?? statName;
    const iconUrl = `${CDN_BASE}/stat_${slug}.webp`;

    return (
        <div className="flex items-center gap-2">
            <img
                src={iconUrl}
                alt={statName}
                className="size-5 shrink-0 object-contain"
            />
            <span className="text-sm font-semibold">{baseStat}</span>
        </div>
    );
}

interface PokemonStatsProps {
    stats: Pokemon["stats"];
}

export function PokemonStats({ stats }: PokemonStatsProps) {
    return (
        <div className="mx-auto grid grid-cols-2 gap-x-4 gap-y-1">
            {stats.map(({ base_stat, stat }) => (
                <StatRow
                    key={stat.name}
                    statName={stat.name}
                    baseStat={base_stat}
                />
            ))}
        </div>
    );
}
