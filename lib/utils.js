import clsx from "clsx";

/**
 * cn()
 * Tailwind className joiner: small, predictable, no magic.
 */
export function cn(...args) {
  return clsx(args);
}

export function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

export function lerp(a, b, t) {
  return a + (b - a) * t;
}

export function mapRange(value, inMin, inMax, outMin, outMax) {
  const t = (value - inMin) / (inMax - inMin);
  return outMin + (outMax - outMin) * t;
}

/**
 * prefersReducedMotion()
 * Used only as a helper inside client code.
 */
export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}
