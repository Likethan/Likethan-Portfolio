import React, { useState, useEffect } from 'react';
import { ShieldAlert, Trophy, RotateCcw, Play, Zap, Flame, Award, Terminal } from 'lucide-react';
import { cyberAudio } from '../utils/cyberAudio';

export default function CyberMiniGame() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [targets, setTargets] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [rank, setRank] = useState('');

  const targetLabels = [
    'PORT 443', 'AUTH_TOKEN', 'SQL_INJECT', 'XSS_FILTER',
    'RSA_KEY', '0xDEADBEEF', 'FIREWALL', 'DNS_CACHE',
    'ROOT_ACCESS', 'KERNEL_PANIC'
  ];

  const startGame = () => {
    cyberAudio.playWarpDrive(true);
    setScore(0);
    setTimeLeft(15);
    setGameOver(false);
    setIsPlaying(true);
    spawnTargets();
  };

  const spawnTargets = () => {
    const newTargets = [];
    for (let i = 0; i < 4; i++) {
      newTargets.push({
        id: Math.random(),
        label: targetLabels[Math.floor(Math.random() * targetLabels.length)],
        x: Math.floor(Math.random() * 75) + 10,
        y: Math.floor(Math.random() * 65) + 15,
        type: Math.random() > 0.3 ? 'threat' : 'critical',
      });
    }
    setTargets(newTargets);
  };

  const hitTarget = (targetId, type) => {
    cyberAudio.playLaser();
    const points = type === 'critical' ? 250 : 100;
    setScore((prev) => prev + points);
    setTargets((prev) => prev.filter((t) => t.id !== targetId));

    // Spawn a replacement
    setTimeout(() => {
      setTargets((prev) => [
        ...prev,
        {
          id: Math.random(),
          label: targetLabels[Math.floor(Math.random() * targetLabels.length)],
          x: Math.floor(Math.random() * 75) + 10,
          y: Math.floor(Math.random() * 65) + 15,
          type: Math.random() > 0.3 ? 'threat' : 'critical',
        },
      ]);
    }, 120);
  };

  useEffect(() => {
    if (!isPlaying) return;
    if (timeLeft <= 0) {
      setIsPlaying(false);
      setGameOver(true);
      cyberAudio.playShockwave();

      if (score >= 1500) setRank('ELITE CYBER WARRIOR // S-TIER');
      else if (score >= 800) setRank('SENIOR SECURITY ANALYST // A-TIER');
      else setRank('SECURITY APPRENTICE // B-TIER');

      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, timeLeft, score]);

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/15 bg-[#090b14]/90 shadow-2xl relative overflow-hidden space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-[#ff143d] animate-pulse" />
            <h3 className="font-display font-extrabold text-xl text-white">
              CYBER INTRUSION MINIGAME
            </h3>
          </div>
          <p className="text-xs font-mono-code text-slate-400 mt-0.5">
            Intercept & neutralize security vulnerabilities before the timer hits zero!
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono-code">
          <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-center">
            <p className="text-[10px] text-slate-400">TIME REMAINING</p>
            <p className={`text-base font-black ${timeLeft <= 5 ? 'text-[#ff143d] animate-ping' : 'text-white'}`}>
              {timeLeft}s
            </p>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-[#ff143d]/15 border border-[#ff143d]/30 text-center">
            <p className="text-[10px] text-slate-400">SCORE</p>
            <p className="text-base font-black text-[#ff143d]">{score}</p>
          </div>
        </div>
      </div>

      {/* Game Viewport / Arena */}
      <div className="relative w-full h-72 sm:h-80 bg-black/70 rounded-2xl border border-white/10 overflow-hidden flex items-center justify-center">
        {/* Radar Background grid lines */}
        <div className="absolute inset-0 bg-grid-cyber opacity-30 pointer-events-none" />
        <div className="scanline-overlay pointer-events-none" />

        {!isPlaying && !gameOver && (
          <div className="text-center space-y-4 z-10 p-6">
            <Trophy className="w-12 h-12 text-[#ff143d] mx-auto opacity-90 animate-bounce" />
            <div>
              <h4 className="font-display font-bold text-lg text-white">
                Ready to Test Your Reflexes?
              </h4>
              <p className="text-xs font-mono-code text-slate-400 max-w-sm mx-auto mt-1">
                Click floating vulnerability tokens to patch memory exploits. Challenge for the high score!
              </p>
            </div>
            <button
              onClick={startGame}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#ff143d] to-[#ff3b5c] text-white font-mono-code font-bold text-xs uppercase tracking-wider hover:shadow-[0_0_25px_rgba(255,20,61,0.6)] transition-all hover:scale-105"
            >
              Start Security Simulation
            </button>
          </div>
        )}

        {gameOver && (
          <div className="text-center space-y-3 z-10 p-6 bg-[#090b14]/90 rounded-2xl border border-white/10 max-w-sm">
            <Award className="w-10 h-10 text-amber-400 mx-auto" />
            <h4 className="font-display font-extrabold text-xl text-white">SIMULATION COMPLETED</h4>
            <div className="p-3 bg-white/5 rounded-xl border border-white/5 font-mono-code">
              <p className="text-xs text-slate-400">FINAL SCORE: <span className="font-bold text-[#ff143d]">{score} PTS</span></p>
              <p className="text-xs text-emerald-400 font-bold mt-1">{rank}</p>
            </div>
            <button
              onClick={startGame}
              className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono-code text-xs font-bold transition-all flex items-center gap-1.5 mx-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retry Simulation</span>
            </button>
          </div>
        )}

        {isPlaying && (
          <div className="absolute inset-0">
            {targets.map((t) => (
              <button
                key={t.id}
                onClick={() => hitTarget(t.id, t.type)}
                style={{ top: `${t.y}%`, left: `${t.x}%` }}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl text-xs font-mono-code font-bold border shadow-lg transition-transform hover:scale-115 active:scale-95 animate-pulse cursor-pointer ${
                  t.type === 'critical'
                    ? 'bg-[#ff143d] text-white border-[#ff143d] shadow-[0_0_20px_rgba(255,20,61,0.8)]'
                    : 'bg-[#00f5ff]/20 text-[#00f5ff] border-[#00f5ff]/50 shadow-[0_0_15px_rgba(0,245,255,0.4)]'
                }`}
              >
                <span>⚡ {t.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
