"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { nav, site } from "@/config/site";
import { categories, courses, type Category } from "@/data/courses";
import { Logo } from "@/components/ui/Logo";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { LinkedinIcon, GithubIcon, InstagramIcon, YoutubeIcon } from "@/components/ui/BrandIcons";
import { cn } from "@/lib/cn";
import { useApp } from "./AppProvider";

const sectionIds = nav.map((n) => n.href.slice(1));

export default function Navbar() {
  const { loaded, scrollTo, setCourseFilter } = useApp();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [hovered, setHovered] = useState<string | null>(null);
  const [dropdown, setDropdown] = useState(false);
  const [mobile, setMobile] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 30);
    setHidden(y > 500 && y > prev && !mobile && !dropdown);
  });

  // Active section tracking
  useEffect(() => {
    const els = sectionIds.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    const hero = document.getElementById("top");
    const io2 = new IntersectionObserver(([e]) => e.isIntersecting && setActive(""), { rootMargin: "-50% 0px -50% 0px" });
    if (hero) io2.observe(hero);
    return () => { io.disconnect(); io2.disconnect(); };
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = mobile ? "hidden" : "";
  }, [mobile]);

  const openDrop = () => { if (closeTimer.current) clearTimeout(closeTimer.current); setDropdown(true); };
  const closeDrop = () => { closeTimer.current = setTimeout(() => setDropdown(false), 140); };

  const pickCategory = (c: Category | "All") => {
    setCourseFilter(c);
    setDropdown(false);
    setMobile(false);
    scrollTo("#courses");
  };

  const indicator = hovered ?? active;

  return (
    <>
      <motion.header
        initial={{ y: -110, opacity: 0 }}
        animate={loaded ? { y: hidden ? -110 : 0, opacity: 1 } : { y: -110, opacity: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: loaded && !scrolled ? 0.9 : 0 }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4"
      >
        <nav
          aria-label="Primary"
          className={cn(
            "mx-auto flex max-w-[1320px] items-center justify-between rounded-full py-2 pl-4 pr-2 transition-all duration-500 sm:pl-5",
            scrolled ? "glass shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)]" : "border border-transparent",
          )}
        >
          <a href="#top" aria-label="DevLattice Academy home" className="rounded-full">
            <Logo />
          </a>

          <ul className="hidden items-center gap-1 lg:flex" onMouseLeave={() => setHovered(null)}>
            {nav.map((item) => {
              const id = item.href.slice(1);
              const isDrop = "dropdown" in item && item.dropdown;
              return (
                <li
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => { setHovered(id); if (isDrop) openDrop(); }}
                  onMouseLeave={() => isDrop && closeDrop()}
                >
                  <a
                    href={item.href}
                    className={cn(
                      "relative z-10 flex items-center gap-1 rounded-full px-4 py-2 text-sm transition-colors duration-300",
                      active === id ? "text-white" : "text-mist hover:text-white",
                    )}
                    aria-current={active === id ? "true" : undefined}
                    aria-haspopup={isDrop ? "true" : undefined}
                    aria-expanded={isDrop ? dropdown : undefined}
                    onFocus={() => isDrop && openDrop()}
                  >
                    {item.label}
                    {isDrop && <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-300", dropdown && "rotate-180")} />}
                  </a>
                  {indicator === id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-white/[0.07] ring-1 ring-white/10"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {active === id && (
                    <motion.span layoutId="nav-dot" className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-violet-bright shadow-[0_0_10px_#a78bfa]" />
                  )}

                  {isDrop && (
                    <AnimatePresence>
                      {dropdown && (
                        <motion.div
                          initial={{ opacity: 0, y: 12, scale: 0.97, filter: "blur(6px)" }}
                          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                          exit={{ opacity: 0, y: 8, scale: 0.98, filter: "blur(4px)" }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          onMouseEnter={openDrop}
                          onMouseLeave={closeDrop}
                          className="absolute left-1/2 top-full z-20 mt-3 w-[560px] -translate-x-1/2 origin-top"
                        >
                          <div className="grid grid-cols-[1fr_1.1fr] gap-2 rounded-3xl border border-white/10 bg-[#0b0e20]/95 p-2 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl">
                            <div className="p-3">
                              <p className="eyebrow mb-3">Disciplines</p>
                              <ul className="space-y-0.5">
                                {categories.map((c) => (
                                  <li key={c}>
                                    <button
                                      onClick={() => pickCategory(c)}
                                      className="group/item flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm text-mist transition hover:bg-white/5 hover:text-white"
                                    >
                                      {c}
                                      <span className="font-mono text-[0.65rem] text-fog group-hover/item:text-violet-bright">
                                        {String(courses.filter((x) => x.category === c).length).padStart(2, "0")}
                                      </span>
                                    </button>
                                  </li>
                                ))}
                              </ul>
                              <button onClick={() => pickCategory("All")} className="mt-2 flex items-center gap-1 px-3 text-sm text-violet-bright hover:text-white">
                                View all programs <ArrowUpRight className="h-3.5 w-3.5" />
                              </button>
                            </div>
                            <a
                              href="#courses"
                              onClick={() => setCourseFilter("All")}
                              className="relative flex flex-col justify-end overflow-hidden rounded-2xl bg-[radial-gradient(120%_100%_at_100%_0%,#4c1d95,#0b0e20_70%)] p-5"
                            >
                              <div className="absolute inset-0 grid-bg opacity-70" />
                              <span className="relative eyebrow text-cyan">Featured</span>
                              <span className="relative mt-2 font-display text-xl font-semibold leading-tight">Full Stack Engineering</span>
                              <span className="relative mt-1 text-xs text-mist">Ship production apps from idea to deployment.</span>
                            </a>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <MagneticButton href="#contact" className="px-5 py-2.5" icon={<ArrowUpRight className="h-4 w-4" />}>
                Apply now
              </MagneticButton>
            </div>
            <button
              className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 lg:hidden"
              onClick={() => setMobile((v) => !v)}
              aria-label={mobile ? "Close menu" : "Open menu"}
              aria-expanded={mobile}
              aria-controls="mobile-menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={mobile ? "x" : "m"} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  {mobile ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobile && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-ink/95 px-6 pb-8 pt-28 backdrop-blur-2xl lg:hidden"
            initial={{ clipPath: "circle(0% at calc(100% - 44px) 44px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 44px) 44px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 44px) 44px)" }}
            transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
            data-lenis-prevent
          >
            <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
            <ul className="relative space-y-1">
              {nav.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a
                    href={item.href}
                    onClick={() => setMobile(false)}
                    className="flex items-baseline justify-between border-b border-white/5 py-4 font-display text-4xl font-semibold tracking-tight"
                  >
                    <span className={active === item.href.slice(1) ? "text-gradient" : ""}>{item.label}</span>
                    <span className="font-mono text-xs text-fog">0{i + 1}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="relative mt-8 flex flex-wrap gap-2">
              {categories.map((c) => (
                <button key={c} onClick={() => pickCategory(c)} className="rounded-full border border-white/10 px-4 py-2 text-sm text-mist">
                  {c}
                </button>
              ))}
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="relative mt-auto pt-10">
              <MagneticButton href="#contact" onClick={() => setMobile(false)} className="w-full" icon={<ArrowUpRight className="h-4 w-4" />}>
                Apply to {site.shortName}
              </MagneticButton>
              <div className="mt-6 flex gap-4 text-mist">
                <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedinIcon className="h-5 w-5" /></a>
                <a href={site.social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><GithubIcon className="h-5 w-5" /></a>
                <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><InstagramIcon className="h-5 w-5" /></a>
                <a href={site.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube"><YoutubeIcon className="h-5 w-5" /></a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
