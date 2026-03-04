"use client";

import { motion } from "framer-motion";
import { Settings2, Paintbrush, Globe, Shield } from "lucide-react";

export default function ManageSitePage() {
  const sections = [
    {
      title: "General Settings",
      description: "Update site name, description, and base URL configuration.",
      icon: Globe,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      title: "Appearance",
      description: "Customize the global theme, colors, and branding assets.",
      icon: Paintbrush,
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
    {
      title: "Security & Permissions",
      description: "Manage admin roles, API keys, and security constraints.",
      icon: Shield,
      color: "text-orange-600",
      bg: "bg-orange-100",
    }
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8 flex items-center gap-3">
        <div className="p-2 bg-gray-100 rounded-lg">
          <Settings2 className="w-6 h-6 text-gray-700" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-heading">Manage Site</h1>
          <p className="mt-1 text-gray-600 bg-gray-50 border border-gray-200 px-3 py-1 rounded-full text-sm inline-block">
             System preferences and configuration
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section, index) => {
          const Icon = section.icon;
          return (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow cursor-pointer group"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${section.bg}`}>
                <Icon className={`w-6 h-6 ${section.color}`} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 font-heading">{section.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {section.description}
              </p>
              
              <div className="mt-6 flex items-center text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                Configure →
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
