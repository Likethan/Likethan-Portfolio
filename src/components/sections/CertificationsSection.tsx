import { Award } from "lucide-react";
import { SectionHeader, SectionMotion } from "@/components/motion/SectionMotion";
import { TiltCard } from "@/components/motion/TiltCard";
import { certifications } from "@/lib/siteData";

export function CertificationsSection() {
  return (
    <SectionMotion id="certifications" className="bg-black/[0.15] dark:bg-white/[0.02]">
      <div className="container-wide">
        <SectionHeader
          label="Credentials"
          title={
            <>
              Certifications & <span className="gradient-text">workshops</span>
            </>
          }
        />

        <div className="grid gap-6 sm:grid-cols-2">
          {certifications.map((cert) => (
            <TiltCard key={cert.title} className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent-cyan/10 text-accent-cyan">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-semibold">{cert.title}</h3>
              <p className="mt-1 text-sm text-accent-violet">
                {cert.issuer}
                {cert.year ? ` · ${cert.year}` : ""}
              </p>
              {cert.description ? (
                <p className="mt-3 text-sm text-muted-foreground">{cert.description}</p>
              ) : null}
            </TiltCard>
          ))}
        </div>
      </div>
    </SectionMotion>
  );
}
