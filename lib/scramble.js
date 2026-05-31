/**
 * Text scrambling effect (hover micro-interaction).
 *
 * Design goal:
 * - "Feels" technical (CAD terminal vibe), but resolves quickly.
 * - No DOM reads in the hot path (callers just set text).
 */
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_=+/*<>[]{}#@";

export class Scrambler {
  /**
   * @param {(value: string) => void} setter - React state setter or any consumer.
   */
  constructor(setter) {
    this.setter = setter;
    this.frame = 0;
    this.queue = [];
    this.raf = null;
  }

  setText(nextText, { duration = 520 } = {}) {
    const now = (typeof performance !== "undefined" ? performance.now() : Date.now());
    const start = now;
    const from = this.queue.length ? this.queue.map((q) => q.to).join("") : "";
    const maxLen = Math.max(from.length, nextText.length);

    this.queue = new Array(maxLen).fill(0).map((_, i) => {
      const fromChar = from[i] ?? "";
      const toChar = nextText[i] ?? "";
      const startAt = Math.random() * 0.35;
      const endAt = startAt + 0.55 + Math.random() * 0.35;
      return { from: fromChar, to: toChar, startAt, endAt, char: null };
    });

    if (this.raf) cancelAnimationFrame(this.raf);

    const tick = () => {
      const t = ((typeof performance !== "undefined" ? performance.now() : Date.now()) - start) / duration;
      const p = Math.min(1, Math.max(0, t));

      let output = "";
      let complete = 0;

      for (let i = 0; i < this.queue.length; i++) {
        const q = this.queue[i];
        if (p >= q.endAt) {
          complete++;
          output += q.to;
        } else if (p >= q.startAt) {
          if (!q.char || Math.random() < 0.28) {
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
