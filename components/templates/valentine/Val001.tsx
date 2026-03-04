"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, Stars } from "lucide-react";

interface Val001Props {
  name?: string;
  message?: string;
}

export default function Val001({
  name = "Beloved",
  message = "You're the center of my world, the highlight of my day, and the love of my life. Happy Valentine's Day.",
}: Val001Props) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-[400px] mx-auto aspect-[4/5] bg-gradient-to-br from-rose-50 to-pink-100 rounded-[3rem] shadow-2xl overflow-hidden relative group p-12 text-center flex flex-col items-center justify-center gap-12"
    >
      {/* Dynamic Floating Hearts background */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        {isMounted &&
          [...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -20, 0],
                x: [0, Math.sin(i) * 10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
              className="absolute"
              style={{
                top: `${Math.random() * 80}%`,
                left: `${Math.random() * 80}%`,
              }}
            >
              <Heart
                className={`w-${4 + i} h-${4 + i} fill-rose-300 text-rose-300`}
              />
            </motion.div>
          ))}
      </div>

      <div className="relative z-10 space-y-4">
        <Stars className="w-12 h-12 text-rose-500 mx-auto" strokeWidth={1} />
        <h2 className="font-heading text-xl uppercase tracking-[0.4em] text-rose-600 font-bold">
          To My
        </h2>
      </div>

      <div className="relative z-10 space-y-6">
        <h3 className="font-heading text-6xl md:text-7xl font-black text-rose-800 tracking-tighter leading-[0.8]">
          {name}
        </h3>
        <p className="text-lg md:text-xl text-rose-700 font-serif italic max-w-xs mx-auto leading-relaxed px-4">
          "{message}"
        </p>
      </div>

      {/* Signature Heart Icon */}
      <div className="relative z-10 pt-4">
        <div className="relative group">
          <Heart className="w-20 h-20 text-rose-600 fill-rose-600 transition-transform group-hover:scale-110 duration-500" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white font-heading font-black text-2xl tracking-widest">
              LUUV
            </span>
          </div>
        </div>
      </div>

      {/* Stylish floral patterns in corners */}
      <div className="absolute top-0 right-0 w-32 h-32 border-t-8 border-r-8 border-rose-200/50 rounded-tr-[3rem] -z-0" />
      <div className="absolute bottom-0 left-0 w-32 h-32 border-b-8 border-l-8 border-rose-200/50 rounded-bl-[3rem] -z-0" />
    </motion.div>
  );
}
