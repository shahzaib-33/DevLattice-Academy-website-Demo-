"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/cn";

gsap.registerPlugin(ScrollTrigger);

/**
 * Masked word reveal. Wrap words in *asterisks* to render them in the
 * italic serif accent. Use "|" to force a line break.
 */
export function SplitReveal({
  text, as: Tag = "h2", className, delay = 0, play, stagger = 0.06, start = "top 85%",
}: {
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
  /** When provided, animation runs once this becomes true instead of on scroll. */
  play?: boolean;
  stagger?: number;
  start?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const words = el.querySelectorAll<HTMLElement>("[data-w]");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(words, { yPercent: 0, opacity: 1 });
      return;
    }
    if (play === false) {
      gsap.set(words, { yPercent: 115, rotate: 4 });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { yPercent: 115, rotate: 4 },
        {
          yPercent: 0, rotate: 0, duration: 1.15, ease: "expo.out", stagger, delay,
          scrollTrigger: play === undefined ? { trigger: el, start, once: true } : undefined,
        },
      );
    }, el);
    return () => ctx.revert();
  }, [play, delay, stagger, start]);

  // Tokenise once so *multi word accents* work across word boundaries.
  let inAccent = false;
  const lines = text.split("|").map((line) =>
    line.trim().split(" ").map((word) => {
      const opens = word.startsWith("*");
      if (opens) inAccent = true;
      const accent = inAccent;
      if (/\*[.,!?]?$/.test(word)) inAccent = false;
      return { word: word.replace(/\*/g, ""), accent };
    }),
  );
  return (
    <Tag ref={ref} className={className}>
      {lines.map((words, li) => (
        <span key={li} className="block">
          {words.map(({ word, accent }, wi) => (
            <span key={wi} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
              <span
                data-w
                className={cn("inline-block will-change-transform", accent && "font-serif italic font-normal text-gradient pr-[0.06em]")}
              >
                {word}
                {"\u00a0"}
              </span>
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
}

export function SectionHeading({
  eyebrow, title, intro, align = "left", className, index,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  className?: string;
  index?: string;
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      <div className={cn("mb-5 flex items-center gap-3", align === "center" && "justify-center")}>
        {index && <span className="font-mono text-xs text-fog">{index}</span>}
        <span className="h-px w-8 bg-gradient-to-r from-violet to-transparent" />
        <span className="eyebrow">{eyebrow}</span>
      </div>
      <SplitReveal
        text={title}
        className="font-display text-[clamp(2.1rem,5.2vw,4.4rem)] font-semibold leading-[1.02] tracking-[-0.035em]"
      />
      {intro && <p className="mt-6 text-base leading-relaxed text-mist md:text-lg">{intro}</p>}
    </div>
  );
}
