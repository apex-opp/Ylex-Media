"use client";

import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import Counter from "@/components/Talent/Counter";
import { cn } from "@/lib/utils";

const team = [
  {
    name: "Tushar Singh",
    role: "Video Editing Specialist",
    location: "Lucknow",
    image: "/team/tushar.svg",
    bio:
      "4 years in the edit bay, turning raw clips into retention machines. Long-term collaborator with creators who don't do 'average'.",
    metrics: [
      { label: "Years pro", value: 4, suffix: "+", accent: "cyan" },
      { label: "Videos edited (last year)", value: 200, suffix: "+", accent: "magenta" },
      { label: "Short videos delivered", value: 600, suffix: "+", accent: "violet" },
      { label: "Creator audience touched", value: 2000000, suffix: "+", accent: "cyan" },
    ],
    tags: ["Premiere Pro", "After Effects", "Color Grading", "Thumbnails", "Short-form Reels", "Production"],
    proof: [
      "Rochit__Singh (1.9M) — full-time editor",
      "Rochit.unfilterd (340K) — full-time editor",
      "Talkswithrochit (158K YT) — full-time editor",
      "Vedam World School — freelance",
      "Yellow Sphere — media production (current)",
    ],
  },
  {
    name: "Sachin Verma",
    role: "Graphic Design Specialist",
    location: "India",
    image: "/team/sachin.svg",
    bio:
      "Designer + editor who builds clean visual systems and makes static assets feel like they have a pulse. Less noise. More clarity.",
    metrics: [
      { label: "Years", value: 3, suffix: "+", accent: "lime" },
      { label: "Core tools", value: 5, suffix: "", accent: "amber" },
      { label: "Content types", value: 4, suffix: "", accent: "cyan" },
      { label: "Campaign mindset", value: 1, suffix: " (always)", accent: "magenta" },
    ],
    tags: ["Photoshop", "Illustrator", "Premiere Pro", "After Effects", "Adobe Animation"],
    proof: [
      "Markitiers (2022–2023) — brochures, posters, standees, branding",
      "e-patang (2023–2024) — social creatives, banners, promo assets",
      "E-commerce campaigns + brand kits",
    ],
  },
] as const;

const accentRing: Record<string, string> = {
  cyan: "ring-neon-cyan/35 shadow-glowCyan",
  magenta: "ring-neon-magenta/30 shadow-glowMagenta",
  violet: "ring-neon-violet/30",
  lime: "ring-neon-lime/30",
  amber: "ring-neon-amber/30",
};

export default function TalentRoster() {
  return (
    <section
      id="talent"
      className="relative z-10 mx-auto max-w-6xl px-4 pb-24 pt-12 sm:px-6"
    >
      <div className="absolute inset-x-0 -top-28 -z-10 mx-auto h-[540px] w-full max-w-6xl bg-aurora opacity-[0.45] blur-2xl" />

      <SectionHeading
        kicker="Talent Roster"
        title="Real humans. Real output."
        subtitle="No agency mythology. Just specialists with receipts."
      />

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {team.map((p) => (
          <article
            key={p.name}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 glass edge-glow"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/10 via-transparent to-neon-magenta/10 opacity-70" />
            <div className="relative z-10">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-4">
                  <div className="relative h-20 w-20 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      className="object-cover"
                      priority={false}
                    />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold tracking-tight text-white">
                      {p.name}
                    </h3>
                    <p className="mt-1 text-sm text-white/70">{p.role}</p>
                    <p className="mt-1 text-xs text-white/55">{p.location}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:min-w-[260px]">
                  {p.metrics.map((m) => (
                    <div
                      key={m.label}
                      className={cn(
                        "rounded-2xl border border-white/10 bg-white/5 px-4 py-3 ring-1",
                        accentRing[m.accent]
                      )}
                    >
                      <div className="text-[11px] uppercase tracking-[0.20em] text-white/55">
                        {m.label}
                      </div>
                      <div className="mt-2 font-display text-2xl font-extrabold tracking-tight text-white">
                        {typeof m.value === "number" ? (
                          <Counter value={m.value} suffix={m.suffix} />
                        ) : (
                          m.value
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <p className="mt-5 max-w-[70ch] text-sm leading-relaxed text-white/70">
                {p.bio}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/65"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {p.proof.map((line) => (
                  <div
                    key={line}
                    className="rounded-2xl border border-white/10 bg-black/10 px-4 py-3 text-sm text-white/65"
                  >
                    <span className="mr-2 inline-block h-1.5 w-1.5 translate-y-[-1px] rounded-full bg-white/40" />
                    {line}
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
                <span className="font-semibold text-white">Style note:</span>{" "}
                {p.name.startsWith("Tushar")
                  ? "Fast cuts, clean sound, and color that doesn't look like it went through a microwave."
                  : "Clarity first. Contrast second. Ego last."}
              </div>
            </div>

            <div className="grain" />
          </article>
        ))}
      </div>
    </section>
  );
}
