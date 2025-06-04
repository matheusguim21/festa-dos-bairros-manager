// types/sale.ts
export type OrderItem = {
  productId: number;
  quantity: number;
};

export type CreateOrderPayload = {
  stallId: number;
  buyerName?: string;
  items: OrderItem[];
};
