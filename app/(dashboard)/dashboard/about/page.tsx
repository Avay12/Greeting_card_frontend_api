"use client";

import { 
  Instagram, 
  Send, 
  MessageCircle, 
  Zap, 
  ShieldCheck, 
  Clock, 
  Headphones, 
  Mail, 
  PhoneCall, 
  MapPin
} from "lucide-react";

export default function AboutUsPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 pb-12">
      
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#1c1917]">About Us</h1>
        <p className="mt-1 text-sm text-gray-500">Learn more about JoyGreetly and our mission</p>
      </div>

      {/* Section 1: Our Mission Banner */}
      <div className="rounded-[2rem] bg-gradient-to-r from-[#f43f5e] to-[#fb7185] p-8 md:p-10 text-white shadow-lg shadow-rose-200">
        <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
        <p className="text-white/90 text-[15px] leading-relaxed max-w-4xl">
          We help users, creators, and businesses share their joyous occasions online. Our platform provides reliable services to generate custom viewing links, track performance, and easily share greetings — all with exceptional quality and 24/7 support.
        </p>
      </div>

      {/* Section 2: Value Props Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        {/* Fastest Setup */}
        <div className="rounded-[1.5rem] border border-[#EFEFEF] bg-white p-6 shadow-sm flex flex-col items-center text-center transition-all hover:shadow-md">
          <div className="flex-shrink-0 h-12 w-12 rounded-[1rem] bg-amber-500/10 flex items-center justify-center border border-amber-500/20 mb-4">
            <Zap className="h-5 w-5 text-amber-500" />
          </div>
          <h3 className="font-bold text-[#1c1917] mb-1">Fastest Setup</h3>
          <p className="text-xs text-gray-500">Links generated in seconds</p>
        </div>

        {/* Secure & Safe */}
        <div className="rounded-[1.5rem] border border-[#EFEFEF] bg-white p-6 shadow-sm flex flex-col items-center text-center transition-all hover:shadow-md">
          <div className="flex-shrink-0 h-12 w-12 rounded-[1rem] bg-green-500/10 flex items-center justify-center border border-green-500/20 mb-4">
            <ShieldCheck className="h-5 w-5 text-green-500" />
          </div>
          <h3 className="font-bold text-[#1c1917] mb-1">Secure & Safe</h3>
          <p className="text-xs text-gray-500">Your data safety is priority</p>
        </div>

        {/* 24/7 Support */}
        <div className="rounded-[1.5rem] border border-[#EFEFEF] bg-white p-6 shadow-sm flex flex-col items-center text-center transition-all hover:shadow-md">
          <div className="flex-shrink-0 h-12 w-12 rounded-[1rem] bg-blue-500/10 flex items-center justify-center border border-blue-500/20 mb-4">
            <Clock className="h-5 w-5 text-blue-500" />
          </div>
          <h3 className="font-bold text-[#1c1917] mb-1">24/7 Support</h3>
          <p className="text-xs text-gray-500">Always here to help you</p>
        </div>

        {/* Reliable Service */}
        <div className="rounded-[1.5rem] border border-[#EFEFEF] bg-white p-6 shadow-sm flex flex-col items-center text-center transition-all hover:shadow-md">
          <div className="flex-shrink-0 h-12 w-12 rounded-[1rem] bg-purple-500/10 flex items-center justify-center border border-purple-500/20 mb-4">
            <Headphones className="h-5 w-5 text-purple-500" />
          </div>
          <h3 className="font-bold text-[#1c1917] mb-1">Reliable Service</h3>
          <p className="text-xs text-gray-500">High-quality results</p>
        </div>

      </div>

      {/* Section 3: What We Offer */}
      <div className="rounded-[2rem] border border-[#EFEFEF] bg-white p-8 shadow-sm">
        <h2 className="text-xl font-bold text-[#1c1917] mb-1">What We Offer</h2>
        <p className="text-sm text-gray-500 mb-6">Comprehensive card generation tools</p>

        <div className="grid md:grid-cols-2 gap-4">
          
          <div className="rounded-xl bg-rose-50/60 p-6 border border-rose-100/50">
            <h3 className="font-bold text-[#1c1917] mb-2">Custom Occasions</h3>
            <p className="text-sm text-gray-500">Create beautiful viewing links for Birthdays, Graduations, Anniversaries, and all special events.</p>
          </div>

          <div className="rounded-xl bg-rose-50/60 p-6 border border-rose-100/50">
            <h3 className="font-bold text-[#1c1917] mb-2">Link Generation</h3>
            <p className="text-sm text-gray-500">Seamless, instant creation of trackable preview links to share across any social network or message.</p>
          </div>

          <div className="rounded-xl bg-rose-50/60 p-6 border border-rose-100/50">
            <h3 className="font-bold text-[#1c1917] mb-2">Performance Tracking</h3>
            <p className="text-sm text-gray-500">Track link clicks, status, and overall engagement performance from your central dashboard.</p>
          </div>

          <div className="rounded-xl bg-rose-50/60 p-6 border border-rose-100/50">
            <h3 className="font-bold text-[#1c1917] mb-2">Wallet System</h3>
            <p className="text-sm text-gray-500">Secure deposits and a seamless payout request system for your earned referral commissions.</p>
          </div>

        </div>
      </div>

      {/* Section 4: Contact & Support */}
      <div className="rounded-[2rem] border border-[#EFEFEF] bg-white p-8 shadow-sm">
        <h2 className="text-xl font-bold text-[#1c1917] mb-1">Contact & Support</h2>
        <p className="text-sm text-gray-500 mb-8">We're here to help you 24/7</p>

        <div className="space-y-6">
          
          <div className="flex items-start">
            <div className="flex-shrink-0 h-10 w-10 mt-1 rounded-full bg-rose-50 flex items-center justify-center">
               <Mail className="h-4 w-4 text-[#f43f5e]" />
            </div>
            <div className="ml-4">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Email</p>
              <p className="text-[15px] font-semibold text-[#1c1917]">support@joygreetly.com</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex-shrink-0 h-10 w-10 mt-1 rounded-full bg-rose-50 flex items-center justify-center">
               <PhoneCall className="h-4 w-4 text-[#f43f5e]" />
            </div>
            <div className="ml-4">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Phone</p>
              <p className="text-[15px] font-semibold text-[#2C3E50]">+1 (865) 419-0943</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex-shrink-0 h-10 w-10 mt-1 rounded-full bg-rose-50 flex items-center justify-center">
               <MapPin className="h-4 w-4 text-[#f43f5e]" />
            </div>
            <div className="ml-4">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Address</p>
              <p className="text-[15px] font-semibold text-[#2C3E50]">1111 Leisure Lane, Santa Barbara, California</p>
            </div>
          </div>

        </div>

        {/* Social Links Row */}
        <div className="mt-8 pt-6 border-t border-[#EFEFEF] flex flex-wrap gap-4">
          <a
            href="#"
            className="flex items-center rounded-xl bg-rose-50 border border-rose-100 px-5 py-3 text-sm font-semibold text-[#1c1917] transition-colors hover:bg-white hover:border-rose-200 shadow-sm"
          >
            <Instagram className="mr-2 h-4 w-4 text-pink-500" />
            Instagram
          </a>
          <a
            href="#"
            className="flex items-center rounded-xl bg-rose-50 border border-rose-100 px-5 py-3 text-sm font-semibold text-[#1c1917] transition-colors hover:bg-white hover:border-rose-200 shadow-sm"
          >
            <Send className="mr-2 h-4 w-4 text-blue-500" />
            Telegram
          </a>
          <a
            href="#"
            className="flex items-center rounded-xl bg-rose-50 border border-rose-100 px-5 py-3 text-sm font-semibold text-[#1c1917] transition-colors hover:bg-white hover:border-rose-200 shadow-sm"
          >
            <MessageCircle className="mr-2 h-4 w-4 text-green-500" />
            WhatsApp
          </a>
        </div>

        {/* 24/7 Support Banner */}
        <div className="mt-8 rounded-xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 p-5">
           <h4 className="font-bold text-emerald-700">24/7 Support Available</h4>
           <p className="text-sm font-medium text-emerald-600/80 mt-1">We typically respond within a few hours</p>
        </div>

      </div>

    </div>
  );
}
