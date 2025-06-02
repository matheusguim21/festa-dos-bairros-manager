import { AddProductForm } from "@/components/forms/AddProductForm";
import { api } from "./api";
import { Product } from "@/types/Product";
import { Operation } from "@/types/schemas/update-stock-item-schema";

interface getAllProductsResponse {
  content: Product[] | [];
  totalElements: number;
  page: number;
  limit: number;
  totalPages: number;
}
interface UpdateProductsRequest {
  productId: number;
  name?: string;
  price: number;
  quantity?: number;
  criticalStock: number;
  stallId: number;
  operation: Operation;
}
interface getAllProductsRequest {
  search?: string;
  page?: number;
  limit?: number;
}

export const productsService = {
  async getAllProducts({
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
  },

  async createProductItem(data: AddProductForm) {
    console.log("Dados enviados: ", data);
    const response = await api.post("/products", {
      name: data.productName,
      price: data.price,
      quantity: data.productAmount,
      stallId: data.stallId,
    });
    console.log("Response: ", response.request.response);
    return response.data;
  },

  async getAllProductsFromStallById(
    stallId: number,
    { limit, page, search }: getAllProductsRequest = {},
  ): Promise<getAllProductsResponse> {
    try {
      const response = await api.get(`/products/stall/${stallId}/`, {
        params: {
          search,
          page,
          limit,
        },
      });
      console.log("Response getAllProductsFromStallById:  ", response.data);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },
  async updateProduct(formData: UpdateProductsRequest) {
    try {
      const response = await api.put<UpdateProductsRequest>(
        "/products",
        formData,
      );
      console.log("response UpdateProduct: ", response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
