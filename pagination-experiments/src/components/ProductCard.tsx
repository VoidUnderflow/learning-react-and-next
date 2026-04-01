import type { Product } from "@/schemas/product.schema";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "./ui/card";

interface ProductCardProps {
    product: Product;
}

// TODO: Replace direct image fetch with rate-limited version + Skeleton placeholder.
export function ProductCard({ product }: ProductCardProps) {
    return (
        <Card className="relative mx-auto w-full max-w-sm pt-0">
            <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
            <img
                src={product.images[0]}
                alt="Event cover"
                className="relative z-20 aspect-video w-full object-cover brightness-60"
            />
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
