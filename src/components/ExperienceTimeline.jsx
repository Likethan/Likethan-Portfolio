import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Calendar, MapPin, Award, CheckCircle } from 'lucide-react';
import { experience, education } from '../lib/siteData';
import { soundFx } from '../utils/soundFx';

export default function ExperienceTimeline() {
  const [tab, setTab] = useState('experience');

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="glow-ambient-crimson right-[-150px] top-[30%]" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff2a2a]/10 border border-[#ff2a2a]/25 text-[#ff2a2a] text-xs font-mono-code font-bold">
            <Briefcase className="w-3.5 h-3.5" />
            <span>JOURNEY & TRAJECTORY</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
            Industry Experience & <span className="text-gradient-crimson">Education</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Practical hands-on engineering exposure reinforced by rigorous academic specialization in AI & Data Science.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex justify-center">
          <div className="p-1 rounded-full bg-white/5 border border-white/10 flex gap-1">
            <button
              onClick={() => {
                soundFx.playClick();
                setTab('experience');
              }}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-mono-code font-semibold transition-all ${
                tab === 'experience'
                  ? 'bg-gradient-to-r from-[#ff2a2a] to-[#ff6b6b] text-white shadow-[0_0_20px_rgba(255,42,42,0.35)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Work Experience</span>
            </button>
            <button
              onClick={() => {
                soundFx.playClick();
                setTab('education');
              }}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-mono-code font-semibold transition-all ${
                tab === 'education'
                  ? 'bg-gradient-to-r from-[#00f5ff] to-[#38bdf8] text-[#08090d] shadow-[0_0_20px_rgba(0,245,255,0.35)] font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Academic Background</span>
            </button>
          </div>
        </div>

        {/* Timeline Content */}
        <div className="space-y-6">
          {tab === 'experience' ? (
            experience.map((item, idx) => (
              <motion.div
                key={item.company}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                onMouseEnter={() => soundFx.playHover()}
                className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 bg-[#0d101d]/80 hover:border-[#ff2a2a]/40 transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
                  <div>
                    <span className="text-xs font-mono-code text-[#ff2a2a] font-bold tracking-wider uppercase">
                      {item.period}
                    </span>
                    <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white">
                      {item.role}
                    </h3>
                    <p className="text-sm font-semibold text-slate-300 flex items-center gap-1.5 mt-0.5">
                      <span>{item.company}</span>
                      <span className="text-slate-500">•</span>
                      <span className="text-slate-400 flex items-center gap-1 text-xs">
                        <MapPin className="w-3 h-3 text-slate-500" />
                        {item.location}
                      </span>
                    </p>
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {item.description}
                </p>

                <div className="space-y-2 pt-1">
                  <span className="text-xs font-mono-code text-slate-400 font-bold uppercase tracking-wider">
                    Core Engineering Highlights:
                  </span>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                    {item.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 bg-white/5 p-2 rounded-lg border border-white/5">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {item.skills.map((s) => (
                    <span
                      key={s}
                      className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 font-mono-code text-[11px] text-slate-300"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))
          ) : (
            education.map((item, idx) => (
              <motion.div
                key={item.institution}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                onMouseEnter={() => soundFx.playHover()}
                className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 bg-[#0d101d]/80 hover:border-[#00f5ff]/40 transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
                  <div>
                    <span className="text-xs font-mono-code text-[#00f5ff] font-bold tracking-wider uppercase">
                      {item.period}
                    </span>
                    <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white">
                      {item.degree}
                    </h3>
                    <p className="text-sm font-semibold text-slate-300 mt-0.5">
                      {item.institution}
                    </p>
                  </div>
                  <div className="self-start sm:self-center px-3 py-1.5 rounded-full bg-[#00f5ff]/10 border border-[#00f5ff]/30 text-[#00f5ff] font-mono-code font-bold text-xs">
                    {item.score}
                  </div>
                </div>

                <div className="space-y-2">
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                    {item.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#00f5ff] font-bold">▹</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
