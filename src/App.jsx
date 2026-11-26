import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles, Terminal as TerminalIcon, Github, Linkedin, ArrowUpRight, Cpu, Layers, Shield, FileText } from 'lucide-react';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import ParticleConstellation from './components/ParticleConstellation';
import HolographicBadge from './components/HolographicBadge';
import ProjectsShowcase from './components/ProjectsShowcase';
import SkillsBento from './components/SkillsBento';
import ExperienceTimeline from './components/ExperienceTimeline';
import CertificationsWall from './components/CertificationsWall';
import TerminalWidget from './components/TerminalWidget';
import ContactFooter from './components/ContactFooter';
import { siteConfig } from './lib/siteData';
import { soundFx } from './utils/soundFx';

export default function App() {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [roleIndex, setRoleIndex] = useState(0);

  // Rotating roles in Hero
  const roles = [
    'Full Stack Engineer',
    'AI & Data Science Specialist',
    'Cybersecurity Researcher',
    'Autonomous Systems Builder',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [roles.length]);

  const toggleTheme = () => {
    soundFx.playClick();
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  const scrollToSection = (id) => {
    soundFx.playClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen text-slate-100 selection:bg-[#00f5ff]/30 selection:text-white">
      {/* Interactive Background Particle Mesh */}
      <ParticleConstellation />

      {/* Noise Texture Overlay for Editorial Luxury Polish */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Interactive Desktop Custom Cursor */}
      <CustomCursor />

      {/* Navigation HUD */}
      <Navbar
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      <main className="relative z-10">
        {/* ================= HERO SECTION ================= */}
        <section
          id="hero"
          className="relative min-h-screen flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 overflow-hidden bg-grid-cyber"
        >
          {/* Subtle Ambient Radial Lighting */}
          <div className="glow-ambient-cyan left-[-100px] top-[10%]" />
          <div className="glow-ambient-crimson right-[-100px] top-[20%]" />

          <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Kinetic Typography & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Status Pill */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono-code text-slate-300 backdrop-blur-md"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 beacon-dot" />
                <span className="text-white font-bold">LIKETHAN K J</span>
                <span className="text-slate-500">•</span>
                <span className="text-accent-cyan">TAMIL NADU, INDIA</span>
              </motion.div>

              {/* Kinetic Headline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="space-y-2"
              >
                <h1 className="font-display font-black text-4xl sm:text-6xl xl:text-7xl leading-[1.05] tracking-tight text-white">
                  Engineering <br />
                  <span className="text-gradient-cyan">Intelligent Systems</span>
                  <br />
                  <span className="text-stroke-outline">& Modern Web.</span>
                </h1>

                {/* Animated Rotating Role Subtitle */}
                <div className="h-8 flex items-center justify-center lg:justify-start">
                  <span className="font-mono-code text-sm sm:text-base text-slate-400 mr-2">
                    Specializing in:
                  </span>
                  <span className="font-mono-code text-sm sm:text-base font-bold text-[#00f5ff] transition-all">
                    {roles[roleIndex]}
                  </span>
                </div>
              </motion.div>

              {/* Executive Bio */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0"
              >
                AI & Data Science engineer architecting production-grade full stack applications,
                autonomous LLM workflows, and resilient cybersecurity intelligence suites.
              </motion.p>

              {/* Stats Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2 max-w-lg mx-auto lg:mx-0"
              >
                {siteConfig.stats.map((s) => (
                  <div
                    key={s.label}
                    className="p-3 rounded-xl bg-white/5 border border-white/10 text-center backdrop-blur-md"
                  >
                    <p className="font-display font-black text-xl text-white">{s.value}</p>
                    <p className="text-[10px] font-mono-code text-slate-400 uppercase mt-0.5">
                      {s.label}
                    </p>
                  </div>
                ))}
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2"
              >
                <button
                  type="button"
                  onClick={() => scrollToSection('projects')}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-[#00f5ff] via-[#38bdf8] to-[#8b5cf6] text-[#08090d] font-mono-code font-bold text-xs uppercase tracking-wider hover:shadow-[0_0_25px_rgba(0,245,255,0.4)] transition-all hover:scale-105"
                >
                  Explore Systems
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection('terminal')}
                  className="px-5 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white font-mono-code font-bold text-xs border border-white/15 flex items-center gap-2 transition-all hover:border-[#00f5ff]/40"
                >
                  <TerminalIcon className="w-4 h-4 text-[#00f5ff]" />
                  <span>Launch CLI Terminal</span>
                </button>
                <a
                  href={siteConfig.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/15 transition-all"
                  title="View GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={siteConfig.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/15 transition-all"
                  title="Connect on LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </motion.div>
            </div>

            {/* Right Column: 3D Holographic ID Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 flex justify-center"
            >
              <HolographicBadge />
            </motion.div>
          </div>

          {/* Scroll Down Indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
            <span className="text-[10px] font-mono-code tracking-widest uppercase text-slate-400">
              EXPLORE
            </span>
            <button
              type="button"
              onClick={() => scrollToSection('projects')}
              className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-[#00f5ff] hover:bg-[#00f5ff]/20 transition-all animate-bounce"
            >
              <ArrowDown className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* ================= FEATURED PROJECTS SECTION ================= */}
        <ProjectsShowcase />

        {/* ================= SKILLS MATRIX SECTION ================= */}
        <SkillsBento />

        {/* ================= EXPERIENCE & EDUCATION SECTION ================= */}
        <ExperienceTimeline />

        {/* ================= CERTIFICATIONS WALL ================= */}
        <CertificationsWall />

        {/* ================= INTERACTIVE CLI TERMINAL SECTION ================= */}
        <section id="terminal" className="py-24 relative overflow-hidden bg-grid-cyber">
          <div className="glow-ambient-cyan left-[-100px] top-[20%]" />

          <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 space-y-8">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00f5ff]/10 border border-[#00f5ff]/25 text-[#00f5ff] text-xs font-mono-code font-bold">
                <TerminalIcon className="w-3.5 h-3.5" />
                <span>INTERACTIVE CLI SUITE</span>
              </div>
              <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
                Developer <span className="text-gradient-cyan">Command Center</span>
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm font-mono-code">
                Execute live commands in the browser or click interactive buttons to query developer telemetry.
              </p>
            </div>

            <TerminalWidget />
          </div>
        </section>

        {/* ================= CONTACT & LUXURY FOOTER ================= */}
        <ContactFooter />
      </main>
    </div>
  );
}
