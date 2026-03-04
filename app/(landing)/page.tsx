"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import ProductCard, { Product } from "@/components/ProductCard";

// Mock data for featured products
const ALL_PRODUCTS: Product[] = [
  {
    id: "1",
    title: "Happy Birthday Blossom",
    price: 4.99,
    image:
      "https://images.unsplash.com/photo-1583847268964-b28e50b58257?auto=format&fit=crop&q=80&w=800&h=1000",
    category: "Birthday",
    isBestseller: true,
  },
  {
    id: "2",
    title: "Minimalist Thank You",
    price: 3.5,
    image:
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800&h=1000",
    category: "Thank You",
    isBestseller: true,
  },
  {
    id: "3",
    title: "Art Deco Congratulations",
    price: 5.99,
    image:
      "https://images.unsplash.com/photo-1516244671391-62ecafdcabf7?auto=format&fit=crop&q=80&w=800&h=1000",
    category: "Congratulations",
  },
  {
    id: "4",
    title: "With Love Roses",
    price: 6.5,
    image:
      "https://images.unsplash.com/photo-1481024387227-2e2124508cfa?auto=format&fit=crop&q=80&w=800&h=1000",
    category: "Valentine",
  },
  {
    id: "5",
    title: "Winter Pines Seasonal",
    price: 4.99,
    image:
      "https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&q=80&w=800&h=1000",
    category: "Seasonal",
  },
  {
    id: "6",
    title: "Sunset Thinking of You",
    price: 3.99,
    image:
      "https://images.unsplash.com/photo-1478147427282-58a871190bc3?auto=format&fit=crop&q=80&w=800&h=1000",
    category: "Thank You",
  },
  {
    id: "7",
    title: "Gold Foil Wedding",
    price: 6.99,
    image:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800&h=1000",
    category: "Wedding",
    isBestseller: true,
    isInvitation: true,
  },
  {
    id: "8",
    title: "Party Time Birthday",
    price: 4.5,
    image:
      "https://images.unsplash.com/photo-1530103862676-de889fa09fce?auto=format&fit=crop&q=80&w=800&h=1000",
    category: "Birthday",
  },
  {
    id: "9",
    title: "Valentine's Rose Heart",
    price: 5.99,
    image:
      "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=800&h=1000",
    category: "Valentine",
    isBestseller: true,
  },
  {
    id: "10",
    title: "Forever Yours Invitation",
    price: 12.0,
    image:
      "https://images.unsplash.com/photo-1516589174184-c685265e48d6?auto=format&fit=crop&q=80&w=800&h=1000",
    category: "Valentine",
    isNew: true,
    isInvitation: true,
  },
];

const CATEGORY_TABS = [
  "All",
  "Valentine",
  "Birthday",
  "Wedding",
  "Thank You",
  "Congratulations",
  "Seasonal",
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredProducts =
    activeTab === "All"
      ? ALL_PRODUCTS
      : ALL_PRODUCTS.filter((p) => p.category === activeTab);

  return (
    <div className="flex flex-col gap-24 mb-24">
      {/* 1. Hero Section */}
      <section className="relative px-4 container mx-auto">
        <div className="glass-card mt-8 md:mt-12 overflow-hidden relative min-h-[60vh] md:min-h-[70vh] flex items-center">
          {/* Abstract background blobs */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />

          <div className="grid md:grid-cols-2 gap-8 items-center z-10 p-8 md:p-16 w-full">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Star className="w-4 h-4 fill-primary" /> 10,000+ Happy
                Customers
              </div>
              <h1 className="font-heading text-5xl md:text-7xl font-bold leading-tight mb-6">
                Say It With <br />
                <span className="text-gradient">Feeling.</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Handcrafted greeting cards for every special moment. Premium
                paper, thoughtful designs, delivered with love.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="#collection"
                  className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-medium hover:bg-primary/90 transition-all flex items-center gap-2 hover:gap-4 shadow-lg shadow-primary/30"
                >
                  Shop Collection <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden md:block h-[500px]"
            >
              {/* Stacked Cards Animation */}
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [5, 7, 5] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-10 right-10 w-64 h-80 bg-white rounded-2xl shadow-xl border p-4 z-10"
              >
                <div className="w-full h-full bg-secondary/10 rounded-xl flex items-center justify-center">
                  <span className="text-4xl">🎂</span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0], rotate: [-10, -12, -10] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute top-20 left-10 w-64 h-80 bg-white rounded-2xl shadow-xl border p-4 z-20"
              >
                <div className="w-full h-full bg-primary/10 rounded-xl flex items-center justify-center">
                  <span className="text-4xl text-center font-heading font-medium text-primary">
                    Thank
                    <br />
                    You
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Our Collection Section (Replaces Shop by Occasion & Trending Now) */}
      <section id="collection" className="container mx-auto px-4 scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-[#e26b58] font-bold tracking-widest text-sm uppercase mb-3">
            CURATED SELECTION
          </p>
          <h2 className="font-heading text-5xl md:text-6xl font-bold mb-4">
            Our Collection
          </h2>
          <p className="text-muted-foreground text-xl">
            Find the perfect card or invitation for every moment
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-16">
          {CATEGORY_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-full text-sm sm:text-base font-medium transition-all duration-300
                ${
                  activeTab === tab
                    ? "bg-[#e26b58] text-white shadow-md"
                    : "bg-[#f5f1ea] text-foreground/80 hover:bg-[#eadecc]"
                }
              `}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Product Grid with Animation */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State / No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-24 text-muted-foreground">
            <p className="text-lg">
              Check back soon for new designs in this category!
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
