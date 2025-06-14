import type { BestSellingProduct, PaginatedResponse } from "@/types/reports";
import { api } from "../api";

export async function getAllBestSellingProducts(
  page = 0,
  limit = 10,
  search?: string,
  stallId?: string,
  stockLevel?: string,
  sortBy?:
    | "totalSold"
    | "revenue"
    | "name"
    | "stock-asc"
    | "stock-desc"
    | "price-asc"
    | "price-desc",
): Promise<PaginatedResponse<BestSellingProduct>> {
  const response = await api.get("/reports", {
    params: {
      page,
      limit,
      ...(search && { search }),
      ...(stallId && { stallId }),
      ...(stockLevel && { stockLevel }),
      ...(sortBy && { sortBy }),
    },
  });

  return response.data;
}
