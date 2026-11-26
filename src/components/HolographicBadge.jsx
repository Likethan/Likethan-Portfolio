import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Cpu } from 'lucide-react';

export default function HolographicBadge() {
  return (
    <div className="holo-badge-container flex flex-col items-center select-none">
      {/* Asgardian Archival Lanyard Strap & Gold Clasp */}
      <div className="flex flex-col items-center pointer-events-none">
        <div className="w-6 h-12 bg-gradient-to-b from-[#040806] via-[#08170e] to-[#c5a059]/40 rounded-t-sm border-x border-[#c5a059]/30" />
        <div className="w-10 h-3 bg-gradient-to-r from-[#947132] via-[#e6ca65] to-[#947132] rounded-sm shadow-md border border-[#f5e6a3]/50" />
        <div className="w-4 h-4 rounded-full border-2 border-[#d4af37] bg-transparent -mt-1 shadow-sm" />
      </div>

      {/* Developer Sigil Pass */}
      <motion.div
        className="holo-badge asgardian-frame relative w-[310px] sm:w-[340px] rounded-2xl p-4 bg-[#07130b]/95 border border-[#c5a059]/35 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_35px_rgba(212,175,55,0.12)] overflow-hidden backdrop-blur-xl"
      >
        {/* Top Header Row of Badge */}
        <div className="flex items-center justify-between pb-3 border-b border-[#c5a059]/20 text-xs font-mono-code">
          <div className="flex items-center gap-1.5 text-[#d4af37]">
            <Cpu className="w-3.5 h-3.5 text-[#d4af37]" />
            <span className="font-bold tracking-wider font-display">DEV // PASS</span>
          </div>
          <div className="flex items-center gap-1 text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/25">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>ACTIVE 2026</span>
          </div>
        </div>

        {/* Photo Container - Static, Crisp Display */}
        <div className="relative mt-3 rounded-xl overflow-hidden border border-[#c5a059]/25 bg-black/60 aspect-[4/4.8] shadow-inner">
          <img
            src="./profile_loki.png"
            alt="Likethan K J — Full Stack Developer"
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover object-top"
            onError={(e) => {
              e.currentTarget.src = './profile_upright.png';
            }}
          />

          {/* Watermark badge on image */}
          <div className="absolute bottom-2 left-2 right-2 bg-[#050e08]/90 backdrop-blur-md rounded-lg p-2 border border-[#c5a059]/30 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-mono-code text-slate-400">CREDENTIAL ID</p>
              <p className="text-xs font-bold font-mono-code text-[#f5e6a3] tracking-widest">LK-8270-AI</p>
            </div>
            <div className="w-6 h-6 rounded-md bg-[#d4af37]/20 flex items-center justify-center border border-[#d4af37]/45 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
            </div>
          </div>
        </div>

        {/* Member Details */}
        <div className="mt-3.5 space-y-1">
          <div className="flex items-center justify-between">
            <h4 className="font-display font-extrabold text-lg text-white tracking-wide">
              LIKETHAN K J
            </h4>
            <span className="text-[11px] font-mono-code px-2 py-0.5 rounded bg-[#c5a059]/10 border border-[#c5a059]/25 text-[#f5e6a3]">
              B.Tech AI&DS
            </span>
          </div>
          <p className="text-xs text-emerald-400 font-mono-code">
            Full Stack & Autonomous AI Engineer
          </p>
        </div>

        {/* Bottom Barcode & Tech Tickers */}
        <div className="mt-3 pt-2.5 border-t border-[#c5a059]/20 flex items-center justify-between text-[10px] font-mono-code text-slate-400">
          <div className="flex gap-1 items-end h-4 opacity-75">
            {[4, 8, 2, 6, 9, 3, 7, 5, 2, 8, 4, 7, 9, 3, 5, 2, 6, 8, 4, 7].map((h, i) => (
              <span
                key={i}
                className="w-0.5 bg-[#c5a059]"
                style={{ height: `${h * 1.5}px` }}
              />
            ))}
          </div>
          <span className="text-[#c5a059]/80 tracking-wider">VSB // TAMIL NADU</span>
        </div>
      </motion.div>
    </div>
  );
}
