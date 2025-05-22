import { Separator } from "@/components/ui/separator";
import { OrderItem } from "@/store/SaleStore";

interface Props {
  items: OrderItem[];
  numberFormatter: Intl.NumberFormat;
  total: number;
}

export function OrderItemsList({ items, numberFormatter, total }: Props) {
  return (
    <div className="space-y-2 px-4">
      {items.map((item) => (
        <>
          <div key={item.product.id} className="flex justify-between py-2">
            <div className="flex gap-2">
              <span>{item.quantity}x</span>
              <span>{item.product.name}</span>
            </div>
            <div className="flex min-w-[80px] justify-end gap-1">
              <span className="text-right">R$</span>
              <span className="font-regular text-serif w-[50px] tabular-nums">
                {numberFormatter
                  .format(item.product.price)
                  .replace("R$", "")
                  .trim()}
              </span>
            </div>
          </div>
          <Separator />
        </>
      ))}
      <div className="mt-3 flex justify-between">
        <span className="font-bold">Total: {""} </span>
        <span className="text-xl font-bold text-primary">
          {numberFormatter.format(total)}
        </span>
      </div>
    </div>
  );
}
