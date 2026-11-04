"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site, isPlaceholder, stripBrackets } from "@/config/site";
import { Reveal } from "@/components/ui/Reveal";

gsap.registerPlugin(ScrollTrigger);

const stack = ["React", "Next.js", "TypeScript", "Python", "Node.js", "Figma", "Docker", "PostgreSQL", "Three.js", "LLMs", "Kubernetes", "Tailwind"];

/** Tech marquee whose speed and skew respond to scroll velocity, followed by editable statistics. */
export default function Intro() {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!track.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = track.current;
    let x = 0;
    let speed = 0.6;
    let skew = 0;
    const st = ScrollTrigger.create({
      onUpdate: (self) => {
        const v = self.getVelocity();
        speed = 0.6 + Math.min(Math.abs(v) / 350, 6);
        skew = gsap.utils.clamp(-8, 8, v / -200);
      },
    });
    const tick = () => {
      x -= speed;
      speed += (0.6 - speed) * 0.04;
      skew += (0 - skew) * 0.08;
      const half = el.scrollWidth / 2;
      if (-x >= half) x += half;
      el.style.transform = `translate3d(${x}px,0,0) skewX(${skew}deg)`;
    };
    gsap.ticker.add(tick);
    return () => { gsap.ticker.remove(tick); st.kill(); };
  }, []);

  return (
    <section id="academy-intro" aria-label="Technologies and statistics" className="relative pb-20 pt-6 md:pb-28 md:pt-10">
      <div className="relative overflow-hidden border-y border-white/5 py-6">
        <div ref={track} className="flex w-max will-change-transform">
          {[...stack, ...stack].map((s, i) => (
            <span key={i} className="flex items-center gap-8 px-4 font-display text-[clamp(2rem,5vw,4rem)] font-semibold tracking-tight">
              <span className={i % 3 === 1 ? "text-gradient" : "text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.28)]"}>{s}</span>
              <svg viewBox="0 0 20 20" className="h-5 w-5 text-violet" aria-hidden>
                <path d="M10 0l2.5 7.5L20 10l-7.5 2.5L10 20l-2.5-7.5L0 10l7.5-2.5z" fill="currentColor" />
              </svg>
            </span>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink to-transparent" />
      </div>

      <div className="container-x mt-20 md:mt-28">
        <div className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {site.stats.map((s, i) => {
            const ph = isPlaceholder(s.value);
            return (
              <Reveal key={s.label} delay={i * 0.08} className="group relative bg-ink p-7 transition-colors duration-500 hover:bg-[#0b0e20] md:p-9">
                <div className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-violet to-cyan transition-transform duration-700 group-hover:scale-x-100" />
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-fog">0{i + 1}</p>
                <p className="mt-6 font-display text-6xl font-semibold tracking-tighter md:text-7xl">
                  <span className={ph ? "text-white/30" : ""}>{ph ? stripBrackets(s.value) : s.value}</span>
                  <span className="text-violet-bright">{s.suffix}</span>
                </p>
                <p className="mt-3 text-sm text-mist">{s.label}</p>
                {ph && <span className="placeholder-tag mt-4 inline-block">{s.note}</span>}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
