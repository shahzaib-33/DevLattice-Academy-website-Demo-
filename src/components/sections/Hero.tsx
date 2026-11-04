"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowDown, ArrowUpRight, BrainCircuit, Code2, Layers3, Sparkles } from "lucide-react";
import { gsap } from "gsap";
import { useApp } from "@/components/layout/AppProvider";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { site } from "@/config/site";

const LatticeScene = dynamic(() => import("@/components/three/LatticeScene"), { ssr: false });

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const { loaded } = useApp();
  const ref = useRef<HTMLElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const sceneY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  // Mouse parallax on floating glass chips
  useEffect(() => {
    if (reduce || !floatRef.current) return;
    const chips = floatRef.current.querySelectorAll<HTMLElement>("[data-depth]");
    const xs = Array.from(chips).map((c) => gsap.quickTo(c, "x", { duration: 1.2, ease: "power3.out" }));
    const ys = Array.from(chips).map((c) => gsap.quickTo(c, "y", { duration: 1.2, ease: "power3.out" }));
    const move = (e: PointerEvent) => {
      const nx = e.clientX / innerWidth - 0.5;
      const ny = e.clientY / innerHeight - 0.5;
      chips.forEach((c, i) => {
        const d = Number(c.dataset.depth);
        xs[i](nx * d * 40);
        ys[i](ny * d * 40);
      });
    };
    addEventListener("pointermove", move, { passive: true });
    return () => removeEventListener("pointermove", move);
  }, [reduce]);

  const show = (delay: number) => ({
    initial: { opacity: 0, y: 24, filter: "blur(8px)" },
    animate: loaded ? { opacity: 1, y: 0, filter: "blur(0px)" } : {},
    transition: { duration: 1.1, ease, delay },
  });

  return (
    <section id="top" ref={ref} className="noise relative isolate flex min-h-[100svh] items-center overflow-hidden pb-16 pt-32 lg:pt-28">
      {/* Background layers */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_70%_20%,#1a1145_0%,#080a18_55%,#05060d_100%)]" />
        <div className="absolute inset-0 grid-bg animate-pulse-soft" />
        <div className="hero-orb absolute -left-[10%] top-[10%] h-[42vmax] w-[42vmax] rounded-full bg-violet/25 blur-[130px]" />
        <div className="hero-orb-2 absolute -right-[5%] bottom-[-10%] h-[38vmax] w-[38vmax] rounded-full bg-electric/20 blur-[130px]" />
        <div className="absolute left-1/2 top-0 h-[60vh] w-px bg-gradient-to-b from-violet-bright/50 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
      </div>

      {/* 3D lattice */}
      <motion.div
        aria-hidden
        style={{ y: sceneY, scale: sceneScale }}
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: 1 } : {}}
        transition={{ duration: 2.2, ease, delay: 0.2 }}
        className="absolute inset-0 -z-[5] lg:left-[38%]"
      >
        <LatticeScene className="h-full w-full opacity-60 lg:opacity-100" />
      </motion.div>

      <motion.div style={{ y: textY, opacity: fade }} className="container-x relative">
        <div className="max-w-[56rem]">
          <motion.div {...show(0.1)} className="mb-7 inline-flex items-center gap-2 rounded-full glass py-1.5 pl-1.5 pr-4 text-xs text-mist">
            <span className="flex items-center gap-1 rounded-full bg-gradient-to-r from-violet to-electric px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.15em] text-white">
              <Sparkles className="h-3 w-3" /> New
            </span>
            A {site.parent} initiative
          </motion.div>

          <SplitReveal
            as="h1"
            play={loaded}
            delay={0.25}
            stagger={0.08}
            text="Learn to build|what the world|builds *next.*"
            className="font-display text-[clamp(2.8rem,7.6vw,6.9rem)] font-semibold leading-[0.95] tracking-[-0.045em]"
          />

          <motion.p {...show(0.75)} className="mt-8 max-w-xl text-base leading-relaxed text-mist sm:text-lg">
            {site.name} trains software engineers, product designers and AI builders through structured,
            project first programs. Every skill connects to the next, like nodes in a lattice.
          </motion.p>

          <motion.div {...show(0.9)} className="mt-10 flex flex-wrap items-center gap-3">
            <MagneticButton href="#courses" icon={<ArrowUpRight className="h-4 w-4" />}>
              Explore Courses
            </MagneticButton>
            <MagneticButton href="#about" variant="ghost">
              Discover Our Academy
            </MagneticButton>
          </motion.div>

          <motion.dl {...show(1.05)} className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-6">
            {[
              ["Format", "Live cohorts"],
              ["Approach", "Project first"],
              ["Next intake", "To be announced"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-fog">{k}</dt>
                <dd className="mt-1.5 text-sm text-white/90">{v}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </motion.div>

      {/* Floating glass elements */}
      <div ref={floatRef} aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={loaded ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.2, ease, delay: 1.1 }}
          className="absolute right-[8%] top-[22%]"
        >
          <div data-depth="1.2" className="float-a glass rounded-2xl p-4 shadow-2xl">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-violet to-electric"><Code2 className="h-4 w-4" /></span>
              <div>
                <p className="text-xs font-medium">Full Stack Engineering</p>
                <p className="font-mono text-[0.6rem] text-fog">Module 04 · APIs</p>
              </div>
            </div>
            <div className="mt-3 h-1.5 w-44 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-violet to-cyan" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={loaded ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.2, ease, delay: 1.25 }}
          className="absolute bottom-[20%] right-[30%]"
        >
          <div data-depth="2" className="float-b glass rounded-2xl px-4 py-3 font-mono text-[0.68rem] leading-relaxed shadow-2xl">
            <span className="text-violet-bright">const</span> <span className="text-cyan">future</span> = <span className="text-white">await</span> build(<span className="text-amber-300">&apos;you&apos;</span>);
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={loaded ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.2, ease, delay: 1.4 }}
          className="absolute bottom-[30%] right-[6%]"
        >
          <div data-depth="0.8" className="float-c glass flex items-center gap-2 rounded-full py-2 pl-2 pr-4 text-xs shadow-2xl">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-white/10"><BrainCircuit className="h-3.5 w-3.5 text-cyan" /></span>
            Applied AI
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={loaded ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.2, ease, delay: 1.5 }}
          className="absolute right-[34%] top-[17%]"
        >
          <div data-depth="1.6" className="float-b glass flex items-center gap-2 rounded-full py-2 pl-2 pr-4 text-xs shadow-2xl">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-white/10"><Layers3 className="h-3.5 w-3.5 text-violet-bright" /></span>
            Product Design
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#academy-intro"
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: 1 } : {}}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-fog sm:flex"
        aria-label="Scroll to content"
      >
        Scroll
        <span className="relative grid h-10 w-6 place-items-start justify-center rounded-full border border-white/20 pt-1.5">
          <ArrowDown className="scroll-cue h-3 w-3 text-white" />
        </span>
      </motion.a>
    </section>
  );
}
