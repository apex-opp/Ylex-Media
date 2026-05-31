"use client";

import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import usePrefersReducedMotion from "@/components/usePrefersReducedMotion";
import { clamp, cn, lerp } from "@/lib/utils";

/**
 * WireCard
 * - 3D tilt relative to cursor (lightweight, single RAF).
 * - SVG path "draw" animation on hover (icon only).
 * - Includes a small "tool screen" visual so the services don't look like text-only tiles.
 *
 * IMPORTANT: Titles/descriptions stay stable (no constant scrambling).
 * The micro-interactions are visual (tilt, strokes, highlights).
 */
export default function WireCard({
  title,
  description,
  icon,
  meta,
  imageSrc,
  imageAlt = "",
  toolLabel = "",
  className = "",
}) {
  const reduced = usePrefersReducedMotion();
  const rootRef = useRef(null);
  const tiltRef = useRef({ rx: 0, ry: 0, trx: 0, try: 0, raf: 0 });

  const Icon = useMemo(() => icon, [icon]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const svg = el.querySelector("[data-icon] svg");
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
    }

    const onEnter = () => {
      if (reduced) return;

      // Draw animation
      paths.forEach((p, i) => {
        const len = lengths[i];
        if (!len) return;
        gsap.to(p, {
          strokeDashoffset: 0,
          duration: 0.55,
          ease: "power2.out",
          overwrite: true,
        });
      });

      // Icon glow (subtle)
      gsap.to(svg, {
        filter: "drop-shadow(0 0 14px rgba(0,210,255,0.16))",
        duration: 0.2,
        overwrite: true,
      });
    };

    const onLeave = () => {
      paths.forEach((p, i) => {
        const len = lengths[i];
        if (!len) return;
        gsap.to(p, {
          strokeDashoffset: len,
          duration: 0.4,
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
      el.style.transform = `perspective(1000px) rotateX(${t.rx.toFixed(2)}deg) rotateY(${t.ry.toFixed(
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

      // rotate range (tight + premium)
      t.try = (px - 0.5) * 10;
      t.trx = (0.5 - py) * 9;

      // highlight anchor
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
      data-magnet="0.42"
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-blueprint-line/80 bg-blueprint-bg/70 p-6 shadow-wire backdrop-blur-[1px] will-transform",
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
            "radial-gradient(320px 320px at var(--hx) var(--hy), rgba(0,210,255,0.16), transparent 62%), radial-gradient(520px 520px at calc(var(--hx) + 10%) calc(var(--hy) + 8%), rgba(255,45,139,0.10), transparent 68%)",
        }}
      />

      <div className="relative flex items-start gap-4">
        <div
          data-icon
          className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-blueprint-line bg-blueprint-bg/80"
        >
          <Icon />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-pretty text-base font-semibold tracking-tight text-blueprint-ink md:text-[17px]">
              {title}
            </h3>
            {toolLabel ? (
              <span className="hidden rounded-lg border border-blueprint-line bg-blueprint-bg/80 px-2.5 py-1 font-mono text-[10px] tracking-[0.22em] text-blueprint-ink/55 sm:inline">
                {toolLabel}
              </span>
            ) : null}
          </div>

          <p className="mt-1 text-pretty text-sm leading-6 text-blueprint-ink/70">{description}</p>
        </div>
      </div>

      <div className="relative mt-5 grid gap-4 sm:grid-cols-[1fr_180px] sm:items-end">
        <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] tracking-[0.20em] text-blueprint-ink/55">
          {meta?.map((m) => (
            <span key={m} className="rounded-lg border border-blueprint-line bg-blueprint-bg/80 px-2.5 py-1">
              {m}
            </span>
          ))}
        </div>

        {/* Tool screen visual (no "generic corporate" stock photos) */}
        {imageSrc ? (
          <div className="relative overflow-hidden rounded-xl border border-blueprint-line bg-white/65 shadow-[0_0_0_1px_rgba(11,16,32,0.10),0_12px_30px_rgba(11,16,32,0.10)]">
            <div className="aspect-[16/10]">
              <img
                src={imageSrc}
                alt={imageAlt}
                className="h-full w-full object-cover opacity-[0.95] contrast-[1.02]"
                loading="lazy"
              />
            </div>

            {/* Blueprint corner ticks */}
            <div className="pointer-events-none absolute inset-0 opacity-85">
              <div className="absolute left-2 top-2 h-3 w-3 border-l border-t border-blueprint-line" />
              <div className="absolute right-2 top-2 h-3 w-3 border-r border-t border-blueprint-line" />
              <div className="absolute left-2 bottom-2 h-3 w-3 border-l border-b border-blueprint-line" />
              <div className="absolute right-2 bottom-2 h-3 w-3 border-r border-b border-blueprint-line" />
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-blueprint-neon/50 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
          </div>
        ) : null}
      </div>

      {/* Backing wireframe shadow (kept minimal in light theme) */}
      <div className="pointer-events-none absolute -right-14 -top-14 h-48 w-48 rotate-12 opacity-20">
        <svg viewBox="0 0 100 100" fill="none" className="h-full w-full">
          <path
            d="M10 25 L50 8 L90 25 L90 75 L50 92 L10 75 Z"
            stroke="rgba(11,16,32,0.18)"
            strokeWidth="1.5"
          />
          <path
            d="M10 25 L50 50 L90 25 M10 75 L50 50 L90 75"
            stroke="rgba(0,210,255,0.18)"
            strokeWidth="1.2"
          />
        </svg>
      </div>
    </article>
  );
}
