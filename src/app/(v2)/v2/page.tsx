import type { Metadata } from "next";
import { AppProvider } from "@/components/layout/AppProvider";
import SmoothScroll from "@/components/layout/SmoothScroll";
import { ScrollProgress, BackToTop } from "@/components/layout/Chrome";
import { V2Boot, V2Footer, V2Nav } from "@/components/v2/V2Chrome";
import { V2Hero, V2Process, V2Programs, V2Trusted } from "@/components/v2/V2Top";
import { V2Closing, V2Contact, V2Faq, V2Founder, V2Voices, V2Work } from "@/components/v2/V2Bottom";

export const metadata: Metadata = {
  title: "Demo 2 · Light edition",
  description: "DevLattice Academy, light editorial edition: project first programs in engineering, AI, design and cloud.",
};

export default function V2Page() {
  return (
    <div className="v2 min-h-screen overflow-x-clip">
      <AppProvider>
        <V2Boot />
        <SmoothScroll />
        <ScrollProgress />
        <V2Nav />
        <main id="main">
          <V2Hero />
          <V2Trusted />
          <V2Programs />
          <V2Process />
          <V2Work />
          <V2Voices />
          <V2Founder />
          <V2Faq />
          <V2Contact />
          <V2Closing />
        </main>
        <V2Footer />
        <BackToTop />
      </AppProvider>
    </div>
  );
}
