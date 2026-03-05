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

  // Admin endpoint returns ALL users' cards
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
}));
