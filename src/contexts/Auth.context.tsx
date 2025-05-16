import { create } from "zustand";
import { jwtDecode } from "jwt-decode";
import { User } from "@/types/User";
import { userService } from "@/api/user.service";
import { TokenPayload } from "@/types/AccessTokenPayload";

interface Tokens {
  access_token: string;
  refresh_token: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isReady: boolean;

  setInitialState: (payload: Partial<AuthState>) => void;
  signIn: (tokens: Tokens) => Promise<void>;
  signOut: () => void;
}

export const useAuth = create<AuthState>((set) => {
  // Recuperar dados salvos no localStorage
  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");
  const userJSON = localStorage.getItem("user");
  const user = userJSON ? (JSON.parse(userJSON) as User) : null;

  return {
    user,
    accessToken,
    refreshToken,
    isReady: true,

    setInitialState: (payload) =>
      set((state) => ({
        ...state,
        ...payload,
        isReady: true,
      })),

    signIn: async ({ access_token, refresh_token }) => {
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);

      const { user_id } = jwtDecode<TokenPayload>(access_token);
      const user = await userService.getUserById(user_id);

      localStorage.setItem("user", JSON.stringify(user));

      set({
        user,
        accessToken: access_token,
        refreshToken: refresh_token,
      });
    },

    signOut: () => {
      localStorage.clear();
      set({
        user: null,
        accessToken: null,
        refreshToken: null,
        isReady: true,
      });
    },
  };
});
