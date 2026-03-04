"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  User,
  Settings,
  CreditCard,
  Heart,
  LogOut,
  ChevronRight,
  Plus,
  Share2,
  Trash2,
  ExternalLink,
  Loader2,
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useStore } from "@/store/useStore";
import api from "@/lib/api";
import Image from "next/image";

export default function DashboardPage() {
  const { user, logout } = useAuthStore();
  const { favorites } = useStore();
  const [cards, setCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserCards = async () => {
      try {
        const response = await api.get("/cards");
        // Filter cards for the current user if the backend doesn't do it automatically
        // Though the cardHandler.ListCards seems to list ALL cards currently in the backend?
        // Let's check the backend handler again.
        setCards(response.data);
      } catch (err) {
        console.error("Failed to fetch cards:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchUserCards();
    }
  }, [user]);

  const handleDeleteCard = async (id: number) => {
    if (!confirm("Are you sure you want to delete this saved card?")) return;
    try {
      await api.delete(`/cards/${id}`);
      setCards(cards.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Failed to delete card:", err);
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h1 className="text-3xl font-bold mb-4">
          Please login to view your dashboard
        </h1>
        <Link href="/login" className="text-primary hover:underline font-bold">
          Login here
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Sidebar */}
        <aside className="w-full md:w-80 space-y-8">
          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-black/5">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary font-black text-2xl">
                {user.name.charAt(0)}
              </div>
              <div>
                <h2 className="font-bold text-xl">{user.name}</h2>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>

            <nav className="space-y-2">
              <Link
                href="/dashboard"
                className="flex items-center justify-between p-4 bg-primary/5 text-primary rounded-2xl font-bold transition-all"
              >
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5" /> My History
                </div>
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                href="/favorites"
                className="flex items-center justify-between p-4 hover:bg-muted text-foreground/70 hover:text-foreground rounded-2xl font-bold transition-all"
              >
                <div className="flex items-center gap-3">
                  <Heart className="w-5 h-5" /> Favorites
                </div>
                <ChevronRight className="w-4 h-4" />
              </Link>
              <button
                onClick={() => logout()}
                className="w-full flex items-center justify-between p-4 hover:bg-red-50 text-red-500 rounded-2xl font-bold transition-all"
              >
                <div className="flex items-center gap-3">
                  <LogOut className="w-5 h-5" /> Logout
                </div>
              </button>
            </nav>
          </div>

          <div className="bg-gradient-to-br from-primary to-primary-600 rounded-[2rem] p-8 text-white shadow-xl shadow-primary/20">
            <h3 className="font-bold text-xl mb-2">Spread the Joy</h3>
            <p className="text-white/80 text-sm mb-6 leading-relaxed">
              Create and share beautiful cards for every occasion.
            </p>
            <Link
              href="/occasions"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary rounded-xl font-bold text-sm hover:shadow-lg transition-all"
            >
              <Plus className="w-4 h-4" /> Create New Card
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 space-y-12">
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2">
                My Saved Cards
              </h1>
              <p className="text-muted-foreground font-medium">
                Manage and share your customized designs.
              </p>
            </div>
          </div>

          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center">
              <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
              <p className="text-muted-foreground font-bold">
                Fetching your collection...
              </p>
            </div>
          ) : cards.length > 0 ? (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {cards.map((card) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-3xl p-6 shadow-sm border border-black/5 flex gap-6 hover:shadow-md transition-all group"
                >
                  <div className="w-32 h-40 bg-muted rounded-2xl relative overflow-hidden flex-shrink-0">
                    {card.image_url ? (
                      <Image
                        src={card.image_url}
                        alt={card.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        <Share2 className="w-8 h-8 opacity-20" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">
                        {card.occasion}
                      </div>
                      <h3 className="font-bold text-xl group-hover:text-primary transition-colors">
                        {card.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        Saved on{" "}
                        {new Date(card.created_at).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 pt-4">
                      <Link
                        href={`/preview/${card.id}`}
                        className="p-2.5 bg-primary/5 hover:bg-primary/10 text-primary rounded-full transition-all"
                        title="View Preview"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </Link>
                      <button
                        onClick={() => {
                          const url = `${window.location.protocol}//${window.location.host}/preview/${card.id}`;
                          navigator.clipboard.writeText(url);
                          alert("Link copied to clipboard!");
                        }}
                        className="p-2.5 bg-muted hover:bg-muted-foreground/10 text-muted-foreground hover:text-foreground rounded-full transition-all"
                        title="Copy Link"
                      >
                        <Share2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteCard(card.id)}
                        className="p-2.5 bg-red-50 hover:bg-red-100 text-red-500 rounded-full transition-all ml-auto"
                        title="Delete Saved Card"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="py-24 text-center bg-muted/30 rounded-[3rem] border-2 border-dashed border-muted">
              <h3 className="text-2xl font-bold mb-2">No saved cards yet</h3>
              <p className="text-muted-foreground mb-8">
                Start personalizing your favorite designs to see them here.
              </p>
              <Link
                href="/occasions"
                className="bg-primary text-white font-bold px-8 py-4 rounded-full shadow-lg hover:-translate-y-1 transition-all inline-block"
              >
                Start Creating
              </Link>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
