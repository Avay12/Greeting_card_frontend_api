"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Cake, Sparkle, Stars } from "lucide-react";

interface Bday001Props {
  name?: string;
  age?: number;
  message?: string;
}

export default function Bday001({
  name = "Alex",
  age = 25,
  message = "Hope your day is as amazing as you are! Wishing you the best year yet.",
}: Bday001Props) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-[400px] mx-auto aspect-[4/5] bg-gradient-to-tr from-[#f6f2ee] via-[#f1f7f9] to-[#edf4f1] rounded-[2rem] shadow-2xl border-4 border-white overflow-hidden relative group p-12 text-center flex flex-col items-center justify-between"
    >
      {/* Confetti Background animation */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {isMounted &&
          [...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: -100, rotate: 0 }}
              animate={{
                y: [0, 600],
                rotate: [0, 360],
                x: [0, Math.sin(i) * 100],
                opacity: [0, 1, 0.5, 0],
              }}
              transition={{
                duration: 6 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 10,
                ease: "linear",
              }}
              className="absolute"
              style={{
                top: `${Math.random() * 10}%`,
                left: `${Math.random() * 100}%`,
              }}
            >
              <div
                className={`w-3 h-3 rounded-sm ${["bg-pink-400", "bg-blue-400", "bg-yellow-400", "bg-teal-400"][i % 4]}`}
              />
            </motion.div>
          ))}
      </div>

      {/* Top Banner section */}
      <div className="relative z-10 w-full flex items-center justify-center gap-4">
        <Sparkle className="w-8 h-8 text-yellow-500 fill-yellow-200" />
        <div className="h-[2px] w-12 bg-slate-300" />
        <h2 className="font-heading text-sm uppercase tracking-[0.3em] text-slate-400 font-bold">
          Party Time
        </h2>
        <div className="h-[2px] w-12 bg-slate-300" />
        <Sparkle className="w-8 h-8 text-yellow-500 fill-yellow-200" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 space-y-8 py-8">
        <div className="relative inline-block px-8 py-2 bg-white/60 backdrop-blur-md rounded-full shadow-sm border border-white">
          <h1 className="font-heading text-6xl md:text-7xl font-black text-slate-800 tracking-tighter leading-none mb-0 drop-shadow-sm">
            JOY
          </h1>
          <div className="absolute -top-4 -right-4 w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-white font-black text-xl border-4 border-[#fff] rotate-12">
            {age}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-heading text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-600 via-blue-600 to-pink-600 bg-clip-text text-transparent underline decoration-blue-200 underline-offset-8">
            Happy Birthday <br /> {name}!
          </h3>
          <p className="text-lg text-slate-600 font-medium italic max-w-xs mx-auto leading-relaxed px-4">
            "{message}"
          </p>
        </div>
      </div>

      {/* Bottom Badge section */}
      <div className="relative z-10 mt-auto flex flex-col items-center gap-4 pt-10">
        <div className="flex gap-4 p-4 bg-white/60 backdrop-blur-md rounded-2xl shadow-sm border border-white/50 group-hover:scale-110 transition-transform duration-500 group-hover:-rotate-3">
          <Cake
            className="w-10 h-10 text-pink-500 fill-pink-100"
            strokeWidth={1.5}
          />
          <div className="text-left">
            <p className="text-[10px] font-bold tracking-[0.25em] text-slate-400 uppercase">
              CELEBRATE THE DAY
            </p>
            <div className="flex gap-1">
              <Stars className="w-3 h-3 text-yellow-400 fill-yellow-400" />
              <Stars className="w-3 h-3 text-yellow-400 fill-yellow-400" />
              <Stars className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Stylized geometric background shape */}
      <div className="absolute top-1/2 left-0 w-full h-1/2 bg-blue-50/50 -z-0 -translate-y-1/2 -skew-y-6" />
    </motion.div>
  );
}
