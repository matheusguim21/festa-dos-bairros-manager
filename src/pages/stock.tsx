import { getAllStockItems } from "@/api/stockService";
import { AddProductModal } from "@/components/modals/AddProductModal";
import { Pagination } from "@/components/pagination";
import StockTable from "@/components/tables/StockTable";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Controller, useForm } from "react-hook-form";
import { useSearchParams } from "react-router";
import { z } from "zod";

const SearchStockItemSchema = z.object({
  search: z.string(),
  limit: z.string(),
});
type SearchStockItemForm = z.infer<typeof SearchStockItemSchema>;
export function Stock() {
  const [searchParams, setSearchParams] = useSearchParams();

  const { control, handleSubmit, getValues, watch } =
    useForm<SearchStockItemForm>({
      resolver: zodResolver(SearchStockItemSchema),
      defaultValues: {
        limit: searchParams.get("limit") ?? "5",
      },
    });
  const pageIndex = z.coerce
    .number()

    .parse(searchParams.get("page") ?? "1");

  const search = searchParams.get("search") || "";
  const limit = watch("limit");

  const { data, isFetching } = useQuery({
    queryKey: ["stock-items", pageIndex, limit, search],
    queryFn: () =>
      getAllStockItems({
        limit: Number(limit),
        page: pageIndex,
        search,
      }),
    placeholderData: keepPreviousData,
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
    const currentPage = Number(searchParams.get("page")) || 1;
    const totalPages = data?.totalPages ?? 1;

    if (currentPage > totalPages) {
      setSearchParams((state) => {
        state.set("page", "1");
        return state;
      });
    }
  }, [data?.totalPages]);

  return (
    <main className="flex flex-col gap-5 px-16">
      <Helmet title="Estoque" />
      <section className="mx-auto flex flex-col items-center">
        <h1 className="text-3xl font-bold text-muted-foreground">Estoque</h1>
      </section>

      <section>
        <div className="flex">
          <div className="flex flex-1 flex-row justify-between border-0">
            <div className="flex gap-5">
              <Controller
                control={control}
                name="search"
                render={({ field: { name, onChange, disabled, value } }) => (
                  <div className="flex w-96 items-center gap-4 rounded-xl border bg-secondary px-3">
                    <Input
                      className="border-0 placeholder:text-gray-400"
                      placeholder="nome  do produto"
                      value={value}
                      onChange={onChange}
                      disabled={disabled}
                      name={name}
                    />
                    <Search
                      className="cursor-pointer text-gray-400"
                      onClick={handleSubmit(handleSearch)}
                    />
                  </div>
                )}
              />
              <Controller
                control={control}
                name="limit"
                render={({ field }) => (
                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="w-16">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <AddProductModal />
          </div>
        </div>
      </section>
      <section className="flex flex-col">
        <StockTable products={data?.data || []} />
        {data && (
          <Pagination
            pageIndex={data.page}
            totalCount={data.total}
            totalPages={data.totalPages}
            onPageChange={handlePaginate}
          />
        )}
      </section>
    </main>
  );
}
