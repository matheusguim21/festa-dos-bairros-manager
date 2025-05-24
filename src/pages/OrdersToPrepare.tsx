// src/pages/preparar-pedidos.tsx
import { SocketOrder } from "@/types/Sales";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { OrderPreparationCard } from "@/components/order/OrderPraprationsCard";

const socket = io(`${import.meta.env.VITE_API_URL}/order/preparing`); // ou seu endpoint

export default function OrdersToPrepare() {
  const [orders, setOrders] = useState<SocketOrder[]>([]);

  useEffect(() => {
    socket.on("connect", () => console.log("✅ conectado"));
    socket.on("orders:pending", (data: SocketOrder[]) => {
      console.log(data);
      setOrders(data); // substitui em vez de acumular
    });

    return () => {
      socket.off("orders-pending");
    };
  }, []);

  return (
    <main className="p-6">
      <h1 className="mb-4 text-2xl font-bold text-primary">
        Pedidos para preparo
      </h1>
      <div className="flex flex-col gap-4">
        {orders.map((order) => (
          <OrderPreparationCard key={order.id} item={order} />
        ))}
      </div>
    </main>
  );
}
