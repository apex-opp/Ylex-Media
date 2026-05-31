"use client";

import { useEffect, useRef } from "react";
import Scene from "@/components/Hero/Scene";
import MagneticButton from "@/components/ui/MagneticButton";
import { ensureGsap, gsap } from "@/lib/gsap";

export default function Hero() {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    ensureGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-hero-fade]",
        { opacity: 0, y: 14, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.0,
          ease: "power3.out",
          stagger: 0.08,
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const onCta = () => {
    ensureGsap();
    gsap.to(window, {
      duration: 1.1,
      ease: "power3.inOut",
      scrollTo: { y: "#services", offsetY: 20 },
    });
  };

  return (
    <section
      ref={rootRef}
      className="relative min-h-[100svh] overflow-hidden"
      id="top"
    >
      <div className="absolute inset-0 bg-aurora" />
      <div className="absolute inset-0 bg-grid opacity-[0.12]" />
      <div className="absolute inset-0">
        <Scene />
      </div>

      <div className="grain" />
      <div className="vignette" />

      {/* Floating Nav */}
      <div className="pointer-events-none absolute left-0 right-0 top-5 z-20">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl">
            <span className="h-2 w-2 rounded-full bg-neon-magenta shadow-glowMagenta" />
            <span className="font-display text-sm font-semibold tracking-tight text-white">
              Ylex Media
            </span>
          </div>

          <div className="pointer-events-auto hidden items-center gap-2 sm:flex">
            {[
              ["Services", "#services"],
              ["Talent", "#talent"],
              ["Contact", "#contact"],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="glass rounded-full border border-white/10 px-4 py-2 text-sm text-white/75 transition hover:text-white hover:border-white/20"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Copy Overlay */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl items-center px-4 py-24 sm:px-6">
        <div className="max-w-3xl">
          <p
            data-hero-fade
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 glass"
          >
            <span className="h-2 w-2 rounded-full bg-neon-cyan shadow-glowCyan" />
            <span className="uppercase tracking-[0.24em]">
              UGC • CGI • Creative Systems
            </span>
          </p>

          <h1
            data-hero-fade
            className="mt-6 text-balance font-display text-5xl font-extrabold leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            We don&apos;t just make content.{" "}
            <span className="text-gradient">We engineer attention.</span>
          </h1>

          <p
            data-hero-fade
            className="mt-6 max-w-2xl text-balance text-base leading-relaxed text-white/70 sm:text-lg"
          >
            Ylex Media delivers high-converting UGC, CGI, and visual assets for
            brands that refuse to be ignored.
          </p>

          <div data-hero-fade className="mt-10 flex flex-wrap items-center gap-4">
            <MagneticButton
              onClick={onCta}
              className="group border-gradient overflow-hidden bg-white/5 text-white shadow-glowCyan"
            >
              <span className="relative z-10">Enter the Creative Matrix</span>
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-neon-cyan/25 via-neon-violet/20 to-neon-magenta/25" />
                <span className="absolute -left-1/2 top-0 h-full w-1/2 animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </span>
            </MagneticButton>

            <a
              href="#services"
              className="glass rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-white/75 transition hover:text-white hover:border-white/20"
            >
              See the work (and the damage)
            </a>
          </div>

          <div data-hero-fade className="mt-12 grid max-w-xl grid-cols-3 gap-3">
            {[
              ["Retention", "dopamine-friendly edits"],
              ["Design", "brand systems that bite"],
              ["CGI", "physics? never heard of her"],
            ].map(([k, v]) => (
              <div
                key={k}
                className="glass edge-glow rounded-2xl border border-white/10 px-4 py-4"
              >
                <div className="font-display text-sm font-semibold text-white">
                  {k}
                </div>
                <div className="mt-1 text-xs leading-relaxed text-white/60">
                  {v}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom cue */}
      <div className="pointer-events-none absolute bottom-10 left-0 right-0 z-10">
        <div className="mx-auto flex max-w-6xl justify-center px-4 sm:px-6">
          <div className="glass flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs text-white/60">
            <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
            <span>Scroll. We made it feel expensive on purpose.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
