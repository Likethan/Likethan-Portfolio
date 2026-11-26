import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, Sun, Moon, ArrowUpRight, ShieldCheck, Sparkles } from 'lucide-react';
import { siteConfig, navItems } from '../lib/siteData';
import { soundFx } from '../utils/soundFx';

export default function Navbar({ soundEnabled, setSoundEnabled, theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Scrollspy calculation
      const sections = ['hero', 'projects', 'skills', 'experience', 'terminal', 'contact'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    soundFx.playClick();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSoundToggle = () => {
    const nextState = soundFx.toggleSound();
    setSoundEnabled(nextState);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-300 ${
          scrolled ? 'pt-3' : 'pt-5'
        }`}
      >
        <nav
          className={`flex items-center justify-between gap-4 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full transition-all duration-300 w-full max-w-6xl border backdrop-blur-2xl shadow-xl ${
            scrolled
              ? 'bg-[#090b14]/90 border-white/15 shadow-[0_15px_35px_rgba(0,0,0,0.5)]'
              : 'bg-[#090b14]/60 border-white/10'
          }`}
        >
          {/* Brand Logo & Live Status */}
          <div className="flex items-center gap-3">
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, '#hero')}
              className="flex items-center gap-2 group"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00f5ff] to-[#8b5cf6] p-[1.5px] transition-transform group-hover:scale-105">
                <div className="w-full h-full bg-[#08090d] rounded-[7px] flex items-center justify-center font-display font-black text-sm text-white">
                  LK
                </div>
              </div>
              <span className="font-display font-extrabold text-base tracking-tight text-white group-hover:text-[#00f5ff] transition-colors">
                Likethan<span className="text-[#00f5ff]">.</span>
              </span>
            </a>

            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[11px] font-mono-code text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 beacon-dot" />
              <span>AVAILABLE FOR HIRE</span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1 bg-white/5 border border-white/10 px-3 py-1 rounded-full backdrop-blur-md">
            {navItems.map((item) => {
              const targetId = item.href.replace('#', '');
              const isActive = activeSection === targetId;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  onMouseEnter={() => soundFx.playHover()}
                  className={`px-3 py-1 text-xs font-semibold rounded-full transition-all duration-200 ${
                    isActive
                      ? 'bg-[#00f5ff]/20 text-[#00f5ff] border border-[#00f5ff]/40 shadow-[0_0_15px_rgba(0,245,255,0.2)]'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          {/* Controls: Audio Toggle, Theme, Contact Action, Mobile Hamburger */}
          <div className="flex items-center gap-2">
            {/* Audio Synth Toggle */}
            <button
              onClick={handleSoundToggle}
              title={soundEnabled ? 'Disable interactive UI sounds' : 'Enable interactive UI sounds'}
              className={`p-2 rounded-full border transition-all ${
                soundEnabled
                  ? 'bg-[#00f5ff]/20 text-[#00f5ff] border-[#00f5ff]/50 shadow-[0_0_12px_rgba(0,245,255,0.3)]'
                  : 'bg-white/5 text-slate-400 border-white/10 hover:text-white hover:bg-white/10'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              title="Toggle color theme"
              className="p-2 rounded-full border border-white/10 bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-slate-300" />}
            </button>

            {/* Quick Contact CTA */}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="hidden sm:flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#00f5ff] to-[#38bdf8] text-[#08090d] text-xs font-bold hover:shadow-[0_0_20px_rgba(0,245,255,0.4)] transition-all hover:scale-105"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </a>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full bg-white/5 border border-white/10 text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-xl md:hidden flex flex-col justify-center items-center p-6 space-y-6">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-xs font-mono-code text-emerald-400 mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>AVAILABLE FOR HIRE 2026</span>
          </div>

          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="font-display font-bold text-2xl text-slate-200 hover:text-[#00f5ff] transition-colors"
            >
              {item.label}
            </a>
          ))}

          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="mt-6 px-8 py-3 rounded-full bg-gradient-to-r from-[#00f5ff] to-[#38bdf8] text-[#08090d] font-bold text-sm"
          >
            Start a Conversation
          </a>
        </div>
      )}
    </>
  );
}
