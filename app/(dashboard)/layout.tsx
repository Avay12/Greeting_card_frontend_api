"use client";
import { Header } from "@/components/dashboard/Header";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { MobileHeader } from "@/components/dashboard/MobileHeader";
import { MobileNav } from "@/components/dashboard/MobileNav";
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, checkAuth, logout, isLoading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!isLoading && user && user.role !== "user") {
      router.push("/");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile Header (Hidden on Desktop) */}
      <MobileHeader />

      {/* Desktop Sidebar (Hidden on Mobile) */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main Content Area - Offsets fixed sidebar */}
      <div className="flex flex-1 flex-col w-full md:pl-64">
        {/* Desktop Header (Hidden on Mobile) */}
        <div className="hidden md:block">
          <Header />
        </div>

        {/* Main Content offset for Header height and Mobile Nav bottom padding */}
        <main className="flex-1 pt-14 md:pt-16 pb-20 md:pb-0">
          <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">{children}</div>
        </main>
      </div>

      {/* Mobile Bottom Navigation (Hidden on Desktop) */}
      <MobileNav />
    </div>
  );
}
