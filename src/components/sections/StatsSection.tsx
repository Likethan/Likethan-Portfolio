import { SectionHeader, SectionMotion } from "@/components/motion/SectionMotion";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { TiltCard } from "@/components/motion/TiltCard";
import { stats } from "@/lib/siteData";

export function StatsSection() {
  return (
    <SectionMotion id="stats">
      <div className="container-wide">
        <SectionHeader
          label="Impact"
          title={
            <>
              Achievement <span className="gradient-text">metrics</span>
            </>
          }
        />

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat) => (
            <TiltCard key={stat.label} className="p-6 text-center sm:p-8">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              <p className="mt-3 text-sm text-muted-foreground">{stat.label}</p>
            </TiltCard>
          ))}
        </div>
      </div>
    </SectionMotion>
  );
}
