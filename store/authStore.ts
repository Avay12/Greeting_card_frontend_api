import { create } from "zustand";
import api from "@/lib/api";

interface User {
  id: number;
  name: string;
  email: string;
  role: string | null;
  provider: string | null;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  checkAuth: () => Promise<void>;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  error: null,
  setUser: (user) => set({ user }),
  checkAuth: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await api.get("/users/me");
      set({ user: response.data.user, isLoading: false });
    } catch (error: any) {
      set({ user: null, isLoading: false });
    }
  },
  logout: async () => {
    try {
      await api.post("/auth/logout");
      set({ user: null });
    } catch (error) {
      console.error("Logout failed", error);
    }
  },
}));
