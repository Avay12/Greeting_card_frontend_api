"use client";

import { useState } from "react";
import { CreditCard, Wallet, ArrowDownCircle, ArrowUpCircle, ShieldCheck, Zap, Info } from "lucide-react";

// Mock Data
const transactions = [
  { id: "TXN-98231", amount: "$500.00", status: "Completed", date: "2024-03-18", type: "deposit" },
  { id: "TXN-98230", amount: "$120.50", status: "Completed", date: "2024-03-15", type: "withdrawal" },
  { id: "TXN-98229", amount: "$50.00", status: "Pending", date: "2024-03-14", type: "deposit" },
  { id: "TXN-98228", amount: "$1,200.00", status: "Completed", date: "2024-03-01", type: "deposit" },
];

export default function PaymentPage() {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("card");

  return (
    <div className="mx-auto max-w-6xl space-y-8 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-[#1c1917]">Wallet</h1>
        <p className="mt-1 text-sm text-gray-500">Manage your balance and deposit funds using your preferred method.</p>
      </div>

      {/* Top Section: Wallet & Add Balance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        
        {/* === MOBILE WALLET CARD (Hidden on Desktop) === */}
        <div className="md:hidden rounded-2xl bg-gradient-to-br from-[#f43f5e] to-[#fb7185] p-5 flex flex-col shadow-md shadow-rose-200 relative overflow-hidden">
          {/* Decorative background shapes */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />

          <div className="flex items-center gap-3 mb-6 relative z-10">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center border border-white/20">
              <Wallet className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-white/90 -mb-1">Available Balance</span>
              <span className="text-2xl font-black text-white tracking-tight">$ 0.00</span>
            </div>
          </div>
          
          <button className="relative z-10 w-full rounded-2xl bg-white/10 border border-white/20 py-3.5 text-sm font-bold text-white transition-transform active:scale-95 hover:bg-white/20 backdrop-blur-sm">
            Refresh Balance
          </button>
        </div>

        {/* === DESKTOP WALLET CARD (Hidden on Mobile) === */}
        <div className="hidden md:flex md:col-span-1 rounded-[2rem] bg-gradient-to-br from-[#f43f5e] to-[#fb7185] text-white p-8 flex-col justify-between shadow-lg shadow-rose-200 min-h-[300px] relative overflow-hidden">
          {/* Decorative background shapes */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-inner border border-white/20">
                <Wallet className="h-6 w-6 text-white" />
              </div>
              <span className="text-sm font-semibold tracking-wide text-white/90">Available Balance</span>
            </div>
            <p className="text-5xl font-black tracking-tight">$0.00</p>
          </div>

          <button className="relative z-10 w-full rounded-xl bg-white/10 backdrop-blur-md border border-white/20 py-4 text-sm font-bold text-white shadow-sm hover:bg-white/20 transition-all active:scale-95">
            Refresh Balance
          </button>
        </div>

        {/* Add Balance Form (Right - 2/3) */}
        <div className="md:col-span-2 rounded-[2rem] border border-[#EFEFEF] bg-white shadow-sm overflow-hidden flex flex-col">
          <div className="p-8 pb-6 border-b border-[#EFEFEF]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center">
                 <svg className="h-5 w-5 text-[#f43f5e]" viewBox="0 0 24 24" fill="currentColor">
                   <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm2.5-11h-3.5V7.5c0-.276-.224-.5-.5-.5s-.5.224-.5.5V9H8.5c-.276 0-.5.224-.5.5s.224.5.5.5h1.5v3h-1.5c-.276 0-.5.224-.5.5s.224.5.5.5h1.5v1.5c0 .276.224.5.5.5s.5-.224.5-.5V15h3.5c1.378 0 2.5-1.122 2.5-2.5 0-1.125-.745-2.073-1.786-2.392C14.156 9.873 14.5 9.176 14.5 8.5 14.5 7.122 13.378 6 12 6c-.276 0-.5.224-.5.5V7.5h1C13.051 7.5 13.5 7.949 13.5 8.5S13.051 9.5 12.5 9.5H10v4h2.5c.827 0 1.5-.673 1.5-1.5s-.673-1.5-1.5-1.5h-1c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h2c.827 0 1.5.673 1.5 1.5S13.327 13 12.5 13H10v1h2.5c1.378 0 2.5 1.122 2.5 2.5s-1.122 2.5-2.5 2.5H12" />
                 </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#1c1917]">Add Balance</h2>
                <p className="text-sm text-gray-500 flex items-center gap-2">
                  Pay with Crypto or Card
                </p>
              </div>
            </div>
          </div>
          
          <form className="p-8 flex-1 flex flex-col justify-between" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-6">
              {/* Amount Input */}
              <div>
                 <label htmlFor="amount" className="block text-xs font-bold uppercase tracking-widest text-[#1c1917] mb-2">Amount (USD)</label>
                 <div className="relative">
                   <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                     <span className="text-gray-400 font-bold">$</span>
                   </div>
                   <input
                     type="number"
                     id="amount"
                     className="w-full bg-rose-50/60 border-2 border-transparent rounded-[1.25rem] py-4 pl-8 text-sm font-bold text-[#1c1917] focus:bg-white focus:border-rose-300 focus:ring-4 focus:ring-rose-100 outline-none transition-all placeholder:text-stone-400"
                     placeholder="Enter amount (min $1)"
                     value={amount}
                     onChange={(e) => setAmount(e.target.value)}
                   />
                 </div>
              </div>

               {/* Payment Method Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-[#2C3E50] mb-2">Select Payment Method</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setMethod("card")}
                    className={`flex items-center justify-center rounded-[1rem] border-2 py-4 text-sm font-bold transition-all ${
                      method === "card"
                        ? "border-[#f43f5e] bg-rose-50 text-[#f43f5e]"
                        : "border-rose-100 bg-rose-50/40 text-stone-500 hover:bg-rose-50 hover:border-rose-200"
                    }`}
                  >
                    <CreditCard className="mr-2 h-4 w-4" /> Card
                  </button>
                  <button
                    type="button"
                    onClick={() => setMethod("crypto")}
                    className={`flex items-center justify-center rounded-[1rem] border-2 py-4 text-sm font-bold transition-all ${
                      method === "crypto"
                        ? "border-[#f43f5e] bg-rose-50 text-[#f43f5e]"
                        : "border-rose-100 bg-rose-50/40 text-stone-500 hover:bg-rose-50 hover:border-rose-200"
                    }`}
                  >
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm2.5-11h-3.5V7.5c0-.276-.224-.5-.5-.5s-.5.224-.5.5V9H8.5c-.276 0-.5.224-.5.5s.224.5.5.5h1.5v3h-1.5c-.276 0-.5.224-.5.5s.224.5.5.5h1.5v1.5c0 .276.224.5.5.5s.5-.224.5-.5V15h3.5c1.378 0 2.5-1.122 2.5-2.5 0-1.125-.745-2.073-1.786-2.392C14.156 9.873 14.5 9.176 14.5 8.5 14.5 7.122 13.378 6 12 6c-.276 0-.5.224-.5.5V7.5h1C13.051 7.5 13.5 7.949 13.5 8.5S13.051 9.5 12.5 9.5H10v4h2.5c.827 0 1.5-.673 1.5-1.5s-.673-1.5-1.5-1.5h-1c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h2c.827 0 1.5.673 1.5 1.5S13.327 13 12.5 13H10v1h2.5c1.378 0 2.5 1.122 2.5 2.5s-1.122 2.5-2.5 2.5H12" />
                    </svg>
                    Crypto
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-8 mt-6">
              {/* Info Badges */}
              <div className="flex items-center gap-5 mb-6">
                 <div className="flex items-center text-xs font-bold text-gray-500">
                    <ShieldCheck className="w-4 h-4 mr-1.5 text-green-500" /> Secure
                 </div>
                 <div className="flex items-center text-xs font-bold text-gray-500">
                    <Zap className="w-4 h-4 mr-1.5 text-blue-500" /> Instant
                 </div>
                 <div className="flex items-center text-xs font-bold text-gray-500">
                    <Info className="w-4 h-4 mr-1.5 text-purple-500" /> Verified
                 </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 justify-end">
                <button
                  type="button"
                  className="rounded-xl bg-rose-50 border border-rose-100 px-8 py-3.5 text-sm font-bold text-[#1c1917] shadow-sm hover:bg-rose-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#f43f5e] px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-rose-200 hover:bg-[#e11d48] transition-all hover:-translate-y-0.5"
                >
                  Add Balance
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Bottom Section: Transaction History (Full Width) */}
      <div className="rounded-[2rem] border border-[#EFEFEF] bg-white shadow-sm overflow-hidden flex flex-col h-full mt-10">
        <div className="px-8 py-6 border-b border-[#EFEFEF] bg-white">
          <h3 className="text-lg font-bold text-[#2C3E50]">Transaction History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#EFEFEF]">
            <thead className="bg-rose-50/50">
              <tr>
                <th scope="col" className="px-8 py-4 text-left text-xs font-bold uppercase tracking-widest text-gray-400">ID</th>
                <th scope="col" className="px-8 py-4 text-left text-xs font-bold uppercase tracking-widest text-gray-400">Amount</th>
                <th scope="col" className="px-8 py-4 text-left text-xs font-bold uppercase tracking-widest text-gray-400">Status</th>
                <th scope="col" className="px-8 py-4 text-right text-xs font-bold uppercase tracking-widest text-gray-400">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFEFEF] bg-white">
              {transactions.map((txn) => (
                <tr key={txn.id} className="hover:bg-gray-50 transition-colors">
                  <td className="whitespace-nowrap px-8 py-5 text-sm font-bold text-[#2C3E50]">{txn.id}</td>
                  <td className="whitespace-nowrap px-8 py-5 text-sm">
                    <div className="flex items-center font-bold">
                      {txn.type === 'deposit' ? (
                        <ArrowDownCircle className="mr-2 h-4 w-4 text-green-500" />
                      ) : (
                        <ArrowUpCircle className="mr-2 h-4 w-4 text-gray-400" />
                      )}
                      <span className={txn.type === 'deposit' ? 'text-green-600' : 'text-[#2C3E50]'}>
                        {txn.type === 'deposit' ? '+' : '-'}{txn.amount}
                      </span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-8 py-5 text-sm">
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                      txn.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {txn.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-8 py-5 text-right text-sm font-semibold text-gray-500">{txn.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
