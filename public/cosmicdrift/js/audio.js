/* ============================================================
   CosmicDrift - audio.js
   Simple procedural audio using Web Audio API
   Minimal oscillator-based sound effects
   ============================================================ */

const Audio = (function () {
  'use strict';

  let audioCtx = null;
  let enabled = true;
  let masterGain = null;

  // ----------------------------------------------------------
  // Initialization
  // ----------------------------------------------------------
  function init() {
    try {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      masterGain = audioCtx.createGain();
      masterGain.gain.value = 0.3;
      masterGain.connect(audioCtx.destination);
    } catch (e) {
      console.warn('Web Audio API not available:', e);
      enabled = false;
    }
  }

  function ensureContext() {
    if (!audioCtx) init();
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  // ----------------------------------------------------------
  // Sound Effects
  // ----------------------------------------------------------

  // UI click - short blip
  function playClick() {
    if (!enabled || !audioCtx) return;
    ensureContext();

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.value = 800;
    gain.gain.value = 0.15;

    osc.connect(gain);
    gain.connect(masterGain);

    const now = audioCtx.currentTime;
    osc.start(now);
    osc.frequency.exponentialRampToValueAtTime(600, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    osc.stop(now + 0.08);
  }

  // Notification - gentle chime
  function playNotification() {
    if (!enabled || !audioCtx) return;
    ensureContext();

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.value = 520;
    gain.gain.value = 0.12;

    osc.connect(gain);
    gain.connect(masterGain);

    const now = audioCtx.currentTime;
    osc.start(now);
    osc.frequency.exponentialRampToValueAtTime(780, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
    osc.stop(now + 0.3);
  }

  // Combat hit - sharp percussive
  function playCombatHit() {
    if (!enabled || !audioCtx) return;
    ensureContext();

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.value = 200;
    gain.gain.value = 0.2;

    osc.connect(gain);
    gain.connect(masterGain);

    const now = audioCtx.currentTime;
    osc.start(now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    osc.stop(now + 0.15);

    // Noise burst
    const noise = audioCtx.createOscillator();
    const nGain = audioCtx.createGain();
    noise.type = 'square';
    noise.frequency.value = 120;
    nGain.gain.value = 0.1;

    noise.connect(nGain);
    nGain.connect(masterGain);
    noise.start(now);
    nGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
    noise.stop(now + 0.05);
  }

  // Building placed - solid thump
  function playBuild() {
    if (!enabled || !audioCtx) return;
    ensureContext();

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.value = 160;
    gain.gain.value = 0.2;

    osc.connect(gain);
    gain.connect(masterGain);

    const now = audioCtx.currentTime;
    osc.start(now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
    osc.stop(now + 0.2);
  }

  // Turn end - subtle sweep
  function playTurnEnd() {
    if (!enabled || !audioCtx) return;
    ensureContext();

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.value = 300;
    gain.gain.value = 0.08;

    osc.connect(gain);
    gain.connect(masterGain);

    const now = audioCtx.currentTime;
    osc.start(now);
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.4);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    osc.stop(now + 0.5);
  }

  // Warning - urgent tone
  function playWarning() {
    if (!enabled || !audioCtx) return;
    ensureContext();

    const now = audioCtx.currentTime;

    for (let i = 0; i < 2; i++) {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'square';
      osc.frequency.value = 440;
      gain.gain.value = 0.1;

      osc.connect(gain);
      gain.connect(masterGain);

      const offset = i * 0.15;
      osc.start(now + offset);
      gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.1);
      osc.stop(now + offset + 0.1);
    }
  }

  // Danger - low rumble
  function playDanger() {
    if (!enabled || !audioCtx) return;
    ensureContext();

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.value = 80;
    gain.gain.value = 0.15;

    osc.connect(gain);
    gain.connect(masterGain);

    const now = audioCtx.currentTime;
    osc.start(now);
    osc.frequency.exponentialRampToValueAtTime(50, now + 0.6);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
    osc.stop(now + 0.6);
  }

  // Victory - ascending tones
  function playVictory() {
    if (!enabled || !audioCtx) return;
    ensureContext();

    const notes = [440, 550, 660, 880];
    const now = audioCtx.currentTime;

    notes.forEach((freq, i) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.value = 0.12;

      osc.connect(gain);
      gain.connect(masterGain);

      const start = now + i * 0.15;
      osc.start(start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.3);
      osc.stop(start + 0.3);
    });
  }

  // ----------------------------------------------------------
  // Volume Control
  // ----------------------------------------------------------
  function setVolume(val) {
    if (masterGain) {
      masterGain.gain.value = Math.max(0, Math.min(1, val));
    }
  }

  function toggle() {
    enabled = !enabled;
    if (masterGain) {
      masterGain.gain.value = enabled ? 0.3 : 0;
    }
    return enabled;
  }

  // ----------------------------------------------------------
  // Public API
  // ----------------------------------------------------------
  return {
    init,
    playClick,
    playNotification,
    playCombatHit,
    playBuild,
    playTurnEnd,
    playWarning,
    playDanger,
    playVictory,
    setVolume,
    toggle,
    get enabled() { return enabled; }
  };
})();
