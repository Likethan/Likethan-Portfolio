"use client";

import gsap from "gsap";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { siteConfig } from "@/lib/siteData";

export default function Loading() {
  const barRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    const container = containerRef.current;
    if (!bar || !container) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      container.style.display = "none";
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(container, {
          opacity: 0,
          scale: 1.02,
          duration: 0.6,
          ease: "power2.inOut",
          onComplete: () => {
            container.style.display = "none";
          },
        });
      },
    });

    tl.to(bar, { width: "100%", duration: 1.8, ease: "power2.inOut" })
      .to(bar, { opacity: 0, duration: 0.2 }, "-=0.2");

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0a0a]"
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <p className="font-display text-2xl font-black tracking-[0.2em] text-white sm:text-3xl">
          {siteConfig.name}
        </p>
        <p className="mt-3 text-sm tracking-[0.3em] text-accent-cyan uppercase">
          {siteConfig.tagline}
        </p>
      </motion.div>

      <div className="mt-12 h-1 w-64 overflow-hidden rounded-full bg-white/10">
        <div
          ref={barRef}
          className="h-full w-0 rounded-full bg-gradient-to-r from-accent-cyan to-accent-violet"
        />
      </div>

      <p className="mt-6 text-xs text-muted-foreground">Loading experience...</p>
    </div>
  );
}
