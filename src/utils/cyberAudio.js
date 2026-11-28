// High-Tech Loki Audio Engine & Procedural TVA Synthesizer
// Seamlessly plays Natalie Holt's Loki Theme / BGM with HTML5 Audio & Web Audio API fallback

class CyberAudioEngine {
  constructor() {
    this.ctx = null;
    this.sfxEnabled = false;
    this.musicEnabled = false;
    this.ambientNodes = null;
    this.lokiAudio = null;
    this.lokiInterval = null;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleSfx(forceState) {
    this.init();
    this.sfxEnabled = typeof forceState === 'boolean' ? forceState : !this.sfxEnabled;
    if (this.sfxEnabled) {
      this.playHapticClick();
    }
    return this.sfxEnabled;
  }

  toggleMusic() {
    this.init();
    this.musicEnabled = !this.musicEnabled;
    if (this.musicEnabled) {
      this.startLokiTheme();
    } else {
      this.stopLokiTheme();
    }
    return this.musicEnabled;
  }

  startLokiTheme() {
    // 1. First attempt: HTML5 Audio playing pre-rendered 44.1kHz stereo WAV
    if (typeof window !== 'undefined') {
      try {
        if (!this.lokiAudio) {
          this.lokiAudio = new Audio('./loki_theme.wav');
          this.lokiAudio.loop = true;
          this.lokiAudio.volume = 0.5;
        }
        const playPromise = this.lokiAudio.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              // Playing via high-definition audio file
            })
            .catch(() => {
              // Autoplay policy or fetch error fallback: start Web Audio synthesis
              this.startProceduralLoki();
            });
          return;
        }
      } catch {
        this.startProceduralLoki();
      }
    } else {
      this.startProceduralLoki();
    }
  }

  stopLokiTheme() {
    if (this.lokiAudio) {
      try {
        this.lokiAudio.pause();
        this.lokiAudio.currentTime = 0;
      } catch {}
    }
    this.stopProceduralLoki();
  }

  // Procedural TVA Loki Theme Synthesizer via Web Audio API
  startProceduralLoki() {
    if (!this.ctx) return;
    try {
      this.stopProceduralLoki();
      const now = this.ctx.currentTime;

      // Master gain node
      const masterGain = this.ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, now);
      masterGain.gain.exponentialRampToValueAtTime(0.35, now + 1.5);
      masterGain.connect(this.ctx.destination);

      // 1. TVA Ticking Clock Ostinato (1.0 second mechanical tick)
      const tickFilter = this.ctx.createBiquadFilter();
      tickFilter.type = 'bandpass';
      tickFilter.frequency.value = 3400;
      tickFilter.Q.value = 8.0;
      tickFilter.connect(masterGain);

      // Tick schedule loop
      const scheduleTick = () => {
        if (!this.musicEnabled || !this.ctx) return;
        try {
          const tNow = this.ctx.currentTime;
          const osc = this.ctx.createOscillator();
          const g = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(3200, tNow);
          osc.frequency.exponentialRampToValueAtTime(400, tNow + 0.04);

          g.gain.setValueAtTime(0.35, tNow);
          g.gain.exponentialRampToValueAtTime(0.001, tNow + 0.04);

          osc.connect(g);
          g.connect(tickFilter);
          osc.start(tNow);
          osc.stop(tNow + 0.045);
        } catch {}
      };

      // 2. Asgardian Low Brass & Cello Pad (D minor drone)
      const freqs = [73.42, 110.0, 146.83, 220.0]; // D2, A2, D3, A3
      const droneNodes = [];
      const droneFilter = this.ctx.createBiquadFilter();
      droneFilter.type = 'lowpass';
      droneFilter.frequency.setValueAtTime(450, now);
      droneFilter.connect(masterGain);

      freqs.forEach((f) => {
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.value = f;
        g.gain.value = 0.15;
        osc.connect(g);
        g.connect(droneFilter);
        osc.start(now);
        droneNodes.push(osc);
      });

      // 3. Theremin Melody Lead (D -> F -> E -> D -> C# -> D -> A -> G -> F -> E -> D)
      const thereminOsc = this.ctx.createOscillator();
      const thereminGain = this.ctx.createGain();
      const thereminVib = this.ctx.createOscillator();
      const thereminVibGain = this.ctx.createGain();

      thereminOsc.type = 'sine';
      thereminGain.gain.setValueAtTime(0.001, now);
      thereminGain.gain.exponentialRampToValueAtTime(0.25, now + 2);

      // 5.5 Hz Vibrato
      thereminVib.frequency.value = 5.5;
      thereminVibGain.gain.value = 4.5;
      thereminVib.connect(thereminOsc.frequency);
      thereminVib.start(now);

      thereminOsc.connect(thereminGain);
      thereminGain.connect(masterGain);
      thereminOsc.start(now);

      // Play Natalie Holt Loki Motif melody sequence
      const melody = [
        { t: 1.0, f: 293.66 }, // D4
        { t: 4.0, f: 349.23 }, // F4
        { t: 6.0, f: 329.63 }, // E4
        { t: 7.5, f: 293.66 }, // D4
        { t: 10.5, f: 277.18 }, // C#4
        { t: 13.0, f: 293.66 }, // D4
        { t: 15.5, f: 440.0 }, // A4
        { t: 18.5, f: 392.0 }, // G4
        { t: 20.5, f: 349.23 }, // F4
        { t: 22.5, f: 329.63 }, // E4
        { t: 25.0, f: 293.66 }, // D4
      ];

      const playMelodyLoop = () => {
        if (!this.musicEnabled || !this.ctx) return;
        const startT = this.ctx.currentTime;
        melody.forEach((note) => {
          thereminOsc.frequency.setTargetAtTime(note.f, startT + note.t, 0.25);
        });
      };

      playMelodyLoop();
      const melodyTimer = setInterval(playMelodyLoop, 28000);
      const tickTimer = setInterval(scheduleTick, 1000);

      this.ambientNodes = {
        nodes: [...droneNodes, thereminOsc, thereminVib],
        masterGain,
        timers: [melodyTimer, tickTimer],
      };
    } catch {}
  }

  stopProceduralLoki() {
    if (this.ambientNodes && this.ctx) {
      try {
        const now = this.ctx.currentTime;
        this.ambientNodes.masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.0);
        if (this.ambientNodes.timers) {
          this.ambientNodes.timers.forEach((t) => clearInterval(t));
        }
        setTimeout(() => {
          if (this.ambientNodes && this.ambientNodes.nodes) {
            this.ambientNodes.nodes.forEach((n) => {
              try {
                n.stop();
              } catch {}
            });
            this.ambientNodes = null;
          }
        }, 1100);
      } catch {
        this.ambientNodes = null;
      }
    }
  }

  // Sound FX (Haptic clicks, warps, laser neutralization)
  playShockwave() {
    if (!this.sfxEnabled || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(32, now + 0.45);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(350, now);
      filter.frequency.exponentialRampToValueAtTime(60, now + 0.45);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.5);
    } catch {}
  }

  playWarpDrive(isActivating) {
    if (!this.sfxEnabled || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';

      if (isActivating) {
        osc.frequency.setValueAtTime(80, now);
        osc.frequency.exponentialRampToValueAtTime(1200, now + 0.6);
      } else {
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(60, now + 0.5);
      }

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.6);
    } catch {}
  }

  playLaser() {
    if (!this.sfxEnabled || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1400, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.15);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.15);
    } catch {}
  }

  playHapticClick() {
    if (!this.sfxEnabled || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(750, now);
      osc.frequency.exponentialRampToValueAtTime(100, now + 0.035);

      gain.gain.setValueAtTime(0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.035);
    } catch {}
  }

  playHoverBlip() {
    if (!this.sfxEnabled || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(480, now);
      osc.frequency.exponentialRampToValueAtTime(960, now + 0.025);

      gain.gain.setValueAtTime(0.025, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.025);
    } catch {}
  }
}

export const cyberAudio = new CyberAudioEngine();
