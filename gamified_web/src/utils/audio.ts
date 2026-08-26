// ============================================================
// STEM Adventure Platform — Procedural Sound Synthesizer
// Phase 3
//
// A copyright-free audio system built natively with browser
// Web Audio API. Synthesizes sci-fi sweeps, hums, and chimes.
// Respects browser autoplay restrictions by initializing on
// user interaction.
// ============================================================

class SoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private activeOscillators: { stop: (time: number) => void }[] = [];

  constructor() {
    // Read mute preference from localStorage if available
    try {
      const saved = localStorage.getItem('stem_audio_muted');
      this.isMuted = saved !== 'false'; // Default to muted
    } catch {
      this.isMuted = true;
    }
  }

  private initContext() {
    if (!this.ctx) {
      // Lazy initialize AudioContext on user interaction
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    try {
      localStorage.setItem('stem_audio_muted', String(this.isMuted));
    } catch (err) {
      console.warn('[Audio] Failed to save mute state:', err);
    }
    if (this.isMuted) {
      this.stopAll();
    } else {
      this.initContext();
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  private stopAll() {
    this.activeOscillators.forEach((osc) => {
      try {
        osc.stop(0);
      } catch {}
    });
    this.activeOscillators = [];
  }

  /**
   * Synthesizes a sci-fi portal hum that loops / drones.
   * Modulated with an LFO to create a throbbing gravity distortion sound.
   */
  public startPortalHum() {
    if (this.isMuted) return null;
    const ctx = this.initContext();
    if (!ctx) return null;

    // Gain node for fade-in
    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.22, ctx.currentTime + 3.0); // Slow fade-in

    // Low-pass filter for a warm rumble
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(140, ctx.currentTime);

    // Deep carrier oscillator
    const carrier = ctx.createOscillator();
    carrier.type = 'sawtooth';
    carrier.frequency.setValueAtTime(55, ctx.currentTime); // Low A

    // Sub carrier oscillator
    const sub = ctx.createOscillator();
    sub.type = 'sine';
    sub.frequency.setValueAtTime(110, ctx.currentTime);

    // LFO to modulate filter cutoff (creates the throbbing hum)
    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(3.8, ctx.currentTime); // 3.8 Hz throb

    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(45, ctx.currentTime); // Throb intensity (Hz)

    // Connect LFO -> Filter frequency modulation
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    // Audio path
    carrier.connect(filter);
    sub.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    // Start oscillators
    carrier.start(0);
    sub.start(0);
    lfo.start(0);

    const activeObj = {
      stop: (time: number) => {
        gainNode.gain.cancelScheduledValues(time);
        gainNode.gain.setValueAtTime(gainNode.gain.value, time);
        gainNode.gain.linearRampToValueAtTime(0, time + 1.5); // Fade out over 1.5s
        carrier.stop(time + 1.5);
        sub.stop(time + 1.5);
        lfo.stop(time + 1.5);
      },
    };

    this.activeOscillators.push(activeObj);
    return activeObj;
  }

  /**
   * Synthesizes a dramatic pitch sweep and noise surge for the portal opening.
   */
  public playPortalOpen() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const duration = 2.0;

    // Pitch sweep
    const osc = ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(40, now);
    osc.frequency.exponentialRampToValueAtTime(380, now + duration);

    // Filter sweep
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.Q.setValueAtTime(5, now);
    filter.frequency.setValueAtTime(100, now);
    filter.frequency.exponentialRampToValueAtTime(2200, now + duration);

    // Noise Generator (filtered sound surge)
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    // Gains
    const oscGain = ctx.createGain();
    oscGain.gain.setValueAtTime(0.01, now);
    oscGain.gain.linearRampToValueAtTime(0.18, now + duration * 0.7);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.01, now);
    noiseGain.gain.linearRampToValueAtTime(0.28, now + duration * 0.8);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    // Connections
    osc.connect(filter);
    filter.connect(oscGain);
    oscGain.connect(ctx.destination);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    // Play
    osc.start(now);
    osc.stop(now + duration);
    noise.start(now);
    noise.stop(now + duration);
  }

  /**
   * Synthesizes a beautiful crystalline chime/pulse when receiving the Tesseract.
   */
  public playTesseractPulse() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    
    // Create multiple sine wave components (bell synthesis / ring modulation)
    const frequencies = [880, 1320, 1760, 2200]; // Harmonic ratios
    
    frequencies.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      // Add subtle pitch vibration
      osc.frequency.linearRampToValueAtTime(freq + (idx % 2 === 0 ? 5 : -5), now + 1.5);
      
      // Amplitude envelope
      const maxVolume = 0.08 / frequencies.length;
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(maxVolume, now + 0.05); // Attack
      // Crystalline ring decay
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 1.8 + idx * 0.2); 

      // Reverb delay feel
      const delay = ctx.createDelay();
      delay.delayTime.setValueAtTime(0.08 + idx * 0.04, now);
      const delayGain = ctx.createGain();
      delayGain.gain.setValueAtTime(0.4, now);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      // Feedback delay path
      gainNode.connect(delay);
      delay.connect(delayGain);
      delayGain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 2.5);
    });
  }

  /**
   * Synthesizes an activating pitch/filter sweep for the Tesseract.
   */
  public playTesseractWake() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const duration = 3.5;

    const osc = ctx.createOscillator();
    const sub = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gainNode = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(80, now);
    osc.frequency.exponentialRampToValueAtTime(320, now + duration);

    sub.type = 'sine';
    sub.frequency.setValueAtTime(40, now);
    sub.frequency.exponentialRampToValueAtTime(160, now + duration);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(100, now);
    filter.frequency.exponentialRampToValueAtTime(800, now + duration);

    // LFO for volume pulsing
    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(6.0, now); // 6Hz pulsing

    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(0.08, now);

    lfo.connect(lfoGain);
    lfoGain.connect(gainNode.gain); // Pulsing volume

    gainNode.gain.setValueAtTime(0.02, now);
    gainNode.gain.linearRampToValueAtTime(0.18, now + duration - 0.5);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(filter);
    sub.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(now);
    sub.start(now);
    lfo.start(now);

    osc.stop(now + duration);
    sub.stop(now + duration);
    lfo.stop(now + duration);
  }

  /**
   * Synthesizes a digital energy burst when the gateway opens.
   */
  public playGatewayOpen() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // High carrier digital ping
    const carrier = ctx.createOscillator();
    carrier.type = 'sine';
    carrier.frequency.setValueAtTime(1200, now);
    carrier.frequency.exponentialRampToValueAtTime(300, now + 1.2);

    // Modulator for robotic metallic ring modulation
    const mod = ctx.createOscillator();
    mod.type = 'sawtooth';
    mod.frequency.setValueAtTime(80, now);

    const modGain = ctx.createGain();
    modGain.gain.setValueAtTime(400, now);

    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(250, now);

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0.15, now);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 1.5);

    mod.connect(modGain);
    modGain.connect(carrier.frequency); // FM modulation
    
    carrier.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    carrier.start(now);
    mod.start(now);

    carrier.stop(now + 1.6);
    mod.stop(now + 1.6);
  }

  /**
   * Starts a continuous travel tunnel sound effect (noise wind and random data pings).
   * Returns a loop stopper handle.
   */
  public startTravelTunnel() {
    if (this.isMuted) return null;
    const ctx = this.initContext();
    if (!ctx) return null;

    const now = ctx.currentTime;

    // Deep rushing wind filter
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(300, now);

    // Continuous noise generator
    const bufferSize = ctx.sampleRate * 2.0; // 2s loop
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.14, now + 1.0); // Smooth build

    // Modulate filter frequency slowly
    const slowLFO = ctx.createOscillator();
    slowLFO.type = 'sine';
    slowLFO.frequency.setValueAtTime(0.6, now); // 0.6Hz wave

    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(100, now);

    slowLFO.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    noise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    noise.start(now);
    slowLFO.start(now);

    const activeObj = {
      stop: (time: number) => {
        gainNode.gain.cancelScheduledValues(time);
        gainNode.gain.setValueAtTime(gainNode.gain.value, time);
        gainNode.gain.linearRampToValueAtTime(0, time + 0.8); // Fast fade
        noise.stop(time + 0.8);
        slowLFO.stop(time + 0.8);
      },
    };

    this.activeOscillators.push(activeObj);
    return activeObj;
  }

  /**
   * Synthesizes a beautiful major-seventh resolution chime on arriving in the learning world.
   */
  public playArrivalChime() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    
    // C Major Seventh chord notes: C5 (523.25), E5 (659.25), G5 (783.99), B5 (987.77)
    const chord = [523.25, 659.25, 783.99, 987.77];

    chord.forEach((freq, idx) => {
      // Arpeggiate the entrance slightly (0.15s per note)
      const noteTime = now + idx * 0.15;
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, noteTime);

      gainNode.gain.setValueAtTime(0, noteTime);
      gainNode.gain.linearRampToValueAtTime(0.06, noteTime + 0.05); // Short attack
      gainNode.gain.exponentialRampToValueAtTime(0.0001, noteTime + 2.5); // Warm decay

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(noteTime);
      osc.stop(noteTime + 3.0);
    });
  }
}

export const audioSynth = new SoundManager();
