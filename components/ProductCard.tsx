"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Heart, ShoppingCart, Check } from "lucide-react";
import { useStore } from "@/store/useStore";
import { useState } from "react";

export interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
  isBestseller?: boolean;
  isNew?: boolean;
}

interface ProductCardProps {
  product: Product;
  className?: string;
  index?: number;
}

export default function ProductCard({ product, className, index = 0 }: ProductCardProps) {
  const { addToCart, toggleFavorite, isFavorite } = useStore();
  const [isAdded, setIsAdded] = useState(false);
  const favorited = isFavorite(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.title,
      price: product.price,
      image: product.image,
      category: product.category,
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product.id);
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn("group flex flex-col bg-card rounded-[2rem] overflow-hidden border shadow-sm hover:shadow-lg transition-shadow duration-300", className)}
    >
      <Link href={`/product/${product.id}`} className="block relative aspect-[4/5] overflow-hidden bg-muted">
        {product.isBestseller && (
          <div className="absolute top-4 left-4 z-10 bg-[#e3c18b] text-[#5e4b2d] text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
            Bestseller
          </div>
        )}
        
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover transform group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Action Buttons Overlay */}
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          <button
            onClick={handleToggleFavorite}
            className={cn(
              "p-2.5 rounded-full shadow-lg backdrop-blur-md transition-all duration-300",
              favorited 
                ? "bg-primary text-white" 
                : "bg-white/80 text-foreground hover:bg-primary hover:text-white"
            )}
          >
            <Heart className={cn("w-5 h-5", favorited && "fill-current")} />
          </button>
          <button
            onClick={handleAddToCart}
            className={cn(
              "p-2.5 rounded-full shadow-lg backdrop-blur-md transition-all duration-300",
              isAdded 
                ? "bg-green-500 text-white" 
                : "bg-white/80 text-foreground hover:bg-primary hover:text-white"
            )}
          >
            {isAdded ? <Check className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
          </button>
        </div>
      </Link>

      <div className="p-6 flex flex-col gap-1.5 bg-card">
        <div className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">
          {product.category}
        </div>
        <Link href={`/product/${product.id}`} className="block">
          <h3 className="font-heading font-bold text-xl text-foreground group-hover:text-primary transition-colors">
            {product.title}
          </h3>
        </Link>
        <p className="text-foreground font-bold mt-1 text-lg">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </motion.div>
  );
}
