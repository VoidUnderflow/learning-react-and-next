import { fetchProducts } from "@/api/products";
import type { ProductResponse } from "@/schemas/product.schema";
import { useQuery } from "@tanstack/react-query";

export function useFetchProducts(
    limit: number,
    offset: number,
): {
    productResponse: ProductResponse | undefined;
    isPending: boolean;
    error: Error | null;
} {
    const {
        data: productResponse,
        isPending,
        error,
    } = useQuery({
        queryKey: ["products", limit, offset],
        queryFn: () => fetchProducts(limit, offset),
        staleTime: 1000 * 15,
        gcTime: 1000 * 30,
    });

    return { productResponse, isPending, error };
}
