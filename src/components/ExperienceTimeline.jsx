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
      <div className="glow-ambient-forest left-[-150px] top-[30%]" />
      <div className="glow-ambient-gold right-[-150px] top-[40%]" />

      <div className="max-w-6xl xl:max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4af37]/10 border border-[#c5a059]/30 text-[#d4af37] text-xs font-mono-code font-bold">
            <Briefcase className="w-3.5 h-3.5" />
            <span>JOURNEY & TRAJECTORY</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
            Industry Experience & <span className="text-gradient-gold">Education</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Practical hands-on engineering exposure reinforced by rigorous academic specialization in AI & Data Science.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex justify-center">
          <div className="p-1 rounded-full bg-[#06140b]/80 border border-[#c5a059]/25 flex gap-1">
            <button
              onClick={() => {
                soundFx.playClick();
                setTab('experience');
              }}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-mono-code font-semibold transition-all ${
                tab === 'experience'
                  ? 'bg-gradient-to-r from-[#d4af37] to-[#c5a059] text-[#040806] shadow-[0_0_20px_rgba(212,175,55,0.35)] font-bold'
                  : 'text-slate-400 hover:text-[#f5e6a3]'
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
                  ? 'bg-gradient-to-r from-[#10b981] to-[#059669] text-[#040806] shadow-[0_0_20px_rgba(16,185,129,0.35)] font-bold'
                  : 'text-slate-400 hover:text-emerald-300'
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
                className="asgardian-frame p-6 sm:p-8 rounded-2xl border border-[#c5a059]/20 bg-[#06140b]/85 hover:border-[#d4af37]/50 transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#c5a059]/15 pb-4">
                  <div>
                    <span className="text-xs font-mono-code text-[#d4af37] font-bold tracking-wider uppercase">
                      {item.period}
                    </span>
                    <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white">
                      {item.role}
                    </h3>
                    <p className="text-sm font-semibold text-slate-300 flex items-center gap-1.5 mt-0.5">
                      <span>{item.company}</span>
                      <span className="text-slate-500">•</span>
                      <span className="text-slate-400 flex items-center gap-1 text-xs">
                        <MapPin className="w-3 h-3 text-[#c5a059]" />
                        {item.location}
                      </span>
                    </p>
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {item.description}
                </p>

                <div className="space-y-2 pt-1">
                  <span className="text-xs font-mono-code text-[#c5a059] font-bold uppercase tracking-wider">
                    Core Engineering Highlights:
                  </span>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                    {item.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 bg-[#08170e]/80 p-2.5 rounded-lg border border-[#c5a059]/15">
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
                      className="px-2.5 py-1 rounded-md bg-[#08170e] border border-[#c5a059]/20 font-mono-code text-[11px] text-slate-300"
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
                className="asgardian-frame p-6 sm:p-8 rounded-2xl border border-[#c5a059]/20 bg-[#06140b]/85 hover:border-[#10b981]/50 transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#c5a059]/15 pb-4">
                  <div>
                    <span className="text-xs font-mono-code text-emerald-400 font-bold tracking-wider uppercase">
                      {item.period}
                    </span>
                    <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white">
                      {item.degree}
                    </h3>
                    <p className="text-sm font-semibold text-slate-300 mt-0.5">
                      {item.institution}
                    </p>
                  </div>
                  <div className="self-start sm:self-center px-3 py-1.5 rounded-full bg-emerald-950/50 border border-emerald-500/30 text-emerald-300 font-mono-code font-bold text-xs shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                    {item.score}
                  </div>
                </div>

                <div className="space-y-2">
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                    {item.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#d4af37] font-bold">▹</span>
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
