"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Check,
  Heart,
  Share2,
  ShieldQuestion,
  Star,
  Truck,
  Edit3,
  Eye,
  ShoppingCart,
} from "lucide-react";
import { TEMPLATES, TemplateMetadata } from "@/lib/data/template";
import { TEMPLATE_COMPONENTS } from "@/components/templates";
import { useStore } from "@/store/useStore";

export default function ProductPage() {
  const params = useParams();
  const id = params.id as string;
  const { addToCart } = useStore();

  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<"preview" | "customize">(
    "preview",
  );

  // Find product in TEMPLATES
  const productData = useMemo(() => {
    for (const category in TEMPLATES) {
      const templates = TEMPLATES[category as keyof typeof TEMPLATES];
      if (templates[id as keyof typeof templates]) {
        return {
          ...templates[id as keyof typeof templates],
          category: category
            .replace(/-/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase()),
        } as TemplateMetadata & { category: string };
      }
    }
    return null;
  }, [id]);

  // Customization State - initialized with defaults from productData
  const [customData, setCustomData] = useState<Record<string, any>>({});

  useEffect(() => {
    if (productData?.defaults) {
      setCustomData(productData.defaults);
    }
  }, [productData]);

  const TemplateComponent = TEMPLATE_COMPONENTS[id];

  const handleAddToCart = () => {
    if (!productData) return;

    addToCart({
      id: productData.id,
      name: productData.name,
      price: productData.price,
      image: productData.image || "",
      category: productData.category,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleInputChange = (field: string, value: string) => {
    setCustomData((prev) => ({ ...prev, [field]: value }));
  };

  if (!productData) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
        <Link
          href="/occasions"
          className="text-primary hover:underline font-bold"
        >
          Return to Occasions
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* Breadcrumb */}
      <Link
        href={`/occasions/${productData.category.toLowerCase().replace(/ /g, "-")}`}
        className="inline-flex items-center text-sm text-[#e26b58] hover:underline mb-8 font-bold tracking-widest uppercase"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to {productData.category}
      </Link>

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-24">
        {/* Left Col - Interactive Preview */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
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
                  {TemplateComponent ? (
                    <TemplateComponent {...(customData as any)} />
                  ) : (
                    <div className="w-full h-full bg-muted rounded-[3rem] flex items-center justify-center border-8 border-white shadow-2xl overflow-hidden">
                      <Image
                        src={productData.image || ""}
                        alt={productData.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="customize"
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  className="w-full h-full bg-white rounded-[3rem] p-10 shadow-2xl border border-black/5 overflow-y-auto custom-scrollbar"
                >
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-black tracking-tight">
                      Personalize Card
                    </h3>
                    <div className="p-2 bg-primary/10 rounded-full">
                      <Edit3 className="w-5 h-5 text-primary" />
                    </div>
                  </div>

                  <div className="space-y-8">
                    {productData.fields.map((field) => (
                      <div key={field} className="group">
                        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-3 group-focus-within:text-primary transition-colors">
                          {field.replace(/([A-Z])/g, " $1").trim()}
                        </label>
                        <input
                          type="text"
                          value={customData[field] || ""}
                          onChange={(e) =>
                            handleInputChange(field, e.target.value)
                          }
                          placeholder={`Enter ${field}...`}
                          className="w-full bg-muted/50 border-2 border-transparent rounded-[1.25rem] p-5 text-sm font-bold focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/5 outline-none transition-all"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="mt-12 p-6 bg-amber-50 rounded-3xl border border-amber-100">
                    <p className="text-xs font-bold text-amber-800 leading-relaxed italic">
                      * Your changes are updated in real-time in the "Live
                      Preview" tab. Make sure to double-check spelling before
                      ordering!
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Right Col - Details & Purchase */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col justify-center"
        >
          <div className="flex items-center justify-between mb-8">
            <div className="px-5 py-2 bg-[#e3c18b]/20 text-[#5e4b2d] rounded-full text-[10px] font-black uppercase tracking-widest border border-[#e3c18b]/30">
              {productData.category} • Designer Exclusive
            </div>
            <div className="flex gap-3">
              <button className="p-3.5 border border-black/5 bg-white rounded-full hover:bg-muted/50 hover:shadow-md transition-all text-muted-foreground">
                <Heart className="w-5 h-5" />
              </button>
              <button className="p-3.5 border border-black/5 bg-white rounded-full hover:bg-muted/50 hover:shadow-md transition-all text-muted-foreground">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          <h1 className="font-heading text-5xl md:text-7xl font-black mb-8 tracking-tighter text-foreground leading-[0.95]">
            {productData.name}
          </h1>

          <div className="flex items-center gap-6 mb-10">
            <p className="text-5xl font-black text-primary tracking-tight">
              ${productData.price.toFixed(2)}
            </p>
            <div className="flex flex-col">
              <p className="text-muted-foreground line-through font-bold text-sm">
                ${(productData.price + 5).toFixed(2)}
              </p>
              <p className="text-green-600 text-[10px] font-black uppercase tracking-widest">
                Save 15% Today
              </p>
            </div>
          </div>

          <p className="text-xl text-muted-foreground mb-12 leading-relaxed max-w-xl font-medium">
            {productData.description}
          </p>

          <div className="grid grid-cols-2 gap-10 mb-14">
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground mb-6">
                Specifications
              </h4>
              <ul className="space-y-4">
                {[
                  "Double-sided Print",
                  "Premium Cardstock",
                  "Matching Envelope",
                  'A2 Size (4.25 x 5.5")',
                ].map((f, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-sm text-muted-foreground font-bold"
                  >
                    <Check className="w-4 h-4 text-primary bg-primary/10 rounded-full p-0.5" />{" "}
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground mb-6">
                Service Area
              </h4>
              <div className="space-y-5">
                <div className="flex items-center gap-3 text-sm text-foreground font-bold group">
                  <Truck className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
                  <span className="underline decoration-primary/20 underline-offset-8 decoration-2">
                    Ship in 24 hours
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm text-foreground font-bold group">
                  <ShieldQuestion className="w-5 h-5 text-primary group-hover:rotate-12 transition-transform" />
                  <span className="underline decoration-primary/20 underline-offset-8 decoration-2">
                    Quality Assured
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch gap-6">
            <div className="flex items-center border-2 border-black/5 rounded-[1.5rem] overflow-hidden bg-muted/30 p-1">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-14 h-14 flex items-center justify-center bg-white rounded-xl shadow-sm hover:bg-muted transition-all text-2xl font-black"
              >
                -
              </button>
              <div className="w-16 text-center font-black text-xl">
                {quantity}
              </div>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-14 h-14 flex items-center justify-center bg-white rounded-xl shadow-sm hover:bg-muted transition-all text-2xl font-black"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={isAdded}
              className={`flex-1 py-6 rounded-[1.5rem] font-black text-xl flex justify-center items-center gap-4 transition-all shadow-2xl group relative overflow-hidden ${isAdded ? "bg-green-500 text-white" : "bg-primary text-white hover:shadow-primary/40 hover:-translate-y-1.5"}`}
            >
              {isAdded ? (
                <>
                  <Check className="w-7 h-7 animate-bounce" /> Item Added!
                </>
              ) : (
                <>
                  <ShoppingCart className="w-7 h-7 group-hover:rotate-12 transition-transform" />{" "}
                  Add to Cart
                </>
              )}
              {/* Subtle shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shine" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
