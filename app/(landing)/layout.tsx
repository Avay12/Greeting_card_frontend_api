import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchModal from "@/components/SearchModal";

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SearchModal />
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        {children}
      </main>
      <Footer />
    </>
  );
}
