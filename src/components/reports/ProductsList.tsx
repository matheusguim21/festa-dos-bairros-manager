import { ProductCard } from "./ProductCard";
import { EmptyState } from "./EmptyState";
import { LoadingState } from "./LoadingState";

import { Pagination } from "../pagination";
import { BestSellingProduct, PaginatedResponse } from "@/types/reports";
import { PageSelector } from "../filters/PageSelector";

interface ProductsListProps {
  products: BestSellingProduct[];
  pagination?: PaginatedResponse<BestSellingProduct>;
  filters: {
    searchTerm: string;
    stallId: string;
    sortBy: "totalSold" | "revenue" | "name";
    page: number;
    limit: number;
  };
  isLoading: boolean;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: string) => void;
}

export function ProductsList({
  products,
  pagination,
  isLoading,
  onPageChange,
  onPageSizeChange,
  filters,
}: ProductsListProps) {
  if (isLoading) {
    return <LoadingState />;
  }

  if (products.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-4">
      {/* Products */}
      <div className="space-y-3 sm:space-y-4">
        {products.map((product, index) => {
          // Calculate the actual ranking considering pagination
          const actualIndex = pagination
            ? pagination.page * pagination.limit + index
            : index;
          return (
            <ProductCard
              key={product.id}
              product={product}
              index={actualIndex}
            />
          );
        })}
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex justify-between">
          <PageSelector
            handleChange={onPageSizeChange}
            value={filters.limit.toString()}
          />
          <Pagination
            pageCount={pagination.totalPages}
            onPageChange={onPageChange}
            pageIndex={pagination.page}
          />
        </div>
      )}
    </div>
  );
}
