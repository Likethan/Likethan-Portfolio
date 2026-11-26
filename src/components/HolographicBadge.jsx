import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Cpu, Sparkles } from 'lucide-react';

export default function HolographicBadge() {
  return (
    <div className="holo-badge-container relative flex flex-col items-center select-none w-full max-w-[360px] sm:max-w-[440px] md:max-w-[470px] xl:max-w-[500px]">
      {/* 1. Behind-Card Sacred Timeline Celestial Halo & Runic Compass */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
        {/* Ambient Radial Backlight Glow */}
        <div className="w-[380px] sm:w-[480px] xl:w-[560px] h-[380px] sm:h-[480px] xl:h-[560px] rounded-full bg-gradient-to-tr from-[#059669]/25 via-emerald-950/20 to-[#d4af37]/25 blur-3xl" />

        {/* Slow-Rotating Outer Sacred Timeline Orbit Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          className="absolute w-[360px] sm:w-[460px] xl:w-[540px] h-[360px] sm:h-[460px] xl:h-[540px] rounded-full border border-[#c5a059]/20"
        >
          {/* 4 Cardinal Golden Glyphs / Nodes */}
          <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#d4af37] shadow-[0_0_12px_#d4af37] flex items-center justify-center">
            <span className="w-1 h-1 rounded-full bg-[#040806]" />
          </span>
          <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#d4af37] shadow-[0_0_12px_#d4af37] flex items-center justify-center">
            <span className="w-1 h-1 rounded-full bg-[#040806]" />
          </span>
          <span className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#10b981] shadow-[0_0_12px_#10b981] flex items-center justify-center">
            <span className="w-1 h-1 rounded-full bg-[#040806]" />
          </span>
          <span className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#10b981] shadow-[0_0_12px_#10b981] flex items-center justify-center">
            <span className="w-1 h-1 rounded-full bg-[#040806]" />
          </span>
        </motion.div>

        {/* Inner Counter-Rotating Emerald Dash Ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
          className="absolute w-[310px] sm:w-[400px] xl:w-[460px] h-[310px] sm:h-[400px] xl:h-[460px] rounded-full border border-dashed border-emerald-500/25"
        />
      </div>

      {/* 2. Top Asgardian Archival Mount & Clasp */}
      <div className="flex flex-col items-center pointer-events-none mb-1">
        <div className="w-8 sm:w-10 h-8 sm:h-10 bg-gradient-to-b from-[#040806] via-[#08170e] to-[#c5a059]/40 rounded-t-md border-x border-[#c5a059]/30" />
        <div className="w-14 sm:w-16 h-3.5 bg-gradient-to-r from-[#7a5a22] via-[#e5c76b] to-[#7a5a22] rounded-sm shadow-md border border-[#f5e6a3]/60 flex items-center justify-center">
          <div className="w-8 h-1 bg-[#040806]/40 rounded-full" />
        </div>
        <div className="w-5 h-5 rounded-full border-2 border-[#d4af37] bg-[#07130b] -mt-1 shadow-md flex items-center justify-center">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </div>
      </div>

      {/* 3. Imperial Asgardian Relic Frame (Loki Portrait) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="asgardian-frame relative w-full rounded-3xl p-4 sm:p-5 bg-[#06140b]/95 border-2 border-[#c5a059]/35 shadow-[0_30px_70px_rgba(0,0,0,0.9),0_0_40px_rgba(212,175,55,0.18)] overflow-hidden backdrop-blur-2xl"
      >
        {/* Top Header Row of Sigil */}
        <div className="flex items-center justify-between pb-3 border-b border-[#c5a059]/20 text-xs font-mono-code">
          <div className="flex items-center gap-2 text-[#d4af37]">
            <Cpu className="w-4 h-4 text-[#d4af37]" />
            <span className="font-bold tracking-widest font-display text-xs sm:text-sm">ASGARDIAN RELIC // PASS</span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30 text-[11px]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>ACTIVE 2026</span>
          </div>
        </div>

        {/* Grand High-Definition Portrait Display */}
        <div className="relative mt-3.5 rounded-2xl overflow-hidden border border-[#c5a059]/30 bg-black/60 aspect-[4/4.8] sm:aspect-[4/4.7] shadow-2xl group">
          <img
            src="./profile_loki.png"
            alt="Likethan K J — Full Stack Developer"
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
            onError={(e) => {
              e.currentTarget.src = './profile_upright.png';
            }}
          />

          {/* Ethereal Golden Rim Highlight Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#040806] via-transparent to-transparent opacity-60 pointer-events-none" />

          {/* Floating Credential Seal on Portrait */}
          <div className="absolute bottom-3 left-3 right-3 bg-[#050e08]/90 backdrop-blur-xl rounded-xl p-2.5 border border-[#c5a059]/35 flex items-center justify-between shadow-xl">
            <div>
              <p className="text-[9px] sm:text-[10px] font-mono-code text-slate-400 tracking-wider">CREDENTIAL ID</p>
              <p className="text-xs sm:text-sm font-bold font-mono-code text-[#f5e6a3] tracking-widest">LK-8270-AI</p>
            </div>
            <div className="w-7 h-7 rounded-lg bg-[#d4af37]/20 flex items-center justify-center border border-[#d4af37]/45 shadow-[0_0_10px_rgba(212,175,55,0.3)]">
              <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
            </div>
          </div>
        </div>

        {/* Member Details */}
        <div className="mt-4 space-y-1">
          <div className="flex items-center justify-between">
            <h4 className="font-display font-black text-xl sm:text-2xl text-white tracking-wide">
              LIKETHAN K J
            </h4>
            <span className="text-[11px] sm:text-xs font-mono-code px-2.5 py-0.5 rounded-full bg-[#c5a059]/15 border border-[#c5a059]/35 text-[#f5e6a3] font-bold">
              B.Tech AI&DS
            </span>
          </div>
          <p className="text-xs sm:text-sm text-emerald-400 font-mono-code font-medium">
            Full Stack & Autonomous AI Engineer
          </p>
        </div>

        {/* Bottom Barcode & Tech Tickers */}
        <div className="mt-3.5 pt-3 border-t border-[#c5a059]/20 flex items-center justify-between text-[10px] font-mono-code text-slate-400">
          <div className="flex gap-1 items-end h-4 opacity-80">
            {[4, 8, 2, 6, 9, 3, 7, 5, 2, 8, 4, 7, 9, 3, 5, 2, 6, 8, 4, 7, 5, 9].map((h, i) => (
              <span
                key={i}
                className="w-0.5 bg-[#c5a059]"
                style={{ height: `${h * 1.5}px` }}
              />
            ))}
          </div>
          <span className="text-[#c5a059] tracking-widest font-bold">VSB // TAMIL NADU</span>
        </div>
      </motion.div>
    </div>
  );
}
