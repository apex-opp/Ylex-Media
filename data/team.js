import { DESIGNER_RESUME_TEXT, TUSHAR_RESUME_TEXT } from "@/data/resumeText";

/**
 * Resume parsing is intentionally conservative.
 * We extract high-signal items (numbers, tool names, key phrases) and then
 * feed them into the dossier UI. When parsing fails, we fall back to curated defaults.
 */

const TOOL_ALIASES = [
  "Premiere",
  "Premiere Pro",
  "After Effects",
  "CapCut",
  "DaVinci",
  "Resolve",
  "Photoshop",
  "Illustrator",
  "Figma",
  "Canva",
  "Blender",
  "Cinema 4D",
  "Final Cut",
  "Audition",
];

function uniq(list) {
  return Array.from(new Set(list));
}

function pickTools(text) {
  const lower = text.toLowerCase();
  const found = TOOL_ALIASES.filter((t) => lower.includes(t.toLowerCase()));
  return uniq(found);
}

function extractMetrics(text) {
  // Common resume number patterns: 120K, 1.8M, +18%, 500+, 24-48
  const rx = /([+−-]?\d+(?:\.\d+)?\s*(?:k|m|%|\+)?)(?:\s*(?:-|to)\s*([+−-]?\d+(?:\.\d+)?\s*(?:k|m|%|\+)?))?/gi;
  const hits = [];
  let m;
  while ((m = rx.exec(text))) {
    const a = String(m[1]).trim();
    const b = m[2] ? String(m[2]).trim() : null;
    // Ignore tiny noise like "0"
    if (a === "0") continue;
    hits.push(b ? `${a}–${b}` : a);
    if (hits.length > 14) break;
  }
  return hits;
}

function extractBullets(text) {
  // capture lines that look like bullets
  return text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => /^[-•*]\s+/.test(l))
    .map((l) => l.replace(/^[-•*]\s+/, ""))
    .slice(0, 8);
}

function safeSnippet(text, max = 280) {
  const s = text.replace(/\s+/g, " ").trim();
  return s.length > max ? s.slice(0, max - 1) + "…" : s;
}

function buildTushar(text) {
  const tools = pickTools(text);
  const metrics = extractMetrics(text);

  return {
    id: "tushar",
    name: "Tushar",
    role: "Video Editing Specialist",
    tagline: "Retention is a weapon. Cuts are just ammunition.",
    about: safeSnippet(text),
    telemetry: [
      { k: "Retention Rate", v: metrics.find((x) => x.includes("%")) ?? "+18%" },
      { k: "Audience Scaled", v: metrics.find((x) => /m|k/i.test(x)) ?? "1.8M" },
      { k: "Turnaround", v: metrics.find((x) => x.includes("–")) ?? "24–48h" },
      { k: "Caffeine-to-Render", v: "1:1" },
    ],
    ops: extractBullets(text).length
      ? extractBullets(text)
      : [
          "Short-form edits engineered for first-1.5s capture.",
          "Audio design + pacing control (no dead frames).",
          "Versioning loops: hooks → iterate → spike retention.",
          "Thumbnail frames that don’t look like thumbnails.",
        ],
    tools: tools.length ? tools : ["Premiere Pro", "After Effects", "DaVinci Resolve", "CapCut"],
  };
}

function buildDesigner(text) {
  const tools = pickTools(text);
  const bullets = extractBullets(text);

  // Skill tree nodes are rendered by WarRoom; keep as data.
  const tree = [
    { id: "core", label: "Core System", x: 50, y: 16 },
    { id: "layout", label: "Layout Engine", x: 22, y: 38 },
    { id: "type", label: "Typography", x: 78, y: 38 },
    { id: "brand", label: "Brand Kit", x: 18, y: 64 },
    { id: "ads", label: "Ad Variants", x: 82, y: 64 },
    { id: "motion", label: "Motion Frames", x: 50, y: 84 },
  ];

  const links = [
    ["core", "layout"],
    ["core", "type"],
    ["layout", "brand"],
    ["type", "ads"],
    ["brand", "motion"],
    ["ads", "motion"],
  ];

  return {
    id: "designer",
    name: "Graphic Design Specialist",
    role: "Design Systems & Creatives",
    tagline: "Systems first. Aesthetics second. Conversion always.",
    about: safeSnippet(text),
    telemetry: [
      { k: "Creatives Shipped", v: extractMetrics(text).find((x) => /\+/.test(x)) ?? "2000+" },
      { k: "Brands", v: extractMetrics(text).find((x) => /\d+\+/.test(x)) ?? "30+" },
      { k: "Feedback Loops", v: "Reduced" },
      { k: "Style Consistency", v: "Locked" },
    ],
    ops: bullets.length
      ? bullets
      : [
          "Build brand kits with reusable rules (not vibes).",
          "Ad creative batches: variants, angles, and formats.",
          "Export discipline: correct sizes, safe areas, readable type.",
          "Design rationale included (kills revision chaos).",
        ],
    tools: tools.length ? tools : ["Figma", "Photoshop", "Illustrator", "After Effects"],
    tree,
    links,
  };
}

export function buildTeamProfiles() {
  return [buildTushar(TUSHAR_RESUME_TEXT), buildDesigner(DESIGNER_RESUME_TEXT)];
}

export const TEAM = buildTeamProfiles();
