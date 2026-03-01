"use client";

import { motion } from "framer-motion";
import ProductCard, { Product } from "@/components/ProductCard";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, SlidersHorizontal } from "lucide-react";

// Mock data
const PRODUCTS: Product[] = [
  { id: "101", title: "Sunny Disposition", price: 4.50, image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=400&h=533", category: "Birthdays" },
  { id: "102", title: "Floral Wreath", price: 5.00, image: "https://images.unsplash.com/photo-1583847268964-b28e50b58257?auto=format&fit=crop&q=80&w=400&h=533", category: "Birthdays", isNew: true },
  { id: "103", title: "Minimalist Cake", price: 3.99, image: "https://images.unsplash.com/photo-1481024387227-2e2124508cfa?auto=format&fit=crop&q=80&w=400&h=533", category: "Birthdays" },
  { id: "104", title: "Confetti Blast", price: 4.99, image: "https://images.unsplash.com/photo-1516244671391-62ecafdcabf7?auto=format&fit=crop&q=80&w=400&h=533", category: "Birthdays" },
  { id: "105", title: "Gold Foil Ages", price: 6.50, image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=400&h=533", category: "Birthdays", isNew: true },
  { id: "106", title: "Simple Cheers", price: 4.00, image: "https://images.unsplash.com/photo-1583847268964-b28e50b58257?auto=format&fit=crop&q=80&w=400&h=533", category: "Birthdays" },
];

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const categoryName = slug ? slug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase()) : "Category";

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs & Header */}
      <div className="mb-12">
        <Link href="/categories" className="inline-flex items-center text-sm text-primary hover:underline mb-6 font-medium">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Categories
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-2">
              {categoryName}
            </h1>
            <p className="text-muted-foreground">
              Showing 24 beautiful designs for {categoryName.toLowerCase()}.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <button className="flex items-center gap-2 px-4 py-2 bg-muted rounded-full text-sm font-medium hover:bg-muted/80 transition-colors">
              <SlidersHorizontal className="w-4 h-4" /> Filter
            </button>
            <select className="px-4 py-2 bg-muted rounded-full text-sm font-medium border-none focus:ring-2 focus:ring-primary outline-none">
              <option>Sort by: Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest Arrivals</option>
            </select>
          </motion.div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
        {PRODUCTS.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>
    </div>
  );
}
