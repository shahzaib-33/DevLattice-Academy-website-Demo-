"use client";

import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

/**
 * 3D tilt with a cursor-following spotlight. Falls back to a flat card
 * for touch input and reduced motion.
 */
export function TiltCard({
  children, className, max = 8, glow = "rgba(139,92,246,0.22)",
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
  glow?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const srx = useSpring(rx, { stiffness: 160, damping: 18 });
  const sry = useSpring(ry, { stiffness: 160, damping: 18 });
  const bg = useMotionTemplate`radial-gradient(420px circle at ${mx}% ${my}%, ${glow}, transparent 60%)`;

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    mx.set(px * 100);
    my.set(py * 100);
    if (reduce) return;
    ry.set((px - 0.5) * max * 2);
    rx.set(-(py - 0.5) * max * 2);
  };
  const reset = () => { rx.set(0); ry.set(0); };

  return (
    <div style={{ perspective: 1100 }} className="h-full">
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={reset}
        style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
        className={cn("group relative h-full", className)}
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: bg }}
        />
        {children}
      </motion.div>
    </div>
  );
}
