"use client";

import { motion } from "framer-motion";
import { SectionHeader, SectionMotion } from "@/components/motion/SectionMotion";
import { TiltCard } from "@/components/motion/TiltCard";
import { experience } from "@/lib/siteData";

export function ExperienceSection() {
  return (
    <SectionMotion id="experience" className="bg-black/[0.15] dark:bg-white/[0.02]">
      <div className="container-wide">
        <SectionHeader
          label="Experience"
          title={
            <>
              Professional <span className="gradient-text">journey</span>
            </>
          }
        />

        <div className="relative mx-auto max-w-3xl">
          <div
            className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-accent-cyan via-accent-violet to-transparent md:left-1/2 md:-translate-x-px"
            aria-hidden="true"
          />

          {experience.map((item, index) => (
            <motion.article
              key={item.company}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative mb-12 flex flex-col gap-4 pl-12 md:w-1/2 md:pl-0 ${
                index % 2 === 0
                  ? "md:mr-auto md:pr-12 md:text-right"
                  : "md:ml-auto md:pl-12 md:text-left"
              }`}
            >
              <div
                className="absolute left-2.5 top-6 h-4 w-4 rounded-full border-2 border-accent-cyan bg-background shadow-neon md:left-1/2 md:-translate-x-1/2"
                aria-hidden="true"
              />
              <TiltCard className="p-6 text-left">
                {item.period ? (
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent-cyan">
                    {item.period}
                  </span>
                ) : null}
                <h3 className="mt-2 font-display text-xl font-bold">{item.company}</h3>
                <p className="text-sm text-accent-violet">{item.role}</p>
                <p className="mt-3 text-sm text-muted-foreground">{item.description}</p>
              </TiltCard>
            </motion.article>
          ))}
        </div>
      </div>
    </SectionMotion>
  );
}
