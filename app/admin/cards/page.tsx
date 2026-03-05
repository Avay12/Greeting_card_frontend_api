"use client";

import { useEffect, useState } from "react";
import { useAdminDataStore } from "@/store/adminDataStore";
import { Card } from "@/types/api";
import {
  LayoutTemplate,
  Loader2,
  Trash2,
  X,
  Eye,
  User,
  CalendarDays,
  Tag,
  DollarSign,
  FileText,
} from "lucide-react";
import api from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";

// Colour mapping for occasion badges
const OCCASION_COLORS: Record<string, string> = {
  anniversary: "bg-pink-500/10 text-pink-600 dark:text-pink-400",
  valentine: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
  wedding: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  birthday: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  "thank-you": "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  congratulations: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  seasonal: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  "baby-shower": "bg-teal-500/10 text-teal-600 dark:text-teal-400",
  graduation: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
  sympathy: "bg-stone-500/10 text-stone-600 dark:text-stone-400",
  christmas: "bg-red-500/10 text-red-600 dark:text-red-400",
  "new-year": "bg-orange-500/10 text-orange-600 dark:text-orange-400",
};

function OccasionBadge({ occasion }: { occasion: string }) {
  const colorClass =
    OCCASION_COLORS[occasion?.toLowerCase()] ??
    "bg-muted text-muted-foreground";
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${colorClass}`}
    >
      <Tag className="w-3 h-3" />
      {occasion || "N/A"}
    </span>
  );
}

function parseCustomData(raw: string): Record<string, string> {
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export default function AdminCardsPage() {
  const { cards, fetchCards, isLoading, error } = useAdminDataStore();
  const [viewingCard, setViewingCard] = useState<Card | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [deleteError, setDeleteError] = useState("");

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  const handleDelete = async (card: Card) => {
    if (!confirm(`Delete card "${card.title}"? This cannot be undone.`)) return;
    setDeletingId(card.id);
    setDeleteError("");
    try {
      await api.delete(`/cards/${card.id}`);
      await fetchCards();
      if (viewingCard?.id === card.id) setViewingCard(null);
    } catch (err: any) {
      setDeleteError(err.response?.data?.error || "Failed to delete card");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 relative">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground font-heading">
            Manage Cards
          </h1>
          <p className="mt-2 text-muted-foreground">
            All user-generated greeting cards across the platform.
          </p>
        </div>
        <div className="bg-primary/10 text-primary px-4 py-2 rounded-xl font-bold flex items-center gap-2">
          <LayoutTemplate className="w-5 h-5" />
          {cards?.length ?? 0} Total Cards
        </div>
      </div>

      {deleteError && (
        <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-xl text-sm">
          {deleteError}
        </div>
      )}

      {/* Table */}
      <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center p-12 text-muted-foreground gap-3">
            <Loader2 className="w-6 h-6 animate-spin" />
            <p>Loading cards…</p>
          </div>
        ) : error ? (
          <div className="p-12 text-center text-red-500 bg-red-500/10">
            {error}
          </div>
        ) : !cards?.length ? (
          <div className="p-12 text-center text-muted-foreground">
            No cards found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-muted text-muted-foreground font-medium border-b border-border">
                <tr>
                  <th className="px-6 py-4">Card / Template</th>
                  <th className="px-6 py-4">Occasion</th>
                  <th className="px-6 py-4">Owner</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Created</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-foreground">
                {cards.map((card) => (
                  <tr
                    key={card.id}
                    className="hover:bg-muted/50 transition-colors"
                  >
                    {/* Card / Template */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {card.image_url ? (
                          <div className="w-10 h-10 rounded-lg bg-muted border border-border overflow-hidden flex-shrink-0">
                            <img
                              src={card.image_url}
                              alt={card.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                            <LayoutTemplate className="w-5 h-5 text-primary/60" />
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-foreground truncate max-w-[180px]">
                            {card.title || "Untitled"}
                          </p>
                          <p className="text-xs text-muted-foreground font-mono">
                            {card.template_id || "—"}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Occasion */}
                    <td className="px-6 py-4">
                      <OccasionBadge occasion={card.occasion} />
                    </td>

                    {/* Owner */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center">
                          <User className="w-3.5 h-3.5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground text-xs truncate max-w-[120px]">
                            {card.user?.name || `User #${card.user_id}`}
                          </p>
                          <p className="text-muted-foreground text-xs truncate max-w-[120px]">
                            {card.user?.email || ""}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="px-6 py-4 font-semibold text-foreground">
                      ${Number(card.price ?? 0).toFixed(2)}
                    </td>

                    {/* Created */}
                    <td className="px-6 py-4 text-muted-foreground text-xs">
                      {new Date(card.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setViewingCard(card)}
                          className="p-2 text-muted-foreground hover:text-primary transition-colors hover:bg-primary/5 rounded-lg"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(card)}
                          disabled={deletingId === card.id}
                          className="p-2 text-muted-foreground hover:text-destructive transition-colors hover:bg-destructive/10 rounded-lg disabled:opacity-40"
                          title="Delete Card"
                        >
                          {deletingId === card.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {viewingCard && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setViewingCard(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-card rounded-2xl shadow-xl w-full max-w-lg relative z-10 overflow-hidden border border-border"
            >
              {/* Modal header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                <div className="flex items-center gap-2">
                  <LayoutTemplate className="w-5 h-5 text-primary" />
                  <h2 className="text-lg font-bold text-foreground font-heading">
                    Card Details
                  </h2>
                </div>
                <button
                  onClick={() => setViewingCard(null)}
                  className="text-muted-foreground hover:text-foreground p-1 rounded-lg hover:bg-muted transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Preview image */}
              {viewingCard.image_url && (
                <div className="h-40 bg-muted overflow-hidden border-b border-border">
                  <img
                    src={viewingCard.image_url}
                    alt={viewingCard.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="p-6 space-y-5">
                {/* Title + template */}
                <div>
                  <p className="text-xl font-bold text-foreground">
                    {viewingCard.title || "Untitled Card"}
                  </p>
                  {viewingCard.description && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {viewingCard.description}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {/* Template ID */}
                  <div className="bg-muted rounded-xl p-3 border border-border/50">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                      <FileText className="w-3.5 h-3.5" />
                      Template ID
                    </div>
                    <p className="font-mono text-sm font-medium text-foreground">
                      {viewingCard.template_id || "—"}
                    </p>
                  </div>

                  {/* Occasion */}
                  <div className="bg-muted rounded-xl p-3 border border-border/50">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                      <Tag className="w-3.5 h-3.5" />
                      Occasion
                    </div>
                    <OccasionBadge occasion={viewingCard.occasion} />
                  </div>

                  {/* Price */}
                  <div className="bg-muted rounded-xl p-3 border border-border/50">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                      <DollarSign className="w-3.5 h-3.5" />
                      Price
                    </div>
                    <p className="text-sm font-semibold text-foreground">
                      ${Number(viewingCard.price ?? 0).toFixed(2)}
                    </p>
                  </div>

                  {/* Created */}
                  <div className="bg-muted rounded-xl p-3 border border-border/50">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                      <CalendarDays className="w-3.5 h-3.5" />
                      Created
                    </div>
                    <p className="text-sm text-foreground">
                      {new Date(viewingCard.created_at).toLocaleDateString(
                        "en-US",
                        { year: "numeric", month: "short", day: "numeric" },
                      )}
                    </p>
                  </div>
                </div>
                {/* Owner */}
                <div className="flex items-center gap-3 bg-muted rounded-xl p-3 border border-border/50">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {viewingCard.user?.name || `User #${viewingCard.user_id}`}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {viewingCard.user?.email || ""}
                    </p>
                  </div>
                </div>
                {viewingCard.custom_data !== "{}" && (
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                      Personalisation Fields
                    </p>
                    <div className="bg-muted rounded-xl p-3 space-y-2 border border-border/50">
                      {Object.entries(
                        parseCustomData(viewingCard.custom_data),
                      ).map(([key, val]) => (
                        <div
                          key={key}
                          className="flex items-start gap-2 text-sm"
                        >
                          <span className="text-muted-foreground capitalize font-medium min-w-[80px]">
                            {key}
                          </span>
                          <span className="text-foreground break-words">
                            {String(val)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {/* Footer actions */}
                <div className="flex justify-between items-center pt-2 border-t border-border mt-2">
                  <button
                    onClick={() => handleDelete(viewingCard)}
                    disabled={deletingId === viewingCard.id}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 font-medium rounded-xl transition-colors disabled:opacity-40 text-sm"
                  >
                    {deletingId === viewingCard.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                    Delete Card
                  </button>
                  <button
                    onClick={() => setViewingCard(null)}
                    className="px-4 py-2 text-muted-foreground hover:bg-muted font-medium rounded-xl transition-colors text-sm"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
