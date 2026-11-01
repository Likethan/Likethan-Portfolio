import {
  SiArduino,
  SiFlask,
  SiGooglecolab,
  SiJava,
  SiJupyter,
  SiMysql,
  SiNextdotjs,
  SiPython,
  SiRaspberrypi,
  SiReact,
} from "react-icons/si";
import { cn } from "@/lib/utils";

const icons: Record<string, React.ComponentType<{ className?: string }>> = {
  react: SiReact,
  nextjs: SiNextdotjs,
  flask: SiFlask,
  python: SiPython,
  mysql: SiMysql,
  java: SiJava,
  arduino: SiArduino,
  raspberrypi: SiRaspberrypi,
  jupyter: SiJupyter,
  colab: SiGooglecolab,
};

export function TechIcon({ name, className }: { name: string; className?: string }) {
  const Icon = icons[name];
  if (!Icon) {
    return (
      <span
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-lg bg-accent-cyan/10 text-accent-cyan",
          className
        )}
      >
        {name[0]}
      </span>
    );
  }
  return <Icon className={cn("h-8 w-8", className)} />;
}
