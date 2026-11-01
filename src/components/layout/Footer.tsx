import { SocialLinks } from "@/components/shared/SocialLinks";
import { footerText } from "@/lib/siteData";

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 py-12">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-cyan to-transparent opacity-60"
        aria-hidden="true"
      />
      <div className="container-wide flex flex-col items-center justify-between gap-6 px-4 sm:flex-row sm:px-6">
        <p className="text-center text-sm text-muted-foreground sm:text-left">
          {footerText}
        </p>
        <SocialLinks />
      </div>
    </footer>
  );
}
