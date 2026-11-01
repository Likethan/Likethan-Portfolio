"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SectionHeader, SectionMotion } from "@/components/motion/SectionMotion";
import { TiltCard } from "@/components/motion/TiltCard";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { skillGroups } from "@/lib/siteData";

function SkillBar({ name, level }: { name: string; level: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = useReducedMotion();

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>{name}</span>
        <span className="text-muted-foreground">{level}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-accent-cyan to-accent-violet"
          initial={{ width: reduced ? `${level}%` : "0%" }}
          animate={inView ? { width: `${level}%` } : { width: "0%" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

export function SkillsSection() {
  return (
    <SectionMotion id="skills">
      <div className="container-wide">
        <SectionHeader
          label="Skills"
          title={
            <>
              Capabilities & <span className="gradient-text">expertise</span>
            </>
          }
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {skillGroups.map((group) => (
            <TiltCard key={group.title} className="p-6">
              <h3 className="mb-6 font-display text-lg font-semibold text-accent-cyan">
                {group.title}
              </h3>
              <div className="space-y-5">
                {group.skills.map((skill) => (
                  <SkillBar key={skill.name} name={skill.name} level={skill.level} />
                ))}
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </SectionMotion>
  );
}
