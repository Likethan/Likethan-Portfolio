"use client";

import { LenisScroll } from "@/components/effects/LenisScroll";
import { SpotlightCursor } from "@/components/effects/SpotlightCursor";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LenisScroll />
      <SpotlightCursor />
      {children}
    </ThemeProvider>
  );
}
