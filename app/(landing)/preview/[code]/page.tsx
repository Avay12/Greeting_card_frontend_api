"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Sparkles, ShoppingBag, Loader2 } from "lucide-react";
import { TEMPLATES } from "@/lib/data/template";
import { TEMPLATE_COMPONENTS } from "@/components/templates";
import api from "@/lib/api";

export default function PreviewPage() {
  const params = useParams();
  const code = params.code as string;

  const [dbData, setDbData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Try to decode as Base64 first
        if (code.length > 20) {
          try {
            const jsonStr = decodeURIComponent(atob(code));
            const parsed = JSON.parse(jsonStr);
            setDbData(parsed);
            setLoading(false);
            return;
          } catch (e) {
            // Not base64, continue to DB fetch
          }
        }

        // Try to fetch from DB
        const response = await api.get(`/cards/${code}`);
        const card = response.data;

        setDbData({
          id: card.template_id,
          fields: JSON.parse(card.custom_data),
          isFromDb: true,
          dbCard: card,
        });
      } catch (err) {
        console.error("Failed to fetch card:", err);
      } finally {
        setLoading(false);
      }
    };

    if (code) {
      fetchData();
    }
  }, [code]);

  const decodedData = dbData;

  const productData = useMemo(() => {
    if (!decodedData?.id) return null;
    const id = decodedData.id;
    for (const category in TEMPLATES) {
      const templates = TEMPLATES[category as keyof typeof TEMPLATES];
      if (templates[id as keyof typeof templates]) {
        return {
          ...templates[id as keyof typeof templates],
          category: category
            .replace(/-/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase()),
        };
      }
    }
    return null;
  }, [decodedData]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-32 text-center flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <p className="text-muted-foreground font-medium">
          Loading your preview...
        </p>
      </div>
    );
  }

  if (!decodedData || !productData) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h1 className="text-4xl font-bold mb-4">Invalid Preview Link</h1>
        <p className="text-muted-foreground mb-8 text-lg">
          This preview link might be broken or expired.
        </p>
        <Link
          href="/occasions"
          className="bg-primary text-white font-bold px-8 py-4 rounded-full shadow-lg"
        >
          Browse All Cards
        </Link>
      </div>
    );
  }

  const TemplateComponent = (TEMPLATE_COMPONENTS as any)[decodedData.id];

  return (
    <div className="min-h-screen bg-[#fafafa] py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest mb-2">
                <Sparkles className="w-3 h-3 fill-primary" /> Curated Design
              </div>
              <h1 className="font-heading text-4xl md:text-5xl font-black tracking-tighter">
                Greeting Preview
              </h1>
              <p className="text-muted-foreground font-medium">
                Someone shared this beautiful{" "}
                <span className="text-foreground font-bold">
                  {productData.name}
                </span>{" "}
                card with you.
              </p>
            </div>

            <Link
              href={`/product/${decodedData.id}`}
              className="bg-primary text-white font-bold px-8 py-4 rounded-[1.5rem] shadow-xl shadow-primary/20 hover:bg-primary/90 hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
            >
              <ShoppingBag className="w-5 h-5" />
              Create Your Own
            </Link>
          </div>

          {/* Main Preview Area */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Background platform effect */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-black/[0.03] blur-3xl rounded-full -z-10 translate-y-12" />

            <div className="max-w-[500px] mx-auto perspective-1000">
              <motion.div
                initial={{ rotateY: -5, rotateX: 5 }}
                animate={{ rotateY: 0, rotateX: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="w-full h-full shadow-[0_50px_100px_-20px_rgba(0,0,0,0.25)] rounded-[3rem] overflow-hidden"
              >
                {TemplateComponent ? (
                  <TemplateComponent {...decodedData.fields} />
                ) : (
                  <div className="bg-white p-20 text-center">
                    <p>Component not found</p>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Info Message */}
            <div className="mt-16 text-center max-w-lg mx-auto bg-white/50 backdrop-blur-sm p-8 rounded-[2rem] border border-black/5">
              <p className="text-sm text-muted-foreground leading-relaxed italic">
                &quot;This is a live preview of the greeting card. You can
                create your own version of this card, personalize the message,
                and have it printed or shared digitally.&quot;
              </p>
              <div className="mt-8 flex justify-center gap-4">
                <Link
                  href="/occasions"
                  className="text-foreground/60 hover:text-primary transition-colors text-sm font-bold flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" /> Browse Occasions
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
