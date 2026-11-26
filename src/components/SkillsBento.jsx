import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Globe, Shield, Wrench, Layers, Sparkles, CheckCircle2 } from 'lucide-react';
import { techSkills } from '../lib/siteData';
import { soundFx } from '../utils/soundFx';

export default function SkillsBento() {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    { label: 'All', icon: Layers },
    { label: 'AI & Data', icon: Cpu },
    { label: 'Frontend', icon: Globe },
    { label: 'Backend', icon: Sparkles },
    { label: 'Tools & Hardware', icon: Shield },
  ];

  const filteredSkills =
    activeCategory === 'All'
      ? techSkills
      : techSkills.filter((s) => s.category === activeCategory);

  const marqueeTechnologies = [
    'Python', 'React 19', 'Next.js', 'Flask', 'Google Gemini API', 'Tailwind CSS',
    'Framer Motion', 'MySQL', 'REST APIs', 'Cybersecurity', 'OSINT', 'Linux',
    'Arduino Robotics', 'Raspberry Pi', 'Git & CI/CD', 'Java', 'Docker', 'NumPy',
  ];

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="glow-ambient-cyan left-[-150px] top-[20%]" />
      <div className="glow-ambient-purple right-[-200px] bottom-[10%]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00f5ff]/10 border border-[#00f5ff]/25 text-[#00f5ff] text-xs font-mono-code font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>COMPETENCY MATRIX</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
            Engineered for <span className="text-gradient-cyan">Precision & Scale</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            A comprehensive overview of production architectures, frameworks, and specialized domain methodologies.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.label;

            return (
              <button
                key={cat.label}
                onClick={() => {
                  soundFx.playClick();
                  setActiveCategory(cat.label);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold font-mono-code transition-all ${
                  isActive
                    ? 'bg-[#00f5ff] text-[#08090d] shadow-[0_0_20px_rgba(0,245,255,0.4)] scale-105'
                    : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredSkills.map((skill, idx) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.04 }}
              onMouseEnter={() => soundFx.playHover()}
              className="glass-card-spotlight p-5 rounded-2xl border border-white/10 bg-[#0c101d]/70 hover:border-[#00f5ff]/40 group flex flex-col justify-between space-y-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono-code tracking-wider uppercase text-slate-400">
                    {skill.category}
                  </span>
                  <h3 className="font-display font-bold text-lg text-white group-hover:text-[#00f5ff] transition-colors">
                    {skill.name}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="font-mono-code font-bold text-base text-[#00f5ff]">
                    {skill.level}%
                  </span>
                </div>
              </div>

              {/* Progress Meter Bar */}
              <div className="space-y-1.5">
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <div
                    className="h-full bg-gradient-to-r from-[#00f5ff] via-[#38bdf8] to-[#8b5cf6] rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] font-mono-code text-slate-500">
                  <span>Proficiency</span>
                  <span>Production Ready</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Infinite Tech Marquee */}
        <div className="relative pt-6 overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#08090d] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#08090d] to-transparent z-10 pointer-events-none" />

          <div className="animate-marquee gap-3 py-2">
            {[...marqueeTechnologies, ...marqueeTechnologies].map((tech, i) => (
              <div
                key={i}
                className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 font-mono-code text-xs whitespace-nowrap hover:border-[#00f5ff]/40 hover:text-white transition-all hover:bg-[#00f5ff]/10"
              >
                <span className="text-[#00f5ff] mr-1.5 font-bold">⚡</span>
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
