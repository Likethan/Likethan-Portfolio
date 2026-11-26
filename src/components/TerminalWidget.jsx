import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Sparkles, CornerDownLeft, Play, X, RotateCcw } from 'lucide-react';
import { siteConfig, techSkills, projects, experience } from '../lib/siteData';
import { soundFx } from '../utils/soundFx';

const INITIAL_OUTPUT = [
  { text: 'LIKETHAN OS [Version 2.6.4 - Cloud Native Kernel]', type: 'system' },
  { text: 'Type "help" or click quick commands below to explore developer data.', type: 'info' },
];

export default function TerminalWidget() {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState(INITIAL_OUTPUT);
  const terminalBodyRef = useRef(null);

  const quickCommands = ['help', 'about', 'skills', 'projects', 'experience', 'contact', 'clear'];

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmdText) => {
    const raw = cmdText.trim();
    if (!raw) return;
    soundFx.playClick();

    const cmd = raw.toLowerCase();
    const newHistory = [...history, { text: `likethan@portfolio:~$ ${raw}`, type: 'prompt' }];

    switch (cmd) {
      case 'help':
        newHistory.push({
          type: 'response',
          text: `AVAILABLE COMMANDS:
  • about       - Executive summary & developer philosophy
  • skills      - Core technology stack & proficiency ratings
  • projects    - Featured production builds with architectural specs
  • experience  - Industry internships & engineering background
  • contact     - Direct communication channels & coordinates
  • clear       - Wipe terminal screen buffer
  • whoami      - Display current visitor session identity`,
        });
        break;

      case 'about':
        newHistory.push({
          type: 'response',
          text: `[LIKETHAN K J - PROFILE]
• Full Stack Developer & AI/Data Science Student at V.S.B. College of Engineering (CGPA 8.2).
• Specialized in React, Python, Flask, Autonomous Agent Workflows, and Cybersecurity Recon.
• Passionate about engineering high-throughput web systems with cinematic visual design.`,
        });
        break;

      case 'skills':
        const skillList = techSkills
          .map((s) => `  [${s.category}] ${s.name} (${s.level}%)`)
          .join('\n');
        newHistory.push({
          type: 'response',
          text: `[ACTIVE TECH STACK & COMPETENCY MATRIX]\n${skillList}`,
        });
        break;

      case 'projects':
        const projList = projects
          .map(
            (p) =>
              `  ▸ ${p.title} (${p.category})
    ${p.subtitle} - [${p.tags.join(', ')}]
    Repo: ${p.githubUrl}`
          )
          .join('\n\n');
        newHistory.push({
          type: 'response',
          text: `[FEATURED SYSTEM BUILDS]\n${projList}`,
        });
        break;

      case 'experience':
        const expList = experience
          .map(
            (e) =>
              `  • ${e.company} — ${e.role} (${e.period})
    ${e.description}`
          )
          .join('\n\n');
        newHistory.push({
          type: 'response',
          text: `[PROFESSIONAL INTERNSHIP EXPERIENCE]\n${expList}`,
        });
        break;

      case 'contact':
        newHistory.push({
          type: 'response',
          text: `[COMMUNICATION CHANNELS]
• Email:    ${siteConfig.email}
• Phone:    ${siteConfig.phone}
• GitHub:   ${siteConfig.githubUrl}
• LinkedIn: ${siteConfig.linkedinUrl}
• Location: ${siteConfig.location}`,
        });
        break;

      case 'whoami':
        newHistory.push({
          type: 'response',
          text: `guest@portfolio-visitor (Auth: Verified Recruiter / Engineering Leader)`,
        });
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      default:
        newHistory.push({
          type: 'error',
          text: `Command not found: "${raw}". Type "help" to view valid directives.`,
        });
    }

    setHistory(newHistory);
    setInputVal('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCommand(inputVal);
  };

  return (
    <div className="glass-panel overflow-hidden border border-white/10 shadow-2xl rounded-2xl bg-[#090b14]/90 backdrop-blur-2xl">
      {/* Window Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#0c101d] border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/80 border border-rose-600/50" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80 border border-amber-600/50" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-600/50" />
          <span className="ml-2 font-mono-code text-xs text-slate-400 font-medium">
            likethan@terminal: ~ (bash 5.2)
          </span>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-mono-code text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>PORT 443 // SECURE</span>
        </div>
      </div>

      {/* Terminal Output Area */}
      <div
        ref={terminalBodyRef}
        className="p-5 font-mono-code text-xs sm:text-sm text-slate-200 h-64 sm:h-72 overflow-y-auto space-y-2 selection:bg-[#00f5ff]/40 selection:text-white"
      >
        {history.map((item, idx) => (
          <div key={idx} className="leading-relaxed">
            {item.type === 'prompt' && (
              <span className="text-[#00f5ff] font-semibold">{item.text}</span>
            )}
            {item.type === 'system' && (
              <span className="text-emerald-400 font-semibold">{item.text}</span>
            )}
            {item.type === 'info' && (
              <span className="text-slate-400 italic">{item.text}</span>
            )}
            {item.type === 'response' && (
              <pre className="whitespace-pre-wrap text-slate-300 font-mono-code font-normal">
                {item.text}
              </pre>
            )}
            {item.type === 'error' && (
              <span className="text-rose-400">{item.text}</span>
            )}
          </div>
        ))}
      </div>

      {/* Interactive Command Input & Quick Buttons */}
      <div className="border-t border-white/10 bg-[#0c101d]/90 p-3 space-y-2.5">
        <form onSubmit={handleSubmit} className="flex items-center gap-2 px-2">
          <span className="text-[#00f5ff] font-mono-code text-xs font-bold">❯</span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type a command (e.g., 'projects', 'skills', 'about')..."
            className="flex-1 bg-transparent border-none outline-none font-mono-code text-xs sm:text-sm text-white placeholder-slate-500"
          />
          <button
            type="submit"
            className="px-3 py-1 bg-[#00f5ff]/15 hover:bg-[#00f5ff]/30 text-[#00f5ff] rounded-md font-mono-code text-xs flex items-center gap-1 transition-colors border border-[#00f5ff]/30"
          >
            <span>Run</span>
            <CornerDownLeft className="w-3 h-3" />
          </button>
        </form>

        {/* Quick Command Pills */}
        <div className="flex flex-wrap items-center gap-1.5 px-2 pt-1 border-t border-white/5">
          <span className="text-[10px] font-mono-code text-slate-500 mr-1 uppercase tracking-wider">
            Quick:
          </span>
          {quickCommands.map((cmd) => (
            <button
              key={cmd}
              type="button"
              onClick={() => handleCommand(cmd)}
              className="text-[11px] font-mono-code px-2 py-0.5 rounded bg-white/5 hover:bg-white/15 text-slate-300 hover:text-[#00f5ff] border border-white/10 hover:border-[#00f5ff]/40 transition-all"
            >
              {cmd}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
