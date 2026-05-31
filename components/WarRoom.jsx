"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TextScramble from "@/components/TextScramble";
import { TEAM } from "@/data/team";
import { cn } from "@/lib/utils";

/**
 * WarRoom
 * Team profiles as interactive blueprint dossiers.
 *
 * Bright-theme fixes:
 * - Stable names/roles (no scrambling).
 * - Cleaner hierarchy + less terminal-tracking.
 * - Optional parser note stays, but doesn't dominate.
 */
export default function WarRoom() {
  const [active, setActive] = useState("telemetry"); // "telemetry" | "ops" | "tools"
  const team = useMemo(() => TEAM, []);

  const tabs = [
    { id: "telemetry", label: "Telemetry" },
    { id: "ops", label: "Ops Log" },
    { id: "tools", label: "Toolkit" },
  ];

  return (
    <section id="war-room" className="relative z-10 mx-auto max-w-7xl px-5 section-gap">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-2xl">
          <div className="kicker">SECTION_02 • CREATOR WAR-ROOM • ACCESS: GRANTED</div>
          <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight text-blueprint-ink md:text-5xl">
            <TextScramble text="Team dossiers. No headshots. Only signal." />
          </h2>
          <p className="mt-4 text-pretty text-base text-blueprint-ink/70 md:text-lg leading-7">
            Switch data states and watch the dossiers rewire themselves. This is the closest you’ll get to “corporate”
            without triggering our allergy.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-2xl border border-blueprint-line bg-blueprint-bg/80 p-2 shadow-wire">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              data-cursor="SWAP"
              data-magnet="0.55"
              className={cn(
                "rounded-xl border px-4 py-2 text-sm font-medium transition",
                active === t.id
                  ? "border-blueprint-neon/55 bg-white text-blueprint-ink shadow-[0_0_0_1px_rgba(0,210,255,0.18)]"
                  : "border-blueprint-line bg-transparent text-blueprint-ink/60 hover:bg-blueprint-bg/90 hover:text-blueprint-ink"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {team.map((member) => (
          <Dossier key={member.id} member={member} active={active} />
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-blueprint-line bg-blueprint-bg/80 p-6 shadow-wire">
        <div className="kicker">PARSER NOTE</div>
        <p className="mt-3 text-sm leading-6 text-blueprint-ink/70">
          These dossiers are fed by the text in <span className="font-mono">data/resumeText.js</span>. Paste the real
          resume text layers there and the UI auto-populates. If parsing misses a detail, override fields in{" "}
          <span className="font-mono">data/team.js</span>.
        </p>
      </div>
    </section>
  );
}

function Dossier({ member, active }) {
  return (
    <article className="relative overflow-hidden rounded-2xl border border-blueprint-line bg-blueprint-bg/80 shadow-wire">
      <div className="absolute inset-0 bg-grid-faint-24 opacity-60" />

      <header className="relative flex flex-wrap items-start justify-between gap-4 p-6">
        <div className="flex min-w-0 items-start gap-4">
          <img
            src={member.avatar}
            alt=""
            className="h-16 w-16 shrink-0 rounded-2xl border border-blueprint-line bg-white/70 p-2"
            loading="lazy"
          />
          <div className="min-w-0">
            <div className="kicker">DOSSIER</div>
            <h3 className="mt-2 text-balance text-lg font-semibold tracking-tight text-blueprint-ink">
              {member.name}
            </h3>
            <p className="mt-1 text-sm text-blueprint-ink/70">{member.role}</p>
            <p className="mt-3 max-w-xl text-sm leading-6 text-blueprint-ink/60">{member.tagline}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-blueprint-line bg-white/60 px-4 py-3 font-mono text-[10px] tracking-[0.22em] text-blueprint-ink/60">
          <div>STATUS: ONLINE</div>
          <div className="mt-1">THREAT_LEVEL: GOOD</div>
          <div className="mt-1">EGO: CONTROLLED</div>
        </div>
      </header>

      <div className="relative px-6 pb-6">
        <AnimatePresence mode="wait">
          {active === "telemetry" && (
            <Panel key="telemetry" title="Telemetry Streams">
              <div className="grid gap-3 sm:grid-cols-2">
                {member.telemetry.map((t) => (
                  <div
                    key={t.k}
                    className="rounded-2xl border border-blueprint-line bg-white/60 p-4 shadow-[0_0_0_1px_rgba(11,16,32,0.08)]"
                  >
                    <div className="font-mono text-[10px] tracking-[0.22em] text-blueprint-ink/55">{t.k}</div>
                    <div className="mt-2 font-mono text-lg tracking-[0.08em] text-blueprint-ink">{t.v}</div>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-blueprint-line bg-white/60 p-4">
                <div className="font-mono text-[10px] tracking-[0.22em] text-blueprint-ink/55">ABOUT (RAW FEED)</div>
                <p className="mt-2 text-sm leading-6 text-blueprint-ink/70">{member.about}</p>
              </div>
            </Panel>
          )}

          {active === "ops" && (
            <Panel key="ops" title="Operational History">
              <ul className="grid gap-3">
                {member.ops.map((o) => (
                  <li
                    key={o}
                    className="rounded-2xl border border-blueprint-line bg-white/60 p-4 text-sm leading-6 text-blueprint-ink/70"
                  >
                    {o}
                  </li>
                ))}
              </ul>
            </Panel>
          )}

          {active === "tools" && (
            <Panel key="tools" title="Toolkit">
              <div className="flex flex-wrap gap-2">
                {member.tools.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-blueprint-line bg-white/60 px-4 py-2 font-mono text-[11px] tracking-[0.18em] text-blueprint-ink/70"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {"tree" in member ? <SkillTree tree={member.tree} links={member.links} /> : null}
            </Panel>
          )}
        </AnimatePresence>
      </div>
    </article>
  );
}

function Panel({ title, children }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="relative"
    >
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="font-mono text-[11px] tracking-[0.22em] text-blueprint-ink/60">{title}</div>
        <div className="h-[1px] flex-1 bg-blueprint-line/70" />
        <div className="font-mono text-[11px] tracking-[0.22em] text-blueprint-ink/50">LIVE</div>
      </div>
      {children}
    </motion.section>
  );
}

function SkillTree({ tree, links }) {
  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-blueprint-line bg-white/60 p-4">
      <div className="font-mono text-[10px] tracking-[0.22em] text-blueprint-ink/55">DESIGN SKILL TREE</div>

      <svg viewBox="0 0 100 100" className="mt-4 h-52 w-full" aria-hidden="true">
        {/* Links */}
        {links.map(([a, b]) => {
          const A = tree.find((n) => n.id === a);
          const B = tree.find((n) => n.id === b);
          if (!A || !B) return null;
          return (
            <line
              key={`${a}-${b}`}
              x1={A.x}
              y1={A.y}
              x2={B.x}
              y2={B.y}
              stroke="rgba(11,16,32,0.22)"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          );
        })}

        {/* Nodes */}
        {tree.map((n) => (
          <g key={n.id}>
            <circle cx={n.x} cy={n.y} r="4.8" fill="rgba(0,210,255,0.18)" />
            <circle cx={n.x} cy={n.y} r="2.4" fill="rgba(11,16,32,0.55)" />
            <text
              x={n.x}
              y={n.y - 8}
              textAnchor="middle"
              fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace"
              fontSize="4"
              fill="rgba(11,16,32,0.62)"
              letterSpacing="0.18em"
            >
              {n.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
