"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { ArrowUpRight, ExternalLink, User } from "lucide-react";
import { projectCategories, projects, type Project, type ProjectCategory } from "@/data/content";
import { SectionHeading } from "@/components/ui/SplitReveal";
import { ProjectMock } from "@/components/ui/ProjectMock";
import { Modal } from "@/components/ui/Modal";
import { Editable, PlaceholderTag, clean } from "@/components/ui/Placeholder";
import { cn } from "@/lib/cn";

const spans = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7", "lg:col-span-6", "lg:col-span-6"];

export default function Projects() {
  const [filter, setFilter] = useState<ProjectCategory | "All">("All");
  const [selected, setSelected] = useState<Project | null>(null);
  const list = useMemo(() => projects.filter((p) => filter === "All" || p.category === filter), [filter]);

  return (
    <section id="projects" className="relative overflow-hidden py-24 md:py-36">
      <div aria-hidden className="pointer-events-none absolute left-0 top-1/3 h-[45vmax] w-[45vmax] -translate-x-1/2 rounded-full bg-electric/10 blur-[140px]" />
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            index="05"
            eyebrow="Projects & Student Portfolio"
            title="Work that *ships,*|not just submits."
            intro="A showcase framework for student capstones. Each slot below is ready to receive a real project, screenshot and live link."
          />
          <LayoutGroup id="proj">
            <div role="tablist" aria-label="Filter projects" className="flex flex-wrap gap-1 rounded-full border border-white/10 bg-white/[0.02] p-1">
              {(["All", ...projectCategories] as const).map((c) => (
                <button
                  key={c}
                  role="tab"
                  aria-selected={filter === c}
                  onClick={() => setFilter(c)}
                  className={cn("relative rounded-full px-4 py-2 text-sm transition-colors", filter === c ? "text-ink" : "text-mist hover:text-white")}
                >
                  {filter === c && <motion.span layoutId="proj-pill" className="absolute inset-0 rounded-full bg-white" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
                  <span className="relative">{c}</span>
                </button>
              ))}
            </div>
          </LayoutGroup>
        </div>

        <motion.ul layout className="mt-14 grid gap-5 lg:grid-cols-12">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <motion.li
                layout
                key={p.id}
                initial={{ opacity: 0, clipPath: "inset(20% 10% 20% 10% round 28px)" }}
                animate={{ opacity: 1, clipPath: "inset(0% 0% 0% 0% round 28px)" }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.25 } }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 }}
                className={cn(filter === "All" ? spans[i % spans.length] : "lg:col-span-6")}
              >
                <button onClick={() => setSelected(p)} className="group block w-full text-left" aria-label={`View project ${clean(p.title)}`}>
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[1.75rem] border border-white/10">
                    <ProjectMock project={p} />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#05060d] via-[#05060d]/70 via-35% to-transparent to-70% opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="absolute left-5 top-5 flex gap-2">
                      <span className="rounded-full bg-black/40 px-3 py-1 text-[0.7rem] backdrop-blur-md">{p.category}</span>
                      <PlaceholderTag label="Sample" />
                    </div>
                    <span className="absolute right-5 top-5 grid h-12 w-12 scale-50 place-items-center rounded-full bg-white text-ink opacity-0 transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-100 group-hover:opacity-100">
                      <ArrowUpRight className="h-5 w-5" />
                    </span>
                    <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
                      <h3 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">{clean(p.title)}</h3>
                      <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr]">
                        <p className="overflow-hidden text-sm text-mist">
                          <span className="block pt-2">{clean(p.description)}</span>
                        </p>
                      </div>
                      <ul className="mt-3 flex flex-wrap gap-1.5">
                        {p.tech.map((t) => <li key={t} className="rounded-full border border-white/15 bg-black/30 px-2.5 py-1 text-[0.7rem] backdrop-blur">{t}</li>)}
                      </ul>
                    </div>
                  </div>
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)} label={selected ? clean(selected.title) : "Project"}>
        {selected && (
          <div>
            <div className="group aspect-[16/9]">
              <ProjectMock project={selected} />
            </div>
            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-2">
                <span className="eyebrow">{selected.category} project</span>
                <PlaceholderTag label="Sample showcase" />
              </div>
              <h3 className="mt-3 font-display text-3xl font-semibold tracking-tight">{clean(selected.title)}</h3>
              <p className="mt-2 flex items-center gap-2 text-sm text-mist"><User className="h-4 w-4" /><Editable value={selected.student} /></p>
              <p className="mt-5 leading-relaxed text-white/85">{clean(selected.description)}</p>
              <h4 className="mt-6 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-fog">Technologies</h4>
              <ul className="mt-3 flex flex-wrap gap-2">
                {selected.tech.map((t) => <li key={t} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs">{t}</li>)}
              </ul>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                {selected.link ? (
                  <a href={selected.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-ink">
                    Open live project <ExternalLink className="h-4 w-4" />
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2 rounded-full border border-dashed border-white/20 px-5 py-3 text-sm text-mist">
                    Live link will appear here once published
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
