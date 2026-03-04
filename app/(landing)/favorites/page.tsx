"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store/useStore";
import Link from "next/link";
import { Heart, ArrowRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";

// Mock global products for the favorites page to look up by ID
// In a real app, this would come from a database or API
const ALL_PRODUCTS = [
  { id: "1", title: "Floral Birthday Card", price: 12.99, image: "https://images.unsplash.com/photo-1583847268964-b28e50b58257?auto=format&fit=crop&q=80&w=600&h=800", category: "Birthday", isBestseller: true },
  { id: "2", title: "Wedding Bells Invitation", price: 15.00, image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=600&h=800", category: "Wedding" },
  { id: "3", title: "Thank You Botanical", price: 8.50, image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=600&h=800", category: "Thank You" },
  { id: "4", title: "Modern Anniversary", price: 10.00, image: "https://images.unsplash.com/photo-1481024387227-2e2124508cfa?auto=format&fit=crop&q=80&w=600&h=800", category: "Anniversary" },
];

export default function FavoritesPage() {
  const { favorites } = useStore();
  
  const favoritedProducts = ALL_PRODUCTS.filter(p => favorites.includes(p.id));

  if (favoritedProducts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto"
        >
          <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-8">
            <Heart className="w-10 h-10 text-muted-foreground" />
          </div>
          <h1 className="font-heading text-4xl font-bold mb-4">No favorites yet</h1>
          <p className="text-muted-foreground mb-12">Save the items you love by tapping the heart icon.</p>
          <Link href="/categories" className="inline-flex items-center gap-2 bg-primary text-white font-bold px-8 py-4 rounded-full shadow-lg shadow-primary/20 hover:bg-primary/90 hover:-translate-y-0.5 transition-all">
            Browse Categories <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Your Favorites</h1>
          <p className="text-lg text-muted-foreground">All the cards and invitations you've loved.</p>
        </div>
        <div className="text-sm font-bold tracking-widest text-muted-foreground uppercase">
          {favoritedProducts.length} {favoritedProducts.length === 1 ? 'Item' : 'Items'}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <AnimatePresence>
          {favoritedProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
