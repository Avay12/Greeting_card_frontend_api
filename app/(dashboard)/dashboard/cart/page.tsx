"use client";

import { useState } from "react";
import { ShoppingCart, Heart, Trash2, Plus, Minus, CreditCard } from "lucide-react";
import { useStore } from "@/store/useStore";
import Image from "next/image";

export default function CartPage() {
  const [activeTab, setActiveTab] = useState<"cart" | "favorites">("cart");
  const { cart, removeFromCart, updateQuantity, cartTotal, favorites, toggleFavorite } = useStore();

  // We need to fetch favorite product details if we had a real API. 
  // For demo, we just show their IDs or a placeholder if the ID isn't in cart.
  const favoriteItems = favorites.map(favId => {
    const inCart = cart.find(item => item.id === favId);
    if (inCart) return inCart;
    return { id: favId, name: `Saved Item #${favId.substring(0,4)}`, price: 0, image: "", category: "Saved" };
  });

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#1c1917]">Your Selection</h1>
        <p className="mt-1 text-sm text-gray-500">Manage your cart items and saved favorites.</p>
      </div>

      <div className="rounded-2xl border border-rose-100 bg-white shadow-sm overflow-hidden">
        {/* Tabs Header */}
        <div className="flex border-b border-rose-100 bg-rose-50/40">
          <button
            onClick={() => setActiveTab("cart")}
            className={`flex flex-1 items-center justify-center border-b-2 px-4 py-4 text-sm font-semibold transition-colors ${
              activeTab === "cart"
                ? "border-[#f43f5e] text-[#f43f5e] bg-white"
                : "border-transparent text-stone-400 hover:text-[#1c1917] hover:bg-white/50"
            }`}
          >
            <ShoppingCart className="mr-2 h-4 w-4" /> My Cart ({cart.length})
          </button>
          <button
            onClick={() => setActiveTab("favorites")}
            className={`flex flex-1 items-center justify-center border-b-2 px-4 py-4 text-sm font-semibold transition-colors ${
              activeTab === "favorites"
                ? "border-[#f43f5e] text-[#f43f5e] bg-white"
                : "border-transparent text-stone-400 hover:text-[#1c1917] hover:bg-white/50"
            }`}
          >
            <Heart className="mr-2 h-4 w-4" /> Saved Favorites ({favorites.length})
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 md:p-8">
          {activeTab === "cart" && (
            <div className="lg:flex lg:gap-8">
              {/* Cart Items List */}
              <div className="flex-1 space-y-6">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <ShoppingCart className="h-16 w-16 text-gray-200 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">Your cart is empty</h3>
                    <p className="mt-1 text-sm text-gray-500">Looks like you haven't added anything yet.</p>
                  </div>
                ) : (
                  <div className="divide-y divide-rose-50">
                    {cart.map((item) => (
                      <div key={item.id} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-100">
                           {item.image ? (
                               <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                           ) : (
                               <div className="h-full w-full bg-gray-200"></div>
                           )}
                        </div>
                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-[#1c1917]">
                              <h3>{item.name}</h3>
                              <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <div className="flex items-center rounded-md border border-rose-100">
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="px-2 py-1 text-stone-400 hover:text-[#f43f5e]"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="px-2 font-medium">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="px-2 py-1 text-stone-400 hover:text-[#f43f5e]"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeFromCart(item.id)}
                              className="font-medium text-red-500 hover:text-red-700 flex items-center"
                            >
                              <Trash2 className="mr-1 h-4 w-4" /> Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Order Summary */}
              {cart.length > 0 && (
                <div className="mt-8 lg:mt-0 lg:w-80 border-t border-[#EFEFEF] lg:border-t-0 lg:border-l pl-0 lg:pl-8 pt-8 lg:pt-0">
                  <h2 className="text-lg font-medium text-[#1c1917]">Order Summary</h2>
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <p className="text-gray-600">Subtotal</p>
                      <p className="font-medium text-[#2C3E50]">${cartTotal().toFixed(2)}</p>
                    </div>
                    <div className="flex items-center justify-between text-sm border-b border-rose-100 pb-4">
                      <p className="text-gray-600">Tax</p>
                      <p className="font-medium text-[#2C3E50]">${(cartTotal() * 0.08).toFixed(2)}</p>
                    </div>
                    <div className="flex items-center justify-between text-base font-bold text-[#1c1917]">
                      <p>Total</p>
                      <p>${(cartTotal() * 1.08).toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="mt-8">
                    <button className="flex w-full items-center justify-center rounded-xl bg-[#f43f5e] px-6 py-3 text-base font-bold shadow-md shadow-rose-200 hover:bg-[#e11d48] text-white transition-colors">
                      <CreditCard className="mr-2 h-5 w-5" /> Checkout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "favorites" && (
            <div>
               {favorites.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Heart className="h-16 w-16 text-gray-200 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">No favorites yet</h3>
                    <p className="mt-1 text-sm text-gray-500">Save items you like to view them here later.</p>
                  </div>
                ) : (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {favoriteItems.map((item) => (
                      <div key={item.id} className="group relative rounded-xl border border-[#EFEFEF] p-4 hover:shadow-md transition-all">
                         <button 
                           onClick={() => toggleFavorite(item.id)}
                           className="absolute top-2 right-2 z-10 rounded-full bg-white p-1.5 shadow-sm text-red-500 hover:text-red-700"
                         >
                           <Heart className="h-4 w-4 fill-current" />
                         </button>
                         <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100 mb-4">
                            {item.image ? (
                               <img src={item.image} alt={item.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform" />
                            ) : (
                               <div className="h-full w-full flex items-center justify-center text-gray-400">No Image</div>
                            )}
                         </div>
                         <h3 className="text-sm font-medium text-[#1c1917] truncate">{item.name}</h3>
                         <p className="mt-1 text-sm text-gray-500">{item.price ? `$${item.price.toFixed(2)}` : 'Prices Vary'}</p>
                      </div>
                    ))}
                  </div>
                )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
