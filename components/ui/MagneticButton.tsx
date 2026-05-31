"use client";

import { useEffect, useRef } from "react";
import { cn, clamp, lerp } from "@/lib/utils";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  strength?: number;
};

export default function MagneticButton({
  strength = 0.28,
  className,
  children,
  ...props
}: Props) {
  const ref = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduce =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    if (prefersReduce) return;

    let tx = 0,
      ty = 0;
    let mx = 0,
      my = 0;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      mx = clamp(x / (r.width / 2), -1, 1);
      my = clamp(y / (r.height / 2), -1, 1);
    };

    const onEnter = () => {
      el.style.transition = "transform 80ms linear";
    };

    const onLeave = () => {
      mx = 0;
      my = 0;
      el.style.transition = "transform 280ms cubic-bezier(.22,1,.36,1)";
      el.style.transform = "translate3d(0,0,0)";
    };

    const tick = () => {
      tx = lerp(tx, mx, strength);
      ty = lerp(ty, my, strength);
      el.style.transform = `translate3d(${tx * 10}px, ${ty * 10}px, 0)`;
      raf = window.requestAnimationFrame(tick);
    };

    raf = window.requestAnimationFrame(tick);

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);

    return () => {
      window.cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
      el.style.transition = "";
      el.style.transform = "";
    };
  }, [strength]);

  return (
    <button
      ref={ref}
      className={cn(
        "relative inline-flex items-center justify-center rounded-full px-6 py-3 font-semibold tracking-tight outline-none",
        "glass border border-stroke/70 shadow-[0_20px_60px_rgba(0,0,0,0.35)]",
        "hover:border-white/20 focus-visible:ring-2 focus-visible:ring-[var(--ring)]",
        className
      )}
      {...props}
    >
      <span className="relative z-[2]">{children}</span>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
    </button>
  );
}
