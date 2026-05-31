"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TextScramble from "@/components/TextScramble";
import { TEAM } from "@/data/team";
import { cn } from "@/lib/utils";

/**
 * WarRoom
 * Team profiles as interactive blueprint dossiers.
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
    <section id="war-room" className="relative z-10 mx-auto max-w-7xl px-5 py-16 md:py-20">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-2xl">
          <div className="kicker">SECTION_02 • CREATOR WAR-ROOM • ACCESS: GRANTED</div>
          <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight text-blueprint-ink md:text-5xl">
            <TextScramble text="Team dossiers. No headshots. Only stats." />
          </h2>
          <p className="mt-4 text-pretty text-base text-blueprint-ink/70 md:text-lg">
            Profiles render as technical blueprints. Switch data states and watch the dossiers rewire themselves.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-blueprint-line bg-blueprint-bg/35 p-2 shadow-wire backdrop-blur-sm">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              data-cursor="SWAP"
              data-magnet="0.55"
              className={cn(
                "rounded-md border px-3 py-2 font-mono text-xs tracking-[0.22em] transition",
                active === t.id
                  ? "border-blueprint-neon/35 bg-blueprint-bg/70 text-blueprint-ink/95 shadow-[0_0_0_1px_rgba(106,228,255,0.18)]"
                  : "border-blueprint-line bg-transparent text-blueprint-ink/55 hover:bg-blueprint-bg/50 hover:text-blueprint-ink/85"
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

      <div className="mt-8 rounded-xl border border-blueprint-line bg-blueprint-bg/35 p-5 shadow-wire">
        <div className="kicker">PARSER NOTE</div>
        <p className="mt-3 text-sm text-blueprint-ink/70">
          These dossiers auto-parse the raw resume text in <span className="font-mono">data/resumeText.js</span>. Paste
          the extracted PDF text there to populate real metrics. If the parser misses something, override fields in{" "}
          <span className="font-mono">data/team.js</span>.
        </p>
      </div>
    </section>
  );
}

function Dossier({ member, active }) {
  return (
    <article className="relative overflow-hidden rounded-2xl border border-blueprint-line bg-blueprint-bg/40 shadow-wire backdrop-blur-sm">
      <div className="absolute inset-0 bg-grid-faint-24 opacity-60" />

      <header className="relative flex flex-wrap items-start justify-between gap-4 p-6">
        <div className="min-w-0">
          <div className="kicker">DOSSIER</div>
          <h3 className="mt-2 text-balance font-mono text-lg tracking-[0.22em] text-blueprint-ink/90">
            <TextScramble text={member.name} />
          </h3>
          <p className="mt-2 text-sm text-blueprint-ink/70">{member.role}</p>
          <p className="mt-3 max-w-xl text-sm text-blueprint-ink/60">{member.tagline}</p>
        </div>

        <div className="rounded-lg border border-blueprint-line bg-blueprint-bg/55 px-4 py-3 font-mono text-[10px] tracking-[0.24em] text-blueprint-ink/55">
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
                    className="rounded-lg border border-blueprint-line bg-blueprint-bg/55 p-4 shadow-[inset_0_0_0_1px_rgba(214,228,255,0.06)]"
                  >
                    <div className="font-mono text-[10px] tracking-[0.24em] text-blueprint-ink/50">{t.k}</div>
                    <div className="mt-2 font-mono text-lg tracking-[0.12em] text-blueprint-ink/90">{t.v}</div>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-lg border border-blueprint-line bg-blueprint-bg/55 p-4">
                <div className="font-mono text-[10px] tracking-[0.24em] text-blueprint-ink/50">ABOUT (RAW FEED)</div>
                <p className="mt-2 text-sm text-blueprint-ink/65">{member.about}</p>
              </div>
            </Panel>
          )}

          {active === "ops" && (
            <Panel key="ops" title="Operational History">
              <ul className="grid gap-3">
                {member.ops.map((o) => (
                  <li
                    key={o}
                    className="rounded-lg border border-blueprint-line bg-blueprint-bg/55 p-4 text-sm text-blueprint-ink/70"
                  >
                    <span className="font-mono text-[10px] tracking-[0.24em] text-blueprint-neon/75">•</span>{" "}
                    {o}
                  </li>
                ))}
              </ul>
              <Console />
            </Panel>
          )}

          {active === "tools" && (
            <Panel key="tools" title="Software Toolkit">
              <div className="flex flex-wrap gap-2">
                {member.tools.map((t) => (
                  <span
                    key={t}
                    className="rounded border border-blueprint-line bg-blueprint-bg/55 px-3 py-2 font-mono text-xs tracking-[0.18em] text-blueprint-ink/75"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {member.tree && member.links && (
                <div className="mt-6">
                  <div className="font-mono text-[10px] tracking-[0.24em] text-blueprint-ink/50">
                    DESIGN ENGINE • SKILL TREE (SCHEMATIC)
                  </div>
                  <SkillTree tree={member.tree} links={member.links} />
                </div>
              )}
            </Panel>
          )}
        </AnimatePresence>
      </div>

      {/* side measurement strip */}
      <div className="pointer-events-none absolute right-3 top-6 hidden h-[calc(100%-48px)] w-[1px] bg-blueprint-faint md:block" />
      <div className="pointer-events-none absolute right-2 top-6 hidden h-[calc(100%-48px)] w-[1px] bg-blueprint-faint md:block" />
    </article>
  );
}

function Panel({ title, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
    >
      <div className="mb-4 font-mono text-[10px] tracking-[0.24em] text-blueprint-ink/50">{title}</div>
      {children}
    </motion.div>
  );
}

function Console() {
  const rows = [
    ["PIPELINE", "HOOK → CUT → SOUND → SUBS"],
    ["SAFE_AREAS", "CONFIRMED"],
    ["EXPORT", "H.264 / HIGH / 60FPS"],
    ["CLIENT_NOTES", "TRANSLATED"],
  ];

  return (
    <div className="mt-6 overflow-hidden rounded-lg border border-blueprint-line bg-blueprint-bg/60">
      <div className="flex items-center justify-between border-b border-blueprint-line bg-blueprint-bg/40 px-4 py-3">
        <div className="font-mono text-[10px] tracking-[0.24em] text-blueprint-ink/55">OPS_CONSOLE</div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-blueprint-neon/50" />
          <span className="h-2 w-2 rounded-full bg-blueprint-warn/40" />
          <span className="h-2 w-2 rounded-full bg-blueprint-ink/25" />
        </div>
      </div>

      <div className="grid gap-0 font-mono text-[11px] tracking-[0.16em] text-blueprint-ink/70">
        {rows.map(([k, v]) => (
          <div key={k} className="flex items-start justify-between gap-4 border-b border-blueprint-line/60 px-4 py-3">
            <span className="text-blueprint-ink/50">{k}</span>
            <span className="text-right">{v}</span>
          </div>
        ))}
      </div>

      <div className="relative h-12 overflow-hidden">
        <div className="absolute inset-0 animate-scan bg-gradient-to-b from-transparent via-blueprint-neon/15 to-transparent" />
      </div>
    </div>
  );
}

function SkillTree({ tree, links }) {
  const [hover, setHover] = useState(null);
  const node = (id) => tree.find((n) => n.id === id);

  return (
    <div className="mt-3 rounded-lg border border-blueprint-line bg-blueprint-bg/55 p-4">
      <svg viewBox="0 0 100 100" className="h-56 w-full" role="img" aria-label="Design skill tree schematic">
        {links.map(([a, b]) => {
          const A = node(a);
          const B = node(b);
          if (!A || !B) return null;
          const active = hover === a || hover === b;
          return (
            <line
              key={`${a}-${b}`}
              x1={A.x}
              y1={A.y}
              x2={B.x}
              y2={B.y}
              stroke={active ? "rgba(106,228,255,0.55)" : "rgba(214,228,255,0.18)"}
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          );
        })}

        {tree.map((n) => {
          const active = hover === n.id;
          return (
            <g key={n.id} onMouseEnter={() => setHover(n.id)} onMouseLeave={() => setHover(null)}>
              <circle
                cx={n.x}
                cy={n.y}
                r={active ? 6.5 : 5.5}
                fill={active ? "rgba(106,228,255,0.22)" : "rgba(5,10,20,0.6)"}
                stroke={active ? "rgba(106,228,255,0.85)" : "rgba(214,228,255,0.35)"}
                strokeWidth="1.6"
              />
              <circle cx={n.x} cy={n.y} r="1.4" fill="rgba(106,228,255,0.55)" />
              <text
                x={n.x}
                y={n.y - 9}
                textAnchor="middle"
                fontSize="4"
                fill="rgba(214,228,255,0.75)"
                fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace"
                letterSpacing="0.12em"
              >
                {n.label}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="mt-3 font-mono text-[10px] tracking-[0.24em] text-blueprint-ink/50">
        HOVER NODES TO HIGHLIGHT CONNECTIONS
      </div>
    </div>
  );
}
