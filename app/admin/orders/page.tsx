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
          <h1 className="text-3xl font-bold text-gray-900 font-heading">Orders</h1>
          <p className="mt-2 text-gray-600">View and manage all system orders and generated links.</p>
        </div>
        <div className="bg-primary/10 text-primary px-4 py-2 rounded-xl font-bold flex items-center gap-2">
          <ShoppingBag className="w-5 h-5" />
          {orders.length} Total Orders
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center p-12 text-gray-400 gap-3">
             <Loader2 className="w-6 h-6 animate-spin" />
             <p>Loading orders...</p>
          </div>
        ) : error ? (
           <div className="p-12 text-center text-red-500 bg-red-50">
             {error}
           </div>
        ) : orders.length === 0 ? (
           <div className="p-12 text-center text-gray-500">
             No orders found.
           </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Total Amount</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Items</th>
                  <th className="px-6 py-4">Created Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">
                      #{order.id.toString().padStart(5, '0')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{order.User?.name || 'Unknown User'}</div>
                      <div className="text-xs text-gray-500">{order.User?.email}</div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900">
                       ${order.TotalAmount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                       <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                         order.Status === 'paid' || order.Status === 'completed' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                       }`}>
                          {order.Status === 'paid' || order.Status === 'completed' ? <CheckCircle2 className="w-3 h-3"/> : <Clock className="w-3 h-3" />}
                          {order.Status.charAt(0).toUpperCase() + order.Status.slice(1)}
                       </span>
                    </td>
                    <td className="px-6 py-4">
                       {order.Items?.length || 0} item(s)
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                       {new Date(order.CreatedAt).toLocaleDateString()}
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
