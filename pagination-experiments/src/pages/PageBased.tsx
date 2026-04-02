import { fetchProducts } from "@/api/products";
import { ProductCard } from "@/components/ProductCard";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { useQuery } from "@tanstack/react-query";

export default function PageBased() {
    const limit = 30;
    const offset = 0;
    const {
        data: products,
        isPending,
        error,
    } = useQuery({
        queryKey: ["products", limit, offset],
        queryFn: () => fetchProducts(limit, offset),
        staleTime: 1000 * 60,
    });

    return (
        <div className="page-layout">
            <h1 className="p-1 text-2xl underline">Page-based pagination</h1>
            {isPending ? (
                <div>Fetching products...</div>
            ) : error ? (
                <div>Error while fetching products: {error.message}</div>
            ) : (
                <div className="grid grid-cols-2 gap-8">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}

            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#" isActive>
                            2
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href="#" />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}
