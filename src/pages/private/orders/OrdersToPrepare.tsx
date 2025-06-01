// src/pages/preparar-pedidos.tsx
import { SocketOrder } from "@/types/Sales";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { OrderPreparationCard } from "@/components/order/OrderPraprationsCard";

export default function OrdersToPrepare() {
  const [orders, setOrders] = useState<SocketOrder[]>([]);
  useEffect(() => {
    const url = `${import.meta.env.VITE_API_URL}/order/preparing`;
    console.log("📡 Conectando ao WebSocket:", url);

    const socket = io(url, {
      transports: ["websocket"],
    });

    socket.on("connect", () => console.log("✅ conectado ao socket"));
    socket.on("orders:pending", (data: SocketOrder[]) => {
      console.log("📦 Dados recebidos do socket:", data);
      setOrders(data);
    });

    return () => {
      socket.disconnect(); // mais seguro que apenas .off
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
