import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, Zap, Music } from 'lucide-react';
import { navItems } from '../lib/siteData';
import { cyberAudio } from '../utils/cyberAudio';

export default function Navbar({
  soundEnabled,
  setSoundEnabled,
  musicEnabled,
  setMusicEnabled,
  hyperdrive,
  setHyperdrive,
}) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const isScrolled = window.scrollY > 40;
          setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));

          const sections = ['hero', 'projects', 'skills', 'experience', 'minigame', 'terminal', 'contact'];
          for (const id of sections) {
            const el = document.getElementById(id);
            if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.top <= 200 && rect.bottom >= 200) {
                setActiveSection((prev) => (prev !== id ? id : prev));
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
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
          className={`flex items-center justify-between gap-3 px-3 sm:px-6 py-2 sm:py-2.5 rounded-full transition-all duration-300 w-full max-w-[1500px] border backdrop-blur-2xl shadow-2xl ${
            hyperdrive
              ? 'bg-[#040e07]/95 border-[#d4af37]/70 shadow-[0_0_35px_rgba(212,175,55,0.35)]'
              : scrolled
              ? 'bg-[#050d08]/90 border-[#c5a059]/25 shadow-[0_15px_35px_rgba(0,0,0,0.7)]'
              : 'bg-[#050d08]/75 border-[#c5a059]/15'
          }`}
        >
          {/* Brand Logo & Live Status */}
          <div className="flex items-center gap-3">
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, '#hero')}
              className="flex items-center gap-2 group"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#d4af37] via-[#c5a059] to-[#064e3b] p-[1.5px] transition-transform group-hover:scale-105 shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                <div className="w-full h-full bg-[#040806] rounded-[7px] flex items-center justify-center font-display font-black text-sm text-[#f5e6a3]">
                  LK
                </div>
              </div>
              <span className="font-display font-extrabold text-base tracking-tight text-white group-hover:text-[#d4af37] transition-colors">
                Likethan<span className="text-[#d4af37]">.</span>
              </span>
            </a>

            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[11px] font-mono-code text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>ONLINE</span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1 bg-[#06120a]/60 border border-[#c5a059]/15 px-3 py-1 rounded-full backdrop-blur-md">
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
                      ? 'bg-[#d4af37]/20 text-[#f5e6a3] border border-[#d4af37]/50 shadow-[0_0_15px_rgba(212,175,55,0.25)]'
                      : 'text-slate-300 hover:text-[#d4af37] hover:bg-white/5'
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
                  ? 'bg-gradient-to-r from-[#d4af37] to-[#10b981] text-[#040806] border-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.7)] animate-pulse'
                  : 'bg-[#08150c]/80 text-[#d4af37] border-[#c5a059]/40 hover:bg-[#c5a059]/15'
              }`}
            >
              <Zap className={`w-3.5 h-3.5 ${hyperdrive ? 'animate-bounce' : ''}`} />
              <span className="hidden sm:inline">{hyperdrive ? 'WARP ON' : 'HYPERDRIVE'}</span>
            </button>

            {/* Loki Theme & BGM Controller */}
            <button
              onClick={handleMusicToggle}
              title={musicEnabled ? 'Pause Loki Sacred Timeline BGM' : 'Play Loki Theme & Sacred Timeline BGM'}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border font-mono-code text-xs font-bold transition-all shadow-md ${
                musicEnabled
                  ? 'bg-gradient-to-r from-emerald-950/80 via-[#071a10] to-[#122416] text-[#f5e6a3] border-[#d4af37]/60 shadow-[0_0_20px_rgba(212,175,55,0.35)]'
                  : 'bg-[#06140b]/80 text-slate-300 border-[#c5a059]/25 hover:border-[#d4af37] hover:text-[#f5e6a3]'
              }`}
            >
              <Music className={`w-3.5 h-3.5 ${musicEnabled ? 'text-[#d4af37] animate-pulse' : 'text-slate-400'}`} />
              <span className="hidden sm:inline">
                {musicEnabled ? 'LOKI BGM' : 'PLAY BGM'}
              </span>
              {/* Animated 4-bar Audio Visualizer */}
              <div className="flex items-end gap-0.5 h-3.5 pl-0.5">
                {[
                  { delay: '0s' },
                  { delay: '0.15s' },
                  { delay: '0.3s' },
                  { delay: '0.45s' },
                ].map((bar, idx) => (
                  <span
                    key={idx}
                    className={`w-0.5 rounded-full transition-all duration-300 ${
                      musicEnabled
                        ? 'bg-gradient-to-t from-emerald-400 to-[#d4af37] animate-pulse'
                        : 'bg-slate-600'
                    }`}
                    style={{
                      height: musicEnabled ? (idx % 2 === 0 ? '14px' : '8px') : '3px',
                      animationDuration: musicEnabled ? '0.7s' : undefined,
                      animationDelay: bar.delay,
                    }}
                  />
                ))}
              </div>
            </button>

            {/* Sound FX Toggle */}
            <button
              onClick={handleSoundToggle}
              title={soundEnabled ? 'Mute haptic sound effects' : 'Enable haptic sound effects'}
              className={`p-2 rounded-full border transition-all ${
                soundEnabled
                  ? 'bg-[#d4af37]/20 text-[#d4af37] border-[#d4af37]/50 shadow-[0_0_12px_rgba(212,175,55,0.3)]'
                  : 'bg-white/5 text-slate-400 border-white/10 hover:text-[#d4af37] hover:bg-white/10'
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
        <div className="fixed inset-0 z-40 bg-[#040806]/95 backdrop-blur-2xl md:hidden flex flex-col justify-center items-center p-6 space-y-6">
          <div className="flex items-center gap-3">
            <button
              onClick={handleHyperdriveToggle}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono-code font-bold border ${
                hyperdrive
                  ? 'bg-gradient-to-r from-[#d4af37] to-[#10b981] text-[#040806] border-[#d4af37] shadow-[0_0_25px_rgba(212,175,55,0.8)]'
                  : 'bg-white/10 text-[#d4af37] border-[#c5a059]/50'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>{hyperdrive ? 'WARP ON' : 'HYPERDRIVE'}</span>
            </button>

            <button
              onClick={handleMusicToggle}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono-code font-bold border ${
                musicEnabled
                  ? 'bg-emerald-950/80 text-[#f5e6a3] border-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.4)]'
                  : 'bg-white/10 text-slate-300 border-[#c5a059]/30'
              }`}
            >
              <Music className={`w-4 h-4 ${musicEnabled ? 'text-[#d4af37] animate-pulse' : 'text-slate-400'}`} />
              <span>{musicEnabled ? 'LOKI BGM: ON' : 'LOKI BGM: OFF'}</span>
            </button>
          </div>

          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="font-display font-bold text-2xl text-slate-200 hover:text-[#d4af37] transition-colors"
            >
              {item.label}
            </a>
          ))}

          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="mt-6 px-8 py-3 rounded-full bg-gradient-to-r from-[#d4af37] to-[#c5a059] text-[#040806] font-bold text-sm shadow-[0_0_20px_rgba(212,175,55,0.4)]"
          >
            Start a Conversation
          </a>
        </div>
      )}
    </>
  );
}
