"use client";

import { useState } from "react";
import { Copy, Gift, Users, CheckCircle2, DollarSign, Wallet, Tag } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

export default function ReferralPage() {
  const { user } = useAuthStore();
  const [isCopied, setIsCopied] = useState(false);
  const [friendCode, setFriendCode] = useState("");

  // Generate a mock referral link based on user ID or a random string
  const referralCode = user?.name ? user.name.toLowerCase().replace(/\s+/g, '') + '50' : 'user50';
  const referralLink = `https://joygreetly.com/join?ref=${referralCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  const handleApplyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (friendCode.trim() === "") return;
    alert(`Referral code ${friendCode} applied successfully!`);
    setFriendCode("");
  };

  return (
    <div className="mx-auto max-w-6xl space-y-8 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-[#1c1917]">Referrals</h1>
        <p className="mt-1 text-sm text-gray-500">Invite friends and earn 5% of their completed orders</p>
      </div>

      {/* Section 1: Top Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
         
         {/* Total Referrals */}
         <div className="rounded-[1.5rem] border border-[#EFEFEF] bg-white p-6 shadow-sm flex items-center gap-5">
           <div className="flex-shrink-0 h-14 w-14 rounded-[1rem] bg-[#2C3E50]/5 flex items-center justify-center border border-[#2C3E50]/10">
             <Users className="h-6 w-6 text-[#2C3E50]" />
           </div>
           <div>
             <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Total Referrals</p>
             <p className="mt-1 text-2xl font-black text-[#2C3E50]">0</p>
           </div>
         </div>

         {/* Total Earnings */}
         <div className="rounded-[1.5rem] border border-[#EFEFEF] bg-white p-6 shadow-sm flex items-center gap-5">
           <div className="flex-shrink-0 h-14 w-14 rounded-[1rem] bg-green-500/10 flex items-center justify-center border border-green-500/20">
             <DollarSign className="h-6 w-6 text-green-600" />
           </div>
           <div>
             <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Total Earnings</p>
             <p className="mt-1 text-2xl font-black text-[#2C3E50]">$0.00</p>
           </div>
         </div>

         {/* Referral Balance */}
         <div className="rounded-[1.5rem] border border-[#EFEFEF] bg-white p-6 shadow-sm flex items-center gap-5">
           <div className="flex-shrink-0 h-14 w-14 rounded-[1rem] bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
             <Wallet className="h-6 w-6 text-blue-600" />
           </div>
           <div>
             <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Referral Balance</p>
             <p className="mt-1 text-2xl font-black text-[#2C3E50]">$0.00</p>
           </div>
         </div>

         {/* Commission Rate */}
         <div className="rounded-[1.5rem] border border-[#EFEFEF] bg-white p-6 shadow-sm flex items-center gap-5">
           <div className="flex-shrink-0 h-14 w-14 rounded-[1rem] bg-[#E67E22]/10 flex items-center justify-center border border-[#E67E22]/20">
             <Gift className="h-6 w-6 text-[#E67E22]" />
           </div>
           <div>
             <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Commission Rate</p>
             <p className="mt-1 text-2xl font-black text-[#2C3E50]">5%</p>
           </div>
         </div>

      </div>

      {/* Section 2: Have a Referral Code? */}
      <div className="rounded-[2rem] border border-[#EFEFEF] bg-white shadow-sm overflow-hidden p-8">
         <div className="flex items-center gap-3 mb-2">
            <Tag className="h-6 w-6 text-[#2C3E50]" />
            <h2 className="text-xl font-bold text-[#2C3E50]">Have a Referral Code?</h2>
         </div>
         <p className="text-sm text-gray-500 mb-6">Enter a friend's referral code to link your account</p>

         <form onSubmit={handleApplyCode} className="flex flex-col sm:flex-row gap-4 mb-4">
            <input 
              type="text" 
              value={friendCode}
              onChange={(e) => setFriendCode(e.target.value)}
              placeholder="ENTER REFERRAL CODE"
              className="flex-1 bg-rose-50/60 border-2 border-transparent rounded-[1.25rem] py-4 px-6 text-sm font-bold text-[#1c1917] focus:bg-white focus:border-rose-300 focus:ring-4 focus:ring-rose-100 outline-none transition-all placeholder:text-stone-400"
            />
            <button 
              type="submit"
              className="rounded-[1.25rem] bg-[#f43f5e] px-8 py-4 text-sm font-bold text-white shadow-lg shadow-rose-200 hover:bg-[#e11d48] transition-all hover:-translate-y-0.5 whitespace-nowrap"
            >
              Apply
            </button>
         </form>
         <p className="text-sm text-gray-400">You can only use a referral code once, and it can't be changed after applying.</p>
      </div>

      {/* Section 3: Your Referral Link */}
      <div className="rounded-[2rem] border border-[#EFEFEF] bg-white shadow-sm overflow-hidden p-8">
         <h2 className="text-xl font-bold text-[#2C3E50] mb-2">Your Referral Link</h2>
         <p className="text-sm text-gray-500 mb-6">Share this link with friends. When they place orders, you earn 5% commission!</p>

         <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <input 
              type="text" 
              readOnly
              value={referralLink}
              className="flex-1 bg-rose-50/40 border-2 border-rose-100 rounded-[1.25rem] py-4 px-6 text-sm font-semibold text-stone-500 focus:outline-none"
            />
            <button 
              onClick={handleCopy}
              className={`flex items-center justify-center rounded-[1.25rem] px-8 py-4 text-sm font-bold text-white shadow-sm transition-all sm:w-auto whitespace-nowrap border ${
                isCopied 
                  ? 'bg-green-50 border-green-200 text-green-700 shadow-none' 
                  : 'bg-white border-[#EFEFEF] text-[#2C3E50] hover:bg-gray-50'
              }`}
            >
              {isCopied ? (
                <>
                  <CheckCircle2 className="mr-2 h-5 w-5" /> Copied!
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-5 w-5" /> Copy
                </>
              )}
            </button>
         </div>
         
         <div className="flex items-center text-sm font-medium text-gray-500">
            Your referral code: 
            <span className="ml-2 bg-[#F4F0EB] text-[#2C3E50] font-bold px-3 py-1 rounded-lg border border-[#EFEFEF]">
              {referralCode}
            </span>
         </div>
      </div>

      {/* Section 4: How It Works */}
      <div className="rounded-[2rem] border border-[#EFEFEF] bg-white shadow-sm overflow-hidden p-8">
         <h2 className="text-xl font-bold text-[#2C3E50] mb-10">How It Works</h2>
         
         <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connecting Line for Desktop */}
            <div className="hidden md:block absolute top-[28px] left-[12%] right-[12%] h-0.5 bg-[#EFEFEF] z-0"></div>

            {/* Step 1 */}
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#f43f5e] to-[#fb7185] text-white flex items-center justify-center text-xl font-black mb-5 shadow-lg shadow-rose-200 border-4 border-white">
                1
              </div>
              <h3 className="text-base font-bold text-[#2C3E50] mb-2">Share Your Link</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Send your unique referral link to friends</p>
            </div>

            {/* Step 2 */}
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#f43f5e] to-[#fb7185] text-white flex items-center justify-center text-xl font-black mb-5 shadow-lg shadow-rose-200 border-4 border-white">
                2
              </div>
              <h3 className="text-base font-bold text-[#2C3E50] mb-2">Friend Signs Up</h3>
              <p className="text-sm text-gray-500 leading-relaxed">They create an account using your link</p>
            </div>

            {/* Step 3 */}
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#f43f5e] to-[#fb7185] text-white flex items-center justify-center text-xl font-black mb-5 shadow-lg shadow-rose-200 border-4 border-white">
                3
              </div>
              <h3 className="text-base font-bold text-[#2C3E50] mb-2">They Order</h3>
              <p className="text-sm text-gray-500 leading-relaxed">When they place orders, you earn commission</p>
            </div>

            {/* Step 4 */}
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#f43f5e] to-[#fb7185] text-white flex items-center justify-center text-xl font-black mb-5 shadow-lg shadow-rose-200 border-4 border-white">
                4
              </div>
              <h3 className="text-base font-bold text-[#2C3E50] mb-2">Request Payout</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Once you reach $5, request a payout via ticket</p>
            </div>
         </div>
      </div>

      {/* Section 5: Referral Rules */}
      <div className="rounded-[2rem] border border-[#EFEFEF] bg-white shadow-sm overflow-hidden p-8">
         <h2 className="text-xl font-bold text-[#2C3E50] mb-6">Referral Rules</h2>
         <ul className="space-y-3">
           <li className="flex items-start text-sm text-gray-500">
             <span className="mr-3 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#f43f5e]"></span>
             <span className="font-medium">Earn 5% commission on every completed order from referred users.</span>
           </li>
           <li className="flex items-start text-sm text-gray-500">
             <span className="mr-3 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#f43f5e]"></span>
             <span className="font-medium">Referral earnings are added to a separate referral balance.</span>
           </li>
           <li className="flex items-start text-sm text-gray-500">
             <span className="mr-3 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#f43f5e]"></span>
             <span className="font-medium">Minimum $5 required to request a payout.</span>
           </li>
           <li className="flex items-start text-sm text-gray-500">
             <span className="mr-3 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#f43f5e]"></span>
             <span className="font-medium">To receive payout, submit a request and an admin will process it.</span>
           </li>
           <li className="flex items-start text-sm text-gray-500">
             <span className="mr-3 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-300"></span>
             <span className="font-medium">No commission for cancelled, failed, or refunded orders.</span>
           </li>
           <li className="flex items-start text-sm text-gray-500">
             <span className="mr-3 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-300"></span>
             <span className="font-medium">Self-referrals are not allowed.</span>
           </li>
         </ul>
      </div>

    </div>
  );
}
