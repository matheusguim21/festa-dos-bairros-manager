export interface BestSellingProduct {
  id: number;
  name: string;
  stall: {
    id: number;
    name: string;
  };
  totalSold: number;
  revenue: number;
  price: number;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  page: number;
  limit: number;
}

export type SortOption = "totalSold" | "revenue" | "name";

export interface ProductStats {
  totalProducts: number;
  totalSold: number;
  totalRevenue: number;
}
