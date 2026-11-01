import { SectionHeader, SectionMotion } from "@/components/motion/SectionMotion";
import { TiltCard } from "@/components/motion/TiltCard";
import { aboutContent } from "@/lib/siteData";

export function AboutSection() {
  return (
    <SectionMotion id="about" className="relative">
      <div className="container-wide">
        <SectionHeader
          label="About"
          title={
            <>
              Crafting <span className="gradient-text">intelligent</span> experiences
            </>
          }
        />

        <div className="grid gap-8 lg:grid-cols-2">
          <TiltCard className="p-8">
            <div className="space-y-4 text-muted-foreground">
              {aboutContent.paragraphs.map((p) => (
                <p key={p.slice(0, 24)} className="text-base leading-relaxed sm:text-lg">
                  {p}
                </p>
              ))}
            </div>
          </TiltCard>

          <div className="grid gap-4 sm:grid-cols-2">
            <TiltCard className="p-6 sm:col-span-2">
              <h3 className="mb-4 font-display text-lg font-semibold">Focus Areas</h3>
              <div className="flex flex-wrap gap-2">
                {aboutContent.focusAreas.map((area) => (
                  <span
                    key={area}
                    className="rounded-full border border-accent-cyan/20 bg-accent-cyan/5 px-4 py-2 text-sm text-accent-cyan"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </TiltCard>

            <TiltCard className="p-6 sm:col-span-2">
              <h3 className="mb-4 font-display text-lg font-semibold">Soft Skills</h3>
              <div className="flex flex-wrap gap-2">
                {aboutContent.softSkills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-accent-violet/20 bg-accent-violet/5 px-4 py-2 text-sm text-accent-violet"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </TiltCard>
          </div>
        </div>
      </div>
    </SectionMotion>
  );
}
