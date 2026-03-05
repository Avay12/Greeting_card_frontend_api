"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Wallet, History, TrendingUp, Plus, ShoppingCart } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import Link from "next/link";
import { useEffect, useState } from "react";

// Mock Data
const chartData = [
  { name: "Week 1", spent: 100 },
  { name: "Week 2", spent: 250 },
  { name: "Week 3", spent: 180 },
  { name: "Week 4", spent: 450 },
];

export default function DashboardOverview() {
  const { user } = useAuthStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="mx-auto max-w-6xl space-y-8 pb-12">
      
      {/* --- MOBILE VIEW --- */}
      <div className="space-y-6 block md:hidden">
        <div className="pt-2">
          <p className="text-stone-400 text-sm font-medium">Welcome back,</p>
          <h1 className="text-2xl font-black text-[#1c1917] tracking-tight">
            <span className="text-[#f43f5e]">{user?.name || 'User'}</span> 👋
          </h1>
        </div>

        {/* Mobile Wallet Hero Card */}
        <Link href="/dashboard/payment" className="block">
          <div className="bg-gradient-to-br from-[#f43f5e] to-[#fb7185] rounded-2xl p-5 text-white relative overflow-hidden shadow-lg shadow-rose-200">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative">
              <div className="flex items-center gap-2 mb-3">
                <Wallet className="w-5 h-5 text-white/90" />
                <span className="text-sm font-medium text-white/90">Wallet Balance</span>
              </div>
              <div className="flex items-end justify-between">
                <p className="text-3xl font-black tracking-tight flex items-start">
                  <span className="text-xl align-top mt-1 mr-0.5">$</span>0.00
                </p>
                <button className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-white/20 hover:bg-white/30 transition-colors h-9 px-4 text-sm font-bold text-white border-0 backdrop-blur-sm">
                  <Plus className="w-4 h-4" />
                  Add Funds
                </button>
              </div>
            </div>
          </div>
        </Link>

        {/* Mobile Mini Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white border border-rose-100 rounded-xl p-3 text-center shadow-sm">
            <History className="w-5 h-5 mx-auto mb-1.5 text-[#f43f5e]" />
            <p className="text-lg font-black text-[#1c1917]">0</p>
            <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400 mt-0.5">Total Cards</p>
          </div>
          
          <div className="bg-white border border-rose-100 rounded-xl p-3 text-center shadow-sm">
            <TrendingUp className="w-5 h-5 mx-auto mb-1.5 text-emerald-500" />
            <p className="text-lg font-black text-[#1c1917] flex items-start justify-center">
              <span className="text-[12px] align-top mt-1 mr-0.5">$</span>0.00
            </p>
            <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400 mt-0.5">Total Spend</p>
          </div>

          <Link href="/dashboard/cart" className="bg-white border border-rose-100 rounded-xl p-3 text-center shadow-sm block hover:bg-rose-50/50 transition-colors">
            <ShoppingCart className="w-5 h-5 mx-auto mb-1.5 text-[#f43f5e]" />
            <p className="text-lg font-black text-[#1c1917]">0</p>
            <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400 mt-0.5">Total Carts</p>
          </Link>
        </div>

        {/* Mobile Recent Activity */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#1c1917]">Recent Activity</h2>
          </div>
          <div className="bg-white border border-rose-100 rounded-2xl p-8 text-center shadow-sm">
            <History className="w-10 h-10 mx-auto mb-3 text-rose-200" />
            <p className="text-sm font-medium text-stone-400 mb-4">No activity yet</p>
            <Link href="/dashboard/generate-link">
              <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#f43f5e] hover:bg-[#e11d48] transition-colors h-10 px-5 text-sm font-bold text-white shadow-md shadow-rose-200">
                Browse Cards
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* --- DESKTOP VIEW --- */}
      {/* Welcome Header */}
      <div className="hidden md:block">
        <h1 className="text-3xl font-black text-[#1c1917] tracking-tight">
          Welcome back, <span className="text-[#f43f5e]">{user?.name || 'User'}</span>!
        </h1>
        <p className="mt-2 text-sm font-medium text-stone-400">
          Here's an overview of your account and quick actions.
        </p>
      </div>

      {/* Desktop Quick Stats Grid */}
      <div className="hidden md:grid gap-6 md:grid-cols-3">
        
        {/* Card 1: Wallet */}
        <div className="rounded-[2rem] border border-rose-100 bg-white shadow-sm flex flex-col justify-between overflow-hidden hover:shadow-md hover:shadow-rose-100 transition-shadow">
          <div className="p-8 pb-6 flex items-start justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-1">Wallet</p>
              <p className="text-3xl font-black text-[#1c1917]">$0.00</p>
            </div>
            <div className="flex-shrink-0 h-14 w-14 rounded-[1rem] bg-emerald-50 flex items-center justify-center border border-emerald-100">
              <Wallet className="h-6 w-6 text-emerald-500" />
            </div>
          </div>
          <div className="px-6 pb-6 mt-auto">
            <Link href="/dashboard/payment" className="block w-full">
              <button className="w-full flex justify-center items-center gap-2 rounded-xl bg-rose-50 border border-rose-100 py-3 text-sm font-bold text-[#f43f5e] hover:bg-rose-100 transition-colors">
                 <Plus className="h-4 w-4" /> Add Funds
              </button>
            </Link>
          </div>
        </div>

        {/* Card 2: Total Cards */}
        <div className="rounded-[2rem] border border-rose-100 bg-white shadow-sm flex flex-col justify-between overflow-hidden hover:shadow-md hover:shadow-rose-100 transition-shadow">
          <div className="p-8 pb-6 flex items-start justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-1">Total Cards</p>
              <p className="text-3xl font-black text-[#1c1917]">0</p>
            </div>
            <div className="flex-shrink-0 h-14 w-14 rounded-[1rem] bg-rose-50 flex items-center justify-center border border-rose-100">
              <History className="h-6 w-6 text-[#f43f5e]" />
            </div>
          </div>
          <div className="px-6 pb-6 mt-auto">
            <Link href="/dashboard/cards" className="block w-full">
               <button className="w-full flex justify-center items-center gap-2 rounded-xl bg-rose-50 border border-rose-100 py-3 text-sm font-bold text-[#f43f5e] hover:bg-rose-100 transition-colors">
                  View History <span className="text-base leading-none">→</span>
               </button>
            </Link>
          </div>
        </div>

        {/* Card 3: Total Spend */}
        <div className="rounded-[2rem] border border-rose-100 bg-white shadow-sm flex flex-col justify-between overflow-hidden hover:shadow-md hover:shadow-rose-100 transition-shadow">
          <div className="p-8 pb-6 flex items-start justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-1">Total Spend</p>
              <p className="text-3xl font-black text-[#1c1917]">$0.00</p>
            </div>
            <div className="flex-shrink-0 h-14 w-14 rounded-[1rem] bg-amber-50 flex items-center justify-center border border-amber-100">
              <svg className="h-6 w-6 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l2.4 7.4h7.6l-6.2 4.5 2.4 7.4-6.2-4.5-6.2 4.5 2.4-7.4-6.2-4.5h7.6z" />
              </svg>
            </div>
          </div>
          <div className="px-6 pb-6 mt-auto">
            <button className="w-full flex justify-center items-center gap-2 rounded-xl bg-rose-50 border border-rose-100 py-3 text-sm font-bold text-[#f43f5e] hover:bg-rose-100 transition-colors">
               View Perks <span className="text-base leading-none">→</span>
            </button>
          </div>
        </div>

      </div>

      {/* Analytics Chart Section */}
      <div className="hidden md:flex rounded-[2rem] border border-rose-100 bg-white shadow-sm overflow-hidden flex-col lg:flex-row">
        
        {/* Left Side: Chart */}
        <div className="p-8 lg:w-2/3 border-b lg:border-b-0 lg:border-r border-rose-100 flex flex-col">
          <div className="flex justify-between items-start mb-8">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-[0.8rem] bg-gradient-to-br from-[#f43f5e] to-[#fb7185] text-white flex items-center justify-center shadow-md shadow-rose-200">
                 <TrendingUp className="h-6 w-6" />
              </div>
              <div>
                 <h2 className="text-lg font-bold text-[#1c1917]">Growth Analytics</h2>
                 <p className="text-xs font-medium text-stone-400 mt-0.5">Last 30 days performance</p>
              </div>
            </div>
            <div className="text-right">
               <p className="text-2xl font-black text-[#f43f5e]">+0%</p>
               <p className="text-xs font-bold text-stone-400 mt-1 uppercase tracking-wider">↑ vs last month</p>
            </div>
          </div>

          <div className="h-[250px] w-full mt-auto">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorSpent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#a8a29e', fontSize: 12, fontWeight: 600}} 
                  dy={10} 
                />
                <YAxis 
                   hide={true}
                />
                <Tooltip
                  contentStyle={{ borderRadius: '1rem', border: '1px solid #ffe4e6', boxShadow: '0 10px 15px -3px rgb(244 63 94 / 0.08)', background: '#fff' }}
                  itemStyle={{ color: '#f43f5e', fontWeight: 800 }}
                  labelStyle={{ color: '#1c1917', fontWeight: 600, marginBottom: '4px' }}
                  formatter={(value) => [`$${value}`, "Amount"]}
                />
                <Area 
                  type="monotone" 
                  dataKey="spent" 
                  stroke="#f43f5e" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorSpent)" 
                  activeDot={{ r: 8, strokeWidth: 0, fill: '#f43f5e' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Side: Total Delivered */}
        <div className="p-8 lg:w-1/3 bg-rose-50/40 flex flex-col">
           <p className="text-sm font-bold text-stone-400 mb-8 uppercase tracking-widest">Total Delivered</p>
           
           <div className="flex-1 flex items-center justify-center min-h-[150px]">
              <p className="text-sm font-semibold text-stone-400">No completed orders yet</p>
           </div>
        </div>

      </div>
    </div>
  );
}
