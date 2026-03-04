"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store/useStore";
import Link from "next/link";
import Image from "next/image";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";
import { TEMPLATES } from "@/lib/data/template";

// Flat mapping for easy lookup
const TEMPLATES_DATA = Object.values(TEMPLATES).reduce(
  (acc, cat) => ({ ...acc, ...cat }),
  {} as Record<string, any>,
);

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useStore();

  const total = cartTotal();
  const shipping = 5.0;
  const tax = total * 0.1;

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto"
        >
          <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-8">
            <ShoppingBag className="w-10 h-10 text-muted-foreground" />
          </div>
          <h1 className="font-heading text-4xl font-bold mb-4">
            Your cart is empty
          </h1>
          <p className="text-muted-foreground mb-12">
            Looks like you haven't added any cards to your cart yet.
          </p>
          <Link
            href="/occasions"
            className="inline-flex items-center gap-2 bg-primary text-white font-bold px-8 py-4 rounded-full shadow-lg shadow-primary/20 hover:bg-primary/90 hover:-translate-y-0.5 transition-all"
          >
            Continue Shopping <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="font-heading text-4xl md:text-5xl font-bold mb-12">
        Your Shopping Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          <AnimatePresence mode="popLayout">
            {cart.map((item) => {
              const template = TEMPLATES_DATA[item.id];
              const TemplateComponent = template?.component;

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex flex-col sm:flex-items-center sm:flex-row gap-6 p-6 bg-white rounded-[2rem] border border-black/5 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="relative w-full sm:w-32 aspect-square rounded-2xl overflow-hidden bg-[#fafafa] flex items-center justify-center border border-black/5">
                    {TemplateComponent ? (
                      <div className="w-[450px] pointer-events-none transform scale-[0.18] sm:scale-[0.22] origin-center flex items-center justify-center">
                        <TemplateComponent {...(template.defaults || {})} />
                      </div>
                    ) : (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-heading font-bold text-xl">
                          {item.name}
                        </h3>
                        <p className="text-sm text-muted-foreground uppercase tracking-widest">
                          {item.category}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-muted-foreground hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex flex-wrap justify-between items-center gap-4 mt-6">
                      <div className="flex items-center bg-muted rounded-full p-1">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="p-2 hover:bg-white rounded-full transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-10 text-center font-bold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="p-2 hover:bg-white rounded-full transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="font-bold text-xl">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Summary Card */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[2.5rem] p-8 border border-black/5 shadow-xl sticky top-32"
          >
            <h2 className="font-heading text-2xl font-bold mb-8">
              Order Summary
            </h2>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Tax (10%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <hr className="my-4 border-black/5" />
              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span className="text-primary">
                  ${(total + shipping + tax).toFixed(2)}
                </span>
              </div>
            </div>

            <button className="w-full bg-primary text-white font-bold py-5 rounded-2xl shadow-lg shadow-primary/20 hover:bg-primary/90 hover:-translate-y-0.5 transition-all mb-4">
              Proceed to Checkout
            </button>
            <p className="text-center text-xs text-muted-foreground flex items-center justify-center gap-2">
              Secure checkout guaranteed
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
