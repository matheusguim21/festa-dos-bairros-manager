import { api } from "./api";

export const stallService = {
  async getStallByUserId(userId: number) {
    try {
      const response = await api.get(`stalls/user/${userId}`);

      console.log("Response GetStallByUserID: ", response.data);
      return response.data;
    } catch (error: any) {
      console.error(error);
      // throw error;
    }
  },
};
