"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import type Lenis from "lenis";
import type { Category } from "@/data/courses";

interface AppState {
  loaded: boolean;
  setLoaded: (v: boolean) => void;
  lenisRef: React.MutableRefObject<Lenis | null>;
  scrollTo: (target: string | number, opts?: { offset?: number; immediate?: boolean }) => void;
  courseFilter: Category | "All";
  setCourseFilter: (c: Category | "All") => void;
  inquiryCourse: string;
  setInquiryCourse: (c: string) => void;
}

const Ctx = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);
  const [courseFilter, setCourseFilter] = useState<Category | "All">("All");
  const [inquiryCourse, setInquiryCourse] = useState("");
  const lenisRef = useRef<Lenis | null>(null);

  const scrollTo = useCallback<AppState["scrollTo"]>((target, opts) => {
    const offset = opts?.offset ?? -72;
    if (typeof target === "string" && target.startsWith("#")) {
      try {
        history.replaceState(null, "", target === "#top" ? " " : target);
      } catch {
        /* sandboxed frames may refuse history access */
      }
    }
    const el = typeof target === "string" ? (target === "#top" ? 0 : document.querySelector(target)) : target;
    if (el === null) return;
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(el as HTMLElement | number, { offset: typeof el === "number" ? 0 : offset, immediate: opts?.immediate, duration: 1.4 });
    } else if (typeof el === "number") {
      window.scrollTo({ top: el, behavior: "smooth" });
    } else {
      const top = (el as HTMLElement).getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, []);

  const value = useMemo(
    () => ({ loaded, setLoaded, lenisRef, scrollTo, courseFilter, setCourseFilter, inquiryCourse, setInquiryCourse }),
    [loaded, scrollTo, courseFilter, inquiryCourse],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useApp() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}
