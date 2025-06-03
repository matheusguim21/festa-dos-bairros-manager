import { useAuth } from "@/contexts/Auth.context";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Helmet } from "@dr.pogodin/react-helmet";
import { OrderCard } from "@/components/order/OrderCard";
import { ordersService } from "@/api/orders.service";

export default function Vendas() {
  const { user } = useAuth();

  const { data } = useQuery({
    queryKey: ["sales"],
    queryFn: () =>
      user?.role === "ADMIN"
        ? ordersService.getAllOrders()
        : ordersService.getAllOrdersByStall(user!.stall.id),
    enabled: true,
    placeholderData: keepPreviousData,
  });

  return (
    <main className="min-h-screen">
      <div className="px-3 py-5 pb-24">
        <Helmet title="Vendas" />
        {/* padding bottom para não cobrir os cards */}
        <div className="flex flex-wrap gap-5">
          {data?.content.map((sale) => <OrderCard key={sale.id} sale={sale} />)}
        </div>
      </div>
    </main>
  );
}
