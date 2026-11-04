"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, Check, PlayCircle, Radio } from "lucide-react";
import { programs, steps } from "@/data/v2";
import { site, isPlaceholder, stripBrackets } from "@/config/site";
import { CourseArt } from "@/components/ui/Artwork";

const ease = [0.16, 1, 0.3, 1] as const;

function Words({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <span className={className}>
      {text.split(" ").map((w, i) => {
        const hl = w.startsWith("_");
        return (
          <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
            <motion.span
              className={hl ? "inline-block text-rose" : "inline-block"}
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease, delay: delay + i * 0.06 }}
            >
              {w.replace("_", "")}&nbsp;
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}

export function V2Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const r1 = useTransform(scrollYProgress, [0, 1], [-8, -20]);
  const r2 = useTransform(scrollYProgress, [0, 1], [6, 18]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section id="top" ref={ref} className="relative overflow-hidden pb-16 pt-32 md:pt-40">
      <div aria-hidden className="dots-bg absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,#000_30%,transparent_75%)]" />
      <div aria-hidden className="absolute -right-32 top-20 h-[520px] w-[520px] rounded-full bg-rose/15 blur-[120px]" />
      <div className="container-x relative grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }} className="inline-flex items-center gap-3 rounded-full border border-coal/10 bg-white py-1.5 pl-1.5 pr-4 text-xs shadow-sm sm:text-sm">
            <span className="flex items-center gap-1.5 rounded-full bg-blush px-3 py-1 text-xs font-bold text-rose"><Radio className="h-3.5 w-3.5" /> Admissions open soon</span>
            <span className="text-slate">A {site.parent} academy</span>
          </motion.div>
          <h1 className="display mt-7 text-[clamp(2.6rem,6vw,5.4rem)]">
            <Words text="Ready To Build" delay={0.1} />
            <br />
            <Words text="Skills That _Get" delay={0.3} />
            <br />
            <Words text="You _Hired?" delay={0.5} />
          </h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 0.8 }} className="mt-7 max-w-xl text-lg leading-relaxed text-slate">
            Project first programs in software engineering, AI, design and cloud. Learn from practitioners, build a real portfolio and graduate ready for the job.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 0.95 }} className="mt-9 flex flex-wrap gap-3">
            <a href="#contact" className="group inline-flex items-center gap-2 rounded-full bg-rose py-3.5 pl-6 pr-3.5 font-bold text-white shadow-[0_18px_40px_-14px_rgba(225,28,94,0.8)] transition hover:-translate-y-0.5 hover:bg-rose-deep">
              Book a consultation
              <span className="grid h-8 w-8 place-items-center rounded-full bg-white/20 transition-transform duration-300 group-hover:rotate-45"><ArrowUpRight className="h-4 w-4" /></span>
            </a>
            <a href="#process" className="inline-flex items-center gap-2 rounded-full border-2 border-coal/10 bg-white px-6 py-3.5 font-bold transition hover:border-coal">
              <PlayCircle className="h-5 w-5 text-rose" /> See how it works
            </a>
          </motion.div>
        </div>

        <motion.div style={{ y }} className="relative mx-auto aspect-[4/5] w-full max-w-[440px]">
          <motion.div style={{ rotate: r1 }} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, ease, delay: 0.4 }} className="absolute inset-x-6 top-6 bottom-10 overflow-hidden rounded-[2rem] shadow-2xl">
            <CourseArt hue={280} pattern="orbit" label="Applied AI artwork" />
          </motion.div>
          <motion.div style={{ rotate: r2 }} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, ease, delay: 0.55 }} className="absolute inset-0 overflow-hidden rounded-[2rem] border-[6px] border-white shadow-[0_40px_80px_-30px_rgba(15,16,32,0.5)]">
            <CourseArt hue={340} pattern="lattice" label="Full stack artwork" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">Flagship program</p>
              <p className="display mt-1 text-2xl">Full Stack Engineering</p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease, delay: 1 }} className="absolute -left-6 top-12 rounded-2xl bg-white p-4 shadow-xl sm:-left-12">
            <p className="text-xs font-bold text-slate">This week</p>
            <p className="mt-1 font-bold">Ship your first API</p>
            <div className="mt-2 h-1.5 w-36 rounded-full bg-sand"><motion.div initial={{ width: 0 }} animate={{ width: "72%" }} transition={{ duration: 1.6, ease, delay: 1.3 }} className="h-full rounded-full bg-rose" /></div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease, delay: 1.15 }} className="absolute -right-4 bottom-24 flex items-center gap-2 rounded-full bg-coal py-2.5 pl-2.5 pr-5 text-sm font-bold text-white shadow-xl sm:-right-10">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-rose"><Check className="h-4 w-4" /></span> Mentor reviewed
          </motion.div>
        </motion.div>
      </div>

      {/* Stat row */}
      <div className="container-x relative mt-16 md:mt-24">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-coal/10 bg-coal/10 lg:grid-cols-4">
          {site.stats.map((s, i) => {
            const ph = isPlaceholder(s.value);
            return (
              <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease, delay: i * 0.08 }} className="bg-white p-6 md:p-8">
                <dt className="text-sm text-slate">{s.label}</dt>
                <dd className="display mt-2 text-4xl md:text-5xl">
                  <span className={ph ? "text-coal/25" : ""}>{ph ? stripBrackets(s.value) : s.value}</span><span className="text-rose">{s.suffix}</span>
                </dd>
                {ph && <span className="ph mt-3 inline-block">Awaiting verified figure</span>}
              </motion.div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}

const marquee = ["React", "Next.js", "Python", "TypeScript", "Figma", "Docker", "Kubernetes", "PostgreSQL", "LLMs", "AWS", "Node.js", "Tailwind"];

export function V2Trusted() {
  return (
    <section aria-label="Technologies taught" className="border-y border-coal/10 bg-white py-10">
      <div className="container-x mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="kicker">Tools our learners ship with</p>
        <p className="text-sm text-slate">Partner logos will appear here once confirmed <span className="ph ml-2">Placeholder</span></p>
      </div>
      <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
        <div className="flex w-max animate-marquee gap-4">
          {[...marquee, ...marquee].map((m, i) => (
            <span key={i} className="display flex items-center gap-4 text-3xl text-coal/80 md:text-5xl">
              {m}<span className="h-3 w-3 rotate-45 bg-rose" aria-hidden />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Sticky stacking program cards that scale back as the next card arrives. */
function ProgramCard({ p, i, total }: { p: (typeof programs)[number]; i: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, i === total - 1 ? 1 : 0.92]);
  const op = useTransform(scrollYProgress, [0, 1], [1, i === total - 1 ? 1 : 0.6]);
  return (
    <div ref={ref} className="md:h-[115vh]">
      <motion.article
        style={{ scale, opacity: op, top: `${96 + i * 22}px` }}
        className="relative mb-6 grid origin-top gap-6 overflow-hidden rounded-[2rem] border border-coal/10 bg-white p-5 shadow-[0_30px_80px_-40px_rgba(15,16,32,0.35)] md:sticky md:grid-cols-[0.95fr_1.05fr] md:p-7"
      >
        <div className="relative grid grid-cols-5 gap-3">
          <div className="col-span-3 aspect-[3/4] overflow-hidden rounded-3xl"><CourseArt hue={p.hue} pattern={p.pattern} label={`${p.title} artwork`} /></div>
          <div className="col-span-2 grid gap-3">
            <div className="overflow-hidden rounded-3xl"><CourseArt hue={(p.hue + 30) % 360} pattern="wave" label="" /></div>
            <div className="flex flex-col justify-end rounded-3xl bg-blush p-4">
              <p className="display text-2xl text-rose md:text-3xl">{stripBrackets(p.badge.value)}</p>
              <p className="text-xs font-semibold text-coal/70">{p.badge.label}</p>
              {isPlaceholder(p.badge.value) && <span className="ph mt-2 self-start">Placeholder</span>}
            </div>
          </div>
          <span className="display absolute left-4 top-3 text-6xl text-white/90 drop-shadow md:text-7xl">{p.n}</span>
        </div>
        <div className="flex flex-col p-1 md:p-3">
          <p className="kicker">{p.sub}</p>
          <h3 className="display mt-3 text-3xl md:text-5xl">{p.title}</h3>
          <p className="mt-4 text-slate">{p.line}</p>
          <ul className="mt-5 space-y-2">
            {p.bullets.map((b) => <li key={b} className="flex items-center gap-2.5 font-semibold"><span className="grid h-5 w-5 place-items-center rounded-full bg-rose text-white"><Check className="h-3 w-3" /></span>{b}</li>)}
          </ul>
          <div className="mt-6 rounded-2xl bg-sand p-5">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate">Deliverable</p>
            <p className="mt-1.5 font-bold">{p.deliverable}</p>
            <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm text-coal/80">
              {p.graduates.map((g) => <li key={g} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-rose" />{g}</li>)}
            </ul>
          </div>
          <a href="#contact" className="group mt-6 inline-flex items-center gap-2 self-start font-bold text-rose">
            <span className="rose-underline">Ask about this program</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
          </a>
        </div>
      </motion.article>
    </div>
  );
}

export function V2Programs() {
  return (
    <section id="programs" className="relative py-24 md:py-32">
      <div className="container-x">
        <div className="mb-14 grid gap-6 md:grid-cols-[1.2fr_0.8fr] md:items-end">
          <div>
            <p className="kicker">Programs</p>
            <h2 className="display mt-4 text-[clamp(2.2rem,5.5vw,4.6rem)]">Turn Curiosity Into A <span className="text-rose">Career</span> With Structured Programs</h2>
          </div>
          <p className="text-lg text-slate">Four focused tracks. Each one ends with a deliverable you can show an employer. Durations are samples until the academy confirms each intake.</p>
        </div>
        {programs.map((p, i) => <ProgramCard key={p.n} p={p} i={i} total={programs.length} />)}
      </div>
    </section>
  );
}

export function V2Process() {
  return (
    <section id="process" className="relative overflow-hidden bg-coal py-24 text-white md:py-32">
      <div aria-hidden className="absolute -left-40 top-0 h-[480px] w-[480px] rounded-full bg-rose/20 blur-[140px]" />
      <div className="container-x relative">
        <p className="kicker">Process</p>
        <h2 className="display mt-4 max-w-4xl text-[clamp(2.2rem,5.5vw,4.6rem)]">Four Steps From Beginner To <span className="text-rose">Job Ready</span></h2>
        <ol className="relative mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <motion.span aria-hidden initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: 1.6, ease }} className="absolute left-0 right-0 top-8 hidden h-px origin-left bg-gradient-to-r from-rose via-rose/60 to-transparent lg:block" />
          {steps.map((s, i) => (
            <motion.li key={s.n} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8, ease, delay: i * 0.12 }} className="group relative">
              <span className="relative z-10 grid h-16 w-16 place-items-center rounded-full border border-white/15 bg-coal font-wide text-lg font-extrabold transition-colors duration-500 group-hover:border-rose group-hover:bg-rose">{s.n}</span>
              <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition-colors duration-500 group-hover:bg-white/[0.06]">
                <h3 className="display text-2xl">{s.t}</h3>
                <p className="mt-2 text-white/65">{s.d}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
