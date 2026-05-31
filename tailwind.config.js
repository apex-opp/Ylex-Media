/** @type {import('tailwindcss').Config} */
import plugin from "tailwindcss/plugin";

/**
 * Ylex Media — Tailwind config
 * Bright blueprint paper + neo-wireframe utilities (2026, not 1995).
 *
 * Notes:
 * - Tailwind v4 supports content auto detection; we keep explicit paths for portability.
 * - Grid utilities render as crisp SVG data-URLs (fast + no layout cost).
 */
export default {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}", "./data/**/*.{js,jsx}", "./lib/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "Courier New",
          "monospace",
        ],
        sans: [
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
          "Noto Sans",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "sans-serif",
        ],
      },
      colors: {
        blueprint: {
          // Bright paper
          bg: "#F7FBFF",
          // Dark ink
          ink: "#0B1020",
          // Lines tuned for light theme
          line: "rgba(11,16,32,0.14)",
          faint: "rgba(11,16,32,0.07)",
          // Accents
          neon: "#00D2FF", // cyan
          warn: "#FF2D8B", // magenta
          acid: "#7CFF00", // lime
        },
      },
      boxShadow: {
        // "Wireframe glass" but on light background:
        wire: "0 0 0 1px rgba(11,16,32,0.14), 0 10px 30px rgba(11,16,32,0.10)",
        wireHard: "0 0 0 1px rgba(11,16,32,0.22), 0 16px 44px rgba(11,16,32,0.14)",
      },
      keyframes: {
        scan: {
          "0%": { transform: "translateY(-120%)" },
          "100%": { transform: "translateY(120%)" },
        },
      },
      animation: {
        scan: "scan 5.6s linear infinite",
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities, matchUtilities, theme }) {
      addUtilities({
        ".text-outline": {
          WebkitTextStroke: "1px rgba(11,16,32,0.18)",
          color: "transparent",
        },
        ".wire-border": {
          boxShadow: theme("boxShadow.wire"),
        },
        ".wire-border-hard": {
          boxShadow: theme("boxShadow.wireHard"),
        },
        /**
         * bg-blueprint
         * - fixed paper gradient (very subtle, but clearly "bright + vibrant")
         * - also sets default text color (ink)
         */
        ".bg-blueprint": {
          backgroundColor: theme("colors.blueprint.bg"),
          backgroundImage:
            "radial-gradient(900px 600px at 14% 6%, rgba(0,210,255,0.16), transparent 60%), " +
            "radial-gradient(760px 520px at 92% 0%, rgba(255,45,139,0.14), transparent 58%), " +
            "radial-gradient(860px 640px at 50% 102%, rgba(124,255,0,0.10), transparent 60%)",
          backgroundAttachment: "fixed",
          color: theme("colors.blueprint.ink"),
        },
      });

      // Blueprint grid as SVG data-URL (crisp, cheap).
      // Stroke colors are tuned for LIGHT theme (dark ink lines with low opacity).
      matchUtilities(
        {
          "bg-grid": (value) => ({
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${value}' height='${value}' viewBox='0 0 ${value} ${value}'%3E%3Cpath d='M ${value} 0 L 0 0 0 ${value}' fill='none' stroke='rgba(11,16,32,0.10)' stroke-width='1'/%3E%3C/svg%3E")`,
          }),
          "bg-grid-faint": (value) => ({
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${value}' height='${value}' viewBox='0 0 ${value} ${value}'%3E%3Cpath d='M ${value} 0 L 0 0 0 ${value}' fill='none' stroke='rgba(11,16,32,0.06)' stroke-width='1'/%3E%3C/svg%3E")`,
          }),
        },
        { values: { 18: "18", 24: "24", 32: "32", 48: "48", 64: "64", 96: "96" } }
      );
    }),
  ],
};
