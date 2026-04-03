import z from "zod";

/** Schema for response to: https://pokeapi.co/api/v2/pokemon */
export const PokemonPageSchema = z.object({
    count: z.int(),
    next: z.url(),
    results: z.array(
        z.object({
            name: z.string(),
            url: z.url(),
        }),
    ),
});

export type PokemonPage = z.infer<typeof PokemonPageSchema>;

/** Schema for response to: https://pokeapi.co/api/v2/pokemon/{id} */
export const PokemonSchema = z.object({
    id: z.number(),
    name: z.string(),
    sprites: z.object({
        front_default: z.url(),
        front_shiny: z.url(),
    }),
    stats: z.array(
        z.object({
            base_stat: z.int(),
            stat: z.object({
                name: z.string(),
            }),
        }),
    ),
    types: z.array(
        z.object({
            type: z.object({
                name: z.string(),
            }),
        }),
    ),
});

export type Pokemon = z.infer<typeof PokemonSchema>;

export const SAMPLE_POKEMON: Pokemon = {
    id: 1,
    name: "bulbasaur",
    sprites: {
        front_default:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
        front_shiny:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png",
    },
    stats: [
        { base_stat: 45, stat: { name: "hp" } },
        { base_stat: 49, stat: { name: "attack" } },
        { base_stat: 49, stat: { name: "defense" } },
        { base_stat: 65, stat: { name: "special-attack" } },
        { base_stat: 65, stat: { name: "special-defense" } },
        { base_stat: 45, stat: { name: "speed" } },
    ],
    types: [
        {
            type: {
                name: "grass",
            },
        },
        {
            type: {
                name: "poison",
            },
        },
    ],
};
