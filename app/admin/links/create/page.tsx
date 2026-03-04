"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Link2, Mail, Edit3, Loader2 } from "lucide-react";
import api from "@/lib/api";

export default function CreateLinkPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successLink, setSuccessLink] = useState("");
  
  const [formData, setFormData] = useState({
    recipientName: "",
    recipientEmail: "",
    message: "",
    cardId: "", // Optional: Select a specific card
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessLink("");
    setLoading(true);

    try {
      // Assuming creating a link translates to an "Order" in the backend for now
      // Update this payload to match your exact backend requirements
      const payload = {
         userId: 1, // Will be overridden by backend auth token
         status: "pending",
         totalAmount: 0.0,
      }
      const response = await api.post("/orders", payload);
      
      // Simulate generating a unique link based on the created order
      const generatedLink = `${window.location.origin}/greet/${response.data.id || Math.random().toString(36).substring(7)}`;
      setSuccessLink(generatedLink);
      
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to create link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 font-heading">Create Greeting Link</h1>
        <p className="mt-2 text-gray-600">Generate a personalized link to send to someone special.</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8"
      >
        {successLink ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Link2 className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Link Generated Successfully!</h2>
            <p className="text-gray-600 mb-8">You can now share this unique greeting link.</p>
            
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 flex items-center gap-4 mb-8">
              <code className="text-sm flex-1 text-left overflow-x-auto whitespace-nowrap text-primary font-medium">
                {successLink}
              </code>
              <button 
                onClick={() => navigator.clipboard.writeText(successLink)}
                className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors"
              >
                Copy
              </button>
            </div>
            
            <button 
              onClick={() => {
                setSuccessLink("");
                setFormData({ recipientName: "", recipientEmail: "", message: "", cardId: "" });
              }}
              className="text-primary font-semibold hover:underline"
            >
              Create another link
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-500 p-4 rounded-xl text-sm border border-red-100">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-900 block ml-1">Recipient Name</label>
                <div className="relative">
                  <Edit3 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="recipientName"
                    value={formData.recipientName}
                    onChange={handleChange}
                    placeholder="E.g., Jane Smith"
                    required
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-12 pr-4 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-900 block ml-1">Recipient Email (Optional)</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="recipientEmail"
                    value={formData.recipientEmail}
                    onChange={handleChange}
                    placeholder="jane@example.com"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-12 pr-4 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-900 block ml-1">Personal Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your beautiful message here..."
                rows={5}
                required
                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
              />
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center shadow-lg shadow-primary/20"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Link"
                )}
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
}
