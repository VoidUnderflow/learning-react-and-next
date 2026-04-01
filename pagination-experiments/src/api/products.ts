import { ProductSchema, type Product } from "@/schemas/product.schema";
import axios from "axios";

const productsClient = axios.create({
    method: "GET",
    baseURL: "https://dummyjson.com/products",
    responseType: "json",
});

export async function fetchProducts(
    limit: number = 30,
    offset: number = 0,
): Promise<Product[]> {
    const response = await productsClient.get("", {
        params: { limit, offset },
    });

    return ProductSchema.array().parse(response.data?.products);
}
