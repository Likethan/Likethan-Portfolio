"use client";

import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import { socialLinks } from "@/lib/siteData";
import { cn } from "@/lib/utils";

const iconMap = {
  LinkedIn: FaLinkedinIn,
  GitHub: FaGithub,
  Instagram: FaInstagram,
};

export function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {socialLinks.map((link) => {
        const Icon = iconMap[link.name as keyof typeof iconMap];
        if (!Icon) return null;
        return (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-muted-foreground transition-all hover:border-accent-cyan/50 hover:text-accent-cyan hover:shadow-neon"
          >
            <Icon className="h-4 w-4" />
          </a>
        );
      })}
    </div>
  );
}
