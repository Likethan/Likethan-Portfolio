import React, { useState } from 'react';
import { Sparkles, Play, CheckCircle2, RefreshCw, FileText } from 'lucide-react';
import { soundFx } from '../utils/soundFx';

export default function InsightForgeSimulator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [output, setOutput] = useState('');
  const [progress, setProgress] = useState(0);

  const sampleReport = `[INSIGHTFORGE AI // EXECUTIVE INTELLIGENCE SUMMARY]
======================================================
TIMESTAMP : 2026-11-26 18:55 UTC
MODEL     : Google Gemini Multimodal Reasoning Engine
DATASET   : High-Throughput Cloud Microservices Telemetry
INTEGRITY : 99.4% Verified Vector Alignment

1. ARCHITECTURAL PERFORMANCE ANALYSIS:
   • Mean latency reduced by 42% across edge routing layers.
   • Asynchronous job worker utilization stabilized at 92.8% efficiency.
   • Zero critical memory leaks detected across 1,000,000 simulated payloads.

2. PREDICTIVE SCALING RECOMMENDATIONS:
   • Auto-scale threshold optimal at 78% CPU saturation.
   • Database connection pooling recommends max 45 persistent sockets.
   • Estimated infrastructure cost efficiency gain: +31.5% YoY.

[STATUS: SYNTHESIS COMPLETE - READY FOR MULTIMODAL EXPORT]`;

  const runSimulation = () => {
    if (isGenerating) return;
    setIsGenerating(true);
    setOutput('');
    setProgress(0);
    soundFx.playClick();

    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex += 12;
      if (currentIndex >= sampleReport.length) {
        setOutput(sampleReport);
        setProgress(100);
        setIsGenerating(false);
        soundFx.playSuccess();
        clearInterval(interval);
      } else {
        setOutput(sampleReport.substring(0, currentIndex));
        setProgress(Math.round((currentIndex / sampleReport.length) * 100));
      }
    }, 28);
  };

  return (
    <div className="rounded-xl border border-white/10 bg-[#070913] p-4 font-mono-code text-xs text-slate-300 space-y-3">
      {/* Header controls */}
      <div className="flex items-center justify-between pb-2 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#00f5ff]" />
          <span className="font-bold text-white text-[11px] tracking-wider">
            GEMINI ENGINE LIVE SIMULATOR
          </span>
        </div>
        <button
          onClick={runSimulation}
          disabled={isGenerating}
          className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#00f5ff]/15 hover:bg-[#00f5ff]/30 text-[#00f5ff] border border-[#00f5ff]/40 text-xs font-semibold transition-all disabled:opacity-50"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="w-3 h-3 animate-spin" />
              <span>Generating...</span>
            </>
          ) : (
            <>
              <Play className="w-3 h-3 fill-current" />
              <span>Run Synthesis</span>
            </>
          )}
        </button>
      </div>

      {/* Progress bar */}
      {isGenerating && (
        <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-[#00f5ff] to-[#8b5cf6] h-full transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Output Console */}
      <div className="min-h-[140px] max-h-[180px] overflow-y-auto bg-black/50 p-3 rounded-lg border border-white/5 text-[11px] leading-relaxed text-slate-300 selection:bg-[#00f5ff]/30">
        {output ? (
          <pre className="whitespace-pre-wrap font-mono-code">{output}</pre>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-slate-500 py-6 text-center space-y-1">
            <FileText className="w-6 h-6 opacity-40 text-[#00f5ff]" />
            <p className="text-[11px]">Click "Run Synthesis" to stream real-time AI report generation.</p>
          </div>
        )}
      </div>
    </div>
  );
}
