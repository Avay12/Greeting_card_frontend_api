"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Link as LinkIcon,
  CreditCard,
  History,
  Users,
  Info,
  Settings,
  ShoppingCart,
  Plus
} from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();

  const links = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Generate Link", href: "/dashboard/generate-link", icon: LinkIcon },
    { name: "Card Links", href: "/dashboard/cards", icon: CreditCard },
    { name: "Payment", href: "/dashboard/payment", icon: History },
    { name: "Referral", href: "/dashboard/referral", icon: Users },
    { name: "About Us", href: "/dashboard/about", icon: Info },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
    { name: "Cart", href: "/dashboard/cart", icon: ShoppingCart },
  ];

  return (
    <aside className="fixed left-0 top-0 z-50 h-screen w-64 border-r border-rose-100 bg-[#fafaf9] transition-transform duration-300 ease-in-out md:translate-x-0 shadow-sm">
      <div className="flex h-full flex-col overflow-y-auto">
        
        {/* Logo Section */}
        <div className="p-6 pb-2">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="JoyGreetly Logo"
              width={32}
              height={32}
              className="h-8 w-8 object-contain"
            />
            <span className="text-xl font-bold tracking-tight text-[#1c1917]">
              Joy<span className="text-[#f43f5e]">Greetly</span>
            </span>
          </Link>
        </div>

        {/* Credit Block */}
        <div className="px-4 py-4">
          <div className="rounded-2xl bg-gradient-to-br from-[#f43f5e] to-[#fb7185] p-4 flex items-center justify-between shadow-lg shadow-rose-200/50">
            <div>
               <p className="text-[11px] font-medium text-white/70">Credit Balance</p>
               <p className="text-xl font-bold text-white leading-tight mt-0.5">$0.00</p>
            </div>
            
            <Link href="/dashboard/payment" className="flex-shrink-0">
               <button className="h-10 w-10 rounded-xl bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors border border-white/20 backdrop-blur-sm">
                  <Plus className="h-5 w-5" />
               </button>
            </Link>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-1 px-3 mt-4">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`group flex items-center rounded-xl px-4 py-3 text-[15px] font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-[#f43f5e] text-white shadow-md shadow-rose-200"
                    : "text-stone-500 hover:bg-rose-50 hover:text-[#f43f5e]"
                }`}
              >
                <Icon
                  className={`mr-3 h-5 w-5 flex-shrink-0 transition-colors duration-200 ${
                    isActive
                      ? "text-white"
                      : "text-stone-400 group-hover:text-[#f43f5e]"
                  }`}
                  aria-hidden="true"
                />
                {link.name}
              </Link>
            );
          })}
        </nav>
        
        <div className="p-4" />
      </div>
    </aside>
  );
}
