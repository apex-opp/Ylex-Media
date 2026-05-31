"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { clamp, lerp } from "@/lib/utils";
import usePrefersReducedMotion from "@/components/usePrefersReducedMotion";

/**
 * CustomCursor
 * Wireframe crosshair cursor that:
 * - Smoothly follows the pointer (GSAP quickTo).
 * - Snaps/magnets to interactive elements (only active on fine pointers).
 * - Shows contextual text: VIEW / DRAG / OPEN / etc.
 *
 * Implementation notes:
 * - Avoids layout thrash: we only read hovered element bounds on enter + per-frame while hovered.
 * - Cleans up every listener.
 */
export default function CustomCursor() {
  const reduced = usePrefersReducedMotion();
  const rootRef = useRef(null);
  const labelRef = useRef(null);
  const ringRef = useRef(null);

  const stateRef = useRef({
    visible: false,
    x: 0,
    y: 0,
    tx: 0,
    ty: 0,
    hoveredEl: null,
    hoveredRect: null,
    label: "",
    magnet: 0,
    raf: 0,
    fine: false,
  });

  const [, force] = useState(0);

  useEffect(() => {
    const st = stateRef.current;

    const mq = window.matchMedia?.("(pointer: fine)");
    st.fine = Boolean(mq?.matches);
    const onMQ = () => {
      st.fine = Boolean(mq?.matches);
      // re-render so we can hide on coarse pointers without extra DOM work
      force((n) => n + 1);
    };
    mq?.addEventListener?.("change", onMQ);

    return () => mq?.removeEventListener?.("change", onMQ);
  }, []);

  useEffect(() => {
    const st = stateRef.current;
    if (!st.fine) return;

    const root = rootRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!root || !ring || !label) return;

    // quickTo is effectively a tiny spring; it keeps UI feeling premium without physics libs.
    const qx = gsap.quickTo(root, "x", {
      duration: reduced ? 0 : 0.22,
      ease: "power3.out",
    });
    const qy = gsap.quickTo(root, "y", {
      duration: reduced ? 0 : 0.22,
      ease: "power3.out",
    });

    const onMove = (e) => {
      st.visible = true;
      st.tx = e.clientX;
      st.ty = e.clientY;
    };

    const onLeave = () => {
      st.visible = false;
      st.hoveredEl = null;
      st.hoveredRect = null;
      st.label = "";
      gsap.to(root, { opacity: 0, duration: 0.18, overwrite: true });
    };

    const setHover = (el) => {
      st.hoveredEl = el;
      st.hoveredRect = el?.getBoundingClientRect?.() ?? null;
      st.label = (el?.getAttribute?.("data-cursor") ?? "").trim();
      st.magnet = Number(el?.getAttribute?.("data-magnet") ?? "0.55");
      label.textContent = st.label || "";
    };

    const onOver = (e) => {
      const target = e.target?.closest?.("[data-cursor], a, button, [role='button'], input, textarea, select");
      if (!target) return;
      setHover(target);

      gsap.to(ring, {
        scale: 1.35,
        opacity: 1,
        duration: 0.22,
        ease: "power3.out",
        overwrite: true,
      });
      gsap.to(label, { opacity: st.label ? 1 : 0, duration: 0.18, overwrite: true });
    };

    const onOut = (e) => {
      const leaving = e.target?.closest?.("[data-cursor], a, button, [role='button'], input, textarea, select");
      if (!leaving) return;

      // if we moved to another interactive, onOver will set it — don't reset here.
      const next = e.relatedTarget?.closest?.("[data-cursor], a, button, [role='button'], input, textarea, select");
      if (next) return;

      setHover(null);
      gsap.to(ring, { scale: 1, opacity: 0.9, duration: 0.22, overwrite: true });
      gsap.to(label, { opacity: 0, duration: 0.18, overwrite: true });
    };

    // Magnetic behavior: only if hovered element is present and has data-magnet > 0.
    const tick = () => {
      if (!st.visible) {
        st.raf = requestAnimationFrame(tick);
        return;
      }

      let x = st.tx;
      let y = st.ty;

      if (st.hoveredEl && st.hoveredRect && st.magnet > 0) {
        const r = st.hoveredRect;
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;

        // Distance-based pull
        const dx = cx - st.tx;
        const dy = cy - st.ty;
        const dist = Math.hypot(dx, dy);
        const radius = Math.max(70, Math.min(160, r.width * 0.8));

        const pull = clamp(1 - dist / radius, 0, 1) * st.magnet;
        x = lerp(st.tx, cx, pull);
        y = lerp(st.ty, cy, pull);

        // Tiny element drift to make it feel magnetic.
        // Keep it subtle to avoid layout instability.
        const ex = clamp(-dx * 0.08 * pull, -10, 10);
        const ey = clamp(-dy * 0.08 * pull, -10, 10);
        st.hoveredEl.style.transform = `translate3d(${ex}px, ${ey}px, 0)`;

        // Fresh rect only occasionally (resize/layout/scroll can change it)
        // Reading it every frame is still okay for ONE element, but we do it every ~10 frames.
        st.frame = (st.frame ?? 0) + 1;
        if (st.frame % 10 === 0) st.hoveredRect = st.hoveredEl.getBoundingClientRect();
      } else if (st.hoveredEl) {
        st.hoveredEl.style.transform = "";
      }

      qx(x);
      qy(y);

      // Visibility
      gsap.to(root, { opacity: 1, duration: 0.12, overwrite: true });

      st.raf = requestAnimationFrame(tick);
    };

    st.raf = requestAnimationFrame(tick);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave, { passive: true });
    document.addEventListener("pointerover", onOver, true);
    document.addEventListener("pointerout", onOut, true);

    return () => {
      cancelAnimationFrame(st.raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerover", onOver, true);
      document.removeEventListener("pointerout", onOut, true);
      if (st.hoveredEl) st.hoveredEl.style.transform = "";
    };
  }, [reduced]);

  // Coarse pointers: do nothing (keeps mobile fast).
  if (!stateRef.current.fine) return null;

  return (
    <div
      ref={rootRef}
      className="pointer-events-none fixed left-0 top-0 z-[60] -translate-x-1/2 -translate-y-1/2 opacity-0 will-transform"
      aria-hidden="true"
    >
      <div
        ref={ringRef}
        className="relative grid place-items-center rounded-full border border-blueprint-line bg-blueprint-bg/30 shadow-wire backdrop-blur-[2px] will-transform"
        style={{ width: 42, height: 42 }}
      >
        {/* Crosshair */}
        <div className="absolute left-1/2 top-1/2 h-[1px] w-[30px] -translate-x-1/2 -translate-y-1/2 bg-blueprint-faint" />
        <div className="absolute left-1/2 top-1/2 h-[30px] w-[1px] -translate-x-1/2 -translate-y-1/2 bg-blueprint-faint" />

        {/* Target dot */}
        <div className="h-[6px] w-[6px] rounded-full border border-blueprint-neon/70 shadow-[0_0_12px_rgba(106,228,255,0.22)]" />

        {/* Label */}
        <div
          ref={labelRef}
          className="absolute left-1/2 top-[52px] -translate-x-1/2 whitespace-nowrap rounded border border-blueprint-line bg-blueprint-bg/70 px-2 py-1 font-mono text-[10px] tracking-[0.22em] text-blueprint-ink/80 opacity-0"
        >
          VIEW
        </div>
      </div>
    </div>
  );
}
