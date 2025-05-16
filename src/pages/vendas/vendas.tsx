import { productsService } from "@/api/productService";
import { SaleProductsCard } from "@/components/cards/SaleProductsCard";
import { useAuth } from "@/contexts/Auth.context";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export default function Vendas() {
  const { user } = useAuth();

  const { data } = useQuery({
    queryKey: ["products"],
    queryFn: () => productsService.getAllProductsFromStallById(user!.stall.id),
    enabled: true,
    placeholderData: keepPreviousData,
  });

  return (
    <div className="flex flex-col gap-5 px-5 py-5">
      {data?.content.map((product) => <SaleProductsCard product={product} />)}
    </div>
  );
}
