"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { testimonials } from "@/data/content";
import { SectionHeading } from "@/components/ui/SplitReveal";
import { Editable, PlaceholderTag, clean } from "@/components/ui/Placeholder";
import { hueGradient } from "@/lib/cn";

const DURATION = 7000;

export default function Testimonials() {
  const [[index, dir], setState] = useState<[number, number]>([0, 1]);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const n = testimonials.length;

  const go = useCallback((d: number) => setState(([i]) => [(i + d + n) % n, d]), [n]);

  useEffect(() => {
    if (paused || reduce) return;
    const t = setTimeout(() => go(1), DURATION);
    return () => clearTimeout(t);
  }, [index, paused, reduce, go]);

  const t = testimonials[index];

  return (
    <section id="testimonials" className="relative py-24 md:py-36">
      <div className="container-x">
        <SectionHeading index="06" eyebrow="Student Testimonials" title="In their *own* words." align="center" className="mx-auto" />

        <div
          className="relative mx-auto mt-14 max-w-5xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") go(1);
            if (e.key === "ArrowLeft") go(-1);
          }}
          role="region"
          aria-roledescription="carousel"
          aria-label="Student testimonials"
        >
          <div className="border-beam relative overflow-hidden rounded-[2rem] bg-[#0a0d1f] p-8 sm:p-12 md:p-16">
            <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full blur-3xl transition-colors duration-1000" style={{ background: `hsl(${t.hue} 90% 60% / .25)` }} />
            <Quote className="h-10 w-10 text-violet-bright/60" aria-hidden />
            <div className="relative mt-6 min-h-[220px] sm:min-h-[200px]">
              <AnimatePresence mode="wait" custom={dir}>
                <motion.figure
                  key={index}
                  custom={dir}
                  initial={{ opacity: 0, x: dir * 60, filter: "blur(10px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: dir * -60, filter: "blur(10px)" }}
                  transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  aria-live="polite"
                >
                  <blockquote className="font-serif text-[clamp(1.5rem,3.2vw,2.6rem)] leading-[1.25] tracking-tight text-white/95">
                    &ldquo;{clean(t.quote)}&rdquo;
                  </blockquote>
                  <figcaption className="mt-10 flex flex-wrap items-center gap-4">
                    <span className="grid h-14 w-14 place-items-center rounded-full font-mono text-sm font-bold text-ink" style={{ background: hueGradient(t.hue) }} aria-hidden>
                      {t.initials}
                    </span>
                    <span>
                      <span className="block font-medium"><Editable value={t.name} tag={false} /></span>
                      <span className="block text-sm text-mist">{clean(t.course)}</span>
                    </span>
                    <PlaceholderTag label="Awaiting verified testimonial" className="sm:ml-auto" />
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setState([i, i > index ? 1 : -1])}
                  aria-label={`Show testimonial ${i + 1}`}
                  aria-current={i === index}
                  className="relative h-1 w-12 overflow-hidden rounded-full bg-white/15"
                >
                  {i === index && (
                    <motion.span
                      key={`${index}-${paused}`}
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-violet to-cyan"
                      initial={{ width: paused || reduce ? "100%" : "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: paused || reduce ? 0 : DURATION / 1000, ease: "linear" }}
                    />
                  )}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={() => go(-1)} aria-label="Previous testimonial" className="grid h-12 w-12 place-items-center rounded-full border border-white/15 transition hover:-translate-x-0.5 hover:bg-white hover:text-ink">
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button onClick={() => go(1)} aria-label="Next testimonial" className="grid h-12 w-12 place-items-center rounded-full border border-white/15 transition hover:translate-x-0.5 hover:bg-white hover:text-ink">
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
