"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { nav, site } from "@/config/site";
import { categories } from "@/data/courses";
import { Logo } from "@/components/ui/Logo";
import { clean } from "@/components/ui/Placeholder";
import { GithubIcon, InstagramIcon, LinkedinIcon, XIcon, YoutubeIcon } from "@/components/ui/BrandIcons";
import { useApp } from "./AppProvider";

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const { setCourseFilter } = useApp();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], ["40%", "0%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.2, 1]);

  const socials = [
    { icon: LinkedinIcon, label: "LinkedIn", href: site.social.linkedin },
    { icon: GithubIcon, label: "GitHub", href: site.social.github },
    { icon: InstagramIcon, label: "Instagram", href: site.social.instagram },
    { icon: YoutubeIcon, label: "YouTube", href: site.social.youtube },
    { icon: XIcon, label: "X", href: site.social.x },
  ];

  return (
    <footer ref={ref} className="relative overflow-hidden border-t border-white/5 bg-[#04050b] pt-20">
      <div aria-hidden className="absolute inset-0 grid-bg opacity-30" />
      <div className="container-x relative">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-mist">{site.description}</p>
            <ul className="mt-6 flex gap-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-mist transition hover:border-white/30 hover:text-white">
                    <s.icon className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <nav aria-label="Footer academy">
            <p className="eyebrow mb-5">Academy</p>
            <ul className="space-y-3 text-sm">
              {nav.map((n) => (
                <li key={n.href}><a href={n.href} className="link-underline text-mist hover:text-white">{n.label}</a></li>
              ))}
              <li><a href="#achievements" className="link-underline text-mist hover:text-white">Achievements</a></li>
              <li><a href="/v2" className="link-underline text-mist hover:text-white">View light edition</a></li>
            </ul>
          </nav>
          <nav aria-label="Footer programs">
            <p className="eyebrow mb-5">Programs</p>
            <ul className="space-y-3 text-sm">
              {categories.map((c) => (
                <li key={c}><a href="#courses" onClick={() => setCourseFilter(c)} className="link-underline text-mist hover:text-white">{c}</a></li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="eyebrow mb-5">Contact</p>
            <ul className="space-y-3 text-sm text-mist">
              <li>{clean(site.contact.email)}</li>
              <li>{clean(site.contact.phone)}</li>
              <li>{clean(site.contact.address)}</li>
            </ul>
            <a href="#contact" className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-ink transition hover:bg-violet-bright">
              Apply now <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mt-16 divider-glow" />

        <motion.p
          aria-hidden
          style={{ y, opacity }}
          className="pointer-events-none mt-6 select-none whitespace-nowrap text-center font-display text-[18.5vw] font-bold leading-[0.8] tracking-[-0.06em] footer-word"
        >
          DevLattice
        </motion.p>

        <div className="relative flex flex-col items-start justify-between gap-3 border-t border-white/5 py-6 text-xs text-fog sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} {site.name}. A {site.parent} company.</p>
          <p className="font-mono uppercase tracking-[0.16em]">Designed &amp; engineered with care</p>
        </div>
      </div>
    </footer>
  );
}
