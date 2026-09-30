/**
 * Retro Chiptune & Arcade Sound Synthesizer using Web Audio API
 * No external audio files needed - 100% reliable, zero latency
 */

class SoundController {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private bgmOscillators: { osc: OscillatorNode; gain: GainNode }[] = [];
  private bgmInterval: number | null = null;
  private isBgmPlaying: boolean = false;
  private isAlertBgm: boolean = false;
  private bgmStep: number = 0;

  constructor() {
    // AudioContext will be initialized on first user interaction
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted) {
      this.stopBGM();
    } else {
      if (this.isBgmPlaying) {
        this.startBGM(this.isAlertBgm);
      }
    }
  }

  public toggleMute(): boolean {
    this.setMuted(!this.isMuted);
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // --- Sound Effects ---

  public playFootstep(isSneak: boolean = false) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'triangle';
      const baseFreq = isSneak ? 120 : 180;
      osc.frequency.setValueAtTime(baseFreq + Math.random() * 20, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + (isSneak ? 0.05 : 0.08));

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(isSneak ? 300 : 700, this.ctx.currentTime);

      const vol = isSneak ? 0.04 : 0.12;
      gain.gain.setValueAtTime(vol, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + (isSneak ? 0.05 : 0.08));

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.1);
    } catch {
      // Audio fallback silent
    }
  }

  public playAlert() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      // Classic metal gear style exclamation "!": high piercing beep
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(880, now); // A5
      osc.frequency.setValueAtTime(1760, now + 0.08); // A6
      osc.frequency.setValueAtTime(2200, now + 0.16); // High spike

      gain.gain.setValueAtTime(0.28, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.36);
    } catch {}
  }

  public playQuestion() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(540, now + 0.18);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.23);
    } catch {}
  }

  public playHide() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(280, now);
      osc.frequency.linearRampToValueAtTime(120, now + 0.12);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.16);
    } catch {}
  }

  public playThrow() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      // Whoosh
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(400, now);
      osc1.frequency.exponentialRampToValueAtTime(200, now + 0.15);
      gain1.gain.setValueAtTime(0.15, now);
      gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.16);
      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.17);

      // Clatter sound after 0.2s
      setTimeout(() => {
        if (!this.ctx || this.isMuted) return;
        const now2 = this.ctx.currentTime;
        const osc2 = this.ctx.createOscillator();
        const gain2 = this.ctx.createGain();
        osc2.type = 'square';
        osc2.frequency.setValueAtTime(600, now2);
        osc2.frequency.setValueAtTime(450, now2 + 0.05);
        osc2.frequency.setValueAtTime(300, now2 + 0.09);
        gain2.gain.setValueAtTime(0.18, now2);
        gain2.gain.exponentialRampToValueAtTime(0.001, now2 + 0.18);
        osc2.connect(gain2);
        gain2.connect(this.ctx.destination);
        osc2.start(now2);
        osc2.stop(now2 + 0.19);
      }, 200);
    } catch {}
  }

  public playPickup() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, now + idx * 0.05);
        gain.gain.setValueAtTime(0.12, now + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.1);
        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(now + idx * 0.05);
        osc.stop(now + idx * 0.05 + 0.11);
      });
    } catch {}
  }

  public playCoffeeBoost() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const notes = [440, 554, 659, 880, 1108];
      notes.forEach((f, i) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, now + i * 0.04);
        gain.gain.setValueAtTime(0.16, now + i * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.04 + 0.15);
        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(now + i * 0.04);
        osc.stop(now + i * 0.04 + 0.16);
      });
    } catch {}
  }

  public playCaught() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const tones = [350, 310, 260, 200];
      tones.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now + idx * 0.18);
        gain.gain.setValueAtTime(0.25, now + idx * 0.18);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.18 + 0.22);
        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(now + idx * 0.18);
        osc.stop(now + idx * 0.18 + 0.25);
      });
    } catch {}
  }

  public playVictory() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const fanfare = [
        { f: 523, d: 0.1 },  // C5
        { f: 523, d: 0.1 },  // C5
        { f: 523, d: 0.1 },  // C5
        { f: 659, d: 0.25 }, // E5
        { f: 587, d: 0.1 },  // D5
        { f: 659, d: 0.1 },  // E5
        { f: 783, d: 0.4 },  // G5
        { f: 1046, d: 0.6 }  // C6
      ];

      let t = now;
      fanfare.forEach(({ f, d }) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(f, t);
        gain.gain.setValueAtTime(0.18, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + d);
        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(t);
        osc.stop(t + d + 0.05);
        t += d * 0.9;
      });
    } catch {}
  }

  // --- Chiptune Background Music (Stealth vs Chase) ---

  public startBGM(isChase: boolean = false) {
    if (this.isMuted) {
      this.isBgmPlaying = true;
      this.isAlertBgm = isChase;
      return;
    }
    this.initContext();
    if (!this.ctx) return;

    if (this.isBgmPlaying && this.isAlertBgm === isChase) {
      return; // Already playing in correct mode
    }

    this.stopBGM();
    this.isBgmPlaying = true;
    this.isAlertBgm = isChase;
    this.bgmStep = 0;

    // Stealth bassline: D minor sneaky groove (D2, F2, G2, Ab2, A2)
    // Chase bassline: Rapid tense pulses (D3, D3, Eb3, D3, F3, E3)
    const stealthNotes = [73.42, 0, 87.31, 0, 98.00, 0, 103.83, 110.00, 73.42, 0, 87.31, 0, 65.41, 0, 69.30, 0];
    const chaseNotes = [146.83, 146.83, 155.56, 146.83, 174.61, 164.81, 146.83, 155.56];

    const stepDuration = isChase ? 120 : 180; // ms per 16th note

    this.bgmInterval = window.setInterval(() => {
      if (!this.ctx || this.isMuted || !this.isBgmPlaying) return;
      
      const now = this.ctx.currentTime;
      const notes = this.isAlertBgm ? chaseNotes : stealthNotes;
      const freq = notes[this.bgmStep % notes.length];

      if (freq > 0) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = this.isAlertBgm ? 'sawtooth' : 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        const vol = this.isAlertBgm ? 0.08 : 0.06;
        gain.gain.setValueAtTime(vol, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + (stepDuration / 1000) * 0.85);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + (stepDuration / 1000));
      }

      // High hat / stealth tick
      if (this.bgmStep % 2 === 0) {
        const hatOsc = this.ctx.createOscillator();
        const hatGain = this.ctx.createGain();
        hatOsc.type = 'square';
        hatOsc.frequency.setValueAtTime(this.isAlertBgm ? 3200 : 1800, now);
        hatGain.gain.setValueAtTime(this.isAlertBgm ? 0.025 : 0.015, now);
        hatGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);
        hatOsc.connect(hatGain);
        hatGain.connect(this.ctx.destination);
        hatOsc.start(now);
        hatOsc.stop(now + 0.035);
      }

      this.bgmStep++;
    }, stepDuration);
  }

  public setChaseBGM(isChase: boolean) {
    if (this.isAlertBgm !== isChase && this.isBgmPlaying) {
      this.startBGM(isChase);
    }
  }

  public stopBGM() {
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
    this.isBgmPlaying = false;
  }
}

export const soundManager = new SoundController();
