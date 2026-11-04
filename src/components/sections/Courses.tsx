"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { ArrowUpRight, BarChart3, CheckCircle2, Clock, MonitorPlay, Search, X } from "lucide-react";
import { categories, courses, type Course, type Level } from "@/data/courses";
import { SectionHeading } from "@/components/ui/SplitReveal";
import { CourseArt } from "@/components/ui/Artwork";
import { TiltCard } from "@/components/ui/TiltCard";
import { Modal } from "@/components/ui/Modal";
import { Editable } from "@/components/ui/Placeholder";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useApp } from "@/components/layout/AppProvider";
import { cn } from "@/lib/cn";

const levels: Array<Level | "All levels"> = ["All levels", "Beginner", "Intermediate", "Advanced"];
const levelBars: Record<Level, number> = { Beginner: 1, Intermediate: 2, Advanced: 3 };

export default function Courses() {
  const { courseFilter, setCourseFilter, setInquiryCourse, scrollTo } = useApp();
  const [level, setLevel] = useState<Level | "All levels">("All levels");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Course | null>(null);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return courses.filter(
      (c) =>
        (courseFilter === "All" || c.category === courseFilter) &&
        (level === "All levels" || c.level === level) &&
        (!q || [c.title, c.description, c.category, ...c.skills].join(" ").toLowerCase().includes(q)),
    );
  }, [courseFilter, level, query]);

  const enquire = (c: Course) => {
    setInquiryCourse(c.title);
    setSelected(null);
    setTimeout(() => scrollTo("#contact"), 350);
  };

  const reset = () => { setCourseFilter("All"); setLevel("All levels"); setQuery(""); };

  return (
    <section id="courses" className="relative py-24 md:py-36">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 divider-glow" />
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            index="03"
            eyebrow="Courses & Programs"
            title="Find the program|that *fits* your path."
            intro="Explore structured programs across engineering, AI, design and cloud. Details shown are editable samples until official program information is published."
          />
          <p className="font-mono text-xs text-fog" aria-live="polite">
            Showing <span className="text-white">{String(list.length).padStart(2, "0")}</span> / {String(courses.length).padStart(2, "0")} programs
          </p>
        </div>

        {/* Filters */}
        <div className="mt-12 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <LayoutGroup id="cat">
            <div role="tablist" aria-label="Filter by category" className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-1 [scrollbar-width:none]">
              {(["All", ...categories] as const).map((c) => {
                const on = courseFilter === c;
                return (
                  <button
                    key={c}
                    role="tab"
                    aria-selected={on}
                    onClick={() => setCourseFilter(c)}
                    className={cn("relative shrink-0 rounded-full px-4 py-2.5 text-sm transition-colors duration-300", on ? "text-white" : "text-mist hover:text-white")}
                  >
                    {on && <motion.span layoutId="cat-pill" className="absolute inset-0 rounded-full bg-gradient-to-r from-violet/80 to-electric/80 shadow-[0_8px_30px_-8px_rgba(124,58,237,.8)]" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
                    <span className="relative">{c}</span>
                  </button>
                );
              })}
            </div>
          </LayoutGroup>

          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="relative flex items-center">
              <span className="sr-only">Search programs</span>
              <Search className="pointer-events-none absolute left-4 h-4 w-4 text-fog" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search skills or programs"
                className="w-full rounded-full border border-white/10 bg-white/[0.03] py-2.5 pl-11 pr-10 text-sm text-white placeholder:text-fog focus:border-violet/60 focus:outline-none sm:w-64"
              />
              {query && (
                <button onClick={() => setQuery("")} aria-label="Clear search" className="absolute right-3 text-fog hover:text-white">
                  <X className="h-4 w-4" />
                </button>
              )}
            </label>
            <label className="relative">
              <span className="sr-only">Filter by level</span>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value as Level | "All levels")}
                className="w-full appearance-none rounded-full border border-white/10 bg-white/[0.03] py-2.5 pl-4 pr-10 text-sm text-white focus:border-violet/60 focus:outline-none sm:w-auto"
              >
                {levels.map((l) => <option key={l} className="bg-navy">{l}</option>)}
              </select>
              <BarChart3 className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-fog" />
            </label>
          </div>
        </div>

        {/* Grid */}
        <motion.ul layout className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((c, i) => (
              <motion.li
                key={c.id}
                layout
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.25 } }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: Math.min(i, 6) * 0.05 }}
              >
                <TiltCard className="rounded-[1.75rem]">
                  <article className="flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0a0d1f] transition-colors duration-500 group-hover:border-violet/40">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <div className="absolute inset-0 transition-transform duration-[1.1s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-110">
                        <CourseArt hue={c.hue} pattern={c.pattern} label={`${c.title} cover`} />
                      </div>
                      <div className="absolute inset-x-4 top-4 flex items-center justify-between">
                        <span className="rounded-full bg-black/40 px-3 py-1 text-[0.7rem] backdrop-blur-md">{c.category}</span>
                        <span className="flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1 text-[0.7rem] backdrop-blur-md">
                          <span className="flex gap-0.5" aria-hidden>
                            {[1, 2, 3].map((b) => <span key={b} className={cn("h-2.5 w-1 rounded-full", b <= levelBars[c.level] ? "bg-cyan" : "bg-white/25")} />)}
                          </span>
                          {c.level}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col p-6" style={{ transform: "translateZ(30px)" }}>
                      <h3 className="font-display text-2xl font-semibold tracking-tight">{c.title}</h3>
                      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-mist">{c.description}</p>
                      <ul className="mb-6 mt-5 flex flex-wrap gap-1.5" aria-label="Skills covered">
                        {c.skills.slice(0, 4).map((s) => (
                          <li key={s} className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[0.7rem] text-white/80">{s}</li>
                        ))}
                        {c.skills.length > 4 && <li className="px-1 py-1 text-[0.7rem] text-fog">+{c.skills.length - 4}</li>}
                      </ul>
                      <div className="mt-auto flex items-center justify-between gap-3 border-t border-white/5 pt-5">
                        <span className="flex items-center gap-2 text-xs text-mist">
                          <Clock className="h-3.5 w-3.5 text-violet-bright" />
                          <Editable value={c.duration} tag={false} />
                        </span>
                        <button
                          onClick={() => setSelected(c)}
                          className="group/btn inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-medium text-ink transition hover:bg-violet-bright"
                          aria-label={`Explore ${c.title}`}
                        >
                          Explore Course
                          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:rotate-45" />
                        </button>
                      </div>
                    </div>
                  </article>
                </TiltCard>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        {list.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-10 rounded-3xl border border-dashed border-white/15 p-12 text-center">
            <p className="font-display text-2xl">No programs match those filters.</p>
            <p className="mt-2 text-mist">Try another category, level or keyword.</p>
            <button onClick={reset} className="mt-6 rounded-full border border-white/15 px-5 py-2.5 text-sm hover:bg-white/5">Reset filters</button>
          </motion.div>
        )}
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)} label={selected?.title ?? "Course details"}>
        {selected && (
          <div>
            <div className="relative aspect-[16/7] overflow-hidden">
              <CourseArt hue={selected.hue} pattern={selected.pattern} label={`${selected.title} cover`} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e20] via-[#0b0e20]/30 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 sm:p-8">
                <span className="eyebrow">{selected.category}</span>
                <h3 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">{selected.title}</h3>
              </div>
            </div>
            <div className="p-6 sm:p-8">
              <p className="text-mist">{selected.description}</p>
              <dl className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {[
                  { icon: Clock, k: "Duration", v: selected.duration },
                  { icon: BarChart3, k: "Level", v: selected.level },
                  { icon: MonitorPlay, k: "Format", v: selected.format },
                ].map((d) => (
                  <div key={d.k} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <dt className="flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-fog"><d.icon className="h-3.5 w-3.5" />{d.k}</dt>
                    <dd className="mt-2 text-sm"><Editable value={d.v} /></dd>
                  </div>
                ))}
              </dl>
              <h4 className="mt-8 font-display text-lg font-semibold">Program outline</h4>
              <ol className="mt-3 grid gap-2 sm:grid-cols-2">
                {selected.outline.map((o, i) => (
                  <li key={o} className="flex gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3 text-sm text-white/85">
                    <span className="font-mono text-xs text-violet-bright">{String(i + 1).padStart(2, "0")}</span>
                    {o}
                  </li>
                ))}
              </ol>
              <h4 className="mt-8 font-display text-lg font-semibold">Skills covered</h4>
              <ul className="mt-3 flex flex-wrap gap-2">
                {selected.skills.map((s) => (
                  <li key={s} className="flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-xs"><CheckCircle2 className="h-3.5 w-3.5 text-cyan" />{s}</li>
                ))}
              </ul>
              <p className="mt-6 rounded-2xl border border-violet/30 bg-violet/10 p-4 text-sm"><span className="font-medium">Outcome: </span>{selected.outcome}</p>
              <p className="mt-4 text-xs text-fog">Program details are sample content and will be confirmed by DevLattice Academy.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <MagneticButton as="button" onButtonClick={() => enquire(selected)} icon={<ArrowUpRight className="h-4 w-4" />}>
                  Enquire about this course
                </MagneticButton>
                <MagneticButton as="button" variant="ghost" onButtonClick={() => setSelected(null)}>
                  Keep browsing
                </MagneticButton>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
