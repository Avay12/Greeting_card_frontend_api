"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Gift,
  Smile,
  Heart,
  Gem,
  PartyPopper,
  Snowflake,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  {
    name: "Valentine",
    slug: "valentine",
    description:
      "Express your love with romantic cards and invitations for your special someone.",
    icon: Heart,
    image:
      "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=400&h=400",
    bgColor: "bg-[#fff1f2]", // Soft pink/rose
    iconColor: "text-[#e11d48]",
    hoverColor: "group-hover:text-[#e11d48]",
  },
  {
    name: "Birthday",
    slug: "birthdays",
    description:
      "Celebrate another trip around the sun with our beautiful birthday cards.",
    icon: Gift,
    image:
      "https://images.unsplash.com/photo-1583847268964-b28e50b58257?auto=format&fit=crop&q=80&w=400&h=400",
    bgColor: "bg-[#ffebee]", // Soft red/pink
    iconColor: "text-[#ef5350]",
    hoverColor: "group-hover:text-[#ef5350]",
  },
  {
    name: "Wedding",
    slug: "wedding",
    description: "Elegant invitations and cards for the most beautiful unions.",
    icon: Gem,
    image:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=400&h=400",
    bgColor: "bg-[#fff8e1]", // Soft amber/cream
    iconColor: "text-[#ffca28]",
    hoverColor: "group-hover:text-[#ffca28]",
  },
  {
    name: "Thank You",
    slug: "thank-you",
    description: "Express gratitude with elegance. Cards that say it all.",
    icon: Smile,
    image:
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=400&h=400",
    bgColor: "bg-[#e8eaf6]", // Lavender
    iconColor: "text-[#5c6bc0]",
    hoverColor: "group-hover:text-[#5c6bc0]",
  },
  {
    name: "Congratulations",
    slug: "congratulations",
    description: "Mark achievements and milestones in style.",
    icon: PartyPopper,
    image:
      "https://images.unsplash.com/photo-1516244671391-62ecafdcabf7?auto=format&fit=crop&q=80&w=400&h=400",
    bgColor: "bg-[#e0f2f1]", // Soft mint
    iconColor: "text-[#26a69a]",
    hoverColor: "group-hover:text-[#26a69a]",
  },
  {
    name: "Seasonal",
    slug: "seasonal",
    description: "Holiday and seasonal greetings for every time of year.",
    icon: Snowflake,
    image:
      "https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&q=80&w=400&h=400",
    bgColor: "bg-[#e3f2fd]", // Light blue
    iconColor: "text-[#42a5f5]",
    hoverColor: "group-hover:text-[#42a5f5]",
  },
];

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl mx-auto mb-16 md:mb-24"
      >
        <p className="text-[#e26b58] font-bold tracking-widest text-sm uppercase mb-4">
          BROWSE BY OCCASION
        </p>
        <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6 text-foreground">
          Occasions
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground">
          Find the perfect card or invitation for every moment and{" "}
          <br className="hidden md:block" /> milestone.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {CATEGORIES.map((category, i) => {
          const Icon = category.icon;
          return (
            <motion.div
              key={category.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                href={`/categories/${category.slug}`}
                className={cn(
                  "group block relative overflow-hidden rounded-[2rem] p-8 md:p-10 transition-all hover:shadow-2xl hover:-translate-y-2 border border-black/5 h-full min-h-[320px] flex flex-col",
                  category.bgColor,
                )}
              >
                {/* Decorative Image Snippet Top Right */}
                <div className="absolute top-0 right-0 w-32 h-40 opacity-80 mix-blend-multiply pointer-events-none overflow-hidden rounded-bl-3xl z-0 transition-opacity group-hover:opacity-100">
                  <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-transparent to-white/50 z-10" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/50 z-10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/50 z-10" />
                  <Image
                    src={category.image}
                    alt=""
                    fill
                    className="object-cover object-right-top opacity-50 transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                <div className="relative z-20 flex flex-col flex-1">
                  {/* Icon Box */}
                  <div className="w-14 h-14 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-white flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 group-hover:shadow-md">
                    <Icon className={cn("w-6 h-6", category.iconColor)} />
                  </div>

                  {/* Text Content */}
                  <div className="mt-auto">
                    <h2
                      className={cn(
                        "font-heading text-2xl md:text-3xl font-bold text-foreground mb-4 transition-colors",
                        category.hoverColor,
                      )}
                    >
                      {category.name}
                    </h2>
                    <p className="text-muted-foreground/90 leading-relaxed text-sm md:text-base pr-4">
                      {category.description}
                    </p>

                    {/* Hover Link */}
                    <div
                      className={cn(
                        "mt-8 flex items-center text-xs font-bold tracking-widest uppercase opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300",
                        category.iconColor,
                      )}
                    >
                      View Cards <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
