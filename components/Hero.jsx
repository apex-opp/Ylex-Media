"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import BlueprintButton from "@/components/BlueprintButton";
import TextScramble from "@/components/TextScramble";
import WireframeViewport from "@/components/WireframeViewport";

gsap.registerPlugin(useGSAP);

/**
 * Hero
 * "The Digital Blueprints" — bright paper, high-contrast ink, vibrant accents.
 *
 * Changes vs previous build:
 * - No massive always-scrambling headline (reads as unstable copy).
 * - Typography is modern: tighter tracking, less "terminal cosplay".
 */
export default function Hero() {
  const root = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("[data-hero='kicker']", { y: 10, opacity: 0, duration: 0.45 }, 0);
      tl.from("[data-hero='headline']", { y: 18, opacity: 0, duration: 0.7 }, 0.08);
      tl.from("[data-hero='sub']", { y: 14, opacity: 0, duration: 0.6 }, 0.18);
      tl.from("[data-hero='cta']", { y: 10, opacity: 0, duration: 0.5 }, 0.34);
      tl.from("[data-hero='panel']", { y: 22, opacity: 0, duration: 0.75 }, 0.14);
    },
    { scope: root }
  );

  return (
    <section ref={root} id="top" className="relative z-10 mx-auto max-w-7xl px-5 pb-10 pt-16 md:pb-16 md:pt-20">
      <header className="flex items-center justify-between gap-4 pb-10">
        <a
          href="#top"
          data-cursor="HOME"
          data-magnet="0.6"
          className="group inline-flex items-center gap-3 rounded-2xl border border-blueprint-line bg-blueprint-bg/75 px-4 py-3 shadow-wire"
        >
          <img src="/assets/ylex-logo.svg" alt="Ylex Media" className="h-7 w-7" />
          <div className="text-sm font-semibold tracking-tight text-blueprint-ink">
            Ylex <span className="text-blueprint-neon">Media</span>
          </div>
          <span className="ml-2 hidden rounded-lg border border-blueprint-line bg-blueprint-bg/80 px-2.5 py-1 font-mono text-[10px] tracking-[0.22em] text-blueprint-ink/55 md:inline">
            BUILD_2026
          </span>
        </a>

        <nav className="hidden items-center gap-2 md:flex">
          {[
            ["Services", "#services"],
            ["War-Room", "#war-room"],
            ["Contact", "#contact"],
          ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              data-cursor="OPEN"
              data-magnet="0.45"
              className="rounded-xl border border-transparent px-3 py-2 text-sm font-medium text-blueprint-ink/70 transition hover:border-blueprint-line hover:bg-blueprint-bg/70 hover:text-blueprint-ink"
            >
              {label}
            </a>
          ))}
        </nav>
      </header>

      <div className="grid gap-10 md:grid-cols-[1.05fr_0.95fr] md:items-start">
        <div className="relative">
          <div data-hero="kicker" className="kicker">
            SECTION_00 • DIGITAL BLUEPRINTS • RISK: MEDIUM
          </div>

          <h1
            data-hero="headline"
            className="mt-4 text-balance text-4xl font-semibold leading-[1.06] text-blueprint-ink md:text-6xl"
          >
            Ylex Media: We build digital assets for brands who hate looking boring.
          </h1>

          <p data-hero="sub" className="mt-5 max-w-xl text-pretty text-base text-blueprint-ink/70 md:text-lg leading-7">
            <span className="font-semibold text-blueprint-ink">
              Our rendering speeds are faster than your client’s attention span.
            </span>{" "}
            Built on pure caffeine and pixel-perfect obsession.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {["Premiere", "Photoshop", "After Effects", "Figma", "DaVinci"].map((t) => (
              <span
                key={t}
                className="rounded-full border border-blueprint-line bg-blueprint-bg/75 px-3 py-1 text-xs text-blueprint-ink/70"
              >
                {t}
              </span>
            ))}
          </div>

          <div data-hero="cta" className="mt-7 flex flex-wrap items-center gap-4">
            <BlueprintButton label="Deploy Chaos" sublabel="(professionally.)" href="#contact" />
            <a
              href="#services"
              data-cursor="VIEW"
              data-magnet="0.55"
              className="group inline-flex items-center gap-3 rounded-xl border border-blueprint-line bg-blueprint-bg/75 px-4 py-3 text-sm font-medium text-blueprint-ink/70 shadow-wire transition hover:text-blueprint-ink"
            >
              <span className="h-2 w-2 rounded-full bg-blueprint-neon/70 shadow-[0_0_14px_rgba(0,210,255,0.20)]" />
              <TextScramble text="Inspect Service Matrix" />
              <span className="opacity-50 group-hover:opacity-80">→</span>
            </a>
          </div>

          {/* Micro blueprint notes */}
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-blueprint-line bg-blueprint-bg/70 p-5 shadow-wire">
              <div className="kicker">CONSTRAINTS</div>
              <div className="mt-2 text-sm leading-6 text-blueprint-ink/70">
                No template vibes. No filler. If it doesn’t move with intent, it gets deleted.
              </div>
              <div className="mt-4 flex flex-wrap gap-2 font-mono text-[10px] tracking-[0.22em] text-blueprint-ink/55">
                <span className="rounded-lg border border-blueprint-line bg-blueprint-bg/80 px-2.5 py-1">60FPS</span>
                <span className="rounded-lg border border-blueprint-line bg-blueprint-bg/80 px-2.5 py-1">NO_CLUTTER</span>
                <span className="rounded-lg border border-blueprint-line bg-blueprint-bg/80 px-2.5 py-1">HIGH_SIGNAL</span>
              </div>
            </div>

            <div className="rounded-2xl border border-blueprint-line bg-blueprint-bg/70 p-5 shadow-wire">
              <div className="kicker">OUTPUT</div>
              <div className="mt-2 text-sm leading-6 text-blueprint-ink/70">
                Creative that holds attention, communicates value, and looks expensive because it actually is engineered.
              </div>
              <div className="mt-4 flex flex-wrap gap-2 font-mono text-[10px] tracking-[0.22em] text-blueprint-ink/55">
                <span className="rounded-lg border border-blueprint-line bg-blueprint-bg/80 px-2.5 py-1">ADS</span>
                <span className="rounded-lg border border-blueprint-line bg-blueprint-bg/80 px-2.5 py-1">EDITS</span>
                <span className="rounded-lg border border-blueprint-line bg-blueprint-bg/80 px-2.5 py-1">SYSTEMS</span>
              </div>
            </div>
          </div>
        </div>

        <div data-hero="panel" className="relative">
          <WireframeViewport />
        </div>
      </div>
    </section>
  );
}
