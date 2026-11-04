"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { useApp } from "@/components/layout/AppProvider";

/** Accessible dialog: focus trap, Escape to close, scroll lock, animated entrance. */
export function Modal({
  open, onClose, children, label,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { lenisRef } = useApp();

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    lenisRef.current?.stop();
    document.documentElement.style.overflow = "hidden";
    const t = setTimeout(() => ref.current?.querySelector<HTMLElement>("button, a, [tabindex]")?.focus(), 60);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && ref.current) {
        const f = ref.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex='-1'])");
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      lenisRef.current?.start();
      document.documentElement.style.overflow = "";
      prev?.focus?.();
    };
  }, [open, onClose, lenisRef]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.button
            aria-label="Close dialog"
            className="absolute inset-0 cursor-default bg-[#03040a]/75 backdrop-blur-md"
            onClick={onClose}
            tabIndex={-1}
          />
          <motion.div
            ref={ref}
            role="dialog"
            aria-modal="true"
            aria-label={label}
            data-lenis-prevent
            initial={{ y: 60, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto overscroll-contain rounded-t-3xl border border-white/10 bg-[#0b0e20] shadow-[0_40px_120px_-20px_rgba(0,0,0,0.8)] sm:rounded-3xl"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-black/40 text-white backdrop-blur transition hover:rotate-90 hover:bg-white/10"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
