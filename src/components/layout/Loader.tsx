"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { LogoMark } from "@/components/ui/Logo";
import { useApp } from "./AppProvider";

/** Cinematic intro: the lattice draws itself while a counter climbs, then the curtain lifts. */
export default function Loader() {
  const { setLoaded } = useApp();
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const total = reduce ? 300 : 1900;
    let raf = 0;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / total);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      if (t < 1) raf = requestAnimationFrame(step);
      else {
        setTimeout(() => {
          setDone(true);
          setLoaded(true);
        }, reduce ? 0 : 250);
      }
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [setLoaded]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
          aria-live="polite"
          aria-label="Loading DevLattice Academy"
          id="dl-loader"
        >
          <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[40vmax] w-[40vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet/20 blur-[120px]" />

          <div className="relative flex flex-col items-center gap-8">
            <LogoMark animated className="h-20 w-20 dl-loader-mark" />
            <div className="overflow-hidden">
              <motion.p
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="font-display text-2xl font-semibold tracking-tight sm:text-3xl"
              >
                DevLattice <span className="font-serif font-normal italic text-gradient">Academy</span>
              </motion.p>
            </div>
          </div>

          <div className="absolute bottom-10 left-0 right-0 px-6 sm:bottom-14 sm:px-12">
            <div className="mx-auto flex max-w-6xl items-end justify-between font-mono text-xs uppercase tracking-[0.2em] text-fog">
              <span>Structuring the future</span>
              <span className="font-display text-5xl font-semibold tracking-tighter text-white tabular-nums sm:text-7xl">
                {progress}
                <span className="text-violet-bright">%</span>
              </span>
            </div>
            <div className="mx-auto mt-4 h-px max-w-6xl bg-white/10">
              <div className="h-full bg-gradient-to-r from-violet to-cyan" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
