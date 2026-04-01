import type { Product } from "@/schemas/product.schema";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "./ui/card";
import { Separator } from "./ui/separator";
import { useQuery } from "@tanstack/react-query";
import { fetchImage } from "@/api/images";
import { Skeleton } from "./ui/skeleton";

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const {
        data: image,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["products", "image", `${product.id}`],
        queryFn: () => fetchImage(product.images[0]),
        staleTime: 1000 * 10,
    });

    let imageSrc;
    if (!isLoading && !error) imageSrc = URL.createObjectURL(image!);

    return (
        <Card className="mx-auto w-full max-w-sm pt-0">
            <div className="relative aspect-square w-full">
                {isLoading || error ? (
                    <Skeleton className="absolute inset-0 rounded-none" />
                ) : (
                    <img
                        src={imageSrc}
                        alt="Product image"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                )}
            </div>
            <Separator />
            <CardHeader>
                <CardTitle>{product.title}</CardTitle>
                <CardDescription>{product.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex gap-4">
                    <div>
                        <p>Avg. rating: </p>
                        <p>Price:</p>
                    </div>
                    <div>
                        <p>
                            {product.reviews[0]?.rating ?? "?"}⭐ (
                            {product.reviews.length} reviews)
                        </p>
                        <p>{product.price}$</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
