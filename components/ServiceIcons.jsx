"use client";

/**
 * Service icons are raw SVG paths (no external icon packs).
 * - All paths are stroke-only so we can dash-animate them in WireCard.
 */

const base = "h-6 w-6";
const common = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function IconVideo() {
  return (
    <svg viewBox="0 0 24 24" className={base} aria-hidden="true">
      <path {...common} d="M4 6h11a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" />
      <path {...common} d="M17 10.5 22 8v8l-5-2.5" />
      <path {...common} d="M6 9h4M6 12h6M6 15h3" />
    </svg>
  );
}

export function IconDesign() {
  return (
    <svg viewBox="0 0 24 24" className={base} aria-hidden="true">
      <path {...common} d="M12 20h9" />
      <path {...common} d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4 11.5-11.5Z" />
      <path {...common} d="M13.5 6.5 17.5 10.5" />
    </svg>
  );
}

export function IconMotion() {
  return (
    <svg viewBox="0 0 24 24" className={base} aria-hidden="true">
      <path {...common} d="M3 12c3-6 6-6 9 0s6 6 9 0" />
      <path {...common} d="M7 12h0.01M12 12h0.01M17 12h0.01" />
      <path {...common} d="M4 18h6M14 6h6" />
    </svg>
  );
}

export function IconContent() {
  return (
    <svg viewBox="0 0 24 24" className={base} aria-hidden="true">
      <path {...common} d="M8 2v4M16 2v4" />
      <path {...common} d="M3 6h18" />
      <path {...common} d="M5 6v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6" />
      <path {...common} d="M8 11h8M8 15h5" />
    </svg>
  );
}

export function IconScript() {
  return (
    <svg viewBox="0 0 24 24" className={base} aria-hidden="true">
      <path {...common} d="M4 5h16v14H4z" />
      <path {...common} d="M7 9l2 2-2 2" />
      <path {...common} d="M11 13h6" />
      <path {...common} d="M7 17h10" />
    </svg>
  );
}

export function IconUGC() {
  return (
    <svg viewBox="0 0 24 24" className={base} aria-hidden="true">
      <path {...common} d="M16 11a4 4 0 1 0-8 0" />
      <path {...common} d="M12 15c-4 0-7 2-8 6h16c-1-4-4-6-8-6Z" />
      <path {...common} d="M19 8h2M20 7v2" />
    </svg>
  );
}

export function IconCGI() {
  return (
    <svg viewBox="0 0 24 24" className={base} aria-hidden="true">
      <path {...common} d="M12 2 3.5 6.8v10.4L12 22l8.5-4.8V6.8L12 2Z" />
      <path {...common} d="M12 2v20" />
      <path {...common} d="M3.5 6.8 12 12l8.5-5.2" />
      <path {...common} d="M3.5 17.2 12 12l8.5 5.2" />
    </svg>
  );
}

export function IconAds() {
  return (
    <svg viewBox="0 0 24 24" className={base} aria-hidden="true">
      <path {...common} d="M4 11V8a3 3 0 0 1 3-3h4" />
      <path {...common} d="M16 5h1a3 3 0 0 1 3 3v3" />
      <path {...common} d="M20 13v3a3 3 0 0 1-3 3h-4" />
      <path {...common} d="M8 19H7a3 3 0 0 1-3-3v-3" />
      <path {...common} d="M8.5 12h7" />
      <path {...common} d="M11 9.5 8.5 12 11 14.5" />
      <path {...common} d="M13 9.5 15.5 12 13 14.5" />
    </svg>
  );
}
