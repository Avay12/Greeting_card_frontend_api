"use client";

import { useEffect } from "react";
import { useAdminDataStore } from "@/store/adminDataStore";
import { ShoppingBag, Loader2, CheckCircle2, Clock } from "lucide-react";

export default function AdminOrdersPage() {
  const { orders, fetchOrders, isLoading, error } = useAdminDataStore();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground font-heading">
            Orders
          </h1>
          <p className="mt-2 text-muted-foreground">
            View and manage all system orders and generated links.
          </p>
        </div>
        <div className="bg-primary/10 text-primary px-4 py-2 rounded-xl font-bold flex items-center gap-2">
          <ShoppingBag className="w-5 h-5" />
          {orders.length} Total Orders
        </div>
      </div>

      <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center p-12 text-muted-foreground gap-3">
            <Loader2 className="w-6 h-6 animate-spin" />
            <p>Loading orders...</p>
          </div>
        ) : error ? (
          <div className="p-12 text-center text-destructive bg-destructive/10">
            {error}
          </div>
        ) : orders.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground">
            No orders found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-muted text-muted-foreground font-medium border-b border-border">
                <tr>
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Total Amount</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Items</th>
                  <th className="px-6 py-4">Created Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-foreground">
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-muted/50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-foreground">
                      #{order.id.toString().padStart(5, "0")}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-foreground">
                        {order.user?.name || "Unknown User"}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {order.user?.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-foreground">
                      ${order.total_amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                          order.status === "paid" ||
                          order.status === "completed"
                            ? "bg-green-500/10 text-green-500"
                            : "bg-yellow-500/10 text-yellow-500"
                        }`}
                      >
                        {order.status === "paid" ||
                        order.status === "completed" ? (
                          <CheckCircle2 className="w-3 h-3" />
                        ) : (
                          <Clock className="w-3 h-3" />
                        )}
                        {order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {order.items?.length || 0} item(s)
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
