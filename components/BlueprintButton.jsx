"use client";

import { motion } from "framer-motion";
import TextScramble from "@/components/TextScramble";
import { cn } from "@/lib/utils";

/**
 * BlueprintButton
 * CTA that feels like a CAD control (bright paper, neon edges).
 *
 * Notes:
 * - Scramble is subtle + short (CTA only).
 * - Hover expands an outline and adds a controlled glow (not messy).
 */
export default function BlueprintButton({
  label = "Deploy Chaos",
  sublabel = "This is fine.",
  className = "",
  onClick,
  href,
}) {
  const Comp = href ? "a" : "button";

  return (
    <motion.div
      initial={false}
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className={cn("inline-flex", className)}
    >
      <Comp
        href={href}
        onClick={onClick}
        data-cursor="DEPLOY"
        data-magnet="0.72"
        className="group relative isolate overflow-hidden rounded-2xl border border-blueprint-line bg-blueprint-bg/85 px-5 py-4 shadow-wire"
      >
        {/* Expand-on-hover border + glow */}
        <span className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <span className="absolute inset-[-2px] rounded-2xl border border-blueprint-neon/55" />
          <span className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_30%_30%,rgba(0,210,255,0.16),transparent_60%)]" />
          <span className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_75%_30%,rgba(255,45,139,0.10),transparent_62%)]" />
        </span>

        {/* Circuit doodles (kept small, not 1995 clipart) */}
        <span className="pointer-events-none absolute right-4 top-4 h-10 w-10 opacity-70">
          <svg viewBox="0 0 64 64" fill="none" className="h-full w-full">
            <path
              d="M10 14h18v12h26M28 26v14H14m14 12h26V38H46"
              stroke="rgba(11,16,32,0.22)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="28" cy="14" r="2.5" fill="rgba(0,210,255,0.35)" />
            <circle cx="54" cy="26" r="2.5" fill="rgba(0,210,255,0.32)" />
            <circle cx="14" cy="40" r="2.5" fill="rgba(255,45,139,0.30)" />
            <circle cx="46" cy="38" r="2.5" fill="rgba(124,255,0,0.22)" />
          </svg>
        </span>

        <div className="flex items-baseline gap-3">
          <TextScramble
            as="span"
            text={label}
            duration={260}
            intensity={0.22}
            className="text-sm font-semibold tracking-tight text-blueprint-ink"
          />
          <span className="hidden text-sm text-blueprint-ink/60 md:inline">{sublabel}</span>
        </div>

        {/* Bottom micro-measurements */}
        <div className="mt-2 flex items-center justify-between gap-4 font-mono text-[10px] tracking-[0.22em] text-blueprint-ink/55">
          <span>SAFE_MODE: OFF</span>
          <span className="opacity-70">FPS: 60*</span>
        </div>

        <span className="pointer-events-none absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-blueprint-neon/55 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
      </Comp>
    </motion.div>
  );
}
