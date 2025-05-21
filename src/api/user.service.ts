import { api } from "./api";

export const userService = {
  async getUserById(userId: number) {
    try {
      const response = await api.get(`/users/${userId}`);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },
};
