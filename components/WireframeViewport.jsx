"use client";

import { useEffect, useMemo, useRef } from "react";
import { deformVerts, drawWireframe, makeIcosahedron } from "@/lib/geometry";
import usePrefersReducedMotion from "@/components/usePrefersReducedMotion";
import { clamp, lerp } from "@/lib/utils";

/**
 * WireframeViewport
 * A CAD-like canvas panel with a draggable, pseudo-3D wireframe object.
 *
 * Notes:
 * - Uses Canvas 2D with simple projection for zero dependencies.
 * - Uses requestAnimationFrame; stops cleanly on unmount.
 * - Pointer-drag rotates the object; click "glitches" (deforms) it.
 */
export default function WireframeViewport({ className = "" }) {
  const reduced = usePrefersReducedMotion();
  const canvasRef = useRef(null);
  const stateRef = useRef(null);

  const mesh = useMemo(() => makeIcosahedron(1), []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let raf = 0;
    let w = 1;
    let h = 1;
    let dpr = 1;

    const st = (stateRef.current = {
      ax: 0.7,
      ay: 0.2,
      az: 0.0,
      vx: 0.0,
      vy: 0.0,
      dragging: false,
      lx: 0,
      ly: 0,
      mesh: { ...mesh, verts: mesh.verts.map((v) => [...v]) },
      mx: 0.5,
      my: 0.5,
      tmx: 0.5,
      tmy: 0.5,
    });

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      w = Math.max(1, Math.floor(rect.width));
      h = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const clear = () => {
      // gentle trail: blueprint glass
      ctx.fillStyle = "rgba(247,251,255,0.55)";
      ctx.fillRect(0, 0, w, h);
    };

    const drawFrame = (t) => {
      clear();

      // subtle pointer parallax inside viewport
      const ease = reduced ? 1 : 0.08;
      st.mx = lerp(st.mx, st.tmx, ease);
      st.my = lerp(st.my, st.tmy, ease);

      // base rotation + drag velocity
      const drift = reduced ? 0 : 0.0016;
      st.ax += st.vy + drift;
      st.ay += st.vx + drift * 1.25;

      // friction
      st.vx *= reduced ? 0.0 : 0.93;
      st.vy *= reduced ? 0.0 : 0.93;

      // tiny "breathing" wobble: very subtle
      st.az = Math.sin(t * 0.001) * (reduced ? 0 : 0.15);

      const stroke = "rgba(11,16,32,0.52)";
      const glow = "rgba(0,210,255,0.16)";

      drawWireframe(ctx, st.mesh, {
        w,
        h,
        ax: st.ax + (st.my - 0.5) * 0.3,
        ay: st.ay + (st.mx - 0.5) * 0.3,
        az: st.az,
        stroke,
        glow,
        dot: "rgba(0,210,255,0.42)",
        lineWidth: 1.2,
        scale: 0.88,
      });

      // viewport HUD (coordinates + corner marks)
      ctx.save();
      ctx.globalAlpha = 0.9;
      ctx.strokeStyle = "rgba(11,16,32,0.14)";
      ctx.lineWidth = 1;

      // corner brackets
      const pad = 14;
      const len = 16;
      ctx.beginPath();
      // TL
      ctx.moveTo(pad, pad + len);
      ctx.lineTo(pad, pad);
      ctx.lineTo(pad + len, pad);
      // TR
      ctx.moveTo(w - pad - len, pad);
      ctx.lineTo(w - pad, pad);
      ctx.lineTo(w - pad, pad + len);
      // BL
      ctx.moveTo(pad, h - pad - len);
      ctx.lineTo(pad, h - pad);
      ctx.lineTo(pad + len, h - pad);
      // BR
      ctx.moveTo(w - pad - len, h - pad);
      ctx.lineTo(w - pad, h - pad);
      ctx.lineTo(w - pad, h - pad - len);
      ctx.stroke();

      // coordinates text
      ctx.fillStyle = "rgba(11,16,32,0.52)";
      ctx.font = "11px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace";
      const cx = ((st.mx - 0.5) * 2).toFixed(2);
      const cy = ((st.my - 0.5) * 2).toFixed(2);
      ctx.fillText(`ORBIT_X: ${cx}`, 16, h - 18);
      ctx.fillText(`ORBIT_Y: ${cy}`, 16, h - 4);

      // scan tick marks
      ctx.globalAlpha = 0.35;
      ctx.beginPath();
      for (let i = 0; i <= 12; i++) {
        const x = (w / 12) * i;
        const y = (h / 12) * i;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, i % 3 === 0 ? 10 : 6);
        ctx.moveTo(0, y);
        ctx.lineTo(i % 3 === 0 ? 10 : 6, y);
      }
      ctx.stroke();

      ctx.restore();

      raf = requestAnimationFrame(drawFrame);
    };

    const onPointerDown = (e) => {
      st.dragging = true;
      st.lx = e.clientX;
      st.ly = e.clientY;
      canvas.setPointerCapture?.(e.pointerId);
    };

    const onPointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const nx = clamp((e.clientX - rect.left) / rect.width, 0, 1);
      const ny = clamp((e.clientY - rect.top) / rect.height, 0, 1);
      st.tmx = nx;
      st.tmy = ny;

      if (!st.dragging || reduced) return;

      const dx = e.clientX - st.lx;
      const dy = e.clientY - st.ly;
      st.lx = e.clientX;
      st.ly = e.clientY;

      // velocity: scaled by viewport size for consistency
      const s = 1 / Math.max(320, Math.min(rect.width, rect.height));
      st.vx += dx * s * 0.9;
      st.vy += dy * s * 0.9;
    };

    const onPointerUp = (e) => {
      st.dragging = false;
      canvas.releasePointerCapture?.(e.pointerId);
    };

    const onClick = () => {
      st.mesh.verts = deformVerts(mesh.verts, reduced ? 0.04 : 0.14);
    };

    const onDoubleClick = () => {
      // reset to clean blueprint
      st.mesh.verts = mesh.verts.map((v) => [...v]);
      st.vx = 0;
      st.vy = 0;
    };

    resize();
    ctx.fillStyle = "rgba(247,251,255,1)";
    ctx.fillRect(0, 0, w, h);
    raf = requestAnimationFrame(drawFrame);

    window.addEventListener("resize", resize, { passive: true });
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove, { passive: true });
    canvas.addEventListener("pointerup", onPointerUp, { passive: true });
    canvas.addEventListener("pointercancel", onPointerUp, { passive: true });
    canvas.addEventListener("click", onClick);
    canvas.addEventListener("dblclick", onDoubleClick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
      canvas.removeEventListener("click", onClick);
      canvas.removeEventListener("dblclick", onDoubleClick);
    };
  }, [mesh, reduced]);

  return (
    <div className={className}>
      <div className="relative overflow-hidden rounded-2xl border border-blueprint-line bg-blueprint-bg/80 shadow-wire">
        <div className="absolute inset-0 bg-grid-faint-24 opacity-60" />
        <canvas
          ref={canvasRef}
          className="relative block h-[340px] w-full md:h-[420px]"
          data-cursor="DRAG"
          data-magnet="0.2"
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-blueprint-neon/55 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-blueprint-warn/35 to-transparent" />
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] tracking-[0.22em] text-blueprint-ink/55">
        <span>TIP: DRAG TO ORBIT • CLICK TO DEFORM • DOUBLE-CLICK TO RESET</span>
        <span className="opacity-70">RENDER_PIPELINE: CAFFEINE</span>
      </div>
    </div>
  );
}
