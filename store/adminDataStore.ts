import { create } from "zustand";
import api from "@/lib/api";

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: string;
  CreatedAt: string;
}

export interface AdminOrder {
  id: number;
  UserId: number;
  User: AdminUser;
  TotalAmount: number;
  Status: string;
  Items: any[];
  CreatedAt: string;
}

// Matches the backend models.Card JSON output (snake_case JSON tags)
export interface AdminCard {
  id: number;
  template_id: string;
  title: string;
  description: string;
  image_url: string;
  occasion: string;
  price: number;
  custom_data: string; // JSON string of personalisation fields
  user_id: number;
  User?: {
    id: number;
    name: string;
    email: string;
  };
  created_at: string;
  updated_at: string;
}

interface AdminDataState {
  users: AdminUser[];
  orders: AdminOrder[];
  cards: AdminCard[];
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
