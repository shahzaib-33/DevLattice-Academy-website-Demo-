"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost" | "light";

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  strength?: number;
  icon?: React.ReactNode;
  as?: "a" | "button";
  type?: "button" | "submit";
  disabled?: boolean;
  onButtonClick?: () => void;
}

const styles: Record<Variant, string> = {
  primary:
    "text-white bg-[linear-gradient(135deg,#7c3aed,#4f7cff)] shadow-[0_10px_40px_-10px_rgba(124,58,237,0.75),inset_0_1px_0_rgba(255,255,255,0.25)]",
  ghost: "text-white glass hover:bg-white/10",
  light: "text-ink bg-white shadow-[0_10px_40px_-12px_rgba(255,255,255,0.5)]",
};

/**
 * A button that is gently pulled toward the cursor. The label moves
 * slightly further than the shell, giving a layered, physical feel.
 */
export function MagneticButton({
  children, className, variant = "primary", strength = 0.35, icon, as = "a", type = "button", disabled, onButtonClick, ...rest
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const onMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => { x.set(0); y.set(0); };

  const inner = (
    <>
      <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
        <span className="absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-white/25 opacity-0 transition-all duration-700 group-hover:left-[120%] group-hover:opacity-100" />
      </span>
      <motion.span style={{ x: sx, y: sy }} className="relative z-10 inline-flex items-center gap-2.5">
        {children}
        {icon && (
          <span className="inline-flex transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            {icon}
          </span>
        )}
      </motion.span>
    </>
  );

  const cls = cn(
    "group relative inline-flex items-center justify-center rounded-full px-6 py-3.5 text-sm font-medium tracking-tight transition-[background,box-shadow,opacity] duration-300 disabled:opacity-60 disabled:cursor-not-allowed select-none",
    styles[variant],
    className,
  );

  return (
    <motion.span
      className="inline-flex"
      style={{ x: sx, y: sy }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      data-cursor="hover"
    >
      {as === "button" ? (
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          type={type}
          disabled={disabled}
          onClick={onButtonClick}
          className={cls}
        >
          {inner}
        </button>
      ) : (
        <a ref={ref as React.Ref<HTMLAnchorElement>} className={cls} {...rest}>
          {inner}
        </a>
      )}
    </motion.span>
  );
}
