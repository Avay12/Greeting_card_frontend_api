"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, Heart, Share2, ShieldQuestion, Star, Truck } from "lucide-react";

export default function ProductPage() {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  // Mock product details
  const product = {
    title: "Floral Birthday Wishes",
    price: 4.99,
    description: "Send a bouquet of warm wishes with this beautifully illustrated floral birthday card. Perfect for anyone who loves vibrant colors and spring blossoms. Printed on premium heavyweight paper with gold foil accents.",
    features: [
      "Blank inside for your personal message",
      "Includes a matching premium envelope",
      "Printed on 100% recycled paper",
      "Size: A2 (4.25 x 5.5 inches)"
    ],
    images: [
      "https://images.unsplash.com/photo-1583847268964-b28e50b58257?auto=format&fit=crop&q=80&w=800&h=1067",
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800&h=1067"
    ]
  };

  const handleAddToCart = () => {
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <Link href="/categories/birthdays" className="inline-flex items-center text-sm text-primary hover:underline mb-8 font-medium">
        <ArrowLeft className="w-4 h-4 mr-1" /> Back to Birthdays
      </Link>

      <div className="grid md:grid-cols-2 gap-12 lg:gap-24 mb-24">
        
        {/* Left Col - Images */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-muted outline outline-offset-8 outline-muted shadow-2xl">
            <Image 
              src={product.images[0]}
              alt={product.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-4 pt-4">
            {product.images.map((img, idx) => (
              <button 
                key={idx} 
                className={`relative aspect-[3/4] overflow-hidden rounded-xl border-2 transition-all ${idx === 0 ? 'border-primary' : 'border-transparent hover:border-primary/50'}`}
              >
                <Image src={img} alt={`${product.title} view ${idx + 1}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        </motion.div>

        {/* Right Col - Details */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col justify-center"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1 text-yellow-500">
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <span className="text-muted-foreground text-sm ml-2">(128 Reviews)</span>
            </div>
            <div className="flex gap-2">
              <button className="p-2 border rounded-full hover:bg-muted/50 hover:text-primary transition-colors text-muted-foreground">
                <Heart className="w-5 h-5" />
              </button>
              <button className="p-2 border rounded-full hover:bg-muted/50 hover:text-primary transition-colors text-muted-foreground">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">{product.title}</h1>
          <p className="text-3xl font-medium text-primary mb-8">${product.price.toFixed(2)}</p>
          
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            {product.description}
          </p>

          <div className="space-y-4 mb-10">
            {product.features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="mt-1 bg-primary/10 text-primary p-1 rounded-full shrink-0">
                  <Check className="w-3 h-3" />
                </div>
                <span className="text-foreground/90">{feature}</span>
              </div>
            ))}
          </div>

          <div className="flex items-end gap-6 mb-10 pb-10 border-b border-border">
            <div className="w-1/3">
              <label className="block text-sm font-medium mb-2 text-foreground/80">Quantity</label>
              <div className="flex items-center border rounded-xl overflow-hidden bg-background">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 hover:bg-muted transition-colors"
                >-</button>
                <div className="flex-1 text-center font-medium">{quantity}</div>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 hover:bg-muted transition-colors"
                >+</button>
              </div>
            </div>
            <div className="flex-1">
              <button 
                onClick={handleAddToCart}
                disabled={isAdded}
                className={`w-full py-4 rounded-xl font-medium text-lg flex justify-center items-center gap-2 transition-all shadow-lg ${isAdded ? 'bg-green-500 text-white shadow-green-500/30' : 'bg-primary text-white shadow-primary/30 hover:-translate-y-1 hover:shadow-xl'}`}
              >
                {isAdded ? (
                  <>Added to Card <Check className="w-5 h-5" /></>
                ) : (
                  'Add to Cart'
                )}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 text-sm text-muted-foreground border p-4 rounded-xl bg-muted/30">
              <Truck className="w-5 h-5 text-primary" />
              <span>Ships next business day.</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground border p-4 rounded-xl bg-muted/30">
              <ShieldQuestion className="w-5 h-5 text-primary" />
              <span>100% Quality Guarantee.</span>
            </div>
          </div>

        </motion.div>
      </div>

    </div>
  );
}
