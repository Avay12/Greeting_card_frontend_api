"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowRight } from "lucide-react";
import { useStore } from "@/store/useStore";
import Link from "next/link";
import Image from "next/image";

// Placeholder data for search suggestions
const SUGGESTIONS = [
  { id: "1", name: "Floral Birthday Card", price: 12.99, image: "https://images.unsplash.com/photo-1583847268964-b28e50b58257?auto=format&fit=crop&q=80&w=200&h=200", category: "Birthday" },
  { id: "2", name: "Wedding Bells Invitation", price: 15.00, image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=200&h=200", category: "Wedding" },
  { id: "3", name: "Thank You Botanical", price: 8.50, image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=200&h=200", category: "Thank You" },
];

export default function SearchModal() {
  const { isSearchOpen, setSearchOpen } = useStore();
  const [query, setQuery] = useState("");

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [setSearchOpen]);

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-md"
        >
          <div className="container mx-auto px-4 pt-20 flex flex-col items-center">
            <button
              onClick={() => setSearchOpen(false)}
              className="absolute top-8 right-8 p-3 hover:bg-muted rounded-full transition-colors"
            >
              <X className="w-8 h-8" />
            </button>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="w-full max-w-3xl"
            >
              <div className="relative mb-12">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-8 h-8 text-muted-foreground" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search for cards, occasions..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-muted border-none rounded-[2rem] py-8 pl-20 pr-10 text-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-xl"
                />
              </div>

              {/* Suggestions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">Popular Searches</h3>
                  <div className="flex flex-wrap gap-3">
                    {["Birthday", "Wedding", "Love", "Christmas", "Thank You"].map((tag) => (
                      <Link
                        key={tag}
                        href={`/categories/${tag.toLowerCase()}`}
                        onClick={() => setSearchOpen(false)}
                        className="px-6 py-3 bg-muted hover:bg-primary hover:text-white rounded-full text-sm font-medium transition-all"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">Suggestions</h3>
                  <div className="space-y-4">
                    {SUGGESTIONS.map((item) => (
                      <Link
                        key={item.id}
                        href={`/product/${item.id}`}
                        onClick={() => setSearchOpen(false)}
                        className="flex items-center gap-4 p-3 rounded-2xl hover:bg-muted transition-colors group"
                      >
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden aspect-square">
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">${item.price}</p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
