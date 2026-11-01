"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Button } from "@/components/ui/button";
import { navItems, siteConfig } from "@/lib/siteData";
import { cn, scrollToId } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    const id = href.replace("#", "");
    scrollToId(id);
    setOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "py-3" : "py-5"
      )}
    >
      <nav
        className={cn(
          "container-wide mx-4 flex items-center justify-between rounded-2xl border px-4 py-3 sm:mx-auto sm:px-6",
          scrolled
            ? "glass border-white/10 shadow-glass"
            : "border-transparent bg-transparent"
        )}
        aria-label="Main navigation"
      >
        <button
          type="button"
          onClick={() => scrollToId("hero")}
          className="flex items-center gap-2 font-display text-lg font-bold tracking-tight"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-accent-cyan to-accent-violet text-xs font-black text-black">
            {siteConfig.initials}
          </span>
          <span className="hidden sm:inline">{siteConfig.shortName}</span>
        </button>

        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <button
                type="button"
                onClick={() => handleNav(item.href)}
                className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <MagneticButton className="hidden sm:inline-block">
            <Button variant="default" size="sm" asChild>
              <a href={siteConfig.resumeUrl} download>
                Resume
              </a>
            </Button>
          </MagneticButton>
          <Button
            variant="glass"
            size="icon"
            className="lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </nav>

      {open ? (
        <div className="container-wide glass mx-4 mt-2 rounded-2xl border p-4 lg:hidden sm:mx-auto">
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <button
                  type="button"
                  onClick={() => handleNav(item.href)}
                  className="w-full rounded-lg px-3 py-3 text-left text-sm hover:bg-white/5"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  );
}
