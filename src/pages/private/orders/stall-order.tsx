import { productsService } from "@/api/productService";
import { OrderProductsCard } from "@/components/cards/OrderProductsCard";
import { useAuth } from "@/contexts/Auth.context";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Helmet } from "@dr.pogodin/react-helmet";
import { Cart } from "@/components/order/cart/Cart";

export default function StallOrder() {
  const { user } = useAuth();

  const { data } = useQuery({
    queryKey: ["products"],
    queryFn: () => productsService.getAllProductsFromStallById(user!.stall.id),
    enabled: true,
    placeholderData: keepPreviousData,
  });

  return (
    <div className="flex h-screen flex-col items-center gap-3 overflow-auto px-5 py-5 pb-32">
      <Helmet title="Ínicio" />
      {/* padding bottom para não cobrir os cards */}
      <h1 className="text-2xl font-bold">Venda</h1>
      <div className="flex flex-wrap gap-5">
        {data?.content.map((product) => (
          <OrderProductsCard key={product.id} product={product} />
        ))}
      </div>
      <Cart />
    </div>
  );
}
