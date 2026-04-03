import { fetchImage } from "@/api/images";
import { useQuery } from "@tanstack/react-query";

export function useFetchSprite(
    spriteType: "front" | "shiny",
    spriteUrl: string,
) {
    const { data, isLoading } = useQuery({
        queryKey: ["pokemon", "sprite", spriteType, spriteUrl],
        queryFn: () => fetchImage(spriteUrl),
        staleTime: Infinity,
        gcTime: Infinity,
    });

    return { data, isLoading };
}
