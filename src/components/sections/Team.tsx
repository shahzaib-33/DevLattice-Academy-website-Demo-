"use client";

import { motion } from "motion/react";
import { team } from "@/data/content";
import { SectionHeading } from "@/components/ui/SplitReveal";
import { PortraitPlaceholder } from "@/components/ui/Artwork";
import { Editable, clean } from "@/components/ui/Placeholder";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";

export default function Team() {
  return (
    <section id="team" className="relative py-24 md:py-36">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            index="04"
            eyebrow="Our Team"
            title="Mentors who *build*|for a living."
            intro="Led by founder Ayesha Abid. Further mentor profiles are placeholders until the academy publishes official names, photos and biographies."
          />
        </div>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 60, rotate: i % 2 ? 2 : -2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={i % 2 ? "lg:mt-14" : ""}
            >
              <article className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0a0d1f]">
                <div className="relative aspect-[5/6] overflow-hidden">
                  <div className="absolute inset-0 grayscale-[70%] transition-all duration-[1.1s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.08] group-hover:grayscale-0">
                    {m.photo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={m.photo} alt={clean(m.name)} className="h-full w-full object-cover" loading="lazy" />
                    ) : (
                      <PortraitPlaceholder hue={m.hue} initials={m.initials} />
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d1f] via-transparent to-transparent" />
                  {/* Hover sweep */}
                  <div className="absolute inset-0 -translate-y-full bg-gradient-to-b from-violet/40 to-transparent transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-y-0" />
                  <div className="absolute right-4 top-4 flex flex-col gap-2">
                    {m.linkedin && (
                      <a href={m.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${clean(m.name)} on LinkedIn`}
                        className="grid h-10 w-10 translate-x-14 place-items-center rounded-full glass transition-all duration-500 hover:bg-white hover:text-ink group-hover:translate-x-0 group-focus-within:translate-x-0">
                        <LinkedinIcon className="h-4 w-4" />
                      </a>
                    )}
                    {m.github && (
                      <a href={m.github} target="_blank" rel="noopener noreferrer" aria-label={`${clean(m.name)} on GitHub`}
                        className="grid h-10 w-10 translate-x-14 place-items-center rounded-full glass transition-all delay-75 duration-500 hover:bg-white hover:text-ink group-hover:translate-x-0 group-focus-within:translate-x-0">
                        <GithubIcon className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
                <div className="relative -mt-16 p-6">
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-violet-bright">{clean(m.role)}</p>
                  <h3 className="mt-2 font-display text-xl font-semibold tracking-tight">
                    <Editable value={m.name} />
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-mist">{clean(m.bio)}</p>
                </div>
              </article>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
