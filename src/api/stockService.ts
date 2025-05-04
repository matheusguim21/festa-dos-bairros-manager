import { AddStockItemForm } from "@/components/inputs/AddStockItemForm";
import { api } from "./api";

export interface StockItem {
  id: number;
  name: string;
  quantity: number;
  createdAt: string;
  unit: string;
}

interface getAllStockItemsResponse {
  data: StockItem[] | [];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
interface getAllStockItemsRequest {
  search?: string;
  page?: number;
  limit?: number;
}

export async function getAllStockItems({
  limit = 5,
  page = 1,
  search,
}: getAllStockItemsRequest): Promise<getAllStockItemsResponse> {
  const response = await api.get("stock", {
    params: {
      search,
      page,
      limit,
    },
  });
  console.log("Request: ", response.config.params);
  return response.data;
}

export async function createStockItem(data: AddStockItemForm) {
  console.log("Dados enviados: ", data);
  const response = await api.post("/stock", {
    name: data.productName,
    unit: data.measureUnity,
    quantity: data.productAmount,
  });
  console.log("Response: ", response.request.response);
  return response.data;
}
