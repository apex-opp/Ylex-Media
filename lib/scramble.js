/**
 * Text scrambling effect (hover micro-interaction).
 *
 * Problem to solve:
 * - Keep the "technical / blueprint" vibe WITHOUT making copy look unstable.
 * - Readable at a glance (scramble is partial + resolves fast).
 *
 * The old version scrambled every character aggressively; that reads as "text changing"
 * rather than "micro-interaction". This version:
 * - Only scrambles a subset of characters (intensity).
 * - Never scrambles whitespace.
 * - Keeps punctuation mostly stable.
 */

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_=+/*<>[]{}#@";

function isScrambleable(ch) {
  // Only scramble letters/numbers. Everything else should remain stable for readability.
  return /[A-Za-z0-9]/.test(ch);
}

export class Scrambler {
  /**
   * @param {(value: string) => void} setter - React state setter or any consumer.
   */
  constructor(setter) {
    this.setter = setter;
    this.queue = [];
    this.raf = null;
  }

  /**
   * @param {string} nextText
   * @param {{duration?: number, intensity?: number}} opts
   * duration: ms, intensity: 0..1 (fraction of chars that scramble)
   */
  setText(nextText, { duration = 320, intensity = 0.28 } = {}) {
    const now = typeof performance !== "undefined" ? performance.now() : Date.now();
    const start = now;

    const from = this.queue.length ? this.queue.map((q) => q.to).join("") : "";
    const maxLen = Math.max(from.length, nextText.length);

    // Build per-character timeline.
    this.queue = new Array(maxLen).fill(0).map((_, i) => {
      const fromChar = from[i] ?? "";
      const toChar = nextText[i] ?? "";

      // If it's not scrambleable, keep it stable.
      const scramble = Math.random() < intensity && isScrambleable(toChar || fromChar);

      // Keep the "glitch" short and predictable.
      const startAt = scramble ? 0.08 + Math.random() * 0.18 : 0.0;
      const endAt = scramble ? startAt + 0.35 + Math.random() * 0.18 : 0.0;

      return { from: fromChar, to: toChar, startAt, endAt, scramble, char: null };
    });

    if (this.raf) cancelAnimationFrame(this.raf);

    const tick = () => {
      const t = ((typeof performance !== "undefined" ? performance.now() : Date.now()) - start) / duration;
      const p = Math.min(1, Math.max(0, t));

      let output = "";
      let complete = 0;

      for (let i = 0; i < this.queue.length; i++) {
        const q = this.queue[i];

        // Stable chars: just output target.
        if (!q.scramble) {
          output += q.to;
          complete++;
          continue;
        }

        if (p >= q.endAt) {
          complete++;
          output += q.to;
        } else if (p >= q.startAt) {
          // Change glyph occasionally; don't flicker every frame.
          if (!q.char || Math.random() < 0.18) {
            q.char = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          }
          output += q.char;
        } else {
          output += q.from;
        }
      }

      this.setter(output);

      if (complete === this.queue.length) {
        this.setter(nextText);
        this.raf = null;
        return;
      }

      this.raf = requestAnimationFrame(tick);
    };

    this.raf = requestAnimationFrame(tick);
  }

  destroy() {
    if (this.raf) cancelAnimationFrame(this.raf);
    this.raf = null;
    this.queue = [];
  }
}
