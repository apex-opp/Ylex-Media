"use client";

import WireCard from "@/components/WireCard";
import TextScramble from "@/components/TextScramble";
import {
  IconAds,
  IconCGI,
  IconContent,
  IconDesign,
  IconMotion,
  IconScript,
  IconUGC,
  IconVideo,
} from "@/components/ServiceIcons";

/**
 * Services
 * Interactive Service Matrix: wireframe blocks + tilt + icon path tracing.
 */
export default function Services() {
  const items = [
    {
      title: "VIDEO EDITING",
      description:
        "Dopamine-infused retention loops and seamless cuts. We turn raw footage into scroll-stopping engagement monsters that lock eyes for keeps.",
      icon: IconVideo,
      meta: ["RETENTION↑", "CUTS: CLEAN", "PACE: AGGRESSIVE"],
    },
    {
      title: "GRAPHIC DESIGNING",
      description:
        "Visual systems so sharp and polished they’ll make your closest competitors look like they are relying on MS Paint.",
      icon: IconDesign,
      meta: ["SYSTEMS", "BRAND_KIT", "PIXEL_LAW"],
    },
    {
      title: "MOTION GRAPHICS",
      description:
        "Injecting life into static shapes. Fluid transitions, snappy physics, and buttery-smooth vector choreography.",
      icon: IconMotion,
      meta: ["EASING", "TIMING", "FEELS_EXPENSIVE"],
    },
    {
      title: "CONTENT MANAGEMENT",
      description:
        "Handing over the keys to total consistency. We strategize, schedule, and optimize your presence while you get actual sleep.",
      icon: IconContent,
      meta: ["CALENDAR", "CONSISTENCY", "OPTIMIZE"],
    },
    {
      title: "SCRIPT WRITING",
      description:
        "Direct, high-converting hooks and narratives that catch eyes, pull heartstrings, and seamlessly open wallets. Zero generic AI fluff allowed.",
      icon: IconScript,
      meta: ["HOOKS", "STRUCTURE", "NO_FLUFF"],
    },
    {
      title: "UGC ADS",
      description:
        "Authenticity, engineered. We connect real people with targeted concepts to create high-converting assets that feel like native content, not ads.",
      icon: IconUGC,
      meta: ["NATIVE_FEEL", "CREATORS", "CONVERSION"],
    },
    {
      title: "CGI ADS",
      description:
        "Outright defying physics to ensure your product is impossible to overlook. Virtual surrealism customized for immediate virality.",
      icon: IconCGI,
      meta: ["SURREAL", "VIRALITY", "PHYSICS: NO"],
    },
    {
      title: "ALL TYPES OF AD CREATIVES",
      description:
        "High-converting, platform-native frameworks designed from the ground up to aggressively scale modern DTC and B2B brands.",
      icon: IconAds,
      meta: ["META", "YT", "DTC", "B2B"],
    },
  ];

  return (
    <section id="services" className="relative z-10 mx-auto max-w-7xl px-5 py-16 md:py-20">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-2xl">
          <div className="kicker">SECTION_01 • INTERACTIVE SERVICE MATRIX • MODE: WIREFRAME</div>
          <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight text-blueprint-ink md:text-5xl">
            <TextScramble text="Blueprint-grade services. No corporate filler." />
          </h2>
          <p className="mt-4 text-pretty text-base text-blueprint-ink/70 md:text-lg">
            Every tile is an interactive schematic block. Hover it, tilt it, and watch the icon draw itself like a
            technical diagram that actually has a pulse.
          </p>
        </div>

        <div className="rounded-lg border border-blueprint-line bg-blueprint-bg/35 p-4 shadow-wire">
          <div className="font-mono text-[10px] tracking-[0.24em] text-blueprint-ink/55">STATUS</div>
          <div className="mt-2 font-mono text-xs tracking-[0.18em] text-blueprint-ink/70">
            GENERIC_UI: <span className="text-blueprint-warn/85">REJECTED</span>
            <br />
            WIREFRAME_AURA: <span className="text-blueprint-neon/85">ENABLED</span>
            <br />
            CLIENT_ATTENTION: <span className="text-blueprint-acid/80">CAPTURED*</span>
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => (
          <WireCard
            key={it.title}
            title={it.title}
            description={it.description}
            icon={it.icon}
            meta={it.meta}
          />
        ))}

        {/* Easter-egg tile: self-aware humor */}
        <div className="relative overflow-hidden rounded-xl border border-blueprint-line bg-blueprint-bg/35 p-5 shadow-wire">
          <div className="kicker">BONUS MODULE</div>
          <div className="mt-3 font-mono text-sm tracking-[0.22em] text-blueprint-ink/85">
            <TextScramble text="CLIENT TRANSLATOR" />
          </div>
          <p className="mt-3 text-sm text-blueprint-ink/70">
            Converts “make it pop” into measurable changes without summoning 47 revisions from the underworld.
          </p>

          <div className="mt-5 flex flex-wrap gap-2 font-mono text-[10px] tracking-[0.22em] text-blueprint-ink/50">
            <span className="rounded border border-blueprint-line bg-blueprint-bg/40 px-2 py-1">SPEC</span>
            <span className="rounded border border-blueprint-line bg-blueprint-bg/40 px-2 py-1">MEASURE</span>
            <span className="rounded border border-blueprint-line bg-blueprint-bg/40 px-2 py-1">DELIVER</span>
          </div>

          <div className="pointer-events-none absolute inset-0 opacity-70">
            <div className="absolute -left-10 top-10 h-40 w-40 rounded-full border border-blueprint-neon/20" />
            <div className="absolute -right-10 bottom-10 h-52 w-52 rounded-full border border-blueprint-warn/15" />
          </div>
        </div>
      </div>

      <p className="mt-8 font-mono text-[11px] tracking-[0.22em] text-blueprint-ink/45">
        *capture not guaranteed if your offer is trash. we can’t animate bad product-market fit.
      </p>
    </section>
  );
}
