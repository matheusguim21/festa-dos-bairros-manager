import type { OrderItem } from "@/store/SaleStore";
import { numberFormatterToCurrency } from "@/lib/utils";

interface Props {
  items: OrderItem[];
  total: number;
}

export function OrderItemsList({ items, total }: Props) {
  return (
    <div className="rounded-md border bg-card">
      {/* Header */}
      <div className="grid grid-cols-[auto_1fr_auto] gap-4 bg-muted/50 px-4 py-3 text-sm font-medium text-muted-foreground">
        <div>Qtd</div>
        <div>Item</div>
        <div className="text-right">Preço</div>
      </div>

      {/* Items */}
      <div className="divide-y">
        {items.map((item) => (
          <div
            key={item.product.id}
            className="grid grid-cols-[auto_1fr_auto] gap-4 px-4 py-3"
          >
            <div className="flex h-6 min-w-[2rem] items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
              {item.quantity}
            </div>
            <div className="flex items-center">
              <span className="line-clamp-1">{item.product.name}</span>
            </div>
            <div className="flex items-center justify-end text-right font-medium tabular-nums">
              {numberFormatterToCurrency.format(
                item.product.price * item.quantity,
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="space-y-2 bg-muted/30 px-4 py-3">
        {/* Subtotal */}
        {/* <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-medium tabular-nums">
            {numberFormatterToCurrency.format(total)}
          </span>
        </div> */}

        {/* Separator */}
        {/* <Separator /> */}

        {/* Total */}
        <div className="flex justify-between pt-1">
          <span className="font-medium">Total</span>
          <span className="text-lg font-bold tabular-nums text-primary">
            {numberFormatterToCurrency.format(total)}
          </span>
        </div>
      </div>
    </div>
  );
}
