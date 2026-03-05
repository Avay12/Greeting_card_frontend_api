"use client";

import { useState } from "react";
import { User, Lock, Save, Mail, Hash, Calendar } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

export default function SettingsPage() {
  const { user } = useAuthStore();

  // Security Form State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSecuritySave = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match.");
      return;
    }
    // Simulate save
    alert("Password updated successfully!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  // Mocking data if user is not fully populated yet
  const displayEmail = user?.email || "user@example.com";
  const displayName = user?.name || "User";
  const accountId = "DB59B759-815"; // Mock ID mapping to screenshot
  const memberSince = "February 1, 2026";

  return (
    <div className="mx-auto max-w-6xl space-y-8 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-[#1c1917]">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">Manage your account settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* Profile Information Card */}
        <div className="rounded-[2rem] border border-[#EFEFEF] bg-white shadow-sm overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow">
          <div className="p-8 pb-6 border-b border-[#EFEFEF]">
            <div className="flex items-center gap-3">
              <User className="h-6 w-6 text-[#f43f5e]" />
              <h2 className="text-xl font-bold text-[#1c1917]">Profile Information</h2>
            </div>
            <p className="text-sm text-gray-500 mt-1">Your account details</p>
          </div>

          <div className="p-8 space-y-4 flex-1">
            {/* Email Block */}
            <div className="flex items-center bg-rose-50/60 rounded-[1.5rem] p-4 border border-rose-100/60">
              <div className="h-10 w-10 bg-white rounded-xl shadow-sm flex items-center justify-center mr-4 border border-[#EFEFEF]">
                 <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Email</span>
                <span className="text-sm font-semibold text-[#1c1917]">{displayEmail}</span>
              </div>
            </div>

            {/* Account ID Block */}
            <div className="flex items-center bg-rose-50/60 rounded-[1.5rem] p-4 border border-rose-100/60">
              <div className="h-10 w-10 bg-white rounded-xl shadow-sm flex items-center justify-center mr-4 border border-[#EFEFEF]">
                 <Hash className="h-5 w-5 text-gray-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Account ID</span>
                <span className="text-sm font-semibold text-[#1c1917]">{accountId}</span>
              </div>
            </div>

            {/* Name Block */}
            <div className="flex items-center bg-rose-50/60 rounded-[1.5rem] p-4 border border-rose-100/60">
              <div className="h-10 w-10 bg-white rounded-xl shadow-sm flex items-center justify-center mr-4 border border-[#EFEFEF]">
                 <User className="h-5 w-5 text-gray-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Name</span>
                <span className="text-sm font-semibold text-[#1c1917]">{displayName}</span>
              </div>
            </div>

            {/* Member Since Block */}
            <div className="flex items-center bg-rose-50/60 rounded-[1.5rem] p-4 border border-rose-100/60">
              <div className="h-10 w-10 bg-white rounded-xl shadow-sm flex items-center justify-center mr-4 border border-[#EFEFEF]">
                 <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Member Since</span>
                <span className="text-sm font-semibold text-[#1c1917]">{memberSince}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Change Password Card */}
        <div className="rounded-[2rem] border border-[#EFEFEF] bg-white shadow-sm overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow">
          <div className="p-8 pb-6 border-b border-[#EFEFEF]">
            <div className="flex items-center gap-3">
              <Lock className="h-6 w-6 text-[#f43f5e]" />
              <h2 className="text-xl font-bold text-[#1c1917]">Change Password</h2>
            </div>
            <p className="text-sm text-gray-500 mt-1">Update your account password</p>
          </div>

          <form onSubmit={handleSecuritySave} className="p-8 space-y-6 flex-1 flex flex-col">
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-[#1c1917] mb-2">Current Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full bg-rose-50/60 border-2 border-transparent rounded-[1.25rem] p-4 text-sm font-bold text-[#1c1917] focus:bg-white focus:border-rose-300 focus:ring-4 focus:ring-rose-100 outline-none transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-[#1c1917] mb-2">New Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-rose-50/60 border-2 border-transparent rounded-[1.25rem] p-4 text-sm font-bold text-[#1c1917] focus:bg-white focus:border-rose-300 focus:ring-4 focus:ring-rose-100 outline-none transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-[#1c1917] mb-2">Confirm Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-rose-50/60 border-2 border-transparent rounded-[1.25rem] p-4 text-sm font-bold text-[#1c1917] focus:bg-white focus:border-rose-300 focus:ring-4 focus:ring-rose-100 outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div className="pt-8 mt-auto flex justify-start">
              <button
                type="submit"
                className="flex justify-center items-center rounded-xl bg-[#f43f5e] px-8 py-4 text-sm font-black tracking-wide text-white shadow-lg shadow-rose-200 hover:bg-[#e11d48] hover:-translate-y-0.5 transition-all text-center"
              >
                Update Password
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
