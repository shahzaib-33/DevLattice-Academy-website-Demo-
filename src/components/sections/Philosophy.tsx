"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { SectionHeading } from "@/components/ui/SplitReveal";
import { cn } from "@/lib/cn";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { k: "Learn", t: "Fundamentals, deeply", d: "Short, focused lessons on the concepts that never go out of date. Theory always arrives with a reason to use it.", tag: "Concepts" },
  { k: "Build", t: "Projects from week one", d: "Every module ends in something real. Learners build features, products and systems the way teams do.", tag: "Practice" },
  { k: "Review", t: "Feedback like the industry", d: "Code and design reviews from mentors and peers. Learners learn to give feedback as well as receive it.", tag: "Critique" },
  { k: "Ship", t: "Deploy, present, repeat", d: "Work goes live and gets presented. A portfolio forms naturally from projects that are actually finished.", tag: "Delivery" },
];

const reasons = [
  { q: "Industry practitioners as mentors", a: "Programs are shaped by people who build software professionally through DevLattice System, so the curriculum tracks how modern teams actually work." },
  { q: "Project first curriculum", a: "Learners spend most of their time building. Each program ends with a capstone that is deployed, documented and ready to show employers." },
  { q: "Small cohorts and real reviews", a: "Cohorts are kept intentionally small so every learner gets meaningful code and design reviews, not just automated grades." },
  { q: "Career readiness built in", a: "Portfolio reviews, interview practice and professional habits such as Git workflows, testing and documentation are part of every program." },
  { q: "Flexible learning formats", a: "Live cohorts, hybrid studios and mentor supported self paced tracks. Exact formats per program are confirmed by the academy." },
];

export default function Philosophy() {
  const wrap = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<number>(0);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const el = rail.current!;
      const distance = () => el.scrollWidth - window.innerWidth + 80;
      const tween = gsap.to(el, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: wrap.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
      const bar = wrap.current?.querySelector("[data-bar]");
      if (bar) gsap.fromTo(bar, { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: wrap.current, start: "top top", end: () => `+=${distance()}`, scrub: true } });
      return () => tween.kill();
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="philosophy" aria-label="Learning philosophy" className="relative">
      <div ref={wrap} className="relative overflow-hidden py-24 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:py-0">
        <div className="container-x mb-12 flex flex-wrap items-end justify-between gap-6 lg:mb-14">
          <SectionHeading index="02" eyebrow="Learning Philosophy" title="Four moves,|*repeated* until mastery." />
          <div className="hidden w-48 lg:block">
            <p className="mb-2 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-fog">Progress</p>
            <div className="h-px bg-white/10"><div data-bar className="h-full origin-left bg-gradient-to-r from-violet to-cyan" /></div>
          </div>
        </div>

        <div ref={rail} className="flex flex-col gap-5 px-[clamp(1.15rem,4vw,2.5rem)] lg:w-max lg:flex-row lg:gap-6 lg:pl-[max(2.5rem,calc((100vw-1320px)/2+2.5rem))]">
          {steps.map((s, i) => (
            <article
              key={s.k}
              className="group relative flex min-h-[300px] flex-col justify-between overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(160deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01))] p-8 lg:h-[58vh] lg:w-[min(36vw,520px)] lg:p-10"
            >
              <div aria-hidden className="absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-40 blur-3xl transition-opacity duration-700 group-hover:opacity-80" style={{ background: `hsl(${250 + i * 18} 90% 60% / .45)` }} />
              <div className="relative flex items-center justify-between">
                <span className="font-mono text-xs text-fog">Step 0{i + 1}</span>
                <span className="rounded-full border border-white/10 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-mist">{s.tag}</span>
              </div>
              <div className="relative">
                <p className="font-display text-[clamp(3.5rem,7vw,7rem)] font-semibold leading-none tracking-[-0.05em] text-gradient">{s.k}</p>
                <h3 className="mt-5 text-xl font-medium">{s.t}</h3>
                <p className="mt-2 max-w-sm leading-relaxed text-mist">{s.d}</p>
              </div>
            </article>
          ))}
          <div className="hidden w-[20vw] shrink-0 lg:block" />
        </div>
      </div>

      {/* Why choose us */}
      <div id="why" className="container-x grid gap-12 py-24 md:py-32 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <SectionHeading eyebrow="Why Choose Us" title="Built for people who|want to *build.*" intro="A few reasons learners and partners choose DevLattice Academy." />
        <ul className="divide-y divide-white/10 border-y border-white/10">
          {reasons.map((r, i) => {
            const isOpen = open === i;
            return (
              <li key={r.q}>
                <button
                  className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                  aria-expanded={isOpen}
                  aria-controls={`why-${i}`}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  <span className="flex items-baseline gap-5">
                    <span className="font-mono text-xs text-fog">0{i + 1}</span>
                    <span className={cn("font-display text-xl font-medium tracking-tight transition-colors duration-300 md:text-2xl", isOpen ? "text-white" : "text-white/70 group-hover:text-white")}>
                      {r.q}
                    </span>
                  </span>
                  <span className={cn("grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-all duration-500", isOpen ? "rotate-45 border-violet bg-violet/20" : "border-white/15 group-hover:border-white/40")}>
                    <Plus className="h-4 w-4" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`why-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-xl pb-7 pl-10 leading-relaxed text-mist">{r.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
