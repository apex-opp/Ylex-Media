"use client";

import { useEffect, useMemo, useRef } from "react";
import { ensureGsap, ScrollTrigger } from "@/lib/gsap";
import { lerp } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
};

export default function SmoothScroll({ children }: Props) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const config = useMemo(() => {
    return {
      ease: 0.10,
      disableOnTouch: true,
    };
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    if (!wrapper || !content) return;

    ensureGsap();

    const prefersReduce =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

    const enabled = !prefersReduce && !(config.disableOnTouch && isTouch);

    if (!enabled) {
      // Default browser scroll. Still set ScrollTrigger defaults to window.
      ScrollTrigger.refresh();
      return;
    }

    // Style wrapper for transform-based scrolling
    wrapper.style.position = "fixed";
    wrapper.style.inset = "0";
    wrapper.style.overflow = "hidden";
    wrapper.style.willChange = "transform";

    let current = window.scrollY;
    let target = window.scrollY;
    let raf = 0;

    const setBodyHeight = () => {
      const rect = content.getBoundingClientRect();
      document.body.style.height = `${Math.ceil(rect.height)}px`;
    };

    setBodyHeight();

    ScrollTrigger.defaults({ scroller: wrapper });

    ScrollTrigger.scrollerProxy(wrapper, {
      scrollTop(value) {
        if (typeof value === "number") window.scrollTo(0, value);
        return target;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: "transform",
    });

    const onResize = () => {
      setBodyHeight();
      ScrollTrigger.refresh();
    };

    const tick = () => {
      target = window.scrollY;
      current = lerp(current, target, config.ease);
      // snap tiny deltas
      if (Math.abs(target - current) < 0.1) current = target;

      content.style.transform = `translate3d(0, ${-current}px, 0)`;

      ScrollTrigger.update();
      raf = window.requestAnimationFrame(tick);
    };

    raf = window.requestAnimationFrame(tick);
    window.addEventListener("resize", onResize);

    const refreshHandler = () => setBodyHeight();
    ScrollTrigger.addEventListener("refreshInit", refreshHandler);
    ScrollTrigger.refresh();

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      ScrollTrigger.removeEventListener("refreshInit", refreshHandler);
      document.body.style.height = "";

      wrapper.style.position = "";
      wrapper.style.inset = "";
      wrapper.style.overflow = "";
      wrapper.style.willChange = "";
      content.style.transform = "";

      // Avoid nuking other triggers: only kill ones using this scroller.
      ScrollTrigger.getAll().forEach((t) => {
        if ((t as any).scroller === wrapper) t.kill(true);
      });

      ScrollTrigger.defaults({ scroller: window });
      ScrollTrigger.refresh();
    };
  }, [config]);

  return (
    <div ref={wrapperRef} id="smooth-wrapper">
      <div ref={contentRef} id="smooth-content">
        {children}
      </div>
    </div>
  );
}
