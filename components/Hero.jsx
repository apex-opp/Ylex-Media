"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import TextScramble from "@/components/TextScramble";
import BlueprintButton from "@/components/BlueprintButton";
import WireframeViewport from "@/components/WireframeViewport";

gsap.registerPlugin(useGSAP);

/**
 * Hero
 * "The Digital Blueprints" — two-column blueprint viewport.
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
    <section
      ref={root}
      id="top"
      className="relative z-10 mx-auto max-w-7xl px-5 pb-14 pt-20 md:pb-20 md:pt-24"
    >
      <header className="flex items-center justify-between gap-4 pb-10">
        <a
          href="#top"
          data-cursor="HOME"
          data-magnet="0.6"
          className="group inline-flex items-center gap-3 rounded border border-blueprint-line bg-blueprint-bg/40 px-3 py-2 shadow-wire backdrop-blur-sm"
        >
          <img src="/assets/ylex-logo.svg" alt="Ylex Media" className="h-6 w-6 opacity-90" />
          <div className="font-mono text-xs tracking-[0.24em] text-blueprint-ink/75">
            YLEX<span className="text-blueprint-neon/80">_</span>MEDIA
          </div>
          <span className="ml-2 hidden rounded border border-blueprint-line px-2 py-1 font-mono text-[10px] tracking-[0.22em] text-blueprint-ink/55 md:inline">
            BUILD v1.0
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
              className="rounded border border-transparent px-3 py-2 font-mono text-xs tracking-[0.22em] text-blueprint-ink/60 transition hover:border-blueprint-line hover:bg-blueprint-bg/40 hover:text-blueprint-ink/90"
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
            className="mt-4 text-balance text-4xl font-semibold leading-[1.08] text-blueprint-ink md:text-6xl"
          >
            <TextScramble
              as="span"
              text="Ylex Media: We build digital assets for brands who hate looking boring."
              className="inline"
            />
          </h1>

          <p data-hero="sub" className="mt-5 max-w-xl text-pretty text-base text-blueprint-ink/70 md:text-lg">
            <span className="font-semibold text-blueprint-ink/85">
              Our rendering speeds are faster than your client’s attention span.
            </span>{" "}
            Built on pure caffeine and pixel-perfect obsession.
          </p>

          <div data-hero="cta" className="mt-7 flex flex-wrap items-center gap-4">
            <BlueprintButton
              label="Trigger Server Meltdown"
              sublabel="(metaphorically. mostly.)"
              href="#contact"
              className=""
            />
            <a
              href="#services"
              data-cursor="VIEW"
              data-magnet="0.55"
              className="group inline-flex items-center gap-3 rounded-md border border-blueprint-line bg-blueprint-bg/45 px-4 py-3 font-mono text-xs tracking-[0.22em] text-blueprint-ink/70 shadow-wire transition hover:text-blueprint-ink/95"
            >
              <span className="h-2 w-2 rounded-full bg-blueprint-neon/60 shadow-[0_0_12px_rgba(106,228,255,0.2)]" />
              <TextScramble text="Inspect Service Matrix" />
              <span className="opacity-50 group-hover:opacity-80">→</span>
            </a>
          </div>

          {/* Micro blueprint notes */}
          <div className="mt-10 grid gap-3 md:grid-cols-2">
            <div className="rounded-lg border border-blueprint-line bg-blueprint-bg/40 p-4 shadow-wire">
              <div className="kicker">CONSTRAINTS</div>
              <div className="mt-2 font-mono text-xs leading-5 tracking-[0.14em] text-blueprint-ink/60">
                • NO TEMPLATE VIBES
                <br />
                • 60FPS OR WE RIOT
                <br />
                • COPY MUST HAVE TEETH
              </div>
            </div>
            <div className="rounded-lg border border-blueprint-line bg-blueprint-bg/40 p-4 shadow-wire">
              <div className="kicker">OUTPUT</div>
              <div className="mt-2 font-mono text-xs leading-5 tracking-[0.14em] text-blueprint-ink/60">
                • ADS THAT FEEL NATIVE
                <br />
                • EDITS THAT HOLD ATTENTION
                <br />
                • DESIGNS THAT MAKE MS PAINT CRY
              </div>
            </div>
          </div>
        </div>

        <div data-hero="panel" className="relative">
          <WireframeViewport className="" />
        </div>
      </div>
    </section>
  );
}
