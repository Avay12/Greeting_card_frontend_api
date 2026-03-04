"use client";

import { useEffect, useState } from "react";
import { useAdminDataStore, AdminCard } from "@/store/adminDataStore";
import { PlusSquare, Loader2, Edit, Trash2, X } from "lucide-react";
import api from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminCardsPage() {
  const { cards, fetchCards, isLoading, error } = useAdminDataStore();
  const [editingCard, setEditingCard] = useState<AdminCard | null>(null);
  const [editFormData, setEditFormData] = useState({
    title: "",
    category: "",
    price: 0,
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState("");

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  const handleEditClick = (card: AdminCard) => {
    setEditingCard(card);
    setEditFormData({
      title: card.Title || "",
      category: card.Category || "",
      price: card.Price || 0,
    });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCard) return;

    setIsUpdating(true);
    setUpdateError("");

    try {
      await api.put(`/cards/${editingCard.id}`, editFormData);
      await fetchCards(); // Refresh list
      setEditingCard(null); // Close modal
    } catch (err: any) {
      setUpdateError(err.response?.data?.error || "Failed to update card");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 relative">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-heading">
            Manage Cards
          </h1>
          <p className="mt-2 text-gray-600">
            View and edit available greeting card templates.
          </p>
        </div>
        <div className="bg-primary/10 text-primary px-4 py-2 rounded-xl font-bold flex items-center gap-2">
          <PlusSquare className="w-5 h-5" />
          {cards?.length || 0} Total Cards
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center p-12 text-gray-400 gap-3">
            <Loader2 className="w-6 h-6 animate-spin" />
            <p>Loading cards...</p>
          </div>
        ) : error ? (
          <div className="p-12 text-center text-red-500 bg-red-50">{error}</div>
        ) : cards?.length === 0 ? (
          <div className="p-12 text-center text-gray-500">No cards found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Created Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {cards?.map((card) => (
                  <tr
                    key={card.id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-3">
                      {card.ImageURL && (
                        <div className="w-10 h-10 rounded-lg bg-gray-100 border border-gray-200 overflow-hidden">
                          <img
                            src={card.ImageURL}
                            alt={card.Title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      {card.Title}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                        {card.Category || "N/A"}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      ${Number(card.Price || 0).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(card.CreatedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleEditClick(card)}
                        className="p-2 text-gray-400 hover:text-primary transition-colors hover:bg-primary/5 rounded-lg"
                        title="Edit Card"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {editingCard && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setEditingCard(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-md relative z-10 p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 font-heading">
                  Edit Card
                </h2>
                <button
                  onClick={() => setEditingCard(null)}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleUpdate} className="space-y-4">
                {updateError && (
                  <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm">
                    {updateError}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1 ml-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={editFormData.title}
                    onChange={(e) =>
                      setEditFormData((p) => ({ ...p, title: e.target.value }))
                    }
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1 ml-1">
                    Category
                  </label>
                  <input
                    type="text"
                    value={editFormData.category}
                    onChange={(e) =>
                      setEditFormData((p) => ({
                        ...p,
                        category: e.target.value,
                      }))
                    }
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1 ml-1">
                    Price
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={editFormData.price}
                    onChange={(e) =>
                      setEditFormData((p) => ({
                        ...p,
                        price: parseFloat(e.target.value) || 0,
                      }))
                    }
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 outline-none"
                    required
                  />
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingCard(null)}
                    className="px-4 py-2 font-medium text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isUpdating}
                    className="px-6 py-2 bg-primary text-white font-medium rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center"
                  >
                    {isUpdating && (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    )}
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
