"use client";

import { motion, type Variants } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

const variants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

type SectionMotionProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  id?: string;
};

export function SectionMotion({
  children,
  className,
  delay = 0,
  id,
}: SectionMotionProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <section id={id} className={cn("section-padding", className)}>
        {children}
      </section>
    );
  }

  return (
    <motion.section
      id={id}
      className={cn("section-padding", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: variants.hidden,
        visible: {
          ...variants.visible,
          transition: {
            ...(typeof variants.visible === "object" &&
            variants.visible !== null &&
            "transition" in variants.visible
              ? variants.visible.transition
              : {}),
            delay,
          },
        },
      }}
    >
      {children}
    </motion.section>
  );
}

export function SectionHeader({
  label,
  title,
  description,
  className,
}: {
  label: string;
  title: React.ReactNode;
  description?: string;
  className?: string;
}) {
  return (
    <header className={cn("mb-14 max-w-2xl", className)}>
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent-cyan">
        {label}
      </p>
      <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base text-muted-foreground sm:text-lg">{description}</p>
      ) : null}
    </header>
  );
}
