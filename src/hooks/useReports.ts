"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { getAllStalls } from "@/api/shared/get-stalls";
import {
  type FiltersFormData,
  filtersSchema,
} from "@/types/schemas/reports-filter-schema";
import type { ProductStats } from "@/types/reports";
import { useDebouncedValue } from "./useDebouncedValue";
import { getAllBestSellingProducts } from "@/api/reports/get-all-best-selled-products ";

export function useBestSellingProducts() {
  const form = useForm<FiltersFormData>({
    resolver: zodResolver(filtersSchema),
    defaultValues: {
      searchTerm: "",
      stallId: "all",
      sortBy: "totalSold",
      festivalDay: "all", // ✅ Adicionado
      page: 0,
      limit: 10,
    },
  });

  // Watch form values for reactive filtering
  const watchedFilters = form.watch();
  const debouncedSearchTerm = useDebouncedValue(watchedFilters.searchTerm, 300);
  const debouncedFilters = {
    ...watchedFilters,
    searchTerm: debouncedSearchTerm,
  };

  console.log("debounced sort: ", debouncedFilters.sortBy);
  const { data: productsResponse, isLoading: productsLoading } = useQuery({
    queryKey: ["best-selling-products", debouncedFilters],
    queryFn: () => getAllBestSellingProducts({ ...debouncedFilters }),
    placeholderData: (previousData) => previousData, // Keep previous data while loading
  });

  const { data: stalls = [], isLoading: stallsLoading } = useQuery({
    queryKey: ["stalls"],
    queryFn: getAllStalls,
  });

  const products = productsResponse?.content || [];

  const totalStats: ProductStats = useMemo(() => {
    // Note: For paginated data, you might want to get these stats from a separate API endpoint
    // that returns totals across all pages, not just the current page
    return {
      totalProducts: productsResponse?.totalElements || 0,
      totalSold: products.reduce((sum, product) => sum + product.totalSold, 0),
      totalRevenue: products.reduce((sum, product) => sum + product.revenue, 0),
    };
  }, [products, productsResponse?.totalElements]);

  const clearFilters = () => {
    form.reset({
      searchTerm: "",
      stallId: "all",
      sortBy: "totalSold",
      festivalDay: "all", // ✅ Adicionado
      page: 0,
      limit: 10,
    });
  };

  const hasActiveFilters = useMemo(() => {
    const currentValues = form.getValues();
    return (
      currentValues.searchTerm !== "" ||
      currentValues.stallId !== "all" ||
      currentValues.sortBy !== "totalSold" ||
      currentValues.festivalDay !== "all" // ✅ Adicionado
    );
  }, [form, debouncedFilters]);

  const goToPage = (page: number) => {
    form.setValue("page", page);
  };

  const changePageSize = (limit: number) => {
    form.setValue("limit", limit);
    form.setValue("page", 0); // Reset to first page when changing page size
  };

  return {
    // Form
    form,
    debouncedFilters,

    // Data
    products,
    stalls,
    totalStats,
    productsResponse,
    // Loading states
    productsLoading,
    stallsLoading,

    // Actions
    clearFilters,
    hasActiveFilters,
    goToPage,
    changePageSize,
  };
}
