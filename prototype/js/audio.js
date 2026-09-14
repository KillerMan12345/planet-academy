/* ==========================================================================
   🪐 星球学院 (Planet Academy) · Web Audio API 纯原生音效合成引擎
   无需依赖任何外部音频文件，零延迟、全平台、纯离线可用
   ========================================================================== */

const SoundEngine = (function () {
  let ctx = null;
  let isMuted = false;

  function getContext() {
    if (!ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        ctx = new AudioContext();
      }
    }
    if (ctx && ctx.state === 'suspended') {
      ctx.resume();
    }
    return ctx;
  }

  return {
    toggleMute() {
      isMuted = !isMuted;
      return isMuted;
    },

    isMuted() {
      return isMuted;
    },

    // 🌟 1. 奖励/成功和弦 (C5 - E5 - G5 - C6 极度悦耳的上行琶音)
    playSuccess() {
      if (isMuted) return;
      const c = getContext();
      if (!c) return;

      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      const now = c.currentTime;

      notes.forEach((freq, idx) => {
        const osc = c.createOscillator();
        const gain = c.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0.001, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.3, now + idx * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.35);

        osc.connect(gain);
        gain.connect(c.destination);

        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.36);
      });
    },

    // 🌟 2. 温和果冻抖动（替代刺耳报错音，采用卡通 Boing-Boing 软音）
    playJellyShake() {
      if (isMuted) return;
      const c = getContext();
      if (!c) return;

      const now = c.currentTime;
      const osc = c.createOscillator();
      const gain = c.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.18);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.32);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(c.destination);

      osc.start(now);
      osc.stop(now + 0.36);
    },

    // 🍪 3. 小怪兽吃饼干咔嚓声 (Chomp)
    playCookieChomp() {
      if (isMuted) return;
      const c = getContext();
      if (!c) return;

      const now = c.currentTime;
      const osc = c.createOscillator();
      const gain = c.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.linearRampToValueAtTime(120, now + 0.08);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(c.destination);

      osc.start(now);
      osc.stop(now + 0.13);
    },

    // ✨ 4. 星光货币收集音 (Coin Clink)
    playCoin() {
      if (isMuted) return;
      const c = getContext();
      if (!c) return;

      const now = c.currentTime;
      const osc1 = c.createOscillator();
      const osc2 = c.createOscillator();
      const gain = c.createGain();

      osc1.type = 'sine';
      osc2.type = 'sine';

      osc1.frequency.setValueAtTime(987.77, now); // B5
      osc1.frequency.setValueAtTime(1318.51, now + 0.07); // E6

      osc2.frequency.setValueAtTime(1318.51, now);
      osc2.frequency.setValueAtTime(1975.53, now + 0.07); // B6

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(c.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.42);
      osc2.stop(now + 0.42);
    },

    // 🎵 5. 音乐音阶单音播放 (Song Maker 步进琴键)
    playNote(pitchIndex, type = 'sine') {
      if (isMuted) return;
      const c = getContext();
      if (!c) return;

      // 4档音高：C4(261.63), E4(329.63), G4(392.00), C5(523.25)
      const freqs = [261.63, 329.63, 392.00, 523.25];
      const freq = freqs[pitchIndex] || 392.00;

      const now = c.currentTime;
      const osc = c.createOscillator();
      const gain = c.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      osc.connect(gain);
      gain.connect(c.destination);

      osc.start(now);
      osc.stop(now + 0.32);
    },

    // 🗣️ 6. 语音发音播报 (Web Speech API 朗读字母或中文)
    speak(text, lang = 'zh-CN') {
      if (isMuted || !('speechSynthesis' in window)) return;
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        utterance.rate = 0.9; // 适合儿童听觉的稍慢语速
        utterance.pitch = 1.2; // 温暖偏活泼的音调
        window.speechSynthesis.speak(utterance);
      } catch (e) {
        console.warn('SpeechSynthesis unavailable:', e);
      }
    }
  };
})();
