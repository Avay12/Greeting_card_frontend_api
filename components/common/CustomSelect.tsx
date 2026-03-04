"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, Check, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CustomSelectProps {
  options: { value: string; label: string }[];
  value: string | string[];
  onChange: (value: any) => void;
  placeholder?: string;
  className?: string;
  isMulti?: boolean;
}

export default function CustomSelect({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  className,
  isMulti = false,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    if (isMulti) {
      const currentValues = Array.isArray(value) ? value : [];
      const newValue = currentValues.includes(optionValue)
        ? currentValues.filter((v) => v !== optionValue)
        : [...currentValues, optionValue];
      onChange(newValue);
    } else {
      onChange(optionValue);
      setIsOpen(false);
    }
  };

  const removeValue = (e: React.MouseEvent, optionValue: string) => {
    e.stopPropagation();
    if (isMulti && Array.isArray(value)) {
      onChange(value.filter((v) => v !== optionValue));
    }
  };

  const getSelectedOptions = () => {
    if (isMulti) {
      const values = Array.isArray(value) ? value : [];
      return options.filter((opt) => values.includes(opt.value));
    }
    const selected = options.find((opt) => opt.value === value);
    return selected ? [selected] : [];
  };

  const selectedOptions = getSelectedOptions();

  return (
    <div className={cn("relative w-full", className)} ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center justify-between w-full min-h-[48px] px-4 py-2 bg-card border border-border rounded-xl text-left hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200 shadow-sm",
          isOpen && "border-primary ring-2 ring-primary/20",
        )}
      >
        <div className="flex flex-wrap gap-1.5 flex-1 min-w-0">
          {selectedOptions.length > 0 ? (
            isMulti ? (
              selectedOptions.map((opt) => (
                <motion.span
                  key={opt.value}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded-md"
                >
                  {opt.label}
                  <X
                    className="w-3 h-3 cursor-pointer hover:text-primary/70 transition-colors"
                    onClick={(e) => removeValue(e, opt.value)}
                  />
                </motion.span>
              ))
            ) : (
              <span className="truncate text-foreground font-medium">
                {selectedOptions[0].label}
              </span>
            )
          ) : (
            <span className="text-muted-foreground truncate">
              {placeholder}
            </span>
          )}
        </div>
        <ChevronDown
          className={cn(
            "w-5 h-5 ml-2 text-muted-foreground transition-transform duration-300 shrink-0",
            isOpen && "rotate-180",
          )}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            style={{ zIndex: 9999 }}
            className="absolute left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-xl overflow-hidden backdrop-blur-sm"
          >
            <div className="max-h-[280px] overflow-y-auto p-1 scrollbar-thin scrollbar-thumb-border">
              {options.length > 0 ? (
                options.map((option) => {
                  const isSelected = isMulti
                    ? Array.isArray(value) && value.includes(option.value)
                    : value === option.value;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleSelect(option.value)}
                      className={cn(
                        "flex items-center justify-between w-full px-3 py-2.5 text-sm text-left rounded-lg transition-colors group",
                        isSelected
                          ? "bg-primary/5 text-primary font-medium"
                          : "text-foreground hover:bg-muted",
                      )}
                    >
                      <span className="truncate">{option.label}</span>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                          }}
                        >
                          <Check className="w-4 h-4 text-primary shrink-0" />
                        </motion.div>
                      )}
                    </button>
                  );
                })
              ) : (
                <div className="px-4 py-8 text-center text-muted-foreground text-sm">
                  No options available
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
