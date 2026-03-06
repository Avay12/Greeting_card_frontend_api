import { create } from "zustand";
import api from "@/lib/api";

import { User, Order, Card } from "@/types/api";

interface AdminDataState {
  users: User[];
  orders: Order[];
  cards: Card[];
  isLoading: boolean;
  error: string | null;
  fetchUsers: () => Promise<void>;
  fetchOrders: () => Promise<void>;
  fetchCards: () => Promise<void>;
  updateUser: (id: number, payload: { name: string; role: string; credit: number; is_active: boolean }) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
}

export const useAdminDataStore = create<AdminDataState>((set) => ({
  users: [],
  orders: [],
  cards: [],
  isLoading: false,
  error: null,

  fetchUsers: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get("/admin/users");
      const data = response.data;
      set({
        users: data.users || (Array.isArray(data) ? data : []),
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.message || "Failed to fetch users",
        isLoading: false,
      });
    }
  },

  fetchOrders: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get("/admin/orders");
      const data = response.data;
      set({
        orders: data.orders || (Array.isArray(data) ? data : []),
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.message || "Failed to fetch orders",
        isLoading: false,
      });
    }
  },

  fetchCards: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get("/admin/cards");
      const data = response.data;
      set({
        cards: data.cards || (Array.isArray(data) ? data : []),
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.message || "Failed to fetch cards",
        isLoading: false,
      });
    }
  },

  updateUser: async (id, payload) => {
    const response = await api.put(`/admin/users/${id}`, payload);
    const updated: User = response.data.user;
    set((state) => ({
      users: state.users.map((u) => (u.id === id ? updated : u)),
    }));
  },

  deleteUser: async (id) => {
    await api.delete(`/admin/users/${id}`);
    set((state) => ({
      users: state.users.filter((u) => u.id !== id),
    }));
  },
}));
