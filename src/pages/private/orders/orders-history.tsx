import { useAuth } from "@/contexts/Auth.context";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Helmet } from "@dr.pogodin/react-helmet";
import { OrderCard } from "@/components/order/OrderCard";
import { ordersService } from "@/api/orders.service";
import { useEffect, useState } from "react";
import { Pagination } from "@/components/pagination";
import { z } from "zod";

import { PageSelector } from "@/components/filters/PageSelector";

const searchOrdersSchema = z.object({
  search: z.string().optional(),
  limit: z.string(),
});

export type SearchOrdersFormData = z.infer<typeof searchOrdersSchema>;

export default function Vendas() {
  const { user } = useAuth();
  // const [searchParams, setSearchParams] = useSearchParams();
  const [limit, setLimit] = useState("5");
  const [page, setPage] = useState("1");

  const { data } = useQuery({
    queryKey: ["sales", page, limit],
    queryFn: () =>
      user?.role === "ADMIN"
        ? ordersService.getAllOrders({
            limit,
            page: page ?? "1",
          })
        : ordersService.getAllOrdersByStall(user!.stall.id, {
            limit,
            page: page ?? "1",
          }),
    enabled: true,
    placeholderData: keepPreviousData,
  });

  function handlePaginate(newPageIndex: number) {
    setPage((newPageIndex + 1).toString());
  }

  // const handleSearch = (formData: SearchOrdersFormData) => {
  //   setSearchParams((state) => {
  //     state.set("search", formData.search ?? "");
  //     state.set("page", "1");
  //     return state;
  //   });
  // };

  useEffect(() => {
    if (limit) {
      setPage("1");
    }
  }, [limit]);

  // useEffect(() => {
  //   setSearchParams((state) => {
  //     state.set("search", search );
  //     return state;
  //   });
  // }, []);

  return (
    <main className="overflow-auto">
      <div className="border-3 px-3 py-5">
        <Helmet title="Pedidos" />
        {data && (
          <>
            <div className="flex w-full flex-wrap gap-5">
              <span className="right-0 w-full truncate text-end">
                Total de {data.totalElements} Pedidos
              </span>
              <div className="flex flex-wrap gap-3">
                {data.content.map((sale) => (
                  <OrderCard key={sale.id} sale={sale} />
                ))}
              </div>
              <div className="flex w-full items-end justify-between">
                <PageSelector value={limit} handleChange={setLimit} />
                <Pagination
                  onPageChange={handlePaginate}
                  pageCount={data.totalPages}
                  pageIndex={data.page}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
