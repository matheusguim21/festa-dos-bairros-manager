import { BestSellingProduct, PaginatedResponse } from "@/types/reports";
import { api } from "../api";

export async function getAllBestSellingProducts(
  page = 0,
  limit = 10,
  search?: string,
  stallId?: string,
  sortBy?: "totalSold" | "revenue" | "name",
): Promise<PaginatedResponse<BestSellingProduct>> {
  const response = await api.get("/reports", {
    params: {
      page,
      limit,
      ...(search && { search }),
      ...(stallId && { stallId }),
      ...(sortBy && { sortBy }),
    },
  });

  return response.data;
}
