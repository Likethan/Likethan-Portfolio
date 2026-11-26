import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles, Terminal as TerminalIcon, Github, Linkedin, ArrowUpRight, Cpu, Layers, Shield, FileText, Atom, Zap, Gamepad2, Volume2, Flame } from 'lucide-react';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import ZeroGravityShaderBackground from './components/ZeroGravityShaderBackground';
import HolographicBadge from './components/HolographicBadge';
import ProjectsShowcase from './components/ProjectsShowcase';
import SkillsBento from './components/SkillsBento';
import ExperienceTimeline from './components/ExperienceTimeline';
import CertificationsWall from './components/CertificationsWall';
import CyberMiniGame from './components/CyberMiniGame';
import TerminalWidget from './components/TerminalWidget';
import ContactFooter from './components/ContactFooter';
import { siteConfig } from './lib/siteData';
import { cyberAudio } from './utils/cyberAudio';

export default function App() {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [musicEnabled, setMusicEnabled] = useState(false);
  const [hyperdrive, setHyperdrive] = useState(false);
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
    cyberAudio.playHapticClick();
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  const scrollToSection = (id) => {
    cyberAudio.playHapticClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleHyperdriveToggle = () => {
    const next = !hyperdrive;
    cyberAudio.playWarpDrive(next);
    setHyperdrive(next);
  };

  return (
    <div
      className={`relative min-h-screen text-slate-100 selection:bg-[#d4af37]/30 selection:text-white bg-[#040806] transition-all duration-700 ${
        hyperdrive ? 'shadow-[inset_0_0_100px_rgba(212,175,55,0.25)]' : ''
      }`}
    >
      {/* 1. Deep Obsidian & Kinetic Crimson WebGL Fragment Shader Layer (Zero-G Fluid Physics) */}
      <ZeroGravityShaderBackground hyperdrive={hyperdrive} />

      {/* 2. Noise Texture Overlay for Editorial Luxury Polish */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* 4. Interactive Desktop Custom Cursor */}
      <CustomCursor />

      {/* 5. Navigation HUD */}
      <Navbar
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        musicEnabled={musicEnabled}
        setMusicEnabled={setMusicEnabled}
        hyperdrive={hyperdrive}
        setHyperdrive={setHyperdrive}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      <main className="relative z-10">
        {/* ================= HERO SECTION ================= */}
        <section
          id="hero"
          className="relative min-h-screen flex items-center justify-center pt-24 sm:pt-28 pb-16 px-4 sm:px-8 lg:px-12 xl:px-16 overflow-hidden w-full"
        >
          {/* Subtle Ambient Radial Lighting Highlights */}
          <div className="glow-ambient-emerald left-[-100px] top-[15%]" />
          <div className="glow-ambient-gold right-[-100px] top-[25%]" />

          <div className="max-w-[1500px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
            {/* Left Column: Kinetic Typography & CTAs */}
            <div className="lg:col-span-7 xl:col-span-7 space-y-6 text-center lg:text-left">
              {/* Antigravity Interactive Status Pill */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2 px-3.5 py-1.5 rounded-full bg-[#06140b]/90 border border-[#c5a059]/25 text-xs font-mono-code text-slate-300 backdrop-blur-xl shadow-[0_0_25px_rgba(212,175,55,0.15)]"
              >
                <div className="flex items-center gap-1.5 text-[#d4af37] font-bold">
                  <Atom className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
                  <span>ANTIGRAVITY FLUID PHYSICS</span>
                </div>
                <span className="text-slate-500">•</span>
                <span className="text-slate-300">ZERO-G DYNAMICS</span>
                <span className="text-slate-500">•</span>
                <span className="text-emerald-400 font-semibold">60 FPS SMOOTH</span>
              </motion.div>

              {/* Kinetic Headline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="space-y-2"
              >
                <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-6xl xl:text-7xl leading-[1.05] tracking-tight text-white">
                  Engineering <br />
                  <span className="text-gradient-gold">Intelligent Systems</span>
                  <br />
                  <span className="text-stroke-outline">& Modern Web.</span>
                </h1>

                {/* Animated Rotating Role Subtitle */}
                <div className="h-8 flex items-center justify-center lg:justify-start">
                  <span className="font-mono-code text-sm sm:text-base text-slate-400 mr-2">
                    Specializing in:
                  </span>
                  <span className="font-mono-code text-sm sm:text-base font-bold text-[#d4af37] transition-all">
                    {roles[roleIndex]}
                  </span>
                </div>
              </motion.div>

              {/* Executive Bio */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0"
              >
                AI & Data Science engineer architecting production-grade full stack applications,
                autonomous LLM workflows, and resilient cybersecurity intelligence suites.
              </motion.p>

              {/* Stats Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 py-2 max-w-xl mx-auto lg:mx-0"
              >
                {siteConfig.stats.map((s) => (
                  <div
                    key={s.label}
                    className="p-3.5 rounded-xl bg-[#06140b]/80 border border-[#c5a059]/20 text-center backdrop-blur-md hover:border-[#d4af37]/45 transition-colors shadow-lg"
                  >
                    <p className="font-display font-bold text-xl sm:text-2xl text-gradient-gold">{s.value}</p>
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
                className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2"
              >
                <button
                  type="button"
                  onClick={handleHyperdriveToggle}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-mono-code font-bold text-xs uppercase tracking-wider transition-all hover:scale-105 shadow-xl ${
                    hyperdrive
                      ? 'bg-gradient-to-r from-[#d4af37] to-[#10b981] text-[#040806] shadow-[0_0_30px_rgba(212,175,55,0.8)] animate-pulse'
                      : 'bg-gradient-to-r from-[#d4af37] via-[#c5a059] to-[#059669] text-[#040806] shadow-[0_0_20px_rgba(212,175,55,0.4)]'
                  }`}
                >
                  <Zap className="w-4 h-4" />
                  <span>{hyperdrive ? 'Warp Speed Active' : 'Engage Hyperdrive'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection('projects')}
                  className="px-5 py-3 rounded-full bg-[#06140b]/80 hover:bg-[#0c2215] text-[#f5e6a3] font-mono-code font-bold text-xs border border-[#c5a059]/30 transition-all hover:border-[#d4af37]"
                >
                  Explore Systems
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection('minigame')}
                  className="px-4 py-3 rounded-full bg-emerald-950/40 hover:bg-emerald-900/40 text-emerald-300 font-mono-code font-bold text-xs border border-emerald-500/30 flex items-center gap-1.5 transition-all hover:border-emerald-400"
                >
                  <Gamepad2 className="w-4 h-4" />
                  <span>Cyber Game</span>
                </button>
              </motion.div>
            </div>

            {/* Right Column: 3D Holographic ID Card / Loki Centerpiece */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 xl:col-span-5 flex justify-center items-center relative py-4 lg:py-0"
            >
              <HolographicBadge />
            </motion.div>
          </div>

          {/* Scroll Down Indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
            <span className="text-[10px] font-mono-code tracking-widest uppercase text-slate-400">
              EXPLORE ARCHITECTURE
            </span>
            <button
              type="button"
              onClick={() => scrollToSection('projects')}
              className="w-8 h-8 rounded-full border border-[#c5a059]/30 flex items-center justify-center text-[#d4af37] hover:bg-[#d4af37]/20 transition-all animate-bounce"
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

        {/* ================= CYBER INTRUSION MINIGAME ================= */}
        <section id="minigame" className="py-20 relative overflow-hidden">
          <div className="glow-ambient-emerald right-[-100px] top-[10%]" />
          <div className="glow-ambient-gold left-[-100px] bottom-[10%]" />
          <div className="max-w-5xl xl:max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
            <CyberMiniGame />
          </div>
        </section>

        {/* ================= INTERACTIVE CLI TERMINAL SECTION ================= */}
        <section id="terminal" className="py-24 relative overflow-hidden">
          <div className="glow-ambient-forest left-[-100px] top-[20%]" />
          <div className="glow-ambient-gold right-[-100px] bottom-[10%]" />

          <div className="max-w-5xl xl:max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10 space-y-8">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4af37]/10 border border-[#c5a059]/30 text-[#d4af37] text-xs font-mono-code font-bold">
                <TerminalIcon className="w-3.5 h-3.5" />
                <span>INTERACTIVE CLI SUITE</span>
              </div>
              <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
                Developer <span className="text-gradient-gold">Command Center</span>
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
