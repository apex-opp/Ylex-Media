"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import SectionHeading from "@/components/ui/SectionHeading";
import { services } from "@/components/Services/serviceData";
import { cn } from "@/lib/utils";
import { ensureGsap, Flip, gsap } from "@/lib/gsap";

export default function ServicesMatrix() {
  const wrapRef = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState<number | null>(null);

  useLayoutEffect(() => {
    ensureGsap();
    const ctx = gsap.context(() => {}, wrapRef);
    return () => ctx.revert();
  }, []);

  const animateFlip = (next: number | null) => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    ensureGsap();

    const cards = wrap.querySelectorAll<HTMLElement>("[data-service-card]");
    const state = Flip.getState(cards, { props: "borderRadius,backgroundColor" });

    flushSync(() => setActive(next));

    Flip.from(state, {
      duration: 0.8,
      ease: "power3.inOut",
      absolute: true,
      stagger: 0.01,
      onEnter: (els) => gsap.fromTo(els, { opacity: 0.5 }, { opacity: 1, duration: 0.35 }),
      onLeave: (els) => gsap.to(els, { opacity: 0.65, duration: 0.25 }),
    });
  };

  return (
    <section
      ref={wrapRef}
      id="services"
      className="relative z-10 mx-auto max-w-6xl px-4 pb-24 pt-20 sm:px-6"
    >
      <div className="absolute inset-x-0 -top-20 -z-10 mx-auto h-[520px] w-full max-w-6xl bg-aurora opacity-[0.55] blur-2xl" />

      <SectionHeading
        kicker="Service Matrix"
        title="A menu of things your competitors will screenshot."
        subtitle="Hover to expand. If it feels addictive, that’s not an accident."
      />

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[220px]">
        {services.map((s, i) => {
          const isActive = active === i;
          const dimOthers = active !== null && !isActive;

          return (
            <article
              key={s.title}
              data-service-card
              onMouseEnter={() => animateFlip(i)}
              onMouseLeave={() => animateFlip(null)}
              className={cn(
                "group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 glass edge-glow",
                "transition-colors duration-300",
                "lg:col-span-1 lg:row-span-1",
                isActive && "lg:col-span-2 lg:row-span-2",
                dimOthers && "opacity-70",
              )}
            >
              {/* Video backdrop */}
              <div className="absolute inset-0">
                <video
                  className={cn(
                    "h-full w-full object-cover opacity-0 transition-opacity duration-500",
                    (isActive || active === null) && "group-hover:opacity-60",
                    isActive && "opacity-70"
                  )}
                  src={s.video}
                  muted
                  playsInline
                  loop
                  autoPlay
                  preload="metadata"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/35 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/10 via-transparent to-neon-magenta/10 opacity-70" />
              </div>

              <div className="relative z-10 flex h-full flex-col p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/65">
                      <span className="h-1.5 w-1.5 rounded-full bg-neon-lime/80" />
                      <span className="uppercase tracking-[0.22em]">{s.highlight}</span>
                    </div>
                    <h3 className="mt-3 font-display text-xl font-bold tracking-tight text-white">
                      {s.title}
                    </h3>
                  </div>
                  <div
                    className={cn(
                      "mt-1 flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/70",
                      isActive && "border-white/20 bg-white/10"
                    )}
                    aria-hidden
                  >
                    <span className="text-lg leading-none">↗</span>
                  </div>
                </div>

                <p
                  className={cn(
                    "mt-4 text-sm leading-relaxed text-white/70",
                    isActive ? "max-w-[52ch]" : "line-clamp-3"
                  )}
                >
                  {s.description}
                </p>

                <div className="mt-auto pt-6">
                  <div
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60",
                      "opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    )}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-neon-cyan shadow-glowCyan" />
                    <span>
                      {isActive
                        ? "This one scales nicely with budgets and ambition."
                        : "Hover = expand. Click = brag later."}
                    </span>
                  </div>
                </div>
              </div>

              {/* Subtle top highlight */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/10 to-transparent opacity-60"
              />

              {/* Outline glow on hover */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-transparent transition duration-300 group-hover:ring-white/15"
              />
            </article>
          );
        })}
      </div>
    </section>
  );
}
