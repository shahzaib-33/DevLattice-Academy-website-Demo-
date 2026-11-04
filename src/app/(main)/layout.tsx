import { AppProvider } from "@/components/layout/AppProvider";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Loader from "@/components/layout/Loader";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { BackToTop, Cursor, ScrollProgress } from "@/components/layout/Chrome";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-ink">
        Skip to content
      </a>
      <AppProvider>
        <Loader />
        <SmoothScroll />
        <ScrollProgress />
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <BackToTop />
        <Cursor />
      </AppProvider>
    </>
  );
}
