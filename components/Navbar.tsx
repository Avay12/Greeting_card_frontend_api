"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingBag, Menu, X, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useStore } from "@/store/useStore";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/categories/valentine", label: "Valentine" },
  { href: "/categories/wedding", label: "Wedding" },
  { href: "/categories", label: "Occasions" },
  { href: "/about", label: "About Us" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const cart = useStore((state) => state.cart);
  const favorites = useStore((state) => state.favorites);
  const setSearchOpen = useStore((state) => state.setSearchOpen);

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 flex flex-col items-center pointer-events-none",
        isScrolled ? "pt-4 px-4" : "pt-0 px-0",
      )}
    >
      <div
        className={cn(
          "pointer-events-auto w-full flex items-center justify-between transition-all duration-500",
          isScrolled
            ? "max-w-5xl glass bg-white/70 backdrop-blur-md shadow-lg rounded-full py-3 px-6 md:px-8 border border-white/40"
            : "max-w-full bg-transparent py-5 px-4 md:px-8",
        )}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <motion.div
            whileHover={{ rotate: 15 }}
            className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold"
          >
            G
          </motion.div>
          <span className="font-heading font-bold text-xl tracking-tight hidden sm:block">
            Greeting<span className="text-primary">Joy</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative text-sm font-medium transition-colors hover:text-primary",
                  isActive ? "text-primary" : "text-foreground/80",
                )}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-3 md:gap-4">
          <button
            className="p-2 text-foreground/80 hover:text-primary transition-colors hidden sm:block"
            onClick={() => setSearchOpen(true)}
          >
            <Search className="w-5 h-5" />
          </button>
          <Link
            href="/favorites"
            className="p-2 text-foreground/80 hover:text-primary transition-colors hidden sm:block relative"
          >
            <Heart className="w-5 h-5" />
            {isMounted && favorites.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-primary text-[10px] font-bold text-white flex items-center justify-center">
                {favorites.length}
              </span>
            )}
          </Link>
          <Link
            href="/cart"
            className="p-2 text-foreground/80 hover:text-primary transition-colors relative"
          >
            <ShoppingBag className="w-5 h-5" />
            {isMounted && cartItemCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-primary text-[10px] font-bold text-white flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className="p-2 md:hidden text-foreground/80 hover:text-primary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            className={cn(
              "md:hidden pointer-events-auto w-full transition-all duration-300 overflow-hidden",
              isScrolled
                ? "max-w-5xl mt-2 glass bg-white/70 backdrop-blur-md shadow-lg rounded-[2rem] border border-white/40"
                : "glass border-t mt-3",
            )}
          >
            <nav className="p-4 flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "block px-4 py-3 rounded-xl text-sm font-medium transition-colors hover:bg-muted/80",
                    pathname === link.href
                      ? "bg-muted text-primary"
                      : "text-foreground/80",
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex gap-4 px-4 pt-4 border-t mt-2">
                <button className="flex items-center gap-2 text-sm text-foreground/80 hover:text-primary">
                  <Search className="w-4 h-4" /> Search
                </button>
                <button className="flex items-center gap-2 text-sm text-foreground/80 hover:text-primary">
                  <Heart className="w-4 h-4" /> Favorites
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
