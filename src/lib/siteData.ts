export type SocialLink = {
  name: string;
  href: string;
  label: string;
  icon: string;
};

export type NavItem = {
  label: string;
  href: string;
};

export type TechItem = {
  name: string;
  category: "Frontend" | "Backend" | "AI & Data" | "Tools & Hardware";
  level: number;
  featured?: boolean;
};

export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
  skills: string[];
};

export type ProjectItem = {
  id: string;
  title: string;
  subtitle: string;
  category: "AI & Machine Learning" | "Cybersecurity" | "Full Stack" | "Systems & Tools";
  description: string;
  metrics: { label: string; value: string }[];
  features: string[];
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
  demoType: "ai-generator" | "security-scanner" | "terminal" | "stats";
};

export type CertificationItem = {
  title: string;
  issuer: string;
  year: string;
  badge: string;
  description: string;
};

export type EducationItem = {
  degree: string;
  institution: string;
  period: string;
  score: string;
  highlights: string[];
};

export const siteConfig = {
  name: "LIKETHAN K J",
  firstName: "Likethan",
  title: "Full Stack Engineer & AI Technologist",
  roles: [
    "Full Stack Developer",
    "AI & Data Science Specialist",
    "Cybersecurity Researcher",
    "Creative Technologist",
  ],
  tagline: "Architecting Intelligent Systems & Immersive Digital Experiences.",
  bio: "AI & Data Science engineer focused on constructing production-grade full stack applications, autonomous AI workflows, and resilient cybersecurity tools that marry clean architecture with aesthetic perfection.",
  email: "likethankj751@gmail.com",
  phone: "+91 8270036537",
  location: "Tamil Nadu, India",
  timezone: "Asia/Kolkata (IST, UTC+5:30)",
  availability: "Available for Software Engineering & AI roles",
  githubUrl: "https://github.com/Likethan",
  linkedinUrl: "https://www.linkedin.com/in/likethan-k-j-b434b632b/",
  instagramUrl: "https://www.instagram.com/_likethan_/",
  resumeUrl: "/likethan-kj-resume.pdf",
  stats: [
    { label: "Completed Projects", value: "14+" },
    { label: "Academic CGPA", value: "8.2" },
    { label: "Industry Internships", value: "2" },
    { label: "Core Competencies", value: "20+" },
  ],
};

export const navItems: NavItem[] = [
  { label: "Overview", href: "#hero" },
  { label: "Projects", href: "#projects" },
  { label: "Skills Matrix", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Interactive Terminal", href: "#terminal" },
  { label: "Contact", href: "#contact" },
];

export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    href: siteConfig.githubUrl,
    label: "Explore GitHub repositories",
    icon: "github",
  },
  {
    name: "LinkedIn",
    href: siteConfig.linkedinUrl,
    label: "Connect on LinkedIn",
    icon: "linkedin",
  },
  {
    name: "Instagram",
    href: siteConfig.instagramUrl,
    label: "Follow on Instagram",
    icon: "instagram",
  },
];

export const projects: ProjectItem[] = [
  {
    id: "insightforge",
    title: "InsightForge AI",
    subtitle: "Autonomous Report & Intelligence Engine",
    category: "AI & Machine Learning",
    description:
      "Enterprise-grade report generation platform leveraging Google Gemini API. Transforms raw datasets, metrics, and unstructured inputs into comprehensive analytical whitepapers, case studies, and predictive market trend evaluations.",
    metrics: [
      { label: "Token Processing", value: "<1.4s" },
      { label: "Report Accuracy", value: "99.2%" },
      { label: "Export Formats", value: "PDF/MD" },
    ],
    features: [
      "Gemini Multimodal reasoning pipeline for cross-industry trend forecasting",
      "Asynchronous streaming responses with client-side Markdown rendering",
      "Dynamic prompt engineering with context injection and safety guardrails",
      "Executive summary synthesis with structured metric card breakdowns",
    ],
    tags: ["React", "Flask", "Gemini API", "Python", "Tailwind CSS"],
    githubUrl: "https://github.com/Likethan/Insightforge-AI",
    featured: true,
    demoType: "ai-generator",
  },
  {
    id: "cyber-analyzer",
    title: "Cyber Analyzer",
    subtitle: "OSINT Threat & Vulnerability Detection Suite",
    category: "Cybersecurity",
    description:
      "Advanced cybersecurity intelligence framework executing passive and active reconnaissance. Automates OSINT footprint gathering, security header audits, SSL/TLS configuration scans, and threat severity index calculation.",
    metrics: [
      { label: "Scan Protocols", value: "48+" },
      { label: "Audit Latency", value: "<850ms" },
      { label: "OWASP Coverage", value: "Top 10" },
    ],
    features: [
      "Deep DNS, WHOIS, and certificate transparency analysis",
      "Real-time vulnerability risk scoring based on CVSS metrics",
      "Automated mitigation advice generated per detected vulnerability",
      "Interactive visual attack-surface matrix with severity filters",
    ],
    tags: ["Python", "OSINT", "Network Security", "Flask", "Socket Programming"],
    githubUrl: "https://github.com/Likethan/Cyber-Analyzer",
    featured: true,
    demoType: "security-scanner",
  },
  {
    id: "campus-hub",
    title: "Campus Hub",
    subtitle: "Comprehensive Academic Management Platform",
    category: "Full Stack",
    description:
      "Scalable ERP system built to streamline higher-education academic workflows. Features role-based access control, automated attendance tracking, continuous internal assessment calculation, and student analytics.",
    metrics: [
      { label: "Active Modules", value: "12" },
      { label: "Role Tiers", value: "Student/Faculty/Admin" },
      { label: "Data Integrity", value: "ACID Compliant" },
    ],
    features: [
      "JWT-secured authentication with role-level permission matrices",
      "Optimized relational schema supporting high concurrent requests",
      "Automated grade point computation and transcript generator",
      "Real-time event notification system for campus announcements",
    ],
    tags: ["React", "Node.js", "Express", "MySQL", "Tailwind CSS"],
    githubUrl: "https://github.com/Likethan/Campus-Hub",
    featured: true,
    demoType: "stats",
  },
  {
    id: "smart-resume-analyzer",
    title: "Smart Resume Analyzer",
    subtitle: "AI ATS Matching & Skill Extraction Engine",
    category: "AI & Machine Learning",
    description:
      "Natural language processing tool designed to evaluate resume compatibility against technical job descriptions. Extracts skills, quantifies semantic alignment, and generates targeted improvement strategies.",
    metrics: [
      { label: "Parsing Accuracy", value: "96.8%" },
      { label: "Semantic Match", value: "Vector Cosine" },
    ],
    features: [
      "Text extraction from complex multi-column PDF/DOCX layouts",
      "TF-IDF and contextual semantic similarity ranking",
      "Automated missing keyword recommendations for ATS optimization",
    ],
    tags: ["Python", "NLP", "Scikit-Learn", "Streamlit"],
    githubUrl: "https://github.com/Likethan/Smart-Resume-Analyzer-",
    featured: false,
    demoType: "stats",
  },
  {
    id: "c-git-automation",
    title: "C-GitAutomation",
    subtitle: "Native CLI Git Workflow Optimizer",
    category: "Systems & Tools",
    description:
      "Lightweight, native C command-line tool built to accelerate repetitive Git staging, multi-branch syncing, branch hygiene, and multi-remote push operations with sub-millisecond execution overhead.",
    metrics: [
      { label: "Binary Size", value: "<85KB" },
      { label: "Speed Gain", value: "4.5x vs scripts" },
    ],
    features: [
      "Zero external runtime dependencies; pure POSIX C compilation",
      "Configurable interactive prompts for commit formatting standards",
      "Batch branch synchronization and stash protection mechanisms",
    ],
    tags: ["C", "Systems Programming", "CLI", "Git Hooks"],
    githubUrl: "https://github.com/Likethan/C-GitAutomation",
    featured: false,
    demoType: "terminal",
  },
];

export const techSkills: TechItem[] = [
  // AI & Data
  { name: "Python", category: "AI & Data", level: 92, featured: true },
  { name: "Machine Learning", category: "AI & Data", level: 88, featured: true },
  { name: "Gemini / LLM APIs", category: "AI & Data", level: 90, featured: true },
  { name: "Data Preprocessing", category: "AI & Data", level: 86, featured: false },
  { name: "Jupyter & Colab", category: "AI & Data", level: 90, featured: false },

  // Frontend
  { name: "React 18 / 19", category: "Frontend", level: 92, featured: true },
  { name: "Next.js", category: "Frontend", level: 85, featured: true },
  { name: "Tailwind CSS", category: "Frontend", level: 94, featured: true },
  { name: "Framer Motion", category: "Frontend", level: 89, featured: true },
  { name: "TypeScript / JS", category: "Frontend", level: 87, featured: true },

  // Backend
  { name: "Flask", category: "Backend", level: 85, featured: true },
  { name: "RESTful Architecture", category: "Backend", level: 88, featured: true },
  { name: "MySQL / SQL", category: "Backend", level: 84, featured: true },
  { name: "Java", category: "Backend", level: 80, featured: false },

  // Tools & Hardware
  { name: "Cybersecurity & OSINT", category: "Tools & Hardware", level: 85, featured: true },
  { name: "Git & GitHub Actions", category: "Tools & Hardware", level: 90, featured: true },
  { name: "Arduino Robotics", category: "Tools & Hardware", level: 82, featured: false },
  { name: "Raspberry Pi & IoT", category: "Tools & Hardware", level: 80, featured: false },
  { name: "Linux / Bash", category: "Tools & Hardware", level: 84, featured: false },
];

export const experience: ExperienceItem[] = [
  {
    company: "Emglitz Technologies",
    role: "Full Stack Web Development Intern",
    period: "Internship",
    location: "Tamil Nadu, India",
    description:
      "Contributed to client-facing web applications, responsive user interface architecture, RESTful backend connectivity, and cross-browser testing across multiple production environments.",
    highlights: [
      "Engineered modular React components with optimized re-render cycles",
      "Collaborated with backend teams to integrate and validate JSON API contracts",
      "Participated in sprint standups, code reviews, and UI performance audits",
    ],
    skills: ["React", "JavaScript", "REST APIs", "CSS3 / Tailwind", "Git"],
  },
  {
    company: "Training Trains",
    role: "Data Science & ML Intern",
    period: "Internship",
    location: "Tamil Nadu, India",
    description:
      "Applied statistical modeling, data cleaning techniques, exploratory data analysis, and fundamental supervised/unsupervised machine learning algorithms using Python.",
    highlights: [
      "Preprocessed high-dimensional datasets with Pandas, NumPy, and Scikit-Learn",
      "Trained classification and regression models evaluating precision, recall, and ROC-AUC",
      "Generated data visualization dashboards to communicate model outcomes",
    ],
    skills: ["Python", "Pandas", "NumPy", "Scikit-Learn", "Matplotlib"],
  },
];

export const education: EducationItem[] = [
  {
    degree: "B.Tech — Artificial Intelligence & Data Science",
    institution: "V.S.B College of Engineering Technical Campus",
    period: "2022 — Present",
    score: "Cumulative GPA: 8.2 / 10",
    highlights: [
      "Curriculum specialization in Machine Learning, Deep Neural Networks, Algorithms, Data Engineering, and Network Security.",
      "Active participant in technical symposiums, hackathons, and open-source project development.",
    ],
  },
  {
    degree: "Higher Secondary Certificate (HSC - 12th)",
    institution: "State Board of Secondary & Higher Education",
    period: "Completed",
    score: "First Class with Distinction",
    highlights: [
      "Mathematics, Physics, Chemistry, and Computer Science foundation.",
    ],
  },
];

export const certifications: CertificationItem[] = [
  {
    title: "Ethical Hacking & Cyber Security with CTF Level 2",
    issuer: "Cyber Security Certification Authority",
    year: "2024",
    badge: "CTF L2",
    description: "Hands-on vulnerability exploitation, reverse engineering, web application security, and Capture The Flag defenses.",
  },
  {
    title: "Arduino Robotics Masterclass",
    issuer: "Top Engineers",
    year: "2023",
    badge: "Robotics",
    description: "Microcontroller architecture, sensor integration, motor actuation, and autonomous pathfinding firmware.",
  },
  {
    title: "IoT using Python & Raspberry Pi",
    issuer: "Top Engineers",
    year: "2023",
    badge: "IoT",
    description: "Embedded system programming, sensor-to-cloud telemetry pipelines, and edge device automation.",
  },
  {
    title: "Tech Byte National Level Workshop",
    issuer: "National Technical Convention",
    year: "2024",
    badge: "Workshop",
    description: "Industry insights into next-generation cloud native infrastructures and generative AI paradigms.",
  },
];
