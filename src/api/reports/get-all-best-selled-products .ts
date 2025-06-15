import type { BestSellingProduct, PaginatedResponse } from "@/types/reports";
import { api } from "../api";

interface BestSellingParams {
  page: number;
  limit: number;
  searchTerm?: string; // ✅ Mudado de 'search' para 'searchTerm' para consistência
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
  festivalDay?: string; // ✅ Adicionado
}

export async function getAllBestSellingProducts({
  page = 0,
  limit = 10,
  searchTerm, // ✅ Mudado de 'search' para 'searchTerm'
  stallId,
  stockLevel,
  sortBy,
  festivalDay, // ✅ Adicionado
}: BestSellingParams): Promise<PaginatedResponse<BestSellingProduct>> {
  const response = await api.get("/reports", {
    params: {
      page,
      limit,
      ...(searchTerm && { search: searchTerm }), // ✅ Mapeia searchTerm para search
      ...(stallId && stallId !== "all" && { stallId }),
      ...(stockLevel && { stockLevel }),
      ...(sortBy && { sortBy }),
      // ✅ Adicionado: envia a data quando não for "all"
      ...(festivalDay && festivalDay !== "all" && { date: festivalDay }),
    },
  });

  return response.data;
}
