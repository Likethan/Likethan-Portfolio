import { SectionHeader, SectionMotion } from "@/components/motion/SectionMotion";
import { TiltCard } from "@/components/motion/TiltCard";
import { TechIcon } from "@/components/shared/TechIcon";
import { technologies } from "@/lib/siteData";

export function TechStackSection() {
  return (
    <SectionMotion id="tech-stack" className="bg-black/[0.15] dark:bg-white/[0.02]">
      <div className="container-wide">
        <SectionHeader
          label="Tech Stack"
          title={
            <>
              Tools I <span className="gradient-text">build</span> with
            </>
          }
          description="Modern frameworks, languages, and platforms powering intelligent digital products."
        />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {technologies.map((tech) => (
            <TiltCard key={tech.name} className="group p-6 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-accent-cyan/10 to-accent-violet/10 text-accent-cyan transition-colors group-hover:text-white">
                <TechIcon name={tech.icon} className="h-7 w-7" />
              </div>
              <p className="font-medium">{tech.name}</p>
            </TiltCard>
          ))}
        </div>
      </div>
    </SectionMotion>
  );
}
