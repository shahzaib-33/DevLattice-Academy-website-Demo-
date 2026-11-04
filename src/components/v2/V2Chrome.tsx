"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { programs } from "@/data/v2";
import { site } from "@/config/site";
import { LogoMark } from "@/components/ui/Logo";
import { InstagramIcon, LinkedinIcon, YoutubeIcon, GithubIcon } from "@/components/ui/BrandIcons";
import { useApp } from "@/components/layout/AppProvider";
import { cn } from "@/lib/cn";

const links = [
  { label: "Programs", href: "#programs", drop: true },
  { label: "Process", href: "#process" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#faq" },
];

export function V2Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <LogoMark className="h-8 w-8" />
      <span className={cn("font-wide text-lg font-extrabold tracking-tight", light ? "text-white" : "text-coal")} style={{ fontStretch: "110%" }}>
        DevLattice<span className="text-rose">.</span>
        <span className={cn("ml-1.5 align-middle font-body text-[0.6rem] font-bold uppercase tracking-[0.25em]", light ? "text-white/60" : "text-slate")}>Academy</span>
      </span>
    </span>
  );
}

/** Marks the app as loaded (no intro loader on this demo). */
export function V2Boot() {
  const { setLoaded } = useApp();
  useEffect(() => {
    setLoaded(true);
    document.documentElement.style.background = "#faf7f4";
    document.documentElement.style.colorScheme = "light";
  }, [setLoaded]);
  return null;
}

export function V2Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [drop, setDrop] = useState(false);
  const [mobile, setMobile] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 20));

  useEffect(() => {
    document.documentElement.style.overflow = mobile ? "hidden" : "";
  }, [mobile]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled ? "border-b border-coal/5 bg-cream/80 backdrop-blur-xl" : "bg-transparent",
        )}
      >
        <nav aria-label="Primary" className="container-x flex h-[72px] items-center justify-between">
          <a href="#top" aria-label="DevLattice Academy home"><V2Logo /></a>
          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <li key={l.href} className="relative" onMouseEnter={() => l.drop && setDrop(true)} onMouseLeave={() => l.drop && setDrop(false)}>
                <a
                  href={l.href}
                  onFocus={() => l.drop && setDrop(true)}
                  aria-expanded={l.drop ? drop : undefined}
                  className="group relative flex items-center gap-1 px-4 py-2 text-[0.92rem] font-semibold text-coal/80 transition hover:text-coal"
                >
                  {l.label}
                  {l.drop && <ChevronDown className={cn("h-4 w-4 transition-transform", drop && "rotate-180")} />}
                  <span className="absolute inset-x-4 bottom-1 h-[2px] origin-left scale-x-0 rounded-full bg-rose transition-transform duration-300 group-hover:scale-x-100" />
                </a>
                {l.drop && (
                  <AnimatePresence>
                    {drop && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.25 }}
                        className="absolute left-0 top-full w-[460px] pt-3"
                      >
                        <div className="grid grid-cols-2 gap-1 rounded-3xl border border-coal/5 bg-white p-2 shadow-[0_30px_70px_-20px_rgba(15,16,32,0.25)]">
                          {programs.map((p) => (
                            <a key={p.n} href="#programs" onClick={() => setDrop(false)} className="group rounded-2xl p-4 transition hover:bg-blush">
                              <span className="block text-xs font-bold text-rose">{p.n}</span>
                              <span className="mt-1 block font-bold text-coal">{p.title}</span>
                              <span className="mt-0.5 block text-xs text-slate">{p.sub}</span>
                            </a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <a href="#contact" className="group hidden items-center gap-2 rounded-full bg-rose py-3 pl-5 pr-3 text-sm font-bold text-white shadow-[0_12px_30px_-10px_rgba(225,28,94,0.7)] transition hover:bg-rose-deep sm:inline-flex">
              Book a consultation
              <span className="grid h-7 w-7 place-items-center rounded-full bg-white/20 transition-transform duration-300 group-hover:rotate-45"><ArrowUpRight className="h-4 w-4" /></span>
            </a>
            <button onClick={() => setMobile((m) => !m)} aria-label={mobile ? "Close menu" : "Open menu"} aria-expanded={mobile} className="grid h-11 w-11 place-items-center rounded-full border border-coal/10 bg-white lg:hidden">
              {mobile ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobile && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col bg-cream px-6 pb-8 pt-24 lg:hidden"
            data-lenis-prevent
          >
            <ul className="space-y-1">
              {links.map((l, i) => (
                <motion.li key={l.href} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 * i + 0.1 }}>
                  <a href={l.href} onClick={() => setMobile(false)} className="display flex items-center justify-between border-b border-coal/10 py-4 text-4xl">
                    {l.label} <ArrowUpRight className="h-6 w-6 text-rose" />
                  </a>
                </motion.li>
              ))}
            </ul>
            <a href="#contact" onClick={() => setMobile(false)} className="mt-auto rounded-full bg-rose py-4 text-center font-bold text-white">Book a consultation</a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function V2Footer() {
  const cols = [
    { h: "Programs", items: programs.map((p) => ({ l: p.title, href: "#programs" })) },
    { h: "Company", items: [{ l: "About", href: "#about" }, { l: "Process", href: "#process" }, { l: "Student work", href: "#work" }, { l: "FAQ", href: "#faq" }] },
    { h: "Get started", items: [{ l: "Book a consultation", href: "#contact" }, { l: "Compare programs", href: "#programs" }, { l: "View Demo 1 (dark edition)", href: "https://claude.ai/artifact/G8vdGTbs7e95rYL2tf581Y" }] },
  ];
  return (
    <footer className="relative overflow-hidden bg-coal pt-20 text-white">
      <div aria-hidden className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-rose/25 blur-[120px]" />
      <div className="container-x relative grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <V2Logo light />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">{site.description}</p>
          <div className="mt-6 flex gap-2">
            {[
              { i: LinkedinIcon, h: site.social.linkedin, l: "LinkedIn" },
              { i: InstagramIcon, h: site.social.instagram, l: "Instagram" },
              { i: YoutubeIcon, h: site.social.youtube, l: "YouTube" },
              { i: GithubIcon, h: site.social.github, l: "GitHub" },
            ].map((s) => (
              <a key={s.l} href={s.h} target="_blank" rel="noopener noreferrer" aria-label={s.l} className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/70 transition hover:border-rose hover:bg-rose hover:text-white">
                <s.i className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        {cols.map((c) => (
          <div key={c.h}>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-rose">{c.h}</p>
            <ul className="space-y-3 text-sm text-white/70">
              {c.items.map((it) => <li key={it.l}><a href={it.href} target={it.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="link-underline hover:text-white">{it.l}</a></li>)}
            </ul>
          </div>
        ))}
      </div>
      <p aria-hidden className="display container-x relative mt-16 select-none whitespace-nowrap text-[15vw] leading-none text-white/[0.05]">DEVLATTICE</p>
      <div className="container-x relative flex flex-col gap-2 border-t border-white/10 py-6 text-xs text-white/50 sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} {site.name}. A {site.parent} company.</p>
        <p>Demo 2 · Light editorial edition</p>
      </div>
    </footer>
  );
}
