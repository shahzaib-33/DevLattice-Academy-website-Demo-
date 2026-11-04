"use client";

import { useCallback, useEffect, useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AlertCircle, ArrowLeft, ArrowRight, ArrowUpRight, Check, Copy, Expand, Loader2, Minus, Plus, Quote, RotateCcw, X, ZoomIn } from "lucide-react";
import { faqs, programs, voices, work } from "@/data/v2";
import { site, isPlaceholder, stripBrackets } from "@/config/site";
import { ProjectMock } from "@/components/ui/ProjectMock";
import { PortraitPlaceholder } from "@/components/ui/Artwork";
import type { Project } from "@/data/content";
import { useApp } from "@/components/layout/AppProvider";
import { cn } from "@/lib/cn";

const ease = [0.16, 1, 0.3, 1] as const;
const clean = (v: string) => (isPlaceholder(v) ? stripBrackets(v) : v);
const asProject = (w: (typeof work)[number], i: number): Project => ({
  id: `w${i}`, title: w.title, category: "Web", student: "", description: "", tech: [], hue: w.hue, mock: w.mock,
});

function Heading({ kicker, title, intro, center }: { kicker: string; title: React.ReactNode; intro?: string; center?: boolean }) {
  return (
    <div className={cn("max-w-3xl", center && "mx-auto text-center")}>
      <p className="kicker">{kicker}</p>
      <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease }} className="display mt-4 text-[clamp(2.2rem,5.5vw,4.6rem)]">
        {title}
      </motion.h2>
      {intro && <p className="mt-5 text-lg text-slate">{intro}</p>}
    </div>
  );
}

/* ── Work + full-screen viewer ───────────────────────────── */

function Lightbox({ index, onClose, onNav }: { index: number; onClose: () => void; onNav: (d: number) => void }) {
  const [zoom, setZoom] = useState(1);
  const { lenisRef } = useApp();
  const item = work[index];

  useEffect(() => setZoom(1), [index]);
  useEffect(() => {
    lenisRef.current?.stop();
    document.documentElement.style.overflow = "hidden";
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNav(1);
      if (e.key === "ArrowLeft") onNav(-1);
      if (e.key === "+" || e.key === "=") setZoom((z) => Math.min(3, z + 0.5));
      if (e.key === "-") setZoom((z) => Math.max(1, z - 0.5));
      if (e.key === "0") setZoom(1);
    };
    addEventListener("keydown", key);
    return () => {
      removeEventListener("keydown", key);
      lenisRef.current?.start();
      document.documentElement.style.overflow = "";
    };
  }, [onClose, onNav, lenisRef]);

  return (
    <motion.div role="dialog" aria-modal="true" aria-label={`Project viewer: ${clean(item.title)}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[90] flex flex-col bg-coal/95 backdrop-blur-xl" data-lenis-prevent>
      <div className="flex items-center justify-between gap-4 p-4 text-white sm:p-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-rose">{item.tag} · {index + 1} / {work.length}</p>
          <p className="display mt-1 text-xl sm:text-2xl">{clean(item.title)}</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setZoom((z) => Math.max(1, z - 0.5))} aria-label="Zoom out" className="grid h-11 w-11 place-items-center rounded-full bg-white/10 hover:bg-white/20"><Minus className="h-4 w-4" /></button>
          <span className="w-12 text-center text-sm tabular-nums">{Math.round(zoom * 100)}%</span>
          <button onClick={() => setZoom((z) => Math.min(3, z + 0.5))} aria-label="Zoom in" className="grid h-11 w-11 place-items-center rounded-full bg-white/10 hover:bg-white/20"><Plus className="h-4 w-4" /></button>
          <button onClick={onClose} aria-label="Close viewer" className="ml-2 grid h-11 w-11 place-items-center rounded-full bg-rose hover:bg-rose-deep"><X className="h-5 w-5" /></button>
        </div>
      </div>
      <div className="relative flex-1 overflow-hidden" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <AnimatePresence mode="wait">
          <motion.div key={index} initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.45, ease }} className="absolute inset-0 grid place-items-center p-4 sm:p-10" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <motion.div
              drag={zoom > 1}
              dragMomentum={false}
              dragElastic={0.1}
              animate={{ scale: zoom, ...(zoom === 1 ? { x: 0, y: 0 } : {}) }}
              transition={{ type: "spring", stiffness: 200, damping: 26 }}
              onDoubleClick={() => setZoom((z) => (z > 1 ? 1 : 2))}
              className={cn("group aspect-[16/10] w-full max-w-5xl overflow-hidden rounded-3xl shadow-2xl", zoom > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in")}
            >
              <ProjectMock project={asProject(item, index)} />
            </motion.div>
          </motion.div>
        </AnimatePresence>
        <button onClick={() => onNav(-1)} aria-label="Previous project" className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white text-coal shadow-xl sm:left-6"><ArrowLeft className="h-5 w-5" /></button>
        <button onClick={() => onNav(1)} aria-label="Next project" className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white text-coal shadow-xl sm:right-6"><ArrowRight className="h-5 w-5" /></button>
      </div>
      <p className="hidden p-4 text-center text-xs text-white/50 sm:block">Arrows to browse · + / − to zoom · double click to zoom · drag to pan · Esc to close</p>
    </motion.div>
  );
}

export function V2Work() {
  const [open, setOpen] = useState<number | null>(null);
  const nav = useCallback((d: number) => setOpen((o) => (o === null ? o : (o + d + work.length) % work.length)), []);
  const close = useCallback(() => setOpen(null), []);
  const layout = ["md:col-span-2 md:row-span-2", "", "", "", "md:col-span-2", ""];

  return (
    <section id="work" className="py-24 md:py-32">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Heading kicker="Selected work" title={<>Student Work That <span className="text-rose">Speaks</span> For Itself</>} />
          <p className="max-w-sm text-slate">Showcase slots for capstone projects. Click any project to open the full screen viewer. <span className="ph">Sample work</span></p>
        </div>
        <ul className="mt-14 grid auto-rows-[220px] gap-4 md:grid-cols-4 md:auto-rows-[240px]">
          {work.map((w, i) => (
            <motion.li key={w.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8, ease, delay: (i % 3) * 0.08 }} className={layout[i]}>
              <button onClick={() => setOpen(i)} className="group relative h-full w-full overflow-hidden rounded-[1.75rem] text-left" aria-label={`Open ${clean(w.title)} in viewer`}>
                <ProjectMock project={asProject(w, i)} />
                <div className="absolute inset-0 bg-gradient-to-t from-coal/85 via-coal/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 text-white">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/70">{w.tag}</p>
                    <p className="display mt-1 text-xl md:text-2xl">{clean(w.title)}</p>
                  </div>
                  <span className="grid h-11 w-11 shrink-0 scale-75 place-items-center rounded-full bg-rose opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100"><Expand className="h-4 w-4" /></span>
                </div>
              </button>
            </motion.li>
          ))}
        </ul>
      </div>
      <AnimatePresence>{open !== null && <Lightbox index={open} onClose={close} onNav={nav} />}</AnimatePresence>
    </section>
  );
}

/* ── Testimonials ─────────────────────────────────────────── */

export function V2Voices() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setI((x) => (x + 1) % voices.length), 6500);
    return () => clearTimeout(t);
  }, [i, paused]);
  const v = voices[i];
  return (
    <section aria-label="Testimonials" className="bg-blush/60 py-24 md:py-32">
      <div className="container-x">
        <Heading center kicker="Testimonials" title={<>Why Students Love <span className="text-rose">DevLattice</span></>} />
        <div className="relative mx-auto mt-14 max-w-4xl" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <div className="relative overflow-hidden rounded-[2rem] bg-white p-8 shadow-[0_40px_80px_-40px_rgba(225,28,94,0.35)] sm:p-14">
            <Quote className="absolute right-8 top-8 h-20 w-20 text-blush" aria-hidden />
            <AnimatePresence mode="wait">
              <motion.figure key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5, ease }} aria-live="polite">
                <blockquote className="relative text-2xl font-semibold leading-snug md:text-3xl">&ldquo;{clean(v.q)}&rdquo;</blockquote>
                <figcaption className="mt-8 flex flex-wrap items-center gap-4">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-rose font-bold text-white">S{i + 1}</span>
                  <span><span className="block font-bold">{clean(v.name)}</span><span className="block text-sm text-slate">{clean(v.role)}</span></span>
                  <span className="ph sm:ml-auto">Awaiting verified testimonial</span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>
          <div className="mt-6 flex items-center justify-center gap-3">
            <button onClick={() => setI((x) => (x - 1 + voices.length) % voices.length)} aria-label="Previous testimonial" className="grid h-12 w-12 place-items-center rounded-full border-2 border-coal/10 bg-white transition hover:border-rose hover:text-rose"><ArrowLeft className="h-4 w-4" /></button>
            {voices.map((_, k) => (
              <button key={k} onClick={() => setI(k)} aria-label={`Testimonial ${k + 1}`} aria-current={k === i} className={cn("h-2.5 rounded-full transition-all duration-500", k === i ? "w-8 bg-rose" : "w-2.5 bg-coal/20")} />
            ))}
            <button onClick={() => setI((x) => (x + 1) % voices.length)} aria-label="Next testimonial" className="grid h-12 w-12 place-items-center rounded-full border-2 border-coal/10 bg-white transition hover:border-rose hover:text-rose"><ArrowRight className="h-4 w-4" /></button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Founder / director ───────────────────────────────────── */

export function V2Founder() {
  const skills = ["Full-Stack Development", "AI Integration", "Software Architecture", "Technical Leadership", "Business Development"];
  const path = [
    { y: "2023 to 2024", t: "MERN Stack & AI Engineer", o: "TechnerLab" },
    { y: "2024 to 2025", t: "Business Development Manager", o: "Ronnie Ridge Technology" },
    { y: "Mar 2025", t: "Founder & CEO", o: "DevLattice System" },
  ];
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 1, ease }} className="relative mx-auto w-full max-w-md">
          <div className="aspect-[4/5] overflow-hidden rounded-[2rem] shadow-2xl"><PortraitPlaceholder hue={290} initials="AA" /></div>
          <div className="absolute -right-4 top-10 max-w-[190px] rounded-2xl bg-white p-4 shadow-xl sm:-right-10">
            <p className="display text-3xl text-rose">1st</p>
            <p className="text-xs font-semibold text-slate">Position, Web Alchemy (Web Development) · 2025</p>
          </div>
          <div className="absolute -left-4 bottom-10 max-w-[200px] rounded-2xl bg-coal p-4 text-white shadow-xl sm:-left-10">
            <p className="display text-2xl">Winner</p>
            <p className="text-xs font-semibold text-white/60">Technical Excellence Portfolio, Multi-Domain Competition · 2025</p>
          </div>
        </motion.div>
        <div>
          <p className="kicker">Meet the founder</p>
          <h2 className="display mt-4 text-[clamp(2rem,4.6vw,3.8rem)]">I&apos;m Ayesha Abid. An Engineer Who <span className="text-rose">Happens To Run</span> A Company.</h2>
          <p className="mt-6 text-lg leading-relaxed text-slate">
            Founder &amp; CEO of {site.parent}, a senior led technology studio building systems that scale. DevLattice Academy is how the studio trains the next generation of engineers. Ayesha is a full stack engineer based in Lahore who integrates AI into real products and turns technical depth into business growth.
          </p>
          <ol className="mt-8 space-y-3">
            {path.map((p, i) => (
              <motion.li key={p.t} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease, delay: i * 0.12 }} className="flex items-center gap-4 rounded-2xl border border-coal/10 bg-white p-4">
                <span className={cn("h-3 w-3 shrink-0 rounded-full", i === path.length - 1 ? "bg-rose ring-4 ring-rose/20" : "bg-coal/20")} />
                <span className="w-28 shrink-0 text-xs font-bold text-slate">{p.y}</span>
                <span><span className="block font-bold">{p.t}</span><span className="block text-sm text-slate">{p.o}</span></span>
              </motion.li>
            ))}
          </ol>
          <ul className="mt-6 flex flex-wrap gap-2">
            {skills.map((k) => <li key={k} className="rounded-full bg-blush px-3.5 py-1.5 text-sm font-semibold text-rose-deep">{k}</li>)}
          </ul>
          <p className="mt-6 text-sm text-slate">Computer Science, Riphah International University · CGPA 3.88 / 4.0</p>
        </div>
      </div>
    </section>
  );
}

/* ── FAQ ──────────────────────────────────────────────────── */

export function V2Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="bg-white py-24 md:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <Heading kicker="FAQ" title={<>Questions Worth Asking <span className="text-rose">First</span></>} intro="Still unsure? Book a free consultation and we will walk you through it." />
        <ul className="space-y-3">
          {faqs.map((f, i) => {
            const on = open === i;
            return (
              <li key={f.q} className={cn("rounded-3xl border transition-colors duration-300", on ? "border-rose/30 bg-blush/50" : "border-coal/10 bg-cream")}>
                <button onClick={() => setOpen(on ? -1 : i)} aria-expanded={on} className="flex w-full items-center justify-between gap-4 p-6 text-left">
                  <span className="text-lg font-bold">{f.q}</span>
                  <span className={cn("grid h-10 w-10 shrink-0 place-items-center rounded-full transition-all duration-500", on ? "rotate-45 bg-rose text-white" : "bg-white")}><Plus className="h-4 w-4" /></span>
                </button>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease }} className="overflow-hidden">
                      <p className="px-6 pb-6 text-slate">{f.a}</p>
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

/* ── Contact ──────────────────────────────────────────────── */

type F = { name: string; email: string; program: string; schedule: string; message: string };
const empty: F = { name: "", email: "", program: "", schedule: "", message: "" };
const schedules = ["Weekday evenings", "Weekends", "Full time", "Not sure yet"];

function check(f: F) {
  const e: Partial<Record<keyof F, string>> = {};
  if (f.name.trim().length < 2) e.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = "Please enter a valid email.";
  if (!f.program) e.program = "Please choose a program.";
  if (!f.schedule) e.schedule = "Please pick a schedule.";
  if (f.message.trim().length < 15) e.message = "Tell us a little more (15+ characters).";
  return e;
}

export function V2Contact() {
  const [f, setF] = useState<F>(empty);
  const [err, setErr] = useState<Partial<Record<keyof F, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "ready" | "sent" | "error">("idle");
  const [copied, setCopied] = useState(false);
  const id = useId();

  const upd = <K extends keyof F>(k: K, v: F[K]) => {
    const n = { ...f, [k]: v };
    setF(n);
    if (Object.keys(err).length) setErr(check(n));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const c = check(f);
    setErr(c);
    if (Object.keys(c).length) {
      document.getElementById(`${id}-${Object.keys(c)[0]}`)?.focus();
      return;
    }
    setStatus("sending");
    if (site.formEndpoint) {
      try {
        const r = await fetch(site.formEndpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(f) });
        setStatus(r.ok ? "sent" : "error");
      } catch {
        setStatus("error");
      }
    } else {
      await new Promise((r) => setTimeout(r, 900));
      setStatus("ready");
    }
  };

  const summary = `Name: ${f.name}\nEmail: ${f.email}\nProgram: ${f.program}\nSchedule: ${f.schedule}\n\n${f.message}`;
  const input = (k: keyof F) => cn("w-full rounded-2xl border-2 bg-white px-4 py-3.5 font-medium text-coal outline-none transition placeholder:text-coal/35 focus:border-rose", err[k] ? "border-rose/60" : "border-coal/10");
  const msg = (k: keyof F) => err[k] && <p id={`${id}-${k}-e`} role="alert" className="mt-1.5 flex items-center gap-1.5 text-sm font-semibold text-rose"><AlertCircle className="h-4 w-4" />{err[k]}</p>;

  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <Heading kicker="Contact" title={<>Tell Us Where You Want To <span className="text-rose">Go</span></>} intro="Share your goals and we will recommend the right program, intake and learning plan. No pressure, no spam." />
          <ul className="mt-10 space-y-4">
            {[
              ["Email", site.contact.email],
              ["Phone / WhatsApp", site.contact.phone],
              ["Campus", site.contact.address],
            ].map(([k, v]) => (
              <li key={k} className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-coal/10 pb-4">
                <span className="w-40 text-sm font-bold text-slate">{k}</span>
                <span className="font-semibold">{clean(v)}</span>
                {isPlaceholder(v) && <span className="ph">Placeholder</span>}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-[2rem] border border-coal/10 bg-white p-6 shadow-[0_40px_90px_-50px_rgba(15,16,32,0.4)] sm:p-10">
          <AnimatePresence mode="wait">
            {status === "ready" || status === "sent" ? (
              <motion.div key="ok" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-10 text-center" role="status">
                <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-rose text-white shadow-[0_20px_50px_-15px_rgba(225,28,94,0.8)]"><Check className="h-9 w-9" /></span>
                <h3 className="display mt-7 text-3xl">{status === "sent" ? "Inquiry received." : "Your inquiry is ready."}</h3>
                <p className="mx-auto mt-3 max-w-md text-slate">
                  {status === "sent"
                    ? `Thank you, ${f.name.split(" ")[0]}. We will reply to ${f.email} soon.`
                    : `Thank you, ${f.name.split(" ")[0]}. Direct sending switches on once the academy connects its inbox. You can copy your inquiry for now.`}
                </p>
                {status === "ready" && (
                  <button onClick={async () => { try { await navigator.clipboard.writeText(summary); setCopied(true); } catch { setCopied(false); } }} className="mt-6 inline-flex items-center gap-2 rounded-full border-2 border-coal/10 px-5 py-3 font-bold hover:border-rose">
                    {copied ? <Check className="h-4 w-4 text-rose" /> : <Copy className="h-4 w-4" />} {copied ? "Copied" : "Copy inquiry"}
                  </button>
                )}
                <button onClick={() => { setF(empty); setStatus("idle"); setCopied(false); }} className="mt-6 flex w-full items-center justify-center gap-2 text-sm font-semibold text-slate hover:text-coal"><RotateCcw className="h-4 w-4" /> Start over</button>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={submit} noValidate className="space-y-5" aria-label="Consultation form">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor={`${id}-name`} className="mb-2 block text-sm font-bold">Your name</label>
                    <input id={`${id}-name`} className={input("name")} placeholder="Jane Doe" autoComplete="name" value={f.name} onChange={(e) => upd("name", e.target.value)} aria-invalid={!!err.name} aria-describedby={err.name ? `${id}-name-e` : undefined} />
                    {msg("name")}
                  </div>
                  <div>
                    <label htmlFor={`${id}-email`} className="mb-2 block text-sm font-bold">Email</label>
                    <input id={`${id}-email`} type="email" className={input("email")} placeholder="jane@email.com" autoComplete="email" value={f.email} onChange={(e) => upd("email", e.target.value)} aria-invalid={!!err.email} aria-describedby={err.email ? `${id}-email-e` : undefined} />
                    {msg("email")}
                  </div>
                </div>
                <div>
                  <label htmlFor={`${id}-program`} className="mb-2 block text-sm font-bold">Program of interest</label>
                  <select id={`${id}-program`} className={cn(input("program"), "appearance-none")} value={f.program} onChange={(e) => upd("program", e.target.value)} aria-invalid={!!err.program}>
                    <option value="">Choose a program</option>
                    {programs.map((p) => <option key={p.n}>{p.title}</option>)}
                    <option>Not sure yet</option>
                  </select>
                  {msg("program")}
                </div>
                <fieldset>
                  <legend className="mb-2 text-sm font-bold">Preferred schedule</legend>
                  <div className="flex flex-wrap gap-2">
                    {schedules.map((s, k) => (
                      <label key={s} className={cn("cursor-pointer rounded-full border-2 px-4 py-2 text-sm font-semibold transition", f.schedule === s ? "border-rose bg-rose text-white" : "border-coal/10 hover:border-coal/30")}>
                        <input id={k === 0 ? `${id}-schedule` : undefined} type="radio" name="schedule" value={s} checked={f.schedule === s} onChange={() => upd("schedule", s)} className="sr-only" />
                        {s}
                      </label>
                    ))}
                  </div>
                  {msg("schedule")}
                </fieldset>
                <div>
                  <label htmlFor={`${id}-message`} className="mb-2 block text-sm font-bold">Where are you stuck right now?</label>
                  <textarea id={`${id}-message`} rows={4} maxLength={1000} className={cn(input("message"), "resize-none")} placeholder="I know some HTML and want to become a full stack developer..." value={f.message} onChange={(e) => upd("message", e.target.value)} aria-invalid={!!err.message} />
                  {msg("message")}
                </div>
                {status === "error" && <p role="alert" className="rounded-2xl bg-blush p-4 text-sm font-semibold text-rose-deep">Something went wrong. Please try again.</p>}
                <button type="submit" disabled={status === "sending"} className="group flex w-full items-center justify-center gap-2 rounded-full bg-rose py-4 font-bold text-white shadow-[0_18px_40px_-14px_rgba(225,28,94,0.8)] transition hover:bg-rose-deep disabled:opacity-70">
                  {status === "sending" ? <><Loader2 className="h-5 w-5 animate-spin" /> Sending</> : <>Book my free consultation <ArrowUpRight className="h-5 w-5 transition-transform group-hover:rotate-45" /></>}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export function V2Closing() {
  return (
    <section aria-label="Get started" className="px-3 pb-24 sm:px-5">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 1, ease }} className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[2.5rem] bg-rose px-6 py-20 text-center text-white md:py-28">
        <div aria-hidden className="dots-bg absolute inset-0 opacity-30 [background-image:radial-gradient(rgba(255,255,255,0.35)_1px,transparent_1px)]" />
        <motion.div aria-hidden animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} className="absolute -right-24 -top-24 h-72 w-72 rounded-full border-2 border-dashed border-white/30" />
        <h2 className="display relative mx-auto max-w-4xl text-[clamp(2.2rem,6vw,5rem)]">Your Future Team Is Already Hiring</h2>
        <p className="relative mx-auto mt-5 max-w-xl text-lg text-white/85">The best time to start building was yesterday. The next best time is the next intake.</p>
        <div className="relative mt-10 flex flex-wrap justify-center gap-3">
          <a href="#contact" className="group inline-flex items-center gap-2 rounded-full bg-white py-3.5 pl-6 pr-3.5 font-bold text-rose transition hover:-translate-y-0.5">
            Book a consultation <span className="grid h-8 w-8 place-items-center rounded-full bg-rose text-white transition-transform group-hover:rotate-45"><ArrowUpRight className="h-4 w-4" /></span>
          </a>
          <a href="#programs" className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 px-6 py-3.5 font-bold transition hover:bg-white/10"><ZoomIn className="h-4 w-4" /> Explore programs</a>
        </div>
      </motion.div>
    </section>
  );
}
