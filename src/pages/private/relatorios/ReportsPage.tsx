"use client";

import { FiltersSection } from "@/components/reports/FiltersSection";
import { PageHeader } from "@/components/reports/PageHeader";
import { ProductsList } from "@/components/reports/ProductsList";
import { StatsCards } from "@/components/reports/StatsCards";
import { useBestSellingProducts } from "@/hooks/useReports";
import { useEffect } from "react";

export default function BestSellingProductsPage() {
  const {
    form,
    products,
    stalls,
    totalStats,
    productsResponse,
    productsLoading,
    clearFilters,
    hasActiveFilters,
    goToPage,
    changePageSize,
    debouncedFilters,
  } = useBestSellingProducts();
  useEffect(() => {
    form.setValue("page", 0);
  }, [
    debouncedFilters.sortBy,
    debouncedFilters.searchTerm,
    debouncedFilters.stallId,
  ]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto space-y-4 p-4 pb-6 sm:space-y-6 sm:p-6">
        <PageHeader />

        <StatsCards stats={totalStats} pagination={productsResponse} />

        <FiltersSection
          form={form}
          stalls={stalls}
          hasActiveFilters={hasActiveFilters}
          clearFilters={clearFilters}
        />

        <ProductsList
          products={products}
          pagination={productsResponse}
          isLoading={productsLoading}
          onPageChange={goToPage}
          onPageSizeChange={(pageSize) => changePageSize(Number(pageSize))}
          filters={debouncedFilters}
        />
      </div>
    </div>
  );
}
