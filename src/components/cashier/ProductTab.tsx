// src/components/caixa/ProdutosTab.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SaleItem, useCaixaStore } from "@/store/useCashierStore";
import { productsService } from "@/api/productService";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { numberFormatterToCurrency } from "@/lib/utils";
import { TriangleAlert } from "lucide-react";
import { CashierForm } from "../forms/CashierForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CashierProductsForm,
  cashierProductsSchema,
} from "@/types/schemas/cashier-products-search";
import { useDebouncedValue } from "@/hooks/useDebouncedValue"; // importe o hook

export function ProdutosTab() {
  const addItem = useCaixaStore((state) => state.addItem);

  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: () => productsService.getAllProducts(),
    enabled: true,
    placeholderData: keepPreviousData,
  });

  const form = useForm<CashierProductsForm>({
    resolver: zodResolver(cashierProductsSchema),
    defaultValues: {
      productName: "",
      stallId: undefined,
    },
  });

  // valor “puro” (em tempo real) do campo de busca
  const productNameFilter = form.watch("productName") || "";
  const stallIdFilter = form.watch("stallId");

  // usa nosso hook para criar a versão “debounced” de productNameFilter
  const debouncedName = useDebouncedValue<string>(productNameFilter, 300);

  const filteredProducts = products?.content.filter((product) => {
    // se debouncedName for string vazia, matchesName = true => inclui tudo
    const matchesName = debouncedName
      ? product.name.toLowerCase().includes(debouncedName.toLowerCase())
      : true;

    // idem para stallIdFilter: se undefined/”“, matchesStall = true => inclui tudo
    const matchesStall = stallIdFilter
      ? product.stallId === stallIdFilter
      : true;

    return matchesName && matchesStall;
  });

  return (
    <div className="flex h-[calc(100vh-15%)] flex-col gap-3 pb-5">
      <CashierForm form={form} />
      <div className="flex h-screen flex-wrap gap-4 overflow-auto p-4">
        {filteredProducts?.map((product) => (
          <Card key={product.id} className="max-h-44">
            <CardContent className="flex max-h-44 min-h-40 w-72 max-w-80 flex-col justify-end gap-2">
              {product.quantity <= product.criticalStock && (
                <div className="flex items-center gap-2">
                  <TriangleAlert className="h-6 w-6 text-red-500" />

                  <span className="font-semibold text-red-500">
                    {product.quantity <= 0
                      ? "Venda encerrada"
                      : "Estoque baixo: "}
                  </span>
                  <span className="font-bold text-red-500">{`${product.quantity} unidades`}</span>
                </div>
              )}
              <h3 className="text-lg font-medium">{product.name}</h3>
              <p className="text-sm text-muted-foreground">
                {numberFormatterToCurrency.format(product.price)}
              </p>
              <Button
                className="w-full text-background"
                onClick={() => {
                  const item: SaleItem = {
                    id: `produto-${product.id}`,
                    nome: product.name,
                    preco: product.price,
                    quantidade: 1,
                    tipo: "produto",
                  };
                  addItem(item);
                }}
              >
                Adicionar
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
