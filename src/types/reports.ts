// Adicione estes campos ao tipo BestSellingProduct
export interface BestSellingProduct {
  id: number;
  name: string;
  price: number;
  totalSold: number;
  revenue: number;
  // Campos de estoque - use um dos dois nomes dependendo da sua API
  currentStock?: number; // ou quantity?: number
  quantity?: number; // campo alternativo
  criticalStock?: number;
  stall: {
    id: number;
    name: string;
  };
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  page: number;
  limit: number;
  totalUnitsSold: number;
}

export type SortOption = "totalSold" | "revenue" | "name";

export interface ProductStats {
  totalProducts: number;
  totalSold: number;
  totalRevenue: number;
}
