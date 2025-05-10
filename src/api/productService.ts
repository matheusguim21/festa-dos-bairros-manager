import { api } from "./api";
import { Product } from "@/types/Product";
import { AddProductForm } from "@/components/inputs/AddProductForm";

interface getAllProductsResponse {
  content: Product[] | [];
  totalElements: number;
  page: number;
  limit: number;
  totalPages: number;
}
interface getAllProductsRequest {
  search?: string;
  page?: number;
  limit?: number;
}

export async function getAllProducts({
  limit = 5,
  page = 1,
  search,
}: getAllProductsRequest): Promise<getAllProductsResponse> {
  const response = await api.get("products", {
    params: {
      search,
      page,
      limit,
    },
  });
  console.log("Request: ", response.config.params);
  return response.data;
}

export async function createProductItem(data: AddProductForm) {
  console.log("Dados enviados: ", data);
  const response = await api.post("/products", {
    name: data.productName,
    price: data.price,
    quantity: data.productAmount,
    stallId: data.stallId,
  });
  console.log("Response: ", response.request.response);
  return response.data;
}
