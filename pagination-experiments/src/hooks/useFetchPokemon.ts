import { fetchAllPokemonOnPage, fetchPokemonPage } from "@/api/pokemon";
import type { Pokemon } from "@/schemas/pokemon.schema";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useFetchPokemon() {
    const {
        status,
        data,
        error,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteQuery({
        queryKey: ["pokemon"],
        queryFn: async ({
            pageParam: pageUrl,
        }): Promise<{
            pokemonList: Pokemon[];
            nextPageUrl: string;
        }> => {
            const pokemonPage = await fetchPokemonPage(pageUrl);
            const pokemonList = await fetchAllPokemonOnPage(pokemonPage);
            return { pokemonList, nextPageUrl: pokemonPage.next };
        },
        initialPageParam: "https://pokeapi.co/api/v2/pokemon?offset=0&limit=5",
        getNextPageParam: (lastPage) => lastPage.nextPageUrl,
    });

    return {
        data,
        status,
        error,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
    };
}
