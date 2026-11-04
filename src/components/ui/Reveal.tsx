"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";

const variants: Record<string, Variants> = {
  up: { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0 } },
  fade: { hidden: { opacity: 0 }, show: { opacity: 1 } },
  scale: { hidden: { opacity: 0, scale: 0.94 }, show: { opacity: 1, scale: 1 } },
  blur: { hidden: { opacity: 0, filter: "blur(12px)", y: 20 }, show: { opacity: 1, filter: "blur(0px)", y: 0 } },
};

export function Reveal({
  children, className, delay = 0, type = "up", as = "div", amount = 0.25,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  type?: keyof typeof variants;
  as?: "div" | "li" | "article" | "p";
  amount?: number;
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={variants[type]}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </Comp>
  );
}
