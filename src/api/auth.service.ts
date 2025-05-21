import { api } from "./api";

export type AuthFormData = {
  username: string;
  password: string;
};

export type AuthResponse = {
  access_token: string;
  refresh_token: string;
};
export const AuthService = {
  async login(data: AuthFormData): Promise<AuthResponse> {
    console.log("URL da API: ", import.meta.env.VITE_API_URL);
    try {
      const response = await api.post("/auth/login", data);
      console.log("response Auth Sercice: ", response.data);
      return response.data;
    } catch (error: any) {
      console.error("erro no Auth Service: ", error);
      throw error;
    }
  },
};
