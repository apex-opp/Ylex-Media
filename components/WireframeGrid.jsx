"use client";

import { useEffect, useRef } from "react";
import usePrefersReducedMotion from "@/components/usePrefersReducedMotion";
import { clamp, lerp } from "@/lib/utils";

/**
 * WireframeGrid
 * - Fixed, pointer-transparent blueprint background.
 * - Cheap SVG grid backgrounds + one canvas layer for subtle motion.
 * - CSS radial mask follows pointer (via CSS vars set on :root).
 */
export default function WireframeGrid() {
  const reduced = usePrefersReducedMotion();
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let raf = 0;
    let w = 1;
    let h = 1;
    let dpr = 1;

    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      w = Math.max(1, Math.floor(rect.width));
      h = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMove = (e) => {
      const x = clamp(e.clientX / window.innerWidth, 0, 1);
      const y = clamp(e.clientY / window.innerHeight, 0, 1);
      mouse.tx = x;
      mouse.ty = y;

      // CSS vars (used by .blueprint-light-mask)
      document.documentElement.style.setProperty("--mx", `${(x * 100).toFixed(2)}%`);
      document.documentElement.style.setProperty("--my", `${(y * 100).toFixed(2)}%`);
    };

    const draw = (t) => {
      // Smooth mouse
      const ease = reduced ? 1 : 0.10;
      mouse.x = lerp(mouse.x, mouse.tx, ease);
      mouse.y = lerp(mouse.y, mouse.ty, ease);

      ctx.clearRect(0, 0, w, h);

      // Canvas grid "wires" with microscopic parallax warp.
      const time = t * 0.001;
      const px = (mouse.x - 0.5) * 18;
      const py = (mouse.y - 0.5) * 18;

      const major = 96;
      const minor = 24;

      // Minor grid
      ctx.save();
      ctx.globalAlpha = 0.28;
      ctx.strokeStyle = "rgba(11,16,32,0.045)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x <= w; x += minor) {
        const off = Math.sin(time + x * 0.02) * 0.6 * (reduced ? 0 : 1) + px * 0.08;
        ctx.moveTo(x + off, 0);
        ctx.lineTo(x - off, h);
      }
      for (let y = 0; y <= h; y += minor) {
        const off = Math.cos(time + y * 0.02) * 0.6 * (reduced ? 0 : 1) + py * 0.08;
        ctx.moveTo(0, y + off);
        ctx.lineTo(w, y - off);
      }
      ctx.stroke();

      // Major grid
      ctx.globalAlpha = 0.55;
      ctx.strokeStyle = "rgba(11,16,32,0.075)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x <= w; x += major) {
        const off = Math.sin(time * 0.8 + x * 0.01) * 1.25 * (reduced ? 0 : 1) + px * 0.12;
        ctx.moveTo(x + off, 0);
        ctx.lineTo(x - off, h);
      }
      for (let y = 0; y <= h; y += major) {
        const off = Math.cos(time * 0.8 + y * 0.01) * 1.25 * (reduced ? 0 : 1) + py * 0.12;
        ctx.moveTo(0, y + off);
        ctx.lineTo(w, y - off);
      }
      ctx.stroke();

      // Coordinate dots (CAD vibe).
      ctx.globalAlpha = 0.65;
      ctx.fillStyle = "rgba(0,210,255,0.14)";
      const dotStep = 96;
      for (let x = 0; x <= w; x += dotStep) {
        for (let y = 0; y <= h; y += dotStep) {
          const dx = x - mouse.x * w;
          const dy = y - mouse.y * h;
          const d = Math.hypot(dx, dy);
          const a = clamp(1 - d / 360, 0, 1);
          if (a <= 0.02) continue;
          ctx.globalAlpha = 0.05 + a * 0.22;
          ctx.beginPath();
          ctx.arc(x, y, 1.15 + a * 1.25, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.restore();

      raf = requestAnimationFrame(draw);
    };

    resize();
    raf = requestAnimationFrame(draw);

    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", onMove, { passive: true });

    // Initialize light mask position for immediate polish.
    document.documentElement.style.setProperty("--mx", "50%");
    document.documentElement.style.setProperty("--my", "36%");

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, [reduced]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      {/* Base grid as cheap CSS image */}
      <div className="absolute inset-0 bg-grid-faint-24 opacity-70" />
      <div className="absolute inset-0 bg-grid-64 opacity-45" />

      {/* Animated canvas wires */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* Light mask + ambience */}
      <div className="blueprint-light-mask" />
      <div className="noise" />
      <div className="scanline" />
    </div>
  );
}
