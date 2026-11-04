"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";
import { Compass, Eye, Handshake, Lightbulb, Rocket, ShieldCheck, Target, Users } from "lucide-react";
import { SectionHeading } from "@/components/ui/SplitReveal";
import { Reveal } from "@/components/ui/Reveal";
import { CourseArt } from "@/components/ui/Artwork";
import { PlaceholderTag } from "@/components/ui/Placeholder";
import { site } from "@/config/site";

gsap.registerPlugin(ScrollTrigger);

const manifesto =
  "Most learning is a ladder: one rung, then the next, with nothing holding it together. We designed DevLattice Academy as a lattice instead. Every concept is connected, every project reinforces the last, and every learner leaves with a structure strong enough to keep building on for a whole career.";

const pillars = [
  {
    icon: Compass,
    label: "Our Story",
    text: `Ayesha Abid founded ${site.parent} in March 2025 as a senior led technology studio. Real client work showed a clear gap between what courses teach and what modern teams need. ${site.name} exists to close that gap.`,
  },
  {
    icon: Eye,
    label: "Vision",
    text: "To become a leading academy for engineers and designers who build thoughtful, reliable and beautiful technology for the world.",
  },
  {
    icon: Target,
    label: "Mission",
    text: "To deliver structured, project first education that connects fundamentals, craft and industry practice, so every graduate can ship with confidence.",
  },
];

const values = [
  { icon: Lightbulb, title: "Curiosity first", text: "We reward good questions as much as good answers." },
  { icon: ShieldCheck, title: "Craft & integrity", text: "Clean code, honest work and attention to the details users feel." },
  { icon: Users, title: "Community", text: "Peers, mentors and alumni who review, support and push each other." },
  { icon: Rocket, title: "Ship it", text: "Real projects, real deadlines and real feedback from day one." },
  { icon: Handshake, title: "Inclusive by design", text: "Clear pathways for every starting point and background." },
];

export default function About() {
  const textRef = useRef<HTMLParagraphElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      // Scroll-scrubbed word highlight
      const words = textRef.current?.querySelectorAll("span");
      if (words && !reduce) {
        gsap.fromTo(
          words,
          { opacity: 0.14 },
          {
            opacity: 1, stagger: 0.05, ease: "none",
            scrollTrigger: { trigger: textRef.current, start: "top 80%", end: "bottom 45%", scrub: 0.6 },
          },
        );
      }
      // Image reveals with clip-path and counter-scaled inner
      galleryRef.current?.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el, i) => {
        const inner = el.querySelector("[data-inner]");
        if (reduce) return;
        gsap.fromTo(el, { clipPath: "inset(100% 0% 0% 0%)" }, {
          clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "expo.inOut", delay: i * 0.12,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
        gsap.fromTo(inner, { scale: 1.35 }, {
          scale: 1, duration: 1.8, ease: "expo.out", delay: i * 0.12,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
        gsap.to(el, { yPercent: i === 1 ? -12 : -4, ease: "none", scrollTrigger: { trigger: galleryRef.current, scrub: true } });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="relative overflow-hidden py-24 md:py-36">
      <div aria-hidden className="pointer-events-none absolute right-0 top-40 h-[50vmax] w-[50vmax] translate-x-1/2 rounded-full bg-violet/10 blur-[140px]" />
      <div className="container-x">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              index="01"
              eyebrow="About the Academy"
              title="A lattice, not|a *ladder.*"
              intro={`${site.name} is the education arm of ${site.parent}. We combine the rigour of engineering practice with the care of great teaching.`}
            />
          </div>
          <p ref={textRef} className="font-display text-[clamp(1.45rem,2.6vw,2.3rem)] font-medium leading-[1.3] tracking-tight">
            {manifesto.split(" ").map((w, i) => (
              <span key={i}>{w} </span>
            ))}
          </p>
        </div>

        {/* Editorial image composition */}
        <div ref={galleryRef} className="mt-24 grid grid-cols-6 gap-3 md:mt-32 md:gap-5">
          {[
            { span: "col-span-6 md:col-span-3 aspect-[4/3]", hue: 258, pattern: "lattice" as const, cap: "The Studio" },
            { span: "col-span-3 md:col-span-2 aspect-[3/4] md:mt-24", hue: 222, pattern: "orbit" as const, cap: "Cohort Learning" },
            { span: "col-span-3 md:col-span-1 aspect-[3/4] md:mt-48", hue: 300, pattern: "prism" as const, cap: "Peer Review" },
          ].map((g) => (
            <figure key={g.cap} data-reveal className={`group relative overflow-hidden rounded-3xl ${g.span}`}>
              <div data-inner className="absolute inset-0 transition-transform duration-[1.2s] group-hover:scale-105">
                <CourseArt hue={g.hue} pattern={g.pattern} label={g.cap} />
              </div>
              <figcaption className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-2 bg-gradient-to-t from-black/70 to-transparent p-4 md:p-5">
                <span className="font-display text-sm font-medium md:text-lg">{g.cap}</span>
                <PlaceholderTag label="Replace with photo" />
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Founder note */}
        <Reveal className="mt-24 md:mt-32">
          <figure className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(120%_120%_at_0%_0%,rgba(139,92,246,0.18),transparent_60%)] p-8 md:p-14">
            <p className="eyebrow">A note from the founder</p>
            <blockquote className="mt-6 max-w-4xl font-serif text-[clamp(1.6rem,3.6vw,3rem)] leading-[1.15]">
              &ldquo;I&apos;m an engineer who happens to run a company, not a founder who used to code. That&apos;s the premise DevLattice is built on.&rdquo;
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-4">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-violet to-electric font-mono text-sm font-bold">AA</span>
              <span><span className="block font-medium">Ayesha Abid</span><span className="block text-sm text-mist">Founder &amp; CEO, {site.parent}</span></span>
            </figcaption>
          </figure>
        </Reveal>

        {/* Story, Vision, Mission */}
        <div className="mt-24 grid gap-5 md:mt-32 md:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.label} delay={i * 0.1} className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-8">
              <span className="absolute -right-4 -top-8 font-display text-[9rem] font-bold leading-none text-white/[0.03] transition-colors duration-700 group-hover:text-violet/10">
                0{i + 1}
              </span>
              <span className="relative grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/5 transition-all duration-500 group-hover:rotate-[-8deg] group-hover:border-violet/50 group-hover:bg-violet/15">
                <p.icon className="h-5 w-5 text-violet-bright" />
              </span>
              <h3 className="relative mt-8 font-display text-2xl font-semibold tracking-tight">{p.label}</h3>
              <p className="relative mt-3 leading-relaxed text-mist">
                {p.text.split(/(\[.*?\])/).map((part, k) =>
                  part.startsWith("[") ? <span key={k} className="ml-1 text-amber-300/80">{part.slice(1, -1)}</span> : part,
                )}
              </p>
            </Reveal>
          ))}
        </div>

        {/* Core values */}
        <div className="mt-28 md:mt-36">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Core Values" title="What we *stand* on." />
          </div>
          <ul className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-5">
            {values.map((v, i) => (
              <motion.li
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="group relative bg-ink p-7 transition-colors duration-500 hover:bg-[#0c0f24]"
              >
                <motion.span
                  className="inline-grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-violet/30 to-electric/20"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <v.icon className="h-5 w-5" />
                </motion.span>
                <h3 className="mt-6 font-display text-lg font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">{v.text}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
