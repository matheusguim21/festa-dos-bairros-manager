// src/components/preparation/OrderPreparationCard.tsx

import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

import { cn } from "@/lib/utils";
import { convertStatus, SocketOrder, statusColorMap } from "@/types/Sales";

interface Props {
  item: SocketOrder;
}

export function OrderPreparationCard({ item }: Props) {
  const colorClasses = statusColorMap[item.status];

  return (
    <div className={colorClasses}>
      <div className="grid grid-cols-[3fr_4fr_1fr] items-stretch rounded-md border-2 border-primary px-5 py-2 shadow-md">
        <div>
          <div className="flex flex-1 flex-col justify-center">
            <span className="text-sm">Pedido N°</span>
            <span className="max-w-14 text-lg font-bold">{item.id}</span>
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-sm">Cliente</span>
            <span className="font-bold">{item.buyerName}</span>
          </div>
        </div>
        {/* <div className="flex flex-col justify-between">
          <div className="flex h-12 flex-1 flex-col justify-between">
            <span>Pedido feito</span>
            <span className="text-sm font-bold">
              {formatDistanceToNow(item.date, {
                addSuffix: true,
                locale: ptBR,
              })}
            </span>
          </div>
          <div className="flex flex-1 flex-col justify-end">
            <span
              className={cn(
                colorClasses,
                "w-fit rounded-md px-2 py-1 text-xs font-medium",
              )}
            >
              {convertStatus(item.status)}
            </span>
          </div>
        </div> */}

        <div>
          <span className="font-bold">Pedido:</span>
          {item.items.map((item) => (
            <div key={item.product.id} className="flex justify-between py-1">
              <div className="flex gap-2">
                <span>{item.quantity}x</span>
                <span>{item.product.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
