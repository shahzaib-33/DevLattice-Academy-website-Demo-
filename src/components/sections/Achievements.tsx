"use client";

import { Award, Flag, GraduationCap, Trophy } from "lucide-react";
import { achievements, type Achievement } from "@/data/content";
import { SectionHeading } from "@/components/ui/SplitReveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { Reveal } from "@/components/ui/Reveal";
import { LogoMark } from "@/components/ui/Logo";
import { PlaceholderTag, clean } from "@/components/ui/Placeholder";

const icons: Record<Achievement["type"], typeof Award> = {
  Certificate: Award,
  "Student Achievement": Trophy,
  Milestone: Flag,
  Training: GraduationCap,
};

export default function Achievements() {
  return (
    <section id="achievements" className="relative py-24 md:py-36">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 divider-glow" />
      <div className="container-x">
        <SectionHeading
          index="07"
          eyebrow="Certificates & Achievements"
          title="Proof of *progress.*"
          intro="A gallery for certificates, student wins, training delivered and academy milestones. Every entry is an editable slot. No credentials are claimed until verified."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-[1.05fr_1fr]">
          {/* Certificate preview */}
          <Reveal type="scale">
            <TiltCard max={6} className="rounded-[2rem]">
              <div className="relative aspect-[1.414/1] overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(140deg,#13173a,#0a0c1d_60%)] p-[6%]">
                <div aria-hidden className="absolute inset-3 rounded-[1.5rem] border border-violet/25" />
                <div aria-hidden className="absolute inset-5 rounded-[1.25rem] border border-dashed border-white/10" />
                <div aria-hidden className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet/25 blur-3xl" />
                <div className="relative flex h-full flex-col justify-between" style={{ transform: "translateZ(40px)" }}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <LogoMark className="h-7 w-7 sm:h-9 sm:w-9" />
                      <span className="font-mono text-[0.55rem] uppercase tracking-[0.25em] text-mist sm:text-[0.65rem]">DevLattice Academy</span>
                    </div>
                    <PlaceholderTag label="Sample design" />
                  </div>
                  <div>
                    <p className="font-mono text-[0.55rem] uppercase tracking-[0.3em] text-violet-bright sm:text-[0.65rem]">Certificate of Completion</p>
                    <p className="mt-2 font-serif text-[clamp(1.4rem,3.4vw,2.8rem)] italic leading-tight">Learner Name</p>
                    <p className="mt-1 text-[0.7rem] text-mist sm:text-sm">has successfully completed the program</p>
                    <p className="mt-1 font-display text-sm font-semibold sm:text-xl">Program Title</p>
                  </div>
                  <div className="flex items-end justify-between">
                    <div className="space-y-1">
                      <div className="h-px w-20 bg-white/30 sm:w-32" />
                      <p className="font-mono text-[0.5rem] uppercase tracking-[0.2em] text-fog sm:text-[0.6rem]">Academy Director</p>
                    </div>
                    <div className="relative grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-violet to-electric shadow-[0_0_40px_rgba(139,92,246,.5)] sm:h-20 sm:w-20">
                      <div className="absolute inset-1 animate-spin-slow rounded-full border border-dashed border-white/40" />
                      <Award className="h-6 w-6 sm:h-8 sm:w-8" />
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>
          </Reveal>

          <ul className="grid gap-3 sm:grid-cols-2">
            {achievements.map((a, i) => {
              const Icon = icons[a.type];
              return (
                <Reveal as="li" key={i} delay={i * 0.06} type="blur" className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-colors duration-500 hover:border-violet/40 hover:bg-white/[0.04]">
                  <div className="flex items-center justify-between">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110">
                      <Icon className="h-4 w-4 text-violet-bright" />
                    </span>
                    <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-fog">{clean(a.date)}</span>
                  </div>
                  <p className="mt-5 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-cyan">{a.type}</p>
                  <h3 className="mt-1.5 font-display text-base font-semibold leading-snug">{clean(a.title)}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-mist">{clean(a.detail)}</p>
                  {a.title.startsWith("[") ? <PlaceholderTag className="mt-4 inline-block" /> : <span className="mt-4 inline-block rounded-full border border-cyan/40 bg-cyan/10 px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-cyan">Verified</span>}
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
