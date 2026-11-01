"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function AnimatedCounter({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = useReducedMotion();
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 80, damping: 20 });
  const display = useRef(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      if (ref.current) ref.current.textContent = `${value}${suffix}`;
      return;
    }
    motionValue.set(value);
  }, [inView, motionValue, reduced, suffix, value]);

  useEffect(() => {
    if (reduced) return;
    const unsub = spring.on("change", (v) => {
      display.current = Math.round(v);
      if (ref.current) ref.current.textContent = `${display.current}${suffix}`;
    });
    return () => unsub();
  }, [reduced, spring, suffix]);

  return (
    <motion.span
      ref={ref}
      className="font-display text-4xl font-bold tabular-nums text-accent-cyan sm:text-5xl"
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
    >
      0{suffix}
    </motion.span>
  );
}
