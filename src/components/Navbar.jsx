import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, Sun, Moon, ArrowUpRight, Zap, Music } from 'lucide-react';
import { siteConfig, navItems } from '../lib/siteData';
import { cyberAudio } from '../utils/cyberAudio';

export default function Navbar({
  soundEnabled,
  setSoundEnabled,
  musicEnabled,
  setMusicEnabled,
  hyperdrive,
  setHyperdrive,
  theme,
  toggleTheme,
}) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ['hero', 'projects', 'skills', 'experience', 'minigame', 'terminal', 'contact'];
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
    cyberAudio.playHapticClick();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSoundToggle = () => {
    const nextState = cyberAudio.toggleSfx();
    setSoundEnabled(nextState);
  };

  const handleMusicToggle = () => {
    const nextState = cyberAudio.toggleMusic();
    setMusicEnabled(nextState);
  };

  const handleHyperdriveToggle = () => {
    const next = !hyperdrive;
    cyberAudio.playWarpDrive(next);
    setHyperdrive(next);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-300 ${
          scrolled ? 'pt-2 sm:pt-3' : 'pt-4 sm:pt-5'
        }`}
      >
        <nav
          className={`flex items-center justify-between gap-3 px-3 sm:px-6 py-2 sm:py-2.5 rounded-full transition-all duration-300 w-full max-w-6xl border backdrop-blur-2xl shadow-2xl ${
            hyperdrive
              ? 'bg-[#120408]/95 border-[#ff143d]/60 shadow-[0_0_35px_rgba(255,20,61,0.4)]'
              : scrolled
              ? 'bg-[#090b14]/90 border-white/15 shadow-[0_15px_35px_rgba(0,0,0,0.6)]'
              : 'bg-[#090b14]/70 border-white/10'
          }`}
        >
          {/* Brand Logo & Live Status */}
          <div className="flex items-center gap-3">
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, '#hero')}
              className="flex items-center gap-2 group"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#ff143d] to-[#9d00ff] p-[1.5px] transition-transform group-hover:scale-105 shadow-[0_0_15px_rgba(255,20,61,0.4)]">
                <div className="w-full h-full bg-[#08090d] rounded-[7px] flex items-center justify-center font-display font-black text-sm text-white">
                  LK
                </div>
              </div>
              <span className="font-display font-extrabold text-base tracking-tight text-white group-hover:text-[#ff143d] transition-colors">
                Likethan<span className="text-[#ff143d]">.</span>
              </span>
            </a>

            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[11px] font-mono-code text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 beacon-dot" />
              <span>ONLINE</span>
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
                  onMouseEnter={() => cyberAudio.playHoverBlip()}
                  className={`px-3 py-1 text-xs font-semibold rounded-full transition-all duration-200 ${
                    isActive
                      ? 'bg-[#ff143d]/20 text-[#ff143d] border border-[#ff143d]/50 shadow-[0_0_15px_rgba(255,20,61,0.25)]'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          {/* Controls: Hyperdrive, Audio Synth, Music, Mobile Toggle */}
          <div className="flex items-center gap-2">
            {/* HYPERDRIVE WARP TOGGLE */}
            <button
              onClick={handleHyperdriveToggle}
              title={hyperdrive ? 'Disengage Hyperdrive' : 'Engage Hyperdrive (Warp Velocity)'}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono-code font-bold border transition-all ${
                hyperdrive
                  ? 'bg-[#ff143d] text-white border-[#ff143d] shadow-[0_0_20px_rgba(255,20,61,0.8)] animate-pulse'
                  : 'bg-white/5 text-[#ff143d] border-[#ff143d]/40 hover:bg-[#ff143d]/15'
              }`}
            >
              <Zap className={`w-3.5 h-3.5 ${hyperdrive ? 'animate-bounce' : ''}`} />
              <span className="hidden sm:inline">{hyperdrive ? 'WARP ON' : 'HYPERDRIVE'}</span>
            </button>

            {/* Ambient Synth Drone Music Toggle */}
            <button
              onClick={handleMusicToggle}
              title={musicEnabled ? 'Stop ambient cyberpunk audio' : 'Play ambient cyberpunk audio'}
              className={`p-2 rounded-full border transition-all ${
                musicEnabled
                  ? 'bg-purple-500/25 text-purple-300 border-purple-500/50 shadow-[0_0_15px_rgba(157,0,255,0.4)]'
                  : 'bg-white/5 text-slate-400 border-white/10 hover:text-white hover:bg-white/10'
              }`}
            >
              <Music className={`w-3.5 h-3.5 ${musicEnabled ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
            </button>

            {/* Sound FX Toggle */}
            <button
              onClick={handleSoundToggle}
              title={soundEnabled ? 'Mute haptic sound effects' : 'Enable haptic sound effects'}
              className={`p-2 rounded-full border transition-all ${
                soundEnabled
                  ? 'bg-[#ff143d]/20 text-[#ff143d] border-[#ff143d]/50 shadow-[0_0_12px_rgba(255,20,61,0.3)]'
                  : 'bg-white/5 text-slate-400 border-white/10 hover:text-white hover:bg-white/10'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full bg-white/5 border border-white/10 text-white"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/90 backdrop-blur-2xl md:hidden flex flex-col justify-center items-center p-6 space-y-6">
          <button
            onClick={handleHyperdriveToggle}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-mono-code font-bold border ${
              hyperdrive
                ? 'bg-[#ff143d] text-white border-[#ff143d] shadow-[0_0_25px_rgba(255,20,61,0.8)]'
                : 'bg-white/10 text-[#ff143d] border-[#ff143d]/50'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>{hyperdrive ? 'WARP SPEED ACTIVE' : 'ENGAGE HYPERDRIVE'}</span>
          </button>

          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="font-display font-bold text-2xl text-slate-200 hover:text-[#ff143d] transition-colors"
            >
              {item.label}
            </a>
          ))}

          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="mt-6 px-8 py-3 rounded-full bg-gradient-to-r from-[#ff143d] to-[#ff3b5c] text-white font-bold text-sm"
          >
            Start a Conversation
          </a>
        </div>
      )}
    </>
  );
}
