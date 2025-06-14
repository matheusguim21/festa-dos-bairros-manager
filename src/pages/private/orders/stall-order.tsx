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
    queryFn: () =>
      productsService.getAllProducts({
        stallId: user?.stall?.id,
      }),
    enabled: true,
    placeholderData: keepPreviousData,
  });

  return (
    <div className="flex flex-col items-center gap-3 overflow-auto px-5 py-5">
      <Helmet title="Ínicio" />
      {/* padding bottom para não cobrir os cards */}
      {/* <h1 className="text-2xl font-bold">Venda</h1> */}
      <div className="flex w-full flex-wrap gap-5 xs:mb-32 sm:mb-24">
        {data?.content.map((product) => (
          <OrderProductsCard key={product.id} product={product} />
        ))}
      </div>
      <Cart />
    </div>
  );
}
