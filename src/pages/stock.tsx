import { getAllProducts } from "@/api/productService";
import { StockFilters } from "@/components/filters/StockFilters";
import { AddProductModal } from "@/components/modals/AddProductModal";
import { Pagination } from "@/components/pagination";
import ProductsTable from "@/components/tables/ProductsTable";
import StockTable from "@/components/tables/ProductsTable";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useIsMobile } from "@/hooks/use-mobile";
import { zodResolver } from "@hookform/resolvers/zod";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router";
import { z } from "zod";

const SearchStockItemSchema = z.object({
  search: z.string(),
  limit: z.string(),
});
type SearchStockItemForm = z.infer<typeof SearchStockItemSchema>;
export function Stock() {
  const [searchParams, setSearchParams] = useSearchParams();

  const { control, handleSubmit, watch, getValues } =
    useForm<SearchStockItemForm>({
      resolver: zodResolver(SearchStockItemSchema),
      defaultValues: {
        limit: searchParams.get("limit") ?? "5",
        search: "",
      },
    });
  const pageIndex = z.coerce
    .number()

    .parse(searchParams.get("page") ?? "1");

  const search = searchParams.get("search") || "";
  const limit = watch("limit");

  const isMobile = useIsMobile();

  const { data } = useQuery({
    queryKey: ["products", pageIndex, limit, search],
    queryFn: () =>
      getAllProducts({
        limit: Number(limit),
        page: pageIndex,
        search,
      }),
    enabled: true,
    // placeholderData: keepPreviousData,
  });

  function handlePaginate(newPageIndex: number) {
    setSearchParams((state) => {
      state.set("page", (newPageIndex + 1).toString());
      return state;
    });
  }

  const handleSearch = (formData: SearchStockItemForm) => {
    setSearchParams((state) => {
      state.set("search", formData.search);
      state.set("page", "1");
      return state;
    });
  };

  useEffect(() => {
    if (limit) {
      setSearchParams((state) => {
        state.set("limit", limit);
        state.set("page", "1");
        return state;
      });
    }
  }, [limit]);

  useEffect(() => {
    setSearchParams((state) => {
      state.set("search", getValues().search);
      return state;
    });
  }, []);

  return (
    <main className="flex flex-col gap-5 px-5 py-5 pb-10">
      <Helmet title="Estoque" />
      <section className="mx-auto flex flex-col items-center">
        <h1 className="text-3xl font-bold text-muted-foreground">Estoque</h1>
      </section>

      <section>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col justify-between md:flex-row">
            <StockFilters
              control={control}
              handleSearch={handleSubmit(handleSearch)}
            />
            {!isMobile && <AddProductModal />}
          </div>
          {isMobile && <AddProductModal />}
        </div>
      </section>
      <section className="flex flex-col">
        <ProductsTable data={data?.content || []} />
        {data && (
          <Pagination
            pageIndex={data.page}
            totalCount={data.totalElements}
            totalPages={data.totalPages}
            onPageChange={handlePaginate}
          />
        )}
      </section>
    </main>
  );
}
