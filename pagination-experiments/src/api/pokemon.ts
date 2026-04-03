import {
    PokemonPageSchema,
    PokemonSchema,
    type Pokemon,
    type PokemonPage,
} from "@/schemas/pokemon.schema";
import axios from "axios";

export async function fetchPokemonPage(url: string): Promise<PokemonPage> {
    const response = await axios.get(url);
    return PokemonPageSchema.parse(response.data);
}

export async function fetchPokemon(url: string): Promise<Pokemon> {
    const response = await axios.get(url);
    return PokemonSchema.parse(response.data);
}

export async function fetchAllPokemonOnPage(
    pokemonPage: PokemonPage,
): Promise<Pokemon[]> {
    return Promise.all(
        pokemonPage.results.map((result) => fetchPokemon(result.url)),
    );
}
