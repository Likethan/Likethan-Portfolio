import { ExternalLink, Github } from "lucide-react";
import { SectionHeader, SectionMotion } from "@/components/motion/SectionMotion";
import { TiltCard } from "@/components/motion/TiltCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { projects } from "@/lib/siteData";

export function ProjectsSection() {
  return (
    <SectionMotion id="projects">
      <div className="container-wide">
        <SectionHeader
          label="Featured Work"
          title={
            <>
              Selected <span className="gradient-text">projects</span>
            </>
          }
          description="Premium full-stack builds combining AI, security, and cinematic user experiences."
        />

        <div className="space-y-10">
          {projects.map((project, index) => (
            <TiltCard
              key={project.id}
              className={`overflow-hidden ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
            >
              <div className="grid gap-8 p-8 lg:grid-cols-2 lg:items-center lg:p-10">
                <div className="space-y-4">
                  <Badge variant="secondary">{project.category}</Badge>
                  <h3 className="font-display text-2xl font-bold sm:text-3xl">
                    {project.title}
                    {project.subtitle ? (
                      <span className="mt-1 block text-lg font-normal text-muted-foreground">
                        {project.subtitle}
                      </span>
                    ) : null}
                  </h3>
                  <p className="text-muted-foreground">{project.description}</p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {project.features.map((feature) => (
                      <li key={feature} className="flex gap-2">
                        <span className="text-accent-cyan">▹</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="default">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-3 pt-4">
                    <Button variant="default" size="sm" asChild>
                      <a href={project.liveUrl ?? "#"} aria-label={`${project.title} live demo`}>
                        <ExternalLink className="h-4 w-4" />
                        Live Demo
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.githubUrl ?? "#"} aria-label={`${project.title} GitHub`}>
                        <Github className="h-4 w-4" />
                        GitHub
                      </a>
                    </Button>
                  </div>
                </div>

                <div className="relative min-h-[220px] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-accent-cyan/5 to-accent-violet/10 p-6">
                  <div className="absolute inset-0 grid-bg opacity-40" aria-hidden="true" />
                  <div className="relative space-y-4">
                    <div className="flex gap-2">
                      <span className="h-3 w-3 rounded-full bg-red-400/80" />
                      <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
                      <span className="h-3 w-3 rounded-full bg-green-400/80" />
                    </div>
                    <p className="font-mono text-xs text-muted-foreground">
                      {project.id === "insightforge"
                        ? "insightforge.ai / dashboard"
                        : "cyber-analyzer / scan"}
                    </p>
                    <div className="grid grid-cols-3 gap-3">
                      {["Reports", "Insights", "Accuracy"].map((label, i) => (
                        <div key={label} className="glass rounded-xl p-3 text-center">
                          <p className="text-[10px] uppercase text-muted-foreground">{label}</p>
                          <p className="font-display text-lg font-bold text-accent-cyan">
                            {i === 2 ? "98%" : i === 0 ? "1.2k" : "3.8k"}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="glass rounded-xl p-4 text-sm text-muted-foreground">
                      <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-accent-cyan" />{" "}
                      {project.id === "insightforge"
                        ? "Generating intelligent trend analysis..."
                        : "Running OSINT vulnerability assessment..."}
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </SectionMotion>
  );
}
