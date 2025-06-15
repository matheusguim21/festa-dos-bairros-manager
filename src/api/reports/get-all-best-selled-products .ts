import type { BestSellingProduct, PaginatedResponse } from "@/types/reports";
import { api } from "../api";

interface BestSellingParams {
  page: number;
  limit: number;
  search?: string;
  stallId?: string;
  sortBy?:
    | "totalSold"
    | "revenue"
    | "name"
    | "stock-asc"
    | "stock-desc"
    | "price-asc"
    | "price-desc";
  stockLevel?: string;
}

export async function getAllBestSellingProducts({
  page = 0,
  limit = 10,
  search,
  stallId,
  stockLevel,
  sortBy,
}: BestSellingParams): Promise<PaginatedResponse<BestSellingProduct>> {
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
