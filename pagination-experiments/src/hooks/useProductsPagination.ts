import { useFetchProducts } from "./useFetchProducts";
import { useState } from "react";

const LIMIT: number = 30;

export function useProductsPagination() {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const offset = (currentPage - 1) * LIMIT;

    const { productResponse, isPending, error } = useFetchProducts(
        LIMIT,
        offset,
    );

    const totalNumberOfProducts = productResponse?.total ?? 0;
    const maxPage = Math.ceil(totalNumberOfProducts / LIMIT);

    const nextPage = () => {
        if (currentPage < maxPage) setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const fetchPage = (page: number) => {
        if (page >= 1 && page <= maxPage) setCurrentPage(page);
    };

    return {
        products: productResponse?.products ?? [],
        isPending,
        error,
        currentPage,
        maxPage,
        nextPage,
        prevPage,
        fetchPage,
    };
}
