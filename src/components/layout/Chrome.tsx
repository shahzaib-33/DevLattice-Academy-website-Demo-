"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { ArrowUp } from "lucide-react";
import { useApp } from "./AppProvider";

/** Thin gradient bar showing reading progress through the page. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-violet via-electric to-cyan"
      style={{ scaleX }}
    />
  );
}

/** Floating back-to-top control with a circular progress ring. */
export function BackToTop() {
  const { scrollYProgress } = useScroll();
  const { scrollTo } = useApp();
  const [show, setShow] = useState(false);
  const [p, setP] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setShow(v > 0.12);
    setP(v);
  });
  const C = 2 * Math.PI * 20;
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          onClick={() => scrollTo("#top")}
          className="group fixed bottom-5 right-5 z-50 grid h-12 w-12 place-items-center rounded-full glass sm:bottom-8 sm:right-8 sm:h-14 sm:w-14"
          aria-label="Back to top"
        >
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 48 48" aria-hidden>
            <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="2" />
            <circle cx="24" cy="24" r="20" fill="none" stroke="url(#btt)" strokeWidth="2" strokeDasharray={C} strokeDashoffset={C * (1 - p)} strokeLinecap="round" />
            <defs>
              <linearGradient id="btt"><stop stopColor="#a78bfa" /><stop offset="1" stopColor="#38d6ff" /></linearGradient>
            </defs>
          </svg>
          <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/** Soft custom cursor for fine pointers. It grows over interactive elements. */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);
    let x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y, raf = 0;
    let hover = false;
    const move = (e: PointerEvent) => {
      x = e.clientX; y = e.clientY;
      const t = e.target as HTMLElement;
      hover = !!t.closest("a, button, [data-cursor='hover'], input, select, textarea, label");
    };
    const loop = () => {
      rx += (x - rx) * 0.18; ry += (y - ry) * 0.18;
      if (dot.current) dot.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      if (ring.current) {
        ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${hover ? 1.8 : 1})`;
        ring.current.style.opacity = hover ? "0.9" : "0.45";
      }
      raf = requestAnimationFrame(loop);
    };
    addEventListener("pointermove", move, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => { removeEventListener("pointermove", move); cancelAnimationFrame(raf); };
  }, []);

  if (!enabled) return null;
  return (
    <>
      <div ref={dot} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[120] h-1.5 w-1.5 rounded-full bg-white mix-blend-difference" />
      <div ref={ring} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[120] h-9 w-9 rounded-full border border-violet-bright/70 transition-[opacity,scale] duration-300" style={{ transitionProperty: "opacity" }} />
    </>
  );
}
