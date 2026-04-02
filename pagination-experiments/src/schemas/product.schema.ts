import { z } from "zod";

export const ProductSchema = z.object({
    id: z.int(),
    title: z.string(),
    description: z.string(),
    price: z.number(),
    reviews: z.array(
        z.object({
            rating: z.int(),
        }),
    ),
    images: z.array(z.httpUrl()),
});

export const ProductResponseSchema = z.object({
    products: z.array(ProductSchema),
    total: z.int(),
});

export type Product = z.infer<typeof ProductSchema>;
export type ProductResponse = z.infer<typeof ProductResponseSchema>;

export const SAMPLE_PRODUCT: Product = {
    id: 0,
    title: "This is a product",
    description: "This is a product description! woooo",
    price: 99.9,
    reviews: [{ rating: 2 }, { rating: 3 }, { rating: 4 }],
    images: ["https://avatar.vercel.sh/shadcn1"],
};
