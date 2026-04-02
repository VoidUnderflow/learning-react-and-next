import { ProductCard } from "@/components/ProductCard";
import { PageJumpEllipsis } from "@/components/PageJumpEllipsis";
import {
    Pagination,
    PaginationContent,
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
        setPage,
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
                        <PaginationPrevious onClick={() => prevPage()} />
                    </PaginationItem>
                    {currentPage > 2 && (
                        <PaginationItem>
                            <PageJumpEllipsis maxPage={maxPage} setPage={setPage} />
                        </PaginationItem>
                    )}
                    {currentPage > 1 && (
                        <PaginationItem>
                            <PaginationLink
                                onClick={() => setPage(currentPage - 1)}
                            >
                                {currentPage - 1}
                            </PaginationLink>
                        </PaginationItem>
                    )}

                    <PaginationItem>
                        <PaginationLink onClick={() => {}} isActive>
                            {currentPage}
                        </PaginationLink>
                    </PaginationItem>
                    {currentPage < maxPage && (
                        <PaginationItem>
                            <PaginationLink
                                onClick={() => setPage(currentPage + 1)}
                            >
                                {currentPage + 1}
                            </PaginationLink>
                        </PaginationItem>
                    )}
                    {currentPage < maxPage - 1 && (
                        <PaginationItem>
                            <PageJumpEllipsis maxPage={maxPage} setPage={setPage} />
                        </PaginationItem>
                    )}
                    <PaginationItem>
                        <PaginationNext onClick={() => nextPage()} />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}
