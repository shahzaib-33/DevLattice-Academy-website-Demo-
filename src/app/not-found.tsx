import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { LogoMark } from "@/components/ui/Logo";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="noise relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6 text-center">
      <div aria-hidden className="absolute inset-0 grid-bg" />
      <div aria-hidden className="absolute left-1/2 top-1/2 h-[50vmax] w-[50vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet/20 blur-[140px]" />
      <div className="relative">
        <LogoMark className="mx-auto h-16 w-16 animate-spin-slow" />
        <p className="mt-8 font-display text-[clamp(6rem,22vw,16rem)] font-bold leading-none tracking-[-0.06em] text-gradient">404</p>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Lost in the <span className="font-serif font-normal italic">lattice.</span>
        </h1>
        <p className="mx-auto mt-4 max-w-md text-mist">The page you are looking for has moved or never existed. Let&apos;s get you back on a connected path.</p>
        <a href="./" className="mt-10 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-ink transition hover:bg-violet-bright">
          <ArrowLeft className="h-4 w-4" /> Back to the academy
        </a>
      </div>
    </section>
  );
}
