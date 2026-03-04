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
  Items: any[]; // Expand as needed
  CreatedAt: string;
}

export interface AdminCard {
  id: number;
  Title: string;
  Category: string; // Add back if removed from model or use Occasion
  ImageURL: string;
  Price: number;
  CreatedAt: string;
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
      set({ users: data.users || (Array.isArray(data) ? data : []), isLoading: false });
    } catch (error: any) {
      set({ error: error.message || "Failed to fetch users", isLoading: false });
    }
  },

  fetchOrders: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get("/admin/orders");
      const data = response.data;
      set({ orders: data.orders || (Array.isArray(data) ? data : []), isLoading: false });
    } catch (error: any) {
      set({ error: error.message || "Failed to fetch orders", isLoading: false });
    }
  },

  fetchCards: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get("/cards"); // existing public route
      const data = response.data;
      set({ cards: data.cards || (Array.isArray(data) ? data : []), isLoading: false });
    } catch (error: any) {
      set({ error: error.message || "Failed to fetch cards", isLoading: false });
    }
  }
}));
