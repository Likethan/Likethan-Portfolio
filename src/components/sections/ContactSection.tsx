"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { SectionHeader, SectionMotion } from "@/components/motion/SectionMotion";
import { SocialLinks } from "@/components/shared/SocialLinks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/lib/siteData";

export function ContactSection() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    window.setTimeout(() => setSent(false), 5000);
  };

  return (
    <SectionMotion id="contact" className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-accent-violet/10 via-transparent to-accent-cyan/10"
        aria-hidden="true"
      />
      <div className="container-wide relative">
        <div className="glass glass-glow mb-12 rounded-3xl border border-accent-cyan/20 p-8 text-center sm:p-12">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">
            Let&apos;s build something{" "}
            <span className="gradient-text">extraordinary</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Open to internships, collaborations, and full-time opportunities. Drop a message and
            let&apos;s create intelligent digital experiences together.
          </p>
        </div>

        <SectionHeader
          label="Contact"
          title={
            <>
              Get in <span className="gradient-text">touch</span>
            </>
          }
          className="mb-10"
        />

        <div className="grid gap-10 lg:grid-cols-2">
          <form
            onSubmit={handleSubmit}
            className="glass glass-glow space-y-5 rounded-2xl p-6 sm:p-8"
            aria-label="Contact form"
          >
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" required placeholder="Your name" autoComplete="name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@email.com"
                autoComplete="email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                required
                placeholder="Tell me about your project..."
              />
            </div>
            <MagneticButton>
              <Button size="lg" className="w-full sm:w-auto">
                Send Message
              </Button>
            </MagneticButton>

            <AnimatePresence>
              {sent ? (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-sm text-accent-cyan"
                  role="status"
                >
                  Thank you! Your message has been noted. I&apos;ll get back to you soon.
                </motion.p>
              ) : null}
            </AnimatePresence>
          </form>

          <div className="space-y-8">
            <div className="glass rounded-2xl p-6 sm:p-8">
              <h3 className="font-display text-lg font-semibold">Contact Information</h3>
              <ul className="mt-6 space-y-4 text-muted-foreground">
                <li className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-accent-cyan" />
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="hover:text-foreground"
                  >
                    {siteConfig.email}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-accent-cyan" />
                  <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="hover:text-foreground">
                    {siteConfig.phone}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-accent-cyan" />
                  <span>{siteConfig.location}</span>
                </li>
              </ul>
            </div>
            <div>
              <p className="mb-4 text-sm text-muted-foreground">Connect on social</p>
              <SocialLinks />
            </div>
          </div>
        </div>
      </div>
    </SectionMotion>
  );
}
