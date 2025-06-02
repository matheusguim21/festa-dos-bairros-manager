// src/components/caixa/SaleSummary.tsx
import { Button } from "@/components/ui/button";
import { numberFormatterToCurrency } from "@/lib/utils";
import { useCaixaStore } from "@/store/useCashierStore";
import { Minus } from "lucide-react";

export function CashierSummary() {
  const items = useCaixaStore((state) => state.items);
  const total = useCaixaStore((state) => state.total);
  const removeOne = useCaixaStore((state) => state.removeOne);
  const clearSale = useCaixaStore((state) => state.clearSale);

  return (
    <div className="flex flex-col">
      <h2 className="mb-4 text-xl font-semibold">Resumo da Venda</h2>

      <div className="flex-1 space-y-2 overflow-y-auto">
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Nenhum item adicionado
          </p>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b pb-2"
            >
              <div>
                <p className="font-medium">{item.nome}</p>
                <p className="text-sm text-muted-foreground">
                  {item.quantidade} × R$ {item.preco.toFixed(2)} = R${" "}
                  {(item.preco * item.quantidade).toFixed(2)}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeOne(item.id)}
              >
                <Minus className="h-5 w-5 text-red-600" />
              </Button>
            </div>
          ))
        )}
      </div>

      <div className="mt-4 border-t pt-4">
        <p className="mb-4 text-lg font-bold">
          Total:{`  ${numberFormatterToCurrency.format(total)}`}
        </p>
        <Button
          className="w-full"
          onClick={() => {
            // por exemplo, aqui você chamaria o POST /venda e, em caso de sucesso:
            clearSale();
          }}
        >
          Finalizar Venda
        </Button>
      </div>
    </div>
  );
}
