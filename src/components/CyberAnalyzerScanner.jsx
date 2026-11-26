import React, { useState } from 'react';
import { ShieldAlert, Play, CheckCircle, RefreshCw, AlertTriangle, ShieldCheck } from 'lucide-react';
import { soundFx } from '../utils/soundFx';

export default function CyberAnalyzerScanner() {
  const [isScanning, setIsScanning] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const scanSteps = [
    { label: 'DNS Reconnaissance & MX/TXT Verification', status: 'pass', latency: '42ms' },
    { label: 'SSL/TLS Cipher Suite & Certificate Health', status: 'pass', latency: '118ms' },
    { label: 'OWASP Security Headers (HSTS, CSP, X-Frame)', status: 'warn', latency: '65ms' },
    { label: 'Open Port & Service Fingerprinting (22, 80, 443)', status: 'pass', latency: '210ms' },
    { label: 'Vulnerability Severity Index Calculation (CVSS 3.1)', status: 'pass', latency: '15ms' },
  ];

  const runAudit = () => {
    if (isScanning) return;
    setIsScanning(true);
    setActiveStep(0);
    soundFx.playClick();

    let step = 0;
    const interval = setInterval(() => {
      step++;
      setActiveStep(step);
      soundFx.playHover();
      if (step >= scanSteps.length) {
        clearInterval(interval);
        setIsScanning(false);
        soundFx.playSuccess();
      }
    }, 450);
  };

  return (
    <div className="rounded-xl border border-white/10 bg-[#070913] p-4 font-mono-code text-xs text-slate-300 space-y-3">
      {/* Header controls */}
      <div className="flex items-center justify-between pb-2 border-b border-white/10">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-[#ff2a2a]" />
          <span className="font-bold text-white text-[11px] tracking-wider">
            OSINT AUDIT DEMO SCANNER
          </span>
        </div>
        <button
          onClick={runAudit}
          disabled={isScanning}
          className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#ff2a2a]/15 hover:bg-[#ff2a2a]/30 text-[#ff2a2a] border border-[#ff2a2a]/40 text-xs font-semibold transition-all disabled:opacity-50"
        >
          {isScanning ? (
            <>
              <RefreshCw className="w-3 h-3 animate-spin" />
              <span>Scanning...</span>
            </>
          ) : (
            <>
              <Play className="w-3 h-3 fill-current" />
              <span>Launch Scan</span>
            </>
          )}
        </button>
      </div>

      {/* Target Preview */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-black/40 rounded-lg text-[10px] text-slate-400 border border-white/5">
        <span>TARGET: https://enterprise-demo.target.io</span>
        <span className="text-emerald-400 font-bold">PORT 443</span>
      </div>

      {/* Scan Step Output */}
      <div className="space-y-1.5 min-h-[140px] bg-black/50 p-2.5 rounded-lg border border-white/5">
        {scanSteps.map((s, i) => {
          const isDone = i < activeStep;
          const isCurrent = i === activeStep && isScanning;

          return (
            <div
              key={i}
              className={`flex items-center justify-between p-1.5 rounded transition-all text-[11px] ${
                isDone
                  ? 'bg-white/5 text-slate-200'
                  : isCurrent
                  ? 'bg-[#ff2a2a]/10 text-white border border-[#ff2a2a]/30'
                  : 'text-slate-600 opacity-60'
              }`}
            >
              <div className="flex items-center gap-2">
                {isDone ? (
                  s.status === 'pass' ? (
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                  )
                ) : isCurrent ? (
                  <RefreshCw className="w-3.5 h-3.5 text-[#ff2a2a] animate-spin" />
                ) : (
                  <div className="w-3.5 h-3.5 rounded-full border border-slate-700" />
                )}
                <span>{s.label}</span>
              </div>
              <span className="text-[10px] opacity-75">{isDone ? s.latency : '...'}</span>
            </div>
          );
        })}
      </div>

      {/* Summary Score Bar */}
      {activeStep >= scanSteps.length && (
        <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            <span>AUDIT SCORE: 92/100 (GRADE: A - SECURE)</span>
          </div>
          <span className="text-[10px] text-slate-400 font-normal">0 CRITICAL</span>
        </div>
      )}
    </div>
  );
}
