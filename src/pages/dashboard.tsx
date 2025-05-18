import { productsService } from "@/api/productService";
import { SaleProductsCard } from "@/components/sale/SaleProductsCard";
import { useAuth } from "@/contexts/Auth.context";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { SaleSummaryBar } from "@/components/cart/SaleSummaryBar";

export default function DashBoard() {
  const { user } = useAuth();

  const { data } = useQuery({
    queryKey: ["products"],
    queryFn: () => productsService.getAllProductsFromStallById(user!.stall.id),
    enabled: true,
    placeholderData: keepPreviousData,
  });

  return (
    <div className="px-5 py-5 pb-32">
      {/* padding bottom para não cobrir os cards */}
      <div className="flex flex-col gap-5">
        {data?.content.map((product) => (
          <SaleProductsCard key={product.id} product={product} />
        ))}
      </div>
      <SaleSummaryBar />
    </div>
  );
}
