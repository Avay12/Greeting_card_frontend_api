"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ImagePlus, Type, Hash, Loader2 } from "lucide-react";
import api from "@/lib/api";
import CustomSelect from "@/components/common/CustomSelect";
import { TEMPLATES } from "@/lib/data/template";

export default function CreateCardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    thumbnailUrl: "",
    templateId: "",
  });

  const categories = Object.keys(TEMPLATES).map((cat) => ({
    value: cat,
    label: cat.charAt(0).toUpperCase() + cat.slice(1).replace(/-/g, " "),
  }));

  const availableTemplates = formData.category
    ? Object.values(
        TEMPLATES[formData.category as keyof typeof TEMPLATES] || {},
      ).map((tpl) => ({
        value: tpl.id,
        label: tpl.name,
      }))
    : [];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      // Reset templateId if category changes
      ...(name === "category" ? { templateId: "" } : {}),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.category || !formData.templateId) {
      setError("Please select both a category and a template.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      // Create card requires title, category, thumbnailUrl and templateId based on models
      await api.post("/cards", formData);
      router.push("/admin"); // Redirect to dashboard on success
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to create card");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 font-heading">
          Create Greeting Card
        </h1>
        <p className="mt-2 text-gray-600">
          Design a new greeting card for your users.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 text-red-500 p-4 rounded-xl text-sm border border-red-100">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-900 block ml-1">
                Title
              </label>
              <div className="relative">
                <Type className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="E.g., Happy Birthday Classic"
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-12 pr-4 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-900 block ml-1">
                Category
              </label>
              <CustomSelect
                options={categories}
                value={formData.category}
                onChange={(val) => handleSelectChange("category", val)}
                placeholder="Select category"
                className="bg-gray-50"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-900 block ml-1">
              Thumbnail URL
            </label>
            <div className="relative">
              <ImagePlus className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
              <input
                type="url"
                name="thumbnailUrl"
                value={formData.thumbnailUrl}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                required
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-12 pr-4 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-900 block ml-1">
              Template Identifier
            </label>
            <CustomSelect
              options={availableTemplates}
              value={formData.templateId}
              onChange={(val) => handleSelectChange("templateId", val)}
              placeholder={
                formData.category
                  ? "Select a template"
                  : "Select a category first"
              }
              className="bg-gray-50"
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
                  Creating...
                </>
              ) : (
                "Create Card"
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
