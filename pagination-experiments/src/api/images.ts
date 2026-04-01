import axios from "axios";
import pLimit from "p-limit";

const limit = pLimit(5);

async function _fetchImage(imageUrl: string): Promise<Blob> {
    const response = await axios.get(imageUrl, { responseType: "blob" });
    return response.data;
}

export const fetchImage = (imageUrl: string) =>
    limit(() => _fetchImage(imageUrl));
