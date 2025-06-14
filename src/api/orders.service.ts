import { CreateOrderPayload } from "@/types/Orders";
import { api } from "./api";
import { Sale, SaleStatusApi } from "@/types/Sales";
import { Product } from "@/types/Product";
import { Stall } from "@/types/Stall";

interface GetAllOrdersResponse {
  content: Sale[] | [];
  totalElements: number;
  page: number;
  limit: number;
  totalPages: number;
}
type GetAllOrderItemsByOrderIdResponse = {
  product: Product;
  quantity: number;
  stall: Stall;
};
interface GetAllOrdersRequest {
  search?: string;
  page?: string;
  limit?: string;
  stallId?: number;
}

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

  async getAllOrders({
    limit,
    page,
    search,
    stallId,
  }: GetAllOrdersRequest = {}): Promise<GetAllOrdersResponse> {
    try {
      const response = await api.get("/orders", {
        params: {
          limit,
          page,
          search,
          stallId,
        },
      });
      console.log("response getAllorders: ", response);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  async getAllOrdersByStall(
    stallId: number,
    { limit, page, search }: GetAllOrdersRequest = {},
  ): Promise<GetAllOrdersResponse> {
    try {
      const response = await api.get(`/orders/${stallId}/`, {
        params: {
          limit,
          page,
          search,
        },
      });
      console.log("response getAllorders: ", response);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  async getOrderItemsByOrderId(
    orderId: number,
  ): Promise<GetAllOrderItemsByOrderIdResponse[]> {
    try {
      const response = await api.get(`/orders/items/${orderId}`);
      // console.log("resposta do getOrderItems: ", response.data)
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },
  async updateOrderStatus(orderId: number, newStatus: SaleStatusApi) {
    try {
      const response = await api.patch(`/orders/${orderId}/status`, {
        status: newStatus,
      });
      console.log("Response Update Status: ", response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
