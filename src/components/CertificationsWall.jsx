import React from 'react';
import { motion } from 'framer-motion';
import { Award, ShieldCheck, Cpu, Terminal, CheckCircle2 } from 'lucide-react';
import { certifications } from '../lib/siteData';
import { soundFx } from '../utils/soundFx';

export default function CertificationsWall() {
  const iconMap = {
    'CTF L2': ShieldCheck,
    Robotics: Cpu,
    IoT: Terminal,
    Workshop: Award,
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="glow-ambient-gold right-[-150px] top-[10%]" />

      <div className="max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4af37]/10 border border-[#c5a059]/30 text-[#d4af37] text-xs font-mono-code font-bold">
            <Award className="w-3.5 h-3.5" />
            <span>CREDENTIALS & HONORS</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
            Verified Certifications
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Professional certifications demonstrating expertise across offensive security, embedded systems, and emerging technologies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certifications.map((cert, idx) => {
            const Icon = iconMap[cert.badge] || Award;

            return (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                onMouseEnter={() => soundFx.playHover()}
                className="asgardian-frame p-6 rounded-2xl border border-[#c5a059]/20 bg-[#06140b]/80 hover:border-[#d4af37]/50 transition-all flex items-start gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#d4af37]/20 to-[#10b981]/15 border border-[#c5a059]/35 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(212,175,55,0.15)]">
                  <Icon className="w-6 h-6 text-[#d4af37]" />
                </div>
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono-code text-[#d4af37] font-bold tracking-wider uppercase">
                      {cert.issuer} • {cert.year}
                    </span>
                    <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      VERIFIED
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-base sm:text-lg text-white group-hover:text-[#f5e6a3] transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {cert.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
