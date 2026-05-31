"use client";

import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import usePrefersReducedMotion from "@/components/usePrefersReducedMotion";
import { clamp, cn, lerp } from "@/lib/utils";
import TextScramble from "@/components/TextScramble";

/**
 * WireCard
 * - 3D tilt relative to cursor (lightweight, one RAF).
 * - SVG path "draw" animation on hover.
 */
export default function WireCard({
  title,
  description,
  icon,
  meta,
  className = "",
}) {
  const reduced = usePrefersReducedMotion();
  const rootRef = useRef(null);
  const tiltRef = useRef({ rx: 0, ry: 0, trx: 0, try: 0, raf: 0 });

  const Icon = useMemo(() => icon, [icon]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const svg = el.querySelector("svg");
    const paths = svg ? Array.from(svg.querySelectorAll("path")) : [];

    // Precompute stroke lengths so we can animate with dashoffset.
    const lengths = paths.map((p) => {
      try {
        return p.getTotalLength();
      } catch {
        return 0;
      }
    });

    for (let i = 0; i < paths.length; i++) {
      const p = paths[i];
      const len = lengths[i];
      if (!len) continue;
      p.style.strokeDasharray = String(len);
      p.style.strokeDashoffset = String(len);
      p.style.transition = "stroke-dashoffset 0.0s";
    }

    const onEnter = () => {
      if (reduced) return;

      // Draw animation
      paths.forEach((p, i) => {
        const len = lengths[i];
        if (!len) return;
        gsap.to(p, {
          strokeDashoffset: 0,
          duration: 0.65,
          ease: "power2.out",
          overwrite: true,
        });
      });

      // Neon breathe
      gsap.to(svg, {
        filter: "drop-shadow(0 0 14px rgba(106,228,255,0.18))",
        duration: 0.22,
        overwrite: true,
      });
    };

    const onLeave = () => {
      // Reset paths (keep it subtle; don't hard cut)
      paths.forEach((p, i) => {
        const len = lengths[i];
        if (!len) return;
        gsap.to(p, {
          strokeDashoffset: len,
          duration: 0.5,
          ease: "power2.out",
          overwrite: true,
        });
      });
      gsap.to(svg, { filter: "none", duration: 0.2, overwrite: true });
    };

    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);

    return () => {
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const t = tiltRef.current;

    const tick = () => {
      const ease = reduced ? 1 : 0.12;
      t.rx = lerp(t.rx, t.trx, ease);
      t.ry = lerp(t.ry, t.try, ease);
      el.style.transform = `perspective(900px) rotateX(${t.rx.toFixed(2)}deg) rotateY(${t.ry.toFixed(
        2
      )}deg) translateZ(0)`;
      t.raf = requestAnimationFrame(tick);
    };

    t.raf = requestAnimationFrame(tick);

    const onMove = (e) => {
      if (reduced) return;

      const r = el.getBoundingClientRect();
      const px = clamp((e.clientX - r.left) / r.width, 0, 1);
      const py = clamp((e.clientY - r.top) / r.height, 0, 1);

      // rotate range
      t.try = (px - 0.5) * 12; // Y rotation
      t.trx = (0.5 - py) * 10; // X rotation

      // CSS vars used for highlight
      el.style.setProperty("--hx", `${(px * 100).toFixed(2)}%`);
      el.style.setProperty("--hy", `${(py * 100).toFixed(2)}%`);
    };

    const onLeave = () => {
      t.trx = 0;
      t.try = 0;
    };

    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(t.raf);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced]);

  return (
    <article
      ref={rootRef}
      data-cursor="VIEW"
      data-magnet="0.45"
      className={cn(
        "group relative overflow-hidden rounded-xl border border-blueprint-line bg-blueprint-bg/45 p-5 shadow-wire backdrop-blur-sm will-transform",
        className
      )}
      style={{
        transformStyle: "preserve-3d",
        "--hx": "50%",
        "--hy": "30%",
      }}
    >
      {/* Moving highlight (radial, tied to pointer) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(280px 280px at var(--hx) var(--hy), rgba(106,228,255,0.18), transparent 62%)",
        }}
      />

      <div className="relative flex items-start gap-4">
        <div className="grid h-12 w-12 place-items-center rounded-lg border border-blueprint-line bg-blueprint-bg/40">
          <Icon />
        </div>
        <div className="min-w-0">
          <h3 className="text-balance font-mono text-sm tracking-[0.22em] text-blueprint-ink/90">
            <TextScramble text={title} />
          </h3>
          <p className="mt-2 text-pretty text-sm text-blueprint-ink/70">{description}</p>
        </div>
      </div>

      <div className="relative mt-5 flex flex-wrap items-center gap-2 font-mono text-[10px] tracking-[0.22em] text-blueprint-ink/50">
        {meta?.map((m) => (
          <span key={m} className="rounded border border-blueprint-line bg-blueprint-bg/40 px-2 py-1">
            {m}
          </span>
        ))}
      </div>

      {/* Backing wireframe shadow */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rotate-12 opacity-35">
        <svg viewBox="0 0 100 100" fill="none" className="h-full w-full">
          <path
            d="M10 25 L50 8 L90 25 L90 75 L50 92 L10 75 Z"
            stroke="rgba(214,228,255,0.12)"
            strokeWidth="1.5"
          />
          <path
            d="M10 25 L50 50 L90 25 M10 75 L50 50 L90 75"
            stroke="rgba(106,228,255,0.14)"
            strokeWidth="1.2"
          />
        </svg>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-blueprint-neon/35 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
    </article>
  );
}
