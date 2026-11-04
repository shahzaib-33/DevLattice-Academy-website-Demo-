"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useApp } from "./AppProvider";

gsap.registerPlugin(ScrollTrigger);

/**
 * Lenis smooth scrolling synced with GSAP ScrollTrigger.
 * Disabled for reduced motion and touch devices, where native scroll is better.
 * Also intercepts in-page anchor links so every "#section" link scrolls smoothly.
 */
export default function SmoothScroll() {
  const { lenisRef, scrollTo, loaded } = useApp();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    let lenis: Lenis | null = null;
    const tick = (time: number) => lenis?.raf(time * 1000);

    if (!reduce && !coarse) {
      lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
      lenisRef.current = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    }

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest("a");
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href || !href.startsWith("#") || href.length < 2) return;
      let target: Element | null = null;
      try { target = href === "#top" ? document.body : document.querySelector(href); } catch { return; }
      if (!target) {
        // Section lives on the home page (e.g. when on the 404 page)
        if (!document.getElementById("top")) { e.preventDefault(); window.location.href = "/" + href; }
        return;
      }
      e.preventDefault();
      scrollTo(href);
    };
    document.addEventListener("click", onClick);

    // Keep ScrollTrigger positions accurate when content height changes
    // (filters, accordions, font loading).
    let lastH = document.body.scrollHeight;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const ro = new ResizeObserver(() => {
      const h = document.body.scrollHeight;
      if (Math.abs(h - lastH) < 2) return;
      lastH = h;
      clearTimeout(timer);
      timer = setTimeout(() => ScrollTrigger.refresh(), 200);
    });
    ro.observe(document.body);

    return () => {
      document.removeEventListener("click", onClick);
      ro.disconnect();
      clearTimeout(timer);
      gsap.ticker.remove(tick);
      lenis?.destroy();
      lenisRef.current = null;
    };
  }, [lenisRef, scrollTo]);

  // Lock scroll while the loader plays, then honour a deep link hash.
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!loaded) {
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";
      return;
    }
    lenis?.start();
    document.documentElement.style.overflow = "";
    ScrollTrigger.refresh();
    const hash = window.location.hash;
    if (hash && hash.length > 1) {
      try {
        if (document.querySelector(hash)) setTimeout(() => scrollTo(hash, { immediate: true }), 50);
      } catch {
        /* invalid selector in hash */
      }
    }
  }, [loaded, lenisRef, scrollTo]);

  return null;
}
