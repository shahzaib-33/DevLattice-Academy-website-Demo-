"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SplitReveal } from "@/components/ui/SplitReveal";

export default function CtaBand() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.88, 1]);
  const radius = useTransform(scrollYProgress, [0, 0.5], [64, 32]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 90]);

  return (
    <section ref={ref} aria-label="Call to action" className="relative px-3 py-10 sm:px-5">
      <motion.div style={{ scale, borderRadius: radius }} className="noise relative mx-auto max-w-[1400px] overflow-hidden bg-[radial-gradient(120%_120%_at_0%_0%,#6d28d9_0%,#2a1a7a_35%,#0c1026_75%)] px-6 py-20 text-center sm:px-12 md:py-28">
        <motion.div aria-hidden style={{ rotate }} className="absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full border border-white/10" />
        <motion.div aria-hidden style={{ rotate }} className="absolute -bottom-52 -left-24 h-[420px] w-[420px] rounded-full border border-dashed border-white/10" />
        <div aria-hidden className="absolute inset-0 grid-bg opacity-50" />
        <p className="eyebrow relative text-white/70">Admissions</p>
        <SplitReveal
          text="Your next chapter|starts with *one node.*"
          className="relative mx-auto mt-5 max-w-4xl font-display text-[clamp(2.2rem,6vw,5.2rem)] font-semibold leading-[1] tracking-[-0.04em]"
        />
        <p className="relative mx-auto mt-6 max-w-xl text-white/75">
          Tell us what you want to build. Our admissions team will help you choose the right program and intake.
        </p>
        <div className="relative mt-10 flex flex-wrap justify-center gap-3">
          <MagneticButton href="#contact" variant="light" icon={<ArrowUpRight className="h-4 w-4" />}>
            Start your application
          </MagneticButton>
          <MagneticButton href="#courses" variant="ghost">
            Compare programs
          </MagneticButton>
        </div>
      </motion.div>
    </section>
  );
}
