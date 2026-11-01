import { GraduationCap } from "lucide-react";
import { SectionHeader, SectionMotion } from "@/components/motion/SectionMotion";
import { TiltCard } from "@/components/motion/TiltCard";
import { education } from "@/lib/siteData";
import { cn } from "@/lib/utils";

export function EducationSection() {
  return (
    <SectionMotion id="education">
      <div className="container-wide">
        <SectionHeader
          label="Education"
          title={
            <>
              Academic <span className="gradient-text">foundation</span>
            </>
          }
        />

        <div className="space-y-6">
          {education.map((item) => (
            <TiltCard
              key={item.degree}
              className={cn(
                "p-6 sm:p-8",
                item.highlight && "border-accent-cyan/30 shadow-neon"
              )}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-violet/10 text-accent-violet">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold">{item.degree}</h3>
                    <p className="mt-1 text-muted-foreground">{item.institution}</p>
                    {item.description ? (
                      <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-sm font-medium text-accent-cyan">{item.period}</p>
                  {item.score ? (
                    <p className="mt-1 font-display text-lg font-bold">{item.score}</p>
                  ) : null}
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </SectionMotion>
  );
}
