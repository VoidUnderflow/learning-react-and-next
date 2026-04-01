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
import { SAMPLE_PRODUCT } from "@/schemas/product.schema";
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

    if (isPending) return <div>Pending placeholder...</div>;
    if (error) return <div>Error placeholder...</div>;

    return (
        <div className="page-layout">
            <h1 className="p-1 text-2xl underline">Page-based pagination</h1>
            <div className="grid grid-cols-2 gap-8">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
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
