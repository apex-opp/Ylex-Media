/** @type {import('tailwindcss').Config} */
import plugin from "tailwindcss/plugin";

// Tailwind v4 supports content auto-detection, but we keep it explicit for repo portability.
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
          bg: "#050A14",
          ink: "#D6E4FF",
          line: "rgba(214,228,255,0.12)",
          faint: "rgba(214,228,255,0.06)",
          neon: "#6AE4FF",
          warn: "#FF6A8B",
          acid: "#9BFF6A",
        },
      },
      boxShadow: {
        wire: "0 0 0 1px rgba(214,228,255,0.18), 0 0 18px rgba(106,228,255,0.12)",
        wireHard: "0 0 0 1px rgba(214,228,255,0.30), 0 0 28px rgba(106,228,255,0.18)",
      },
      keyframes: {
        flicker: {
          "0%, 100%": { opacity: "0.85" },
          "12%": { opacity: "0.35" },
          "14%": { opacity: "0.9" },
          "40%": { opacity: "0.55" },
          "42%": { opacity: "0.95" },
          "74%": { opacity: "0.45" },
        },
        scan: {
          "0%": { transform: "translateY(-120%)" },
          "100%": { transform: "translateY(120%)" },
        },
      },
      animation: {
        flicker: "flicker 2.8s linear infinite",
        scan: "scan 4.4s linear infinite",
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities, matchUtilities, theme }) {
      addUtilities({
        ".text-outline": {
          WebkitTextStroke: "1px rgba(214,228,255,0.22)",
          color: "transparent",
        },
        ".wire-border": {
          boxShadow: theme("boxShadow.wire"),
        },
        ".wire-border-hard": {
          boxShadow: theme("boxShadow.wireHard"),
        },
        ".bg-blueprint": {
          backgroundColor: theme("colors.blueprint.bg"),
          color: theme("colors.blueprint.ink"),
        },
      });

      // Blueprint grid as a data-URL SVG: ultra-cheap and crisp.
      matchUtilities(
        {
          "bg-grid": (value) => ({
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${value}' height='${value}' viewBox='0 0 ${value} ${value}'%3E%3Cpath d='M ${value} 0 L 0 0 0 ${value}' fill='none' stroke='rgba(214,228,255,0.08)' stroke-width='1'/%3E%3C/svg%3E")`,
          }),
          "bg-grid-faint": (value) => ({
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${value}' height='${value}' viewBox='0 0 ${value} ${value}'%3E%3Cpath d='M ${value} 0 L 0 0 0 ${value}' fill='none' stroke='rgba(214,228,255,0.05)' stroke-width='1'/%3E%3C/svg%3E")`,
          }),
        },
        { values: { 18: "18", 24: "24", 32: "32", 48: "48", 64: "64" } }
      );
    }),
  ],
};
