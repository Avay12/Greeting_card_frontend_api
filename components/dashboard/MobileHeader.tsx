"use client";

import { useAuthStore } from "@/store/authStore";
import { Bell, Settings, Users, Info, LogOut, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function MobileHeader() {
  const { user, logout } = useAuthStore();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  return (
    <div className="flex md:hidden w-full items-center justify-between h-14 bg-[#fafaf9] border-b border-rose-100 px-4 fixed top-0 z-50">
      
      {/* Logo Left */}
      <Link href="/dashboard" className="flex items-center gap-2">
         <Image
            src="/logo.png"
            alt="JoyGreetly Logo"
            width={28}
            height={28}
            className="h-7 w-7 object-contain"
         />
         <span className="text-lg font-bold tracking-tight text-[#1c1917]">
            Joy<span className="text-[#f43f5e]">Greetly</span>
         </span>
      </Link>

      {/* Controls Right */}
      <div className="flex items-center gap-2 ml-auto">

        {/* Mobile Notifications */}
        <div className="relative">
          <button 
             className="relative p-2 hover:bg-rose-50 rounded-xl transition-colors text-stone-400 hover:text-[#f43f5e]" 
             onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
          >
            <Bell className="w-[22px] h-[22px]" />
            {/* Mock unread dot */}
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse border border-[#fafaf9]"></span>
          </button>
        </div>

        {/* Mobile User Profile Dropdown */}
        <div className="relative">
          <button
            className="inline-flex items-center justify-center p-1"
            type="button" 
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#f43f5e] to-[#fb7185] hover:opacity-90 transition-opacity flex items-center justify-center text-white shadow-md shadow-rose-200">
              <span className="text-sm font-bold">
                 {user?.name?.charAt(0).toUpperCase() || "U"}
              </span>
            </div>
          </button>

          {isProfileMenuOpen && (
             <>
                <div className="absolute right-0 top-full mt-2 w-56 overflow-hidden rounded-2xl border border-rose-100 bg-white shadow-xl z-50 animate-in fade-in slide-in-from-top-2">
                  
                  {/* User info header */}
                  <div className="px-4 py-3 bg-rose-50/50">
                    <p className="text-sm font-bold text-[#1c1917] truncate">{user?.name || 'User'}</p>
                    <p className="text-xs text-stone-400 truncate">{user?.email || 'user@joygreetly.com'}</p>
                  </div>

                  <div className="h-[1px] w-full bg-rose-100"></div>

                  {/* Settings Item */}
                  <Link 
                     href="/dashboard/settings" 
                     onClick={() => setIsProfileMenuOpen(false)}
                     className="flex items-center px-4 py-3 text-sm font-medium text-stone-500 transition-colors hover:bg-rose-50 hover:text-[#f43f5e]"
                  >
                    <Settings className="w-[18px] h-[18px] mr-3 text-stone-400" />
                    Settings
                  </Link>

                  {/* Cart Item */}
                  <Link 
                     href="/dashboard/cart" 
                     onClick={() => setIsProfileMenuOpen(false)}
                     className="flex items-center px-4 py-3 text-sm font-medium text-stone-500 transition-colors hover:bg-rose-50 hover:text-[#f43f5e]"
                  >
                    <ShoppingCart className="w-[18px] h-[18px] mr-3 text-stone-400" />
                    My Cart
                  </Link>

                  {/* Referrals Item */}
                  <Link 
                     href="/dashboard/referral" 
                     onClick={() => setIsProfileMenuOpen(false)}
                     className="flex items-center px-4 py-3 text-sm font-medium text-stone-500 transition-colors hover:bg-rose-50 hover:text-[#f43f5e]"
                  >
                    <Users className="w-[18px] h-[18px] mr-3 text-stone-400" />
                    Referrals
                  </Link>

                  {/* About Us Item */}
                  <Link 
                     href="/dashboard/about" 
                     onClick={() => setIsProfileMenuOpen(false)}
                     className="flex items-center px-4 py-3 text-sm font-medium text-stone-500 transition-colors hover:bg-rose-50 hover:text-[#f43f5e]"
                  >
                    <Info className="w-[18px] h-[18px] mr-3 text-stone-400" />
                    About Us
                  </Link>

                  <div className="h-[1px] w-full bg-rose-100"></div>

                  {/* Logout Item */}
                  <button 
                     onClick={() => {
                        logout();
                        setIsProfileMenuOpen(false);
                     }}
                     className="flex w-full items-center px-4 py-3 text-sm font-medium text-red-500 transition-colors hover:bg-red-50"
                  >
                    <LogOut className="w-[18px] h-[18px] mr-3" />
                    Logout
                  </button>
                </div>

                {/* Backdrop to close menu */}
                <div className="fixed inset-0 z-40" onClick={() => setIsProfileMenuOpen(false)}></div>
             </>
          )}
        </div>
      </div>
    </div>
  );
}
