"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { ParticleField } from "@/components/effects/ParticleField";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { SocialLinks } from "@/components/shared/SocialLinks";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Button } from "@/components/ui/button";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { siteConfig } from "@/lib/siteData";
import { scrollToId } from "@/lib/utils";

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const yText = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const yImage = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);

  useEffect(() => {
    if (reduced || !titleRef.current) return;
    const chars = titleRef.current.querySelectorAll("[data-char]");
    gsap.fromTo(
      chars,
      { opacity: 0, y: 40, rotateX: -40 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.8,
        stagger: 0.04,
        ease: "power3.out",
        delay: 0.3,
      }
    );
  }, [reduced]);

  const nameParts = siteConfig.name.split(" ");

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative flex min-h-screen items-center overflow-hidden pt-24"
    >
      <div className="absolute inset-0 grid-bg opacity-60" aria-hidden="true" />
      <ParticleField className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-70" />

      <div className="absolute right-4 top-28 z-20 sm:right-8 lg:hidden">
        <ThemeToggle />
      </div>

      <div className="container-wide relative z-10 grid items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-24">
        <motion.div style={{ y: yText, opacity }} className="space-y-6">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-cyan"
          >
            Creative Developer Portfolio
          </motion.p>

          <h1
            ref={titleRef}
            className="font-display text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl"
          >
            {nameParts.map((part, i) => (
              <span key={part} className="block overflow-hidden">
                {part.split("").map((char, j) => (
                  <span
                    key={`${part}-${j}`}
                    data-char
                    className="inline-block"
                    style={{ display: "inline-block" }}
                  >
                    {char}
                    {char === " " ? "\u00A0" : ""}
                  </span>
                ))}
                {i === 0 ? (
                  <span className="gradient-text"> </span>
                ) : null}
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg text-muted-foreground sm:text-xl"
          >
            <span className="text-foreground">{siteConfig.role}</span>
            <span className="mx-2 text-accent-violet">·</span>
            <span>{siteConfig.tagline}</span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="max-w-xl text-base text-muted-foreground sm:text-lg"
          >
            {siteConfig.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap gap-3"
          >
            <MagneticButton onClick={() => scrollToId("projects")}>
              <Button size="lg">View Projects</Button>
            </MagneticButton>
            <MagneticButton as="a" href={siteConfig.resumeUrl} download>
              <Button variant="outline" size="lg">
                Download Resume
              </Button>
            </MagneticButton>
            <MagneticButton onClick={() => scrollToId("contact")}>
              <Button variant="glass" size="lg">
                Contact Me
              </Button>
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <SocialLinks />
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: yImage, opacity }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="relative aspect-[4/5] w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 shadow-neon-violet">
            <div
              className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-accent-cyan/20 to-accent-violet/20 blur-2xl"
              aria-hidden="true"
            />
            <Image
              src={siteConfig.heroImage}
              alt={`${siteConfig.name} — professional portrait`}
              fill
              priority
              sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 500px"
              className="object-cover object-top"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="block"
        >
          Scroll to explore
        </motion.span>
      </div>
    </section>
  );
}
