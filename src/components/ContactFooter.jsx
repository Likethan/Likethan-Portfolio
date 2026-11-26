import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Check, Copy, ArrowUpRight, Github, Linkedin, Instagram, Sparkles, Clock, FileDown } from 'lucide-react';
import { siteConfig, socialLinks } from '../lib/siteData';
import { soundFx } from '../utils/soundFx';

export default function ContactFooter() {
  const [copied, setCopied] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('idle'); // 'idle' | 'sending' | 'sent'

  // Live IST Clock
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setCurrentTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    soundFx.playClick();
    navigator.clipboard.writeText(siteConfig.email);
    setCopied(true);
    soundFx.playSuccess();
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    soundFx.playClick();
    setFormStatus('sending');

    // Simulate sending with realistic feedback
    setTimeout(() => {
      setFormStatus('sent');
      soundFx.playSuccess();
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setFormStatus('idle'), 5000);
    }, 1200);
  };

  const socialIconMap = {
    github: Github,
    linkedin: Linkedin,
    instagram: Instagram,
  };

  return (
    <footer id="contact" className="pt-24 pb-12 relative overflow-hidden bg-[#05060a]">
      {/* Background glow */}
      <div className="glow-ambient-purple left-[20%] top-0 opacity-40" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 space-y-20">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-mono-code font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>LET'S CONNECT</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
            Initiate a <span className="text-gradient-cyan">Conversation</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Whether you have a breakthrough engineering opportunity, an AI project, or simply wish to connect — my channels are open.
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Coordinates & Direct Actions */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Copy Email Card */}
            <div className="glass-panel p-6 rounded-2xl border border-white/10 bg-[#0c101d]/80 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono-code text-slate-400">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <Mail className="w-4 h-4 text-[#00f5ff]" />
                  <span>DIRECT EMAIL</span>
                </span>
                <span className="text-[10px] text-emerald-400">INBOX MONITORED</span>
              </div>
              <p className="font-mono-code text-sm sm:text-base text-white font-semibold break-all">
                {siteConfig.email}
              </p>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-[#00f5ff]/20 text-slate-200 hover:text-[#00f5ff] border border-white/10 hover:border-[#00f5ff]/40 text-xs font-mono-code font-bold flex items-center justify-center gap-2 transition-all"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Email Address</span>
                  </>
                )}
              </button>
            </div>

            {/* Direct Phone & Location Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}
                className="glass-panel p-5 rounded-2xl border border-white/10 bg-[#0c101d]/80 hover:border-[#00f5ff]/40 transition-all space-y-1 block group"
              >
                <div className="flex items-center justify-between">
                  <Phone className="w-4 h-4 text-[#00f5ff]" />
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-colors" />
                </div>
                <p className="text-[10px] font-mono-code text-slate-400 uppercase">Telephone</p>
                <p className="font-mono-code text-xs text-white font-bold">{siteConfig.phone}</p>
              </a>

              <div className="glass-panel p-5 rounded-2xl border border-white/10 bg-[#0c101d]/80 space-y-1">
                <div className="flex items-center justify-between">
                  <MapPin className="w-4 h-4 text-[#ff2a2a]" />
                  <span className="flex items-center gap-1 text-[10px] font-mono-code text-emerald-400">
                    <Clock className="w-3 h-3" />
                    {currentTime || 'IST'}
                  </span>
                </div>
                <p className="text-[10px] font-mono-code text-slate-400 uppercase">Coordinates</p>
                <p className="font-mono-code text-xs text-white font-bold">{siteConfig.location}</p>
              </div>
            </div>

            {/* Social Grid */}
            <div className="grid grid-cols-3 gap-3">
              {socialLinks.map((s) => {
                const Icon = socialIconMap[s.icon] || ArrowUpRight;

                return (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => soundFx.playHover()}
                    className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#00f5ff]/40 hover:bg-[#00f5ff]/10 text-slate-300 hover:text-white transition-all flex flex-col items-center justify-center gap-1.5 text-xs font-mono-code group"
                  >
                    <Icon className="w-4 h-4 text-slate-400 group-hover:text-[#00f5ff] transition-colors" />
                    <span>{s.name}</span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right Column: Direct Messaging Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 bg-[#0b0e1b]/80 shadow-2xl relative">
              <h3 className="font-display font-bold text-xl text-white mb-2">
                Send a Direct Message
              </h3>
              <p className="text-xs text-slate-400 mb-6 font-mono-code">
                Fill in the details below to dispatch a message directly.
              </p>

              {formStatus === 'sent' ? (
                <div className="p-8 text-center space-y-3 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="font-display font-bold text-lg text-white">Message Dispatched!</h4>
                  <p className="text-xs text-slate-300 max-w-sm mx-auto">
                    Thank you for reaching out. Likethan will review your message and respond promptly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono-code text-slate-300 font-semibold">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="e.g., Alex Mercer"
                        className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 focus:border-[#00f5ff] text-white text-xs sm:text-sm outline-none transition-colors"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono-code text-slate-300 font-semibold">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="alex@company.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 focus:border-[#00f5ff] text-white text-xs sm:text-sm outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono-code text-slate-300 font-semibold">
                      Message / Project Brief
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Discussing software engineering roles, collaboration, or consulting..."
                      className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 focus:border-[#00f5ff] text-white text-xs sm:text-sm outline-none transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formStatus === 'sending'}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#00f5ff] via-[#38bdf8] to-[#8b5cf6] text-[#08090d] font-mono-code font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:shadow-[0_0_25px_rgba(0,245,255,0.4)] transition-all disabled:opacity-50"
                  >
                    {formStatus === 'sending' ? (
                      <>
                        <Sparkles className="w-4 h-4 animate-spin" />
                        <span>Dispatching Transmission...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Transmission</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Big Watermark & Footer Row */}
        <div className="pt-16 border-t border-white/10 space-y-8">
          <div className="text-center select-none overflow-hidden">
            <span className="font-display font-black text-6xl sm:text-8xl md:text-9xl text-white/[0.04] tracking-tighter hover:text-[#00f5ff]/[0.08] transition-colors duration-700">
              LIKETHAN
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-code text-slate-500">
            <p>© 2026 LIKETHAN K J. All rights reserved.</p>
            <p className="flex items-center gap-1.5">
              <span>Engineered with React 19, Vite & Tailwind CSS</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
