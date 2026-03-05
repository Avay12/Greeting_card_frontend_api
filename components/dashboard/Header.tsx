"use client";

import { useAuthStore } from "@/store/authStore";
import { Bell, Menu, Settings, ShoppingCart, LogOut, ChevronDown, User } from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export function Header() {
  const { user, logout } = useAuthStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const initials = user?.name?.charAt(0).toUpperCase() || "U";

  return (
    <header className="fixed top-0 z-40 w-full md:w-[calc(100%-16rem)] bg-[#fafaf9]/90 backdrop-blur-xl border-b border-rose-100 shadow-sm">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Left: Mobile Menu toggle */}
        <div className="flex items-center md:hidden">
          <button className="p-2 rounded-xl text-stone-400 hover:bg-rose-50 hover:text-[#f43f5e] transition-all">
            <Menu className="h-5 w-5" />
          </button>
        </div>

        {/* Left: Page Title (desktop) */}
        <div className="hidden md:flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-[#f43f5e] animate-pulse" />
          <p className="text-sm font-bold text-stone-400 tracking-widest uppercase">Dashboard</p>
        </div>

        {/* Right: Controls */}
        <div className="flex items-center gap-3 ml-auto">

          {/* Notification Bell */}
          <button className="relative h-9 w-9 flex items-center justify-center rounded-xl bg-rose-50 text-stone-400 hover:bg-rose-100 hover:text-[#f43f5e] transition-all group">
            <Bell className="h-4 w-4" />
            {/* Notification Dot */}
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-[#fafaf9] animate-pulse"></span>
          </button>

          {/* Divider */}
          <div className="h-6 w-px bg-rose-100 hidden sm:block" />

          {/* Profile Dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2.5 pl-1 pr-3 py-1 rounded-2xl hover:bg-rose-50 transition-all group"
            >
              {/* Avatar */}
              <div className="h-9 w-9 flex-shrink-0 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#f43f5e] to-[#fb7185] text-white font-black text-sm shadow-md shadow-rose-200">
                {initials}
              </div>

              {/* Name & Role (desktop) */}
              <div className="hidden md:block text-left">
                <p className="text-sm font-bold text-[#1c1917] leading-tight">
                  {user?.name || "User"}
                </p>
                <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest leading-tight">
                  {user?.role === "admin" ? "Administrator" : "Member"}
                </p>
              </div>

              <ChevronDown
                className={`h-3.5 w-3.5 text-stone-400 hidden md:block transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Dropdown */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-3 w-64 origin-top-right rounded-2xl border border-rose-100 bg-white shadow-2xl shadow-rose-100/50 overflow-hidden ring-1 ring-rose-50">

                {/* User Info Block */}
                <div className="flex items-center gap-4 p-5 bg-gradient-to-br from-rose-50 to-white border-b border-rose-100">
                  <div className="h-12 w-12 flex-shrink-0 flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#f43f5e] to-[#fb7185] text-white font-black text-lg shadow-lg shadow-rose-200">
                    {initials}
                  </div>
                  <div className="overflow-hidden">
                    <p className="font-bold text-[#1c1917] truncate">{user?.name || "User"}</p>
                    <p className="text-xs text-stone-400 truncate mt-0.5">{user?.email || "user@joygreetly.com"}</p>
                    <span className="mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-50 text-[#f43f5e] text-[10px] font-black uppercase tracking-widest">
                      {user?.role === "admin" ? "Admin" : "Member"}
                    </span>
                  </div>
                </div>

                {/* Links */}
                <div className="p-2 space-y-1">
                  <Link
                    href="/dashboard/settings"
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center gap-3.5 rounded-xl px-4 py-3 text-sm font-semibold text-stone-500 hover:bg-rose-50 hover:text-[#f43f5e] transition-all group"
                  >
                    <div className="h-8 w-8 flex items-center justify-center rounded-lg bg-stone-100 group-hover:bg-rose-100 transition-colors">
                      <Settings className="h-4 w-4 text-stone-400 group-hover:text-[#f43f5e]" />
                    </div>
                    Profile Settings
                  </Link>

                  <Link
                    href="/dashboard/cart"
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center gap-3.5 rounded-xl px-4 py-3 text-sm font-semibold text-stone-500 hover:bg-rose-50 hover:text-[#f43f5e] transition-all group"
                  >
                    <div className="h-8 w-8 flex items-center justify-center rounded-lg bg-stone-100 group-hover:bg-rose-100 transition-colors">
                      <ShoppingCart className="h-4 w-4 text-stone-400 group-hover:text-[#f43f5e]" />
                    </div>
                    My Cart
                  </Link>
                </div>

                {/* Logout */}
                <div className="p-2 border-t border-rose-100">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3.5 rounded-xl px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 transition-all group"
                  >
                    <div className="h-8 w-8 flex items-center justify-center rounded-lg bg-red-50 group-hover:bg-red-100 transition-colors">
                      <LogOut className="h-4 w-4 text-red-400" />
                    </div>
                    Log Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
