import { PokemonCard } from "@/components/PokemonCard";
import { useFetchPokemon } from "@/hooks/useFetchPokemon";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function InfiniteScroll() {
    const { ref, inView } = useInView();

    const {
        data,
        status,
        error,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
    } = useFetchPokemon();

    // Trigger fetching the next page + prevent it if already fetching?
    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, fetchNextPage, isFetchingNextPage, hasNextPage]);

    return (
        <div className="page-layout">
            <h1 className="p-1 text-2xl underline">Infinite Scroll</h1>
            <div className="flex flex-col gap-8">
                {status === "error" && (
                    <p>Encountered an error: ${error?.message}</p>
                )}
                {status === "pending" && <p>Fetching Pokemon...</p>}
                {status === "success" &&
                    data?.pages
                        .flatMap((page) => page.pokemonList)
                        .map((pokemon) => (
                            <PokemonCard key={pokemon.id} pokemon={pokemon} />
                        ))}
            </div>

            {/* Element that triggers fetch. */}
            <div ref={ref}></div>
            {isFetchingNextPage && <p>Fetching next page...</p>}
        </div>
    );
}
