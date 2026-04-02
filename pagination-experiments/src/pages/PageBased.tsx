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
import { useProductsPagination } from "@/hooks/useProductsPagination";

export default function PageBased() {
    const {
        products,
        isPending,
        error,
        currentPage,
        maxPage,
        nextPage,
        prevPage,
        fetchPage,
    } = useProductsPagination();

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
