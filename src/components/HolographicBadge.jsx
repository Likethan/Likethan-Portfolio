import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Sparkles, Terminal, Cpu } from 'lucide-react';
import { soundFx } from '../utils/soundFx';

export default function HolographicBadge() {
  const cardRef = useRef(null);
  const glareRef = useRef(null);
  const rafRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (cardRef.current) {
        cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
      }
      if (glareRef.current) {
        const gx = ((x / rect.width) * 100).toFixed(1);
        const gy = ((y / rect.height) * 100).toFixed(1);
        glareRef.current.style.opacity = '0.75';
        glareRef.current.style.background = `radial-gradient(circle at ${gx}% ${gy}%, rgba(0, 245, 255, 0.35) 0%, rgba(255, 42, 42, 0.2) 35%, transparent 70%)`;
      }
    });
  };

  const handleMouseLeave = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    }
    if (glareRef.current) {
      glareRef.current.style.opacity = '0';
    }
  };

  return (
    <div className="holo-badge-container flex flex-col items-center">
      {/* Lanyard Strap & Clip */}
      <div className="flex flex-col items-center pointer-events-none select-none">
        <div className="w-6 h-12 bg-gradient-to-b from-[#111] via-[#1a1a2e] to-[#00f5ff]/40 rounded-t-sm border-x border-white/10" />
        <div className="w-10 h-3 bg-gradient-to-r from-slate-400 via-white to-slate-400 rounded-sm shadow-md border border-white/40" />
        <div className="w-4 h-4 rounded-full border-2 border-slate-300 bg-transparent -mt-1" />
      </div>

      {/* 3D Floating Interactive Badge */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => soundFx.playHover()}
        style={{
          transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
          willChange: 'transform',
        }}
        className="holo-badge relative w-[310px] sm:w-[340px] rounded-2xl p-4 bg-[#0d111c]/95 border border-white/15 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_35px_rgba(0,245,255,0.15)] overflow-hidden cursor-pointer backdrop-blur-xl transition-transform duration-100 ease-out"
      >
        {/* Holographic Iridescent Glare */}
        <div
          ref={glareRef}
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-30"
          style={{
            opacity: 0,
            mixBlendMode: 'screen',
            willChange: 'opacity, background',
          }}
        />

        {/* Top Header Row of Badge */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono-code">
          <div className="flex items-center gap-1.5 text-accent-cyan">
            <Cpu className="w-3.5 h-3.5 text-[#00f5ff]" />
            <span className="font-bold tracking-wider">DEV // PASS</span>
          </div>
          <div className="flex items-center gap-1 text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>ACTIVE 2026</span>
          </div>
        </div>

        {/* Photo Container */}
        <div className="relative mt-3 rounded-xl overflow-hidden border border-white/15 bg-black/50 aspect-[4/4.8] shadow-inner group">
          <img
            src="/profile_upright.png"
            alt="Likethan K J — Full Stack Developer"
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              // Fallback to portrait or placeholder if needed
              e.currentTarget.src = '/portrait.png';
            }}
          />

          {/* Holographic scanline overlay */}
          <div className="scanline-overlay" />

          {/* Watermark badge on image */}
          <div className="absolute bottom-2 left-2 right-2 bg-[#090b14]/80 backdrop-blur-md rounded-lg p-2 border border-white/10 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-mono-code text-slate-400">CREDENTIAL ID</p>
              <p className="text-xs font-bold font-mono-code text-white tracking-widest">LK-8270-AI</p>
            </div>
            <div className="w-6 h-6 rounded-md bg-[#00f5ff]/20 flex items-center justify-center border border-[#00f5ff]/40">
              <ShieldCheck className="w-4 h-4 text-[#00f5ff]" />
            </div>
          </div>
        </div>

        {/* Member Details */}
        <div className="mt-3.5 space-y-1">
          <div className="flex items-center justify-between">
            <h4 className="font-display font-extrabold text-lg text-white tracking-wide">
              LIKETHAN K J
            </h4>
            <span className="text-[11px] font-mono-code px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300">
              B.Tech AI&DS
            </span>
          </div>
          <p className="text-xs text-accent-cyan font-mono-code">
            Full Stack & Autonomous AI Engineer
          </p>
        </div>

        {/* Bottom Barcode & Tech Tickers */}
        <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[10px] font-mono-code text-slate-400">
          <div className="flex gap-1 items-end h-4 opacity-75">
            {[4, 8, 2, 6, 9, 3, 7, 5, 2, 8, 4, 7, 9, 3, 5, 2, 6, 8, 4, 7].map((h, i) => (
              <span
                key={i}
                className="w-0.5 bg-slate-300"
                style={{ height: `${h * 1.5}px` }}
              />
            ))}
          </div>
          <span className="text-slate-400 tracking-wider">VSB // TAMIL NADU</span>
        </div>
      </motion.div>
    </div>
  );
}
