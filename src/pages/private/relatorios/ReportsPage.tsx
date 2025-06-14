"use client";

import { FiltersSection } from "@/components/reports/FiltersSection";
import { PageHeader } from "@/components/reports/PageHeader";
import { ProductsList } from "@/components/reports/ProductsList";
import { StatsCards } from "@/components/reports/StatsCards";
import { Button } from "@/components/ui/button";
import { useBestSellingProducts } from "@/hooks/useReports";
import { downloadExcelReport } from "@/utils/downloadExcelButton";
import { Helmet } from "@dr.pogodin/react-helmet";
import { Sheet } from "lucide-react";
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
      <Helmet title="Relatórios" />
      <div className="container mx-auto space-y-4 p-4 pb-6 sm:space-y-6 sm:p-6">
        <PageHeader />

        <StatsCards stats={totalStats} pagination={productsResponse} />

        <FiltersSection
          form={form}
          stalls={stalls}
          hasActiveFilters={hasActiveFilters}
          clearFilters={clearFilters}
        />
        <Button
          className="bg-green-800 text-xs text-background"
          onClick={() => downloadExcelReport({ debouncedFilters })}
        >
          <Sheet />
          Gerar Excel
        </Button>

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
