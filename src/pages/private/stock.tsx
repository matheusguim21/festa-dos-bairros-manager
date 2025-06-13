import { productsService } from "@/api/productService";
import { StockFilters } from "@/components/filters/StockFilters";

import { useAuth } from "@/contexts/Auth.context";
import { useIsMobile } from "@/hooks/use-mobile";
import { zodResolver } from "@hookform/resolvers/zod";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Helmet } from "@dr.pogodin/react-helmet";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { StockProductsCard } from "@/components/cards/StockProductsCard";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { cn } from "@/lib/utils";
import { AddProductModal } from "@/components/modals/AddProductModal";

const SearchStockItemSchema = z.object({
  productName: z.string(),
});
type SearchStockItemForm = z.infer<typeof SearchStockItemSchema>;
export function Stock() {
  const { user } = useAuth();
  const { control, watch } = useForm<SearchStockItemForm>({
    resolver: zodResolver(SearchStockItemSchema),
    defaultValues: {
      productName: "",
    },
  });

  const isMobile = useIsMobile();

  const { data } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      user?.role === "ADMIN"
        ? productsService.getAllProducts()
        : productsService.getAllProductsFromStallById(user!.stall.id),
    enabled: true,
    placeholderData: keepPreviousData,
  });

  function normalizeString(str: string): string {
    return str
      .normalize("NFD") // separa letras de seus acentos
      .replace(/[\u0300-\u036f]/g, "") // remove todos os diacríticos
      .toLowerCase(); // passa pra minúsculo
  }

  // ...

  // Dentro do seu componente:
  const productNameFilter = watch("productName") || "";
  const debouncedName = useDebouncedValue<string>(productNameFilter, 300);

  const filteredProducts = data?.content.filter((product) => {
    // se o usuário digitou algo
    if (debouncedName) {
      const name = normalizeString(product.name);
      const query = normalizeString(debouncedName);
      return name.includes(query);
    }
    // sem filtro, inclui tudo
    return true;
  });

  return (
    <main className="flex h-screen flex-col gap-5 overflow-auto px-5 py-5 pb-24">
      <Helmet>
        <title>Estoque</title>
      </Helmet>
      {/* <section className="mx-auto flex flex-col items-center">
        <h1 className="text-3xl font-bold text-muted-foreground">Estoque</h1>
      </section> */}

      <section>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col justify-between gap-2 md:flex-row">
            <StockFilters control={control} />
            {!isMobile && <AddProductModal />}
          </div>
          {isMobile && <AddProductModal />}
        </div>
      </section>
      <section
        className={cn("flex flex-wrap gap-2", isMobile && "justify-center")}
      >
        {filteredProducts?.map((product) => (
          <StockProductsCard product={product} key={product.id} />
        ))}
      </section>
    </main>
  );
}
