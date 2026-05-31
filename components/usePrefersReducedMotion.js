"use client";

import { useEffect, useState } from "react";

/**
 * usePrefersReducedMotion()
 * Single, stable check for motion-reduction to keep GSAP/RAF work respectful.
 */
export default function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;

    const onChange = () => setReduced(Boolean(mq.matches));
    onChange();

    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  return reduced;
}
