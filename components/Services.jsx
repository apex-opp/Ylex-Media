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
 *
 * Design updates (per feedback):
 * - Bright paper theme (no "black sci-fi blender").
 * - Titles stay stable (no constant scrambling).
 * - Each service includes a "tool screen" visual (Premiere/Photoshop style).
 */
export default function Services() {
  const items = [
    {
      title: "Video Editing",
      description:
        "Dopamine-infused retention loops and seamless cuts. We turn raw footage into scroll-stopping engagement monsters that lock eyes for keeps.",
      icon: IconVideo,
      meta: ["RETENTION↑", "CUTS: CLEAN", "PACE: CONTROLLED"],
      imageSrc: "/assets/ui/premiere.svg",
      imageAlt: "Premiere Pro style editing timeline UI",
      toolLabel: "PREMIERE_PRO",
    },
    {
      title: "Graphic Designing",
      description:
        "Visual systems so sharp and polished they’ll make your closest competitors look like they’re relying on MS Paint.",
      icon: IconDesign,
      meta: ["SYSTEMS", "BRAND_KIT", "PIXEL_LAW"],
      imageSrc: "/assets/ui/photoshop.svg",
      imageAlt: "Photoshop style layers and canvas UI",
      toolLabel: "PHOTOSHOP",
    },
    {
      title: "Motion Graphics",
      description:
        "Injecting life into static shapes. Fluid transitions, snappy physics, and buttery-smooth vector choreography.",
      icon: IconMotion,
      meta: ["EASING", "TIMING", "FEELS_EXPENSIVE"],
      imageSrc: "/assets/ui/aftereffects.svg",
      imageAlt: "After Effects style timeline and keyframes UI",
      toolLabel: "AFTER_EFFECTS",
    },
    {
      title: "Content Management",
      description:
        "Handing over the keys to total consistency. We strategize, schedule, and optimize your presence while you get actual sleep.",
      icon: IconContent,
      meta: ["CALENDAR", "CONSISTENCY", "OPTIMIZE"],
      imageSrc: "/assets/ui/calendar.svg",
      imageAlt: "Content calendar dashboard UI",
      toolLabel: "SCHEDULER",
    },
    {
      title: "Script Writing",
      description:
        "Direct, high-converting hooks and narratives that catch eyes, pull heartstrings, and seamlessly open wallets. Zero generic AI fluff.",
      icon: IconScript,
      meta: ["HOOKS", "STRUCTURE", "VOICE"],
      imageSrc: "/assets/ui/script.svg",
      imageAlt: "Script document UI",
      toolLabel: "SCRIPT_DOC",
    },
    {
      title: "UGC Ads",
      description:
        "Authenticity, engineered. Real creators + targeted concepts to produce high-converting assets that feel like native content, not ads.",
      icon: IconUGC,
      meta: ["NATIVE_FEEL", "CREATORS", "CONVERSION"],
      imageSrc: "/assets/ui/ugc.svg",
      imageAlt: "Mobile feed UI for UGC creatives",
      toolLabel: "UGC_FEED",
    },
    {
      title: "CGI Ads",
      description:
        "Outright defying physics so your product becomes impossible to ignore. Virtual surrealism customized for immediate virality.",
      icon: IconCGI,
      meta: ["SURREAL", "VIRALITY", "PHYSICS: NO"],
      imageSrc: "/assets/ui/cgi.svg",
      imageAlt: "3D viewport wireframe UI",
      toolLabel: "3D_VIEWPORT",
    },
    {
      title: "All Types of Ad Creatives",
      description:
        "High-converting, platform-native frameworks designed from the ground up to aggressively scale modern DTC and B2B brands.",
      icon: IconAds,
      meta: ["META", "YT", "DTC", "B2B"],
      imageSrc: "/assets/ui/ads.svg",
      imageAlt: "Ad creative planning dashboard UI",
      toolLabel: "AD_STACK",
    },
  ];

  return (
    <section id="services" className="relative z-10 mx-auto max-w-7xl px-5 section-gap">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-2xl">
          <div className="kicker">SECTION_01 • INTERACTIVE SERVICE MATRIX • BRIGHT MODE</div>
          <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight text-blueprint-ink md:text-5xl">
            <TextScramble text="Blueprint-grade services. No corporate filler." />
          </h2>
          <p className="mt-4 text-pretty text-base text-blueprint-ink/70 md:text-lg">
            Every tile is an interactive schematic block: tilt it, hover it, and watch the icon trace itself like a
            technical drawing with actual intent.
          </p>
        </div>

        <div className="rounded-2xl border border-blueprint-line bg-blueprint-bg/70 p-5 shadow-wire">
          <div className="font-mono text-[10px] tracking-[0.24em] text-blueprint-ink/55">STATUS</div>
          <div className="mt-2 font-mono text-xs tracking-[0.18em] text-blueprint-ink/70 leading-5">
            GENERIC_UI: <span className="text-blueprint-warn/85">REJECTED</span>
            <br />
            PAPER_THEME: <span className="text-blueprint-neon/85">ACTIVE</span>
            <br />
            CLIENT_ATTENTION: <span className="text-blueprint-acid/80">CAPTURED*</span>
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {items.map((it) => (
          <WireCard key={it.title} {...it} />
        ))}

        {/* Easter-egg tile: humor, but clean */}
        <div className="relative overflow-hidden rounded-2xl border border-blueprint-line bg-blueprint-bg/70 p-6 shadow-wire">
          <div className="kicker">BONUS MODULE</div>
          <div className="mt-3 text-pretty text-base font-semibold tracking-tight text-blueprint-ink">
            Client Translator (v2)
          </div>
          <p className="mt-2 text-sm leading-6 text-blueprint-ink/70">
            Converts “make it pop” into measurable changes without summoning 47 revisions from the underworld.
          </p>

          <div className="mt-5 flex flex-wrap gap-2 font-mono text-[10px] tracking-[0.22em] text-blueprint-ink/55">
            <span className="rounded-lg border border-blueprint-line bg-blueprint-bg/80 px-2.5 py-1">SPEC</span>
            <span className="rounded-lg border border-blueprint-line bg-blueprint-bg/80 px-2.5 py-1">MEASURE</span>
            <span className="rounded-lg border border-blueprint-line bg-blueprint-bg/80 px-2.5 py-1">DELIVER</span>
          </div>

          <div className="pointer-events-none absolute inset-0 opacity-70">
            <div className="absolute -left-10 top-10 h-40 w-40 rounded-full border border-blueprint-neon/20" />
            <div className="absolute -right-12 -bottom-12 h-56 w-56 rounded-full border border-blueprint-warn/15" />
          </div>
        </div>
      </div>

      <p className="mt-8 font-mono text-[11px] tracking-[0.20em] text-blueprint-ink/45">
        *capture not guaranteed if your offer is trash. we can’t animate bad product-market fit.
      </p>
    </section>
  );
}
