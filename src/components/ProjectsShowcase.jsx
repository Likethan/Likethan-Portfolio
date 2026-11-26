import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Sparkles, Shield, Layers, Terminal, ArrowUpRight, Check } from 'lucide-react';
import { projects } from '../lib/siteData';
import { soundFx } from '../utils/soundFx';
import InsightForgeSimulator from './InsightForgeSimulator';
import CyberAnalyzerScanner from './CyberAnalyzerScanner';

export default function ProjectsShowcase() {
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'AI & Machine Learning', 'Cybersecurity', 'Full Stack', 'Systems & Tools'];

  const filteredProjects =
    filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="glow-ambient-cyan right-[-150px] top-[15%]" />
      <div className="glow-ambient-purple left-[-150px] bottom-[20%]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00f5ff]/10 border border-[#00f5ff]/25 text-[#00f5ff] text-xs font-mono-code font-bold">
            <Layers className="w-3.5 h-3.5" />
            <span>FEATURED PRODUCTION SYSTEMS</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
            Architected & <span className="text-gradient-cyan">Deployed</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Real-world systems spanning multi-agent AI pipelines, OSINT cybersecurity scanners, and high-concurrency full-stack architectures.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                soundFx.playClick();
                setFilter(cat);
              }}
              className={`px-4 py-2 rounded-full text-xs font-mono-code font-semibold transition-all ${
                filter === cat
                  ? 'bg-gradient-to-r from-[#00f5ff] to-[#38bdf8] text-[#08090d] shadow-[0_0_20px_rgba(0,245,255,0.35)] font-bold scale-105'
                  : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="space-y-10">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              onMouseEnter={() => soundFx.playHover()}
              className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/15 bg-[#0b0e1b]/80 hover:border-[#00f5ff]/40 transition-all shadow-2xl relative overflow-hidden"
            >
              {/* Subtle top indicator bar */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${
                  project.category === 'Cybersecurity'
                    ? 'from-[#ff2a2a] via-[#ff6b6b] to-amber-500'
                    : 'from-[#00f5ff] via-[#38bdf8] to-[#8b5cf6]'
                }`}
              />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Column: Details */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="px-3 py-1 rounded-full text-xs font-mono-code font-bold bg-white/5 border border-white/15 text-slate-200">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="px-3 py-1 rounded-full text-xs font-mono-code font-bold bg-[#00f5ff]/10 border border-[#00f5ff]/30 text-[#00f5ff] flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        FLAGSHIP SYSTEM
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
                      {project.title}
                    </h3>
                    <p className="text-sm font-mono-code text-slate-400 mt-1">
                      {project.subtitle}
                    </p>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Architecture Metrics Grid */}
                  <div className="grid grid-cols-3 gap-3 pt-2">
                    {project.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-center"
                      >
                        <p className="text-[10px] uppercase font-mono-code text-slate-400">
                          {m.label}
                        </p>
                        <p className="font-display font-extrabold text-base text-white mt-0.5">
                          {m.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Feature Highlights */}
                  <div className="space-y-1.5 pt-1">
                    <p className="text-xs font-mono-code text-slate-400 uppercase tracking-wider font-bold">
                      Key Capabilities:
                    </p>
                    <ul className="space-y-1 text-xs text-slate-300">
                      {project.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-[#00f5ff] shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 font-mono-code text-[11px] text-slate-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Action Links */}
                  <div className="flex items-center gap-4 pt-3">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono-code text-xs font-bold transition-all border border-white/15"
                    >
                      <Github className="w-4 h-4" />
                      <span>View Codebase</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Right Column: Live Simulator or Terminal Preview */}
                <div className="lg:col-span-5">
                  {project.id === 'insightforge' ? (
                    <InsightForgeSimulator />
                  ) : project.id === 'cyber-analyzer' ? (
                    <CyberAnalyzerScanner />
                  ) : (
                    <div className="rounded-2xl border border-white/10 bg-[#070913] p-6 space-y-4 font-mono-code text-xs text-slate-300 shadow-xl">
                      <div className="flex items-center justify-between pb-3 border-b border-white/10">
                        <span className="font-bold text-white text-xs">
                          {project.title.toUpperCase()} // SYSTEM METRICS
                        </span>
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      </div>
                      <div className="space-y-2 text-[11px] leading-relaxed">
                        <p className="text-slate-400">
                          &gt; ARCHITECTURE: Full stack production deployment
                        </p>
                        <p className="text-slate-400">
                          &gt; STATUS: 100% Operational & Verified
                        </p>
                        <p className="text-slate-400">
                          &gt; PIPELINE: Automated CI/CD with Git hooks
                        </p>
                      </div>
                      <div className="p-3 bg-white/5 rounded-xl border border-white/5 flex items-center justify-between text-xs font-bold text-slate-200">
                        <span>REPOSITORY INTEGRITY</span>
                        <span className="text-[#00f5ff]">STABLE</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
