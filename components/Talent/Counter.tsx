"use client";

import { useEffect, useRef, useState } from "react";
import { ensureGsap, gsap, ScrollTrigger } from "@/lib/gsap";

type Props = {
  value: number;
  suffix?: string;
  decimals?: number;
  className?: string;
};

export default function Counter({ value, suffix = "", decimals = 0, className }: Props) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    ensureGsap();

    const prefersReduce =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

    if (prefersReduce) {
      setDisplay(value);
      return;
    }

    const obj = { n: 0 };

    const ctx = gsap.context(() => {
      gsap.to(obj, {
        n: value,
        duration: 1.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
        onUpdate: () => {
          setDisplay(Number(obj.n.toFixed(decimals)));
        },
      });
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill(true);
      });
    };
  }, [value, decimals]);

  return (
    <span ref={ref} className={className}>
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}
