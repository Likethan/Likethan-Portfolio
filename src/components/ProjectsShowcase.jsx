import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Sparkles, Layers, ArrowUpRight, Check } from 'lucide-react';
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
      <div className="glow-ambient-emerald right-[-150px] top-[15%]" />
      <div className="glow-ambient-gold left-[-150px] bottom-[20%]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c5a059]/10 border border-[#c5a059]/30 text-[#f5e6a3] text-xs font-mono-code font-bold">
            <Layers className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>FEATURED PRODUCTION SYSTEMS</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
            Architected & <span className="text-gradient-gold">Deployed</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
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
                  ? 'bg-gradient-to-r from-[#d4af37] via-[#e5c76b] to-[#c5a059] text-[#040806] shadow-[0_0_20px_rgba(212,175,55,0.35)] font-bold scale-105'
                  : 'bg-[#06140b]/75 text-slate-300 hover:text-[#f5e6a3] hover:bg-[#0c2215] border border-[#c5a059]/20'
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
              className="glass-panel asgardian-frame p-6 sm:p-10 rounded-3xl border border-[#c5a059]/25 bg-[#06120a]/85 hover:border-[#d4af37]/50 transition-all shadow-2xl relative overflow-hidden"
            >
              {/* Subtle top indicator bar */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${
                  project.category === 'Cybersecurity'
                    ? 'from-[#d4af37] via-[#10b981] to-emerald-600'
                    : 'from-[#d4af37] via-[#e5c76b] to-[#059669]'
                }`}
              />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Column: Details */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="px-3 py-1 rounded-full text-xs font-mono-code font-bold bg-[#08180e] border border-[#c5a059]/20 text-[#f5e6a3]">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="px-3 py-1 rounded-full text-xs font-mono-code font-bold bg-[#d4af37]/10 border border-[#d4af37]/35 text-[#f5e6a3] flex items-center gap-1 shadow-sm">
                        <Sparkles className="w-3 h-3 text-[#d4af37]" />
                        FLAGSHIP SYSTEM
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
                      {project.title}
                    </h3>
                    <p className="text-sm font-mono-code text-[#c5a059] mt-1">
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
                        className="p-2.5 rounded-xl bg-[#08180e]/70 border border-[#c5a059]/15 text-center"
                      >
                        <p className="text-[10px] uppercase font-mono-code text-slate-400">
                          {m.label}
                        </p>
                        <p className="font-display font-extrabold text-base text-[#f5e6a3] mt-0.5">
                          {m.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Feature Highlights */}
                  <div className="space-y-1.5 pt-1">
                    <p className="text-xs font-mono-code text-[#c5a059] uppercase tracking-wider font-bold">
                      Key Capabilities:
                    </p>
                    <ul className="space-y-1 text-xs text-slate-300">
                      {project.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
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
                        className="px-2.5 py-1 rounded-md bg-[#08180e] border border-[#c5a059]/20 font-mono-code text-[11px] text-slate-300"
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
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#d4af37]/15 hover:bg-[#d4af37]/25 text-[#f5e6a3] font-mono-code text-xs font-bold transition-all border border-[#d4af37]/40 shadow-sm"
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
                    <div className="rounded-2xl border border-[#c5a059]/25 bg-[#050e08]/90 p-6 space-y-4 font-mono-code text-xs text-slate-300 shadow-xl">
                      <div className="flex items-center justify-between pb-3 border-b border-[#c5a059]/20">
                        <span className="font-bold text-white text-xs font-display tracking-wider">
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
                      <div className="p-3 bg-[#08180e] rounded-xl border border-[#c5a059]/20 flex items-center justify-between text-xs font-bold text-slate-200">
                        <span>REPOSITORY INTEGRITY</span>
                        <span className="text-emerald-400">STABLE</span>
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
