import { Brain, Layers, Palette, Shield } from "lucide-react";
import { SectionHeader, SectionMotion } from "@/components/motion/SectionMotion";
import { TiltCard } from "@/components/motion/TiltCard";
import { services } from "@/lib/siteData";

const serviceIcons = {
  stack: Layers,
  ai: Brain,
  design: Palette,
  security: Shield,
};

export function ServicesSection() {
  return (
    <SectionMotion id="services" className="bg-black/[0.15] dark:bg-white/[0.02]">
      <div className="container-wide">
        <SectionHeader
          label="Services"
          title={
            <>
              What I <span className="gradient-text">deliver</span>
            </>
          }
        />

        <div className="grid gap-6 sm:grid-cols-2">
          {services.map((service) => {
            const Icon = serviceIcons[service.icon as keyof typeof serviceIcons] ?? Layers;
            return (
              <TiltCard key={service.title} className="p-8">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-cyan/20 to-accent-violet/20 text-accent-cyan">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="font-display text-xl font-semibold">{service.title}</h3>
                <p className="mt-3 text-muted-foreground">{service.description}</p>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </SectionMotion>
  );
}
