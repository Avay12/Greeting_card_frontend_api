"use client";

import { useState, useMemo, useEffect } from "react";
import { 
  ArrowLeft, 
  Check, 
  Share2, 
  ShieldQuestion, 
  Truck, 
  Edit3, 
  Eye, 
  Loader2,
  Heart,
  Gift,
  Smile,
  Gem,
  PartyPopper,
  Snowflake,
  Sparkles,
  Baby,
  GraduationCap,
  Flower2,
  Bell,
  Stars,
  Leaf,
  Flame,
  Sword,
  ArrowRight,
  ShoppingCart
} from "lucide-react";
import { useStore } from "@/store/useStore";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { TEMPLATES, TemplateMetadata } from "@/lib/data/template";
import { TEMPLATE_COMPONENTS } from "@/components/templates";
import { useAuthStore } from "@/store/authStore";
import api from "@/lib/api";

const CATEGORIES = [
  {
    name: "Valentine",
    slug: "valentine",
    description: "Express your love with romantic cards and invitations for your special someone.",
    icon: Heart,
    image: "/images/products/valentine.png",
    bgColor: "bg-[#fff1f2]",
    iconColor: "text-[#e11d48]",
    hoverColor: "group-hover:text-[#e11d48]",
  },
  {
    name: "Birthday",
    slug: "birthday",
    description: "Celebrate another trip around the sun with our beautiful birthday cards.",
    icon: Gift,
    image: "/images/products/birthday.png",
    bgColor: "bg-[#ffebee]",
    iconColor: "text-[#ef5350]",
    hoverColor: "group-hover:text-[#ef5350]",
  },
  {
    name: "Wedding",
    slug: "wedding",
    description: "Elegant invitations and cards for the most beautiful unions.",
    icon: Gem,
    image: "/images/products/wedding.png",
    bgColor: "bg-[#fff8e1]",
    iconColor: "text-[#ffca28]",
    hoverColor: "group-hover:text-[#ffca28]",
  },
  {
    name: "Thank You",
    slug: "thank-you",
    description: "Express gratitude with elegance. Cards that say it all.",
    icon: Smile,
    image: "/images/products/thankyou.png",
    bgColor: "bg-[#e8eaf6]",
    iconColor: "text-[#5c6bc0]",
    hoverColor: "group-hover:text-[#5c6bc0]",
  },
  {
    name: "Congratulations",
    slug: "congratulations",
    description: "Mark achievements and milestones in style.",
    icon: PartyPopper,
    image: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=400&h=400",
    bgColor: "bg-[#e0f2f1]",
    iconColor: "text-[#26a69a]",
    hoverColor: "group-hover:text-[#26a69a]",
  },
  {
    name: "Seasonal",
    slug: "seasonal",
    description: "Holiday and seasonal greetings for every time of year.",
    icon: Snowflake,
    image: "https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&q=80&w=400&h=400",
    bgColor: "bg-[#e3f2fd]",
    iconColor: "text-[#42a5f5]",
    hoverColor: "group-hover:text-[#42a5f5]",
  },
  {
    name: "Anniversary",
    slug: "anniversary",
    description: "Celebrate years of love and partnership with our elegant cards.",
    icon: Sparkles,
    image: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=400&h=400",
    bgColor: "bg-[#fefce8]",
    iconColor: "text-[#d97706]",
    hoverColor: "group-hover:text-[#d97706]",
  },
  {
    name: "Baby Shower",
    slug: "baby-shower",
    description: "Welcome the little ones with adorable cards and invitations.",
    icon: Baby,
    image: "https://images.unsplash.com/photo-1519689689253-3c9f28d098e6?auto=format&fit=crop&q=80&w=400&h=400",
    bgColor: "bg-[#f0fdf4]",
    iconColor: "text-[#16a34a]",
    hoverColor: "group-hover:text-[#16a34a]",
  },
  {
    name: "Graduation",
    slug: "graduation",
    description: "Honoring achievements and bright futures ahead.",
    icon: GraduationCap,
    image: "https://images.unsplash.com/photo-1523050853064-dbad350c7469?auto=format&fit=crop&q=80&w=400&h=400",
    bgColor: "bg-[#eff6ff]",
    iconColor: "text-[#2563eb]",
    hoverColor: "group-hover:text-[#2563eb]",
  },
  {
    name: "Sympathy",
    slug: "sympathy",
    description: "Thoughtful messages of support during difficult times.",
    icon: Flower2,
    image: "https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?auto=format&fit=crop&q=80&w=400&h=400",
    bgColor: "bg-[#f8fafc]",
    iconColor: "text-[#475569]",
    hoverColor: "group-hover:text-[#475569]",
  },
  {
    name: "Christmas",
    slug: "christmas",
    description: "Spread festive cheer with our magical holiday card collection.",
    icon: Bell,
    image: "https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&q=80&w=400&h=400",
    bgColor: "bg-[#fef2f2]",
    iconColor: "text-[#dc2626]",
    hoverColor: "group-hover:text-[#dc2626]",
  },
  {
    name: "New Year",
    slug: "new-year",
    description: "Ring in a fresh start with sparkling resolutions and greetings.",
    icon: Stars,
    image: "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?auto=format&fit=crop&q=80&w=400&h=400",
    bgColor: "bg-[#f5f3ff]",
    iconColor: "text-[#7c3aed]",
    hoverColor: "group-hover:text-[#7c3aed]",
  },
  {
    name: "Thanksgiving",
    slug: "thanksgiving",
    description: "Share your blessings and gratitude with family and friends.",
    icon: Leaf,
    image: "https://images.unsplash.com/photo-1574044536225-1e3089d7b426?auto=format&fit=crop&q=80&w=400&h=400",
    bgColor: "bg-[#fff7ed]",
    iconColor: "text-[#ea580c]",
    hoverColor: "group-hover:text-[#ea580c]",
  },
  {
    name: "Diwali",
    slug: "diwali",
    description: "Light up the lives of your loved ones with festive Diwali cards.",
    icon: Flame,
    image: "https://images.unsplash.com/photo-1605152276897-4f618f831968?auto=format&fit=crop&q=80&w=400&h=400",
    bgColor: "bg-[#fffbeb]",
    iconColor: "text-[#b45309]",
    hoverColor: "group-hover:text-[#b45309]",
  },
  {
    name: "Dussehra",
    slug: "dussehra",
    description: "Celebrate the victory of good over evil with our special cards.",
    icon: Sword,
    image: "https://images.unsplash.com/photo-1561414927-6d86591d0c4f?auto=format&fit=crop&q=80&w=400&h=400",
    bgColor: "bg-[#fff1f2]",
    iconColor: "text-[#be123c]",
    hoverColor: "group-hover:text-[#be123c]",
  },
];

type ViewState = "categories" | "products" | "details";

export default function GenerateLinkPage() {
  const { user } = useAuthStore();
  const { addToCart, cart } = useStore();
  
  // State
  const [currentView, setCurrentView] = useState<ViewState>("categories");
  const [selectedCategory, setSelectedCategory] = useState<any | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  
  // Detail View State
  const [activeTab, setActiveTab] = useState<"preview" | "customize">("preview");
  const [customData, setCustomData] = useState<Record<string, any>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [copying, setCopying] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const isInCart = selectedProduct ? cart.some((item) => item.id === selectedProduct.id) : false;

  const handleAddToCart = () => {
    if (!selectedProduct) return;
    addToCart({
      id: selectedProduct.id,
      name: selectedProduct.name,
      price: selectedProduct.price || 0,
      image: selectedProduct.image || "",
      category: selectedProduct.category,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  // Computed data
  const categoryProducts = useMemo(() => {
    if (!selectedCategory) return [];
    const normalizedSlug = selectedCategory.slug.replace(/-/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase());
    const matchedCategory = TEMPLATES[selectedCategory.slug as keyof typeof TEMPLATES] || TEMPLATES[normalizedSlug as keyof typeof TEMPLATES] || {};
    return Object.entries(matchedCategory).map(([id, product]) => ({
      ...product,
       id,
       category: selectedCategory.name
    })) as (TemplateMetadata & { id: string, category: string })[];
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedProduct?.defaults) {
      setCustomData(selectedProduct.defaults);
    }
    // Reset share URL when changing products
    setShareUrl(null);
    setActiveTab("preview");
  }, [selectedProduct]);

  // Handlers
  const handleCategorySelect = (category: typeof CATEGORIES[0]) => {
    setSelectedCategory(category);
    setCurrentView("products");
  };

  const handleProductSelect = (product: any) => {
    setSelectedProduct(product);
    setCurrentView("details");
  };

  const handleBack = () => {
    if (currentView === "details") {
      setCurrentView("products");
    } else if (currentView === "products") {
      setCurrentView("categories");
      setSelectedCategory(null);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setCustomData((prev) => ({ ...prev, [field]: value }));
  };

  const saveAndGenerateLink = async () => {
    setIsSaving(true);
    try {
      const response = await api.post("/cards", {
        template_id: selectedProduct.id,
        title: selectedProduct.name,
        description: selectedProduct.description,
        image_url: selectedProduct.image,
        occasion: selectedProduct.category,
        price: selectedProduct.price,
        custom_data: JSON.stringify(customData),
      });

      const cardId = response.data.id;
      const url = `${window.location.protocol}//${window.location.host}/preview/${cardId}`;
      setShareUrl(url);
    } catch (error) {
       console.error("Failed to save and share card:", error);
       // Fallback generating client-side only encoded link
       const shareData = { id: selectedProduct.id, fields: customData };
       const encoded = btoa(encodeURIComponent(JSON.stringify(shareData)));
       const url = `${window.location.protocol}//${window.location.host}/preview/${encoded}`;
       setShareUrl(url);
    } finally {
      setIsSaving(false);
    }
  };

  const copyToClipboard = () => {
    if (shareUrl) {
      navigator.clipboard.writeText(shareUrl);
      setCopying(true);
      setTimeout(() => setCopying(false), 2000);
    }
  };

  return (
    <div className="mx-auto max-w-7xl space-y-8 pb-12">
      {/* Dynamic Header/Breadcrumb */}
      <div>
        <h1 className="text-2xl font-bold text-[#1c1917]">Generate Link</h1>
        {currentView === "categories" ? (
          <p className="mt-1 text-sm text-gray-500">
            Select an occasion to browse available templates.
          </p>
        ) : (
          <button
            onClick={handleBack}
            className="mt-4 flex items-center text-sm font-bold tracking-widest uppercase text-[#f43f5e] hover:text-[#e11d48] transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> 
            Back to {currentView === "details" ? selectedCategory?.name : "Occasions"}
          </button>
        )}
      </div>

      {/* VIEW 1: Categories (Occasions) */}
      {currentView === "categories" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((category, i) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.slug}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.05, 0.5) }}
                onClick={() => handleCategorySelect(category)}
                className="cursor-pointer"
              >
                <div className={cn(
                    "group relative overflow-hidden rounded-[2rem] p-8 transition-all hover:shadow-xl hover:-translate-y-1 border border-black/5 min-h-[250px] flex flex-col",
                    category.bgColor
                  )}
                >
                  <div className="absolute top-0 right-0 w-32 h-40 opacity-80 mix-blend-multiply pointer-events-none overflow-hidden rounded-bl-3xl z-0 transition-opacity group-hover:opacity-100">
                    <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-transparent to-white/50 z-10" />
                    <Image
                      src={category.image}
                      alt=""
                      fill
                      className="object-cover object-right-top opacity-50 transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  <div className="relative z-20 flex flex-col flex-1">
                    <div className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Icon className={cn("w-5 h-5", category.iconColor)} />
                    </div>
                    <div className="mt-auto">
                      <h2 className={cn("font-heading text-xl font-bold text-foreground mb-2 transition-colors", category.hoverColor)}>
                        {category.name}
                      </h2>
                      <p className="text-muted-foreground/90 text-sm md:text-xs pr-4 line-clamp-2">
                        {category.description}
                      </p>
                      <div className={cn("mt-4 flex items-center text-xs font-bold tracking-widest uppercase opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300", category.iconColor)}>
                        Select <ArrowRight className="w-4 h-4 ml-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* VIEW 2: Products List */}
      {currentView === "products" && categoryProducts.length > 0 && (
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
           {categoryProducts.map((product, i) => {
             const TemplateComponent = TEMPLATE_COMPONENTS[product.id];
             return (
               <motion.div
                 key={product.id}
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ delay: i * 0.05 }}
                 onClick={() => handleProductSelect(product)}
                 className="group flex flex-col bg-white rounded-[2rem] overflow-hidden border border-rose-100 shadow-sm hover:shadow-xl hover:border-[#f43f5e] transition-all duration-300 cursor-pointer"
               >
                 <div className="block relative overflow-hidden bg-muted aspect-[4/5]">
                  {TemplateComponent ? (
                    <div className="absolute inset-0 bg-[#fafafa] overflow-hidden flex items-center justify-center group-hover:bg-white transition-colors duration-700">
                      <div className="w-[480px] pointer-events-none transform scale-[0.4] sm:scale-[0.45] origin-center transition-transform duration-700 group-hover:scale-[0.48]">
                         <TemplateComponent {...(product.defaults || {})} />
                      </div>
                      <div className="absolute inset-0 bg-black/[0.02] pointer-events-none" />
                    </div>
                  ) : product.image ? (
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gray-100 flex items-center justify-center text-gray-400">Preview</div>
                  )}
                 </div>
                 <div className="p-6 flex flex-col gap-1.5 bg-white">
                   <div className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">
                     {product.category}
                   </div>
                   <h3 className="font-heading font-bold text-xl text-foreground group-hover:text-[#f43f5e] transition-colors">
                     {product.name}
                   </h3>
                   <p className="text-foreground font-bold mt-1 text-lg">
                     ${product.price?.toFixed(2) || "0.00"}
                   </p>
                 </div>
               </motion.div>
             );
           })}
         </div>
      )}

      {currentView === "products" && categoryProducts.length === 0 && (
         <div className="py-20 text-center text-gray-500 rounded-2xl border border-dashed border-gray-200">
            No templates available for this category yet.
         </div>
      )}

      {/* VIEW 3: Detail & Generation (Refactored from ProductPage) */}
      {currentView === "details" && selectedProduct && (
        <div className="grid lg:grid-cols-2 gap-12 mb-12">
            {/* Left Col - Interactive Preview */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col gap-6"
            >
              <div className="flex bg-muted p-1 rounded-2xl w-fit self-center lg:self-start border border-black/5 shadow-inner">
                <button
                  onClick={() => setActiveTab("preview")}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === "preview" ? "bg-white shadow-md text-primary" : "text-muted-foreground hover:text-foreground"}`}
                >
                  <Eye className="w-4 h-4" /> Live Preview
                </button>
                <button
                  onClick={() => setActiveTab("customize")}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === "customize" ? "bg-white shadow-md text-primary" : "text-muted-foreground hover:text-foreground"}`}
                >
                  <Edit3 className="w-4 h-4" /> Customize
                </button>
              </div>

              <div className="relative aspect-[4/5] w-full max-w-[500px] mx-auto perspective-1000">
                <AnimatePresence mode="wait">
                  {activeTab === "preview" ? (
                    <motion.div
                      key="preview"
                      initial={{ opacity: 0, rotateY: -15, scale: 0.95 }}
                      animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                      exit={{ opacity: 0, rotateY: 15, scale: 0.95 }}
                      transition={{ type: "spring", damping: 20 }}
                      className="w-full h-full"
                    >
                      {TEMPLATE_COMPONENTS[selectedProduct.id] ? (
                        (() => {
                            const Component = TEMPLATE_COMPONENTS[selectedProduct.id];
                            return <Component {...(customData as any)} />;
                        })()
                      ) : (
                        <div className="w-full h-full bg-muted rounded-[3rem] flex items-center justify-center border-8 border-white shadow-xl overflow-hidden relative">
                          {selectedProduct.image && (
                            <Image src={selectedProduct.image} alt="" fill className="object-cover" />
                          )}
                        </div>
                      )}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="customize"
                      initial={{ opacity: 0, scale: 0.95, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 20 }}
                      className="w-full h-full bg-white rounded-[3rem] p-10 shadow-xl border border-black/5 overflow-y-auto custom-scrollbar"
                    >
                      <div className="flex items-center justify-between mb-8">
                        <h3 className="text-2xl font-black tracking-tight text-[#1c1917]">Personalize Card</h3>
                        <div className="p-2 bg-rose-50 rounded-full">
                          <Edit3 className="w-5 h-5 text-[#f43f5e]" />
                        </div>
                      </div>

                      <div className="space-y-6">
                        {selectedProduct.fields?.map((field: string) => (
                          <div key={field} className="group">
                            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-2 group-focus-within:text-[#f43f5e] transition-colors">
                              {field.replace(/([A-Z])/g, " $1").trim()}
                            </label>
                            <input
                              type="text"
                              value={customData[field] || ""}
                              onChange={(e) => handleInputChange(field, e.target.value)}
                              placeholder={`Enter ${field}...`}
                              className="w-full bg-rose-50/60 border-2 border-transparent rounded-[1.25rem] p-4 text-sm font-bold text-[#1c1917] focus:bg-white focus:border-rose-300 focus:ring-4 focus:ring-rose-100 outline-none transition-all"
                            />
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Right Col - Details & Generation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col justify-center py-6"
            >
              <div className="px-4 py-1.5 bg-rose-50 text-[#f43f5e] w-fit rounded-full text-xs font-bold uppercase tracking-widest border border-rose-200 mb-6">
                {selectedProduct.category}
              </div>

              <h1 className="font-heading text-4xl md:text-5xl font-black mb-6 text-[#1c1917] leading-tight">
                {selectedProduct.name}
              </h1>

              <div className="flex items-center gap-6 mb-8">
                <p className="text-4xl font-black text-[#f43f5e] tracking-tight">
                  ${selectedProduct.price?.toFixed(2) || "0.00"}
                </p>
                <div className="flex flex-col">
                  <p className="text-gray-400 line-through font-bold text-sm">
                    ${((selectedProduct.price || 0) + 5).toFixed(2)}
                  </p>
                  <p className="text-green-600 text-[10px] font-black uppercase tracking-widest">
                    Save 15% Today
                  </p>
                </div>
              </div>

              <p className="text-lg text-gray-500 mb-10 leading-relaxed font-medium">
                {selectedProduct.description}
              </p>

              <div className="grid grid-cols-2 gap-8 mb-12">
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#2C3E50] mb-4">Specifications</h4>
                  <ul className="space-y-3">
                    {["Double-sided Print", "Premium Cardstock", "Matching Envelope", 'A2 Size (4.25 x 5.5")'].map((f, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-gray-600 font-bold">
                        <Check className="w-4 h-4 text-[#f43f5e] bg-rose-50 rounded-full p-0.5" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Generate & Share Section */}
              <div className="mt-auto border-t border-rose-100 pt-8">
                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className={`w-full mb-4 py-4 rounded-[1.5rem] font-black text-lg flex justify-center items-center gap-3 transition-all border-2 ${
                    isInCart || addedToCart
                      ? "border-green-500 bg-green-50 text-green-600"
                      : "border-rose-200 bg-rose-50 text-[#f43f5e] hover:bg-[#f43f5e] hover:text-white"
                  }`}
                >
                  {addedToCart ? (
                    <><Check className="w-5 h-5" /> Added to Cart!</>
                  ) : isInCart ? (
                    <><ShoppingCart className="w-5 h-5" /> Already in Cart</>
                  ) : (
                    <><ShoppingCart className="w-5 h-5" /> Add to Cart</>
                  )}
                </button>

                {!shareUrl ? (
                  <button
                    onClick={saveAndGenerateLink}
                    disabled={isSaving}
                    className="w-full py-5 rounded-[1.5rem] bg-gradient-to-r from-[#f43f5e] to-[#fb7185] text-white font-black text-xl flex justify-center items-center gap-3 hover:from-[#e11d48] hover:to-[#f43f5e] hover:shadow-lg hover:shadow-rose-200 transition-all shadow-md group disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden"
                  >
                    {isSaving ? (
                      <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                      <Share2 className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    )}
                    Generate & Share Preview Link
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shine pointer-events-none" />
                  </button>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-rose-50/60 rounded-[1.5rem] p-6 border border-rose-200"
                  >
                    <div className="flex items-center gap-2 mb-4">
                        <Check className="w-5 h-5 text-green-500" />
                        <p className="text-sm font-bold text-[#2C3E50] uppercase tracking-widest">Link Generated Successfully</p>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        readOnly
                        value={shareUrl}
                        className="flex-1 bg-white border border-rose-100 rounded-xl px-4 py-3 text-sm font-medium text-stone-600 outline-none focus:border-[#f43f5e]"
                      />
                      <button
                        onClick={copyToClipboard}
                        className="px-6 rounded-xl bg-[#2C3E50] text-white font-bold text-sm hover:bg-gray-800 transition-all flex items-center gap-2"
                      >
                        {copying ? "Copied!" : "Copy"}
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
        </div>
      )}
    </div>
  );
}
