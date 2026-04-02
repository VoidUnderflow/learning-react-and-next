import {
    ProductResponseSchema,
    type ProductResponse,
} from "@/schemas/product.schema";
import axios from "axios";

const productsClient = axios.create({
    method: "GET",
    baseURL: "https://dummyjson.com/products",
    responseType: "json",
});

export async function fetchProducts(
    limit: number = 30,
    offset: number = 0,
): Promise<ProductResponse> {
    const response = await productsClient.get("", {
        params: { limit, offset },
    });

    return ProductResponseSchema.parse(response.data);
}
