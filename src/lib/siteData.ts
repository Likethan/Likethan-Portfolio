export type SocialLink = {
  name: string;
  href: string;
  label: string;
};

export type NavItem = {
  label: string;
  href: string;
};

export type TechItem = {
  name: string;
  icon: string;
};

export type SkillGroup = {
  title: string;
  skills: { name: string; level: number }[];
};

export type ExperienceItem = {
  company: string;
  role: string;
  period?: string;
  description: string;
};

export type ProjectItem = {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  features: string[];
  tags: string[];
  category: string;
  githubUrl?: string;
  liveUrl?: string;
};

export type CertificationItem = {
  title: string;
  issuer: string;
  year?: string;
  description?: string;
};

export type EducationItem = {
  degree: string;
  institution: string;
  period: string;
  score?: string;
  highlight?: boolean;
  description?: string;
};

export type ServiceItem = {
  title: string;
  description: string;
  icon: string;
};

export type StatItem = {
  label: string;
  value: number;
  suffix?: string;
};

export const siteConfig = {
  name: "LIKETHAN K J",
  shortName: "Likethan",
  initials: "LK",
  role: "Full Stack Developer",
  roles: [
    "Full Stack Developer",
    "AI & Data Science Student",
    "Creative Technologist",
  ],
  tagline: "Design. Develop. Deploy.",
  subtitle:
    "Building intelligent digital experiences with full stack development, AI-powered systems, and modern web technologies.",
  objective:
    "AI & Data Science student passionate about building modern full stack applications, AI-powered systems, and immersive digital experiences that combine creativity with engineering excellence.",
  email: "likethankj751@gmail.com",
  phone: "+91 8270036537",
  location: "Tamil Nadu, India",
  resumeUrl: "/likethan-kj-resume.pdf",
  heroImage: "/hero.png",
  siteUrl: "https://likethan.dev",
} as const;

export const navItems: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Stack", href: "#tech-stack" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const socialLinks: SocialLink[] = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/likethan-k-j-b434b632b/",
    label: "LinkedIn profile",
  },
  {
    name: "GitHub",
    href: "https://github.com/Likethan",
    label: "GitHub profile",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/_likethan_/",
    label: "Instagram profile",
  },
];

export const aboutContent = {
  paragraphs: [
    "LIKETHAN is an AI & Data Science student passionate about building modern full stack applications, AI-powered systems, and immersive digital experiences.",
    "He combines frontend creativity with backend engineering to create scalable and intelligent solutions that solve real-world problems.",
  ],
  focusAreas: [
    "Full Stack Development",
    "Artificial Intelligence",
    "Cybersecurity",
    "UI/UX Experiences",
    "Problem Solving",
  ],
  softSkills: [
    "Leadership",
    "Team Collaboration",
    "Public Speaking",
    "Project Management",
  ],
};

export const technologies: TechItem[] = [
  { name: "React", icon: "react" },
  { name: "Next.js", icon: "nextjs" },
  { name: "Flask", icon: "flask" },
  { name: "Python", icon: "python" },
  { name: "MySQL", icon: "mysql" },
  { name: "Java", icon: "java" },
  { name: "Arduino", icon: "arduino" },
  { name: "Raspberry Pi", icon: "raspberrypi" },
  { name: "Jupyter Notebook", icon: "jupyter" },
  { name: "Google Colab", icon: "colab" },
];

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    skills: [
      { name: "React", level: 88 },
      { name: "Tailwind CSS", level: 90 },
      { name: "Next.js", level: 85 },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Flask", level: 82 },
      { name: "REST APIs", level: 84 },
      { name: "Database Integration", level: 80 },
    ],
  },
  {
    title: "Programming",
    skills: [
      { name: "Python", level: 90 },
      { name: "Java", level: 78 },
    ],
  },
  {
    title: "Domains",
    skills: [
      { name: "AI & Machine Learning", level: 86 },
      { name: "Cybersecurity", level: 80 },
      { name: "Data Science", level: 85 },
      { name: "IoT", level: 75 },
    ],
  },
  {
    title: "Soft Skills",
    skills: [
      { name: "Leadership", level: 88 },
      { name: "Public Speaking", level: 82 },
      { name: "Team Collaboration", level: 90 },
      { name: "Project Management", level: 84 },
    ],
  },
];

export const experience: ExperienceItem[] = [
  {
    company: "Emglitz Technologies",
    role: "Intern",
    period: "Internship",
    description:
      "Worked on web development tasks and gained practical industry exposure building responsive interfaces and collaborating on full stack features.",
  },
  {
    company: "Training Trains",
    role: "Data Science Intern",
    period: "Internship",
    description:
      "Data preprocessing, model building, evaluation, and Python-based data analysis and machine learning fundamentals.",
  },
];

export const projects: ProjectItem[] = [
  {
    id: "insightforge",
    title: "InsightForge AI",
    subtitle: "Report Generation System",
    description:
      "A full-stack AI application built using Google Gemini API to generate structured analytical reports, insights, and trend analysis.",
    features: [
      "AI report generation with Gemini API",
      "Async data handling and structured insights",
      "Trend analysis and case study outputs",
      "Modern cinematic dashboard UI",
    ],
    tags: ["React", "Flask", "Gemini API"],
    category: "AI / Full Stack",
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: "cyber-analyzer",
    title: "Cyber Analyzer",
    subtitle: "Security Assessment Tool",
    description:
      "A cybersecurity-focused system for website vulnerability assessment using OSINT techniques and security analysis methodologies.",
    features: [
      "OSINT-based security intelligence",
      "Vulnerability detection workflows",
      "Risk assessment scoring",
      "Actionable security reporting",
    ],
    tags: ["Python", "OSINT", "Cybersecurity"],
    category: "Cybersecurity",
    githubUrl: "#",
    liveUrl: "#",
  },
];

export const certifications: CertificationItem[] = [
  {
    title: "Arduino Robotics",
    issuer: "Top Engineers",
    description: "Hardware programming and robotic systems fundamentals.",
  },
  {
    title: "IoT using Python & Raspberry Pi",
    issuer: "Top Engineers",
    description: "Connected devices and embedded IoT development.",
  },
  {
    title: "Ethical Hacking & Cyber Security with CTF Level 2",
    issuer: "Certification Program",
    year: "2024",
    description: "Security fundamentals and capture-the-flag challenges.",
  },
  {
    title: "Tech Byte 2024 National Workshop",
    issuer: "National Workshop",
    year: "2024",
    description: "Industry workshop on emerging technologies.",
  },
];

export const education: EducationItem[] = [
  {
    degree: "B.Tech — Artificial Intelligence & Data Science",
    institution: "V.S.B College of Engineering Technical Campus",
    period: "2022 — Present",
    score: "CGPA: 8.2",
    highlight: true,
    description:
      "Focused on machine learning, data engineering, full stack development, and intelligent systems design.",
  },
  {
    degree: "Higher Secondary Certificate (HSC)",
    institution: "Higher Secondary Education",
    period: "Completed",
    description: "Science stream with strong foundation in mathematics and computing.",
  },
  {
    degree: "Secondary School Leaving Certificate (SSLC)",
    institution: "Secondary Education",
    period: "Completed",
    description: "Academic excellence with interest in technology and innovation.",
  },
];

export const services: ServiceItem[] = [
  {
    title: "Full Stack Web Development",
    description:
      "End-to-end web applications from database architecture to polished, performant user interfaces.",
    icon: "stack",
  },
  {
    title: "AI-Based Solutions",
    description:
      "Intelligent systems powered by machine learning, LLMs, and production-grade AI workflows.",
    icon: "ai",
  },
  {
    title: "UI/UX Development",
    description:
      "Cinematic, accessible interfaces with glassmorphism, motion design, and premium aesthetics.",
    icon: "design",
  },
  {
    title: "Security Analysis",
    description:
      "OSINT-driven assessments, vulnerability insights, and cybersecurity consultation.",
    icon: "security",
  },
];

export const stats: StatItem[] = [
  { label: "Projects Built", value: 12, suffix: "+" },
  { label: "Technologies Learned", value: 15, suffix: "+" },
  { label: "Certifications Earned", value: 4 },
  { label: "Workshops Participated", value: 8, suffix: "+" },
];

export const footerText =
  "© 2026 LIKETHAN K J. Crafted with creativity and code.";
