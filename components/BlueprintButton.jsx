"use client";

import { motion } from "framer-motion";
import TextScramble from "@/components/TextScramble";
import { cn } from "@/lib/utils";

/**
 * BlueprintButton
 * A deliberately over-engineered CTA.
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
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className={cn("inline-flex", className)}
    >
      <Comp
        href={href}
        onClick={onClick}
        data-cursor="DEPLOY"
        data-magnet="0.72"
        className="group relative isolate overflow-hidden rounded-md border border-blueprint-line bg-blueprint-bg/70 px-5 py-3 shadow-wire backdrop-blur-sm"
      >
        {/* Expand-on-hover blueprint border */}
        <span className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <span className="absolute inset-[-2px] rounded-md border border-blueprint-neon/45" />
          <span className="absolute inset-0 rounded-md bg-[radial-gradient(circle_at_30%_30%,rgba(106,228,255,0.18),transparent_60%)]" />
        </span>

        {/* Circuit doodles */}
        <span className="pointer-events-none absolute right-3 top-3 h-10 w-10 opacity-70">
          <svg viewBox="0 0 64 64" fill="none" className="h-full w-full">
            <path
              d="M6 12h22v14h30M28 26v14H10m18 14h30V38H46"
              stroke="rgba(214,228,255,0.22)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="28" cy="12" r="2.5" fill="rgba(106,228,255,0.35)" />
            <circle cx="58" cy="26" r="2.5" fill="rgba(106,228,255,0.35)" />
            <circle cx="10" cy="40" r="2.5" fill="rgba(255,106,139,0.35)" />
            <circle cx="46" cy="38" r="2.5" fill="rgba(155,255,106,0.25)" />
          </svg>
        </span>

        <div className="flex items-baseline gap-3">
          <TextScramble
            as="span"
            text={label}
            className="font-mono text-sm tracking-[0.22em] text-blueprint-ink/90"
          />
          <span className="hidden text-xs text-blueprint-ink/60 md:inline">{sublabel}</span>
        </div>

        {/* Bottom micro-measurements */}
        <div className="mt-2 flex items-center justify-between gap-4 font-mono text-[10px] tracking-[0.24em] text-blueprint-ink/50">
          <span>SAFE_MODE: OFF</span>
          <span className="opacity-70">FPS: 60*</span>
        </div>

        <span className="pointer-events-none absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-blueprint-neon/50 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
      </Comp>
    </motion.div>
  );
}
