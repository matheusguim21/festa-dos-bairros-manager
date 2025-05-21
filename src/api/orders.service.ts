import { CreateOrderPayload } from "@/types/Orders";
import { api } from "./api";

export const ordersService = {
  async createOrder(data: CreateOrderPayload) {
    try {
      const response = await api.post("/orders", data);
      console.log("Response: ", response);
      return response;
    } catch (error: any) {
      console.error("Erro OrderService: ", error);
      throw error;
    }
  },
};
