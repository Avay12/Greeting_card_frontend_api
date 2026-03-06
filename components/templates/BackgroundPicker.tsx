"use client";

import { motion } from "framer-motion";
import { ImageIcon, Check } from "lucide-react";
import { BACKGROUND_SCENES } from "@/lib/data/backgrounds";

interface BackgroundPickerProps {
  value: string; // scene id
  onChange: (sceneId: string) => void;
}

export default function BackgroundPicker({ value, onChange }: BackgroundPickerProps) {
  const selected = BACKGROUND_SCENES.find((s) => s.id === value) ?? BACKGROUND_SCENES[0];

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
          <ImageIcon className="w-4 h-4 text-primary" />
        </div>
        <div>
          <p className="text-sm font-bold text-foreground">Background Scene</p>
          <p className="text-[11px] text-muted-foreground">
            Animated backdrop shown in Demo preview
          </p>
        </div>
      </div>

      {/* 5-column grid */}
      <div className="grid grid-cols-5 gap-2">
        {BACKGROUND_SCENES.map((scene) => {
          const isSelected = value === scene.id;
          return (
            <motion.button
              key={scene.id}
              onClick={() => onChange(scene.id)}
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
              title={scene.name}
              className={`relative flex flex-col items-center gap-1 p-1 rounded-xl transition-all ${
                isSelected
                  ? "ring-2 ring-primary ring-offset-2 ring-offset-card"
                  : "hover:ring-2 hover:ring-primary/30"
              }`}
            >
              {/* Gradient swatch */}
              <div
                className="w-full aspect-square rounded-lg shadow overflow-hidden relative"
                style={{ background: scene.thumbnail }}
              >
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute inset-0 flex items-center justify-center bg-black/30"
                  >
                    <Check className="w-3.5 h-3.5 text-white drop-shadow" />
                  </motion.div>
                )}
              </div>
              {/* Emoji */}
              <span className="text-sm leading-none">{scene.emoji}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Selected label */}
      <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-muted/50 border border-border">
        <span className="text-lg">{selected.emoji}</span>
        <div>
          <p className="text-xs font-bold text-foreground">{selected.name}</p>
          <p className="text-[10px] text-muted-foreground">
            {selected.sceneType === "none" ? "No animation" : "Animated particles in demo"}
          </p>
        </div>
      </div>
    </div>
  );
}
