"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import usePrefersReducedMotion from "@/components/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

/**
 * SchematicPath
 * A page-spanning SVG "technical routing" line that draws on scroll,
 * guiding the eye through sections.
 */
export default function SchematicPath() {
  const reduced = usePrefersReducedMotion();
  const pathRef = useRef(null);
  const dotsRef = useRef(null);

  useEffect(() => {
    if (reduced) return;

    const path = pathRef.current;
    if (!path) return;

    const length = path.getTotalLength();
    path.style.strokeDasharray = String(length);
    path.style.strokeDashoffset = String(length);

    const dots = dotsRef.current ? Array.from(dotsRef.current.querySelectorAll("circle")) : [];

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
      },
    });

    tl.to(path, { strokeDashoffset: 0, ease: "none" }, 0);

    // Dots pulse in as the path approaches them (cheap illusion: fade-in stagger).
    tl.to(
      dots,
      {
        opacity: 1,
        stagger: 0.08,
        ease: "none",
      },
      0.06
    );

    return () => {
      tl.scrollTrigger?.kill?.();
      tl.kill();
    };
  }, [reduced]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[5] opacity-60">
      <svg
        viewBox="0 0 1000 2000"
        preserveAspectRatio="none"
        className="h-full w-full"
        aria-hidden="true"
      >
        {/* The routing line is intentionally not straight: "architectural wiring" vibe */}
        <path
          ref={pathRef}
          d="M120 60 H420 l70 70 V520 l220 110 V860 l-200 90 V1210 l300 140 V1620 l-260 140 H900"
          fill="none"
          stroke="rgba(11,16,32,0.16)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <g ref={dotsRef} opacity="0">
          <circle cx="420" cy="60" r="6" fill="rgba(0,210,255,0.32)" />
          <circle cx="560" cy="130" r="6" fill="rgba(0,210,255,0.26)" />
          <circle cx="560" cy="520" r="6" fill="rgba(255,45,139,0.26)" />
          <circle cx="780" cy="630" r="6" fill="rgba(0,210,255,0.24)" />
          <circle cx="580" cy="950" r="6" fill="rgba(124,255,0,0.18)" />
          <circle cx="580" cy="1210" r="6" fill="rgba(0,210,255,0.24)" />
          <circle cx="880" cy="1350" r="6" fill="rgba(255,45,139,0.22)" />
          <circle cx="620" cy="1760" r="6" fill="rgba(0,210,255,0.28)" />
        </g>

        {/* Micro measurement labels */}
        <g
          fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace"
          fontSize="14"
          fill="rgba(11,16,32,0.32)"
          letterSpacing="0.22em"
        >
          <text x="120" y="42">0,0</text>
          <text x="560" y="498">SERVICES</text>
          <text x="560" y="1190">WAR_ROOM</text>
          <text x="900" y="1980">CONTACT</text>
        </g>
      </svg>
    </div>
  );
}
