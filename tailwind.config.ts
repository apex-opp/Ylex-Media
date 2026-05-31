import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "ui-sans-serif", "system-ui"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
      },
      colors: {
        ink: "#070511",
        glass: "rgba(255,255,255,0.08)",
        stroke: "rgba(255,255,255,0.14)",
        neon: {
          cyan: "#00E5FF",
          magenta: "#FF2BD6",
          violet: "#B400FF",
          lime: "#7CFF6B",
          amber: "#FFB800",
        },
      },
      boxShadow: {
        glowCyan: "0 0 40px rgba(0, 229, 255, .35), 0 0 120px rgba(0, 229, 255, .18)",
        glowMagenta: "0 0 40px rgba(255, 43, 214, .32), 0 0 120px rgba(255, 43, 214, .16)",
      },
      backgroundImage: {
        aurora:
          "radial-gradient(1200px 600px at 10% 10%, rgba(0,229,255,0.30), transparent 55%), radial-gradient(900px 500px at 80% 20%, rgba(255,43,214,0.28), transparent 55%), radial-gradient(1100px 700px at 60% 85%, rgba(180,0,255,0.22), transparent 60%)",
        grid:
          "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(0,-10px,0)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(120%)" },
        },
        pulseGlow: {
          "0%, 100%": { filter: "drop-shadow(0 0 0 rgba(0,229,255,0.0))" },
          "50%": { filter: "drop-shadow(0 0 18px rgba(0,229,255,0.45))" },
        },
      },
      animation: {
        floaty: "floaty 5s ease-in-out infinite",
        shimmer: "shimmer 1.2s ease-in-out infinite",
        pulseGlow: "pulseGlow 3.4s ease-in-out infinite",
      },
    },
  },
  plugins: [
    function ({ addUtilities }: any) {
      addUtilities({
        ".glass": {
          background: "rgba(255,255,255,0.07)",
          border: "1px solid rgba(255,255,255,0.14)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        },
        ".glass-strong": {
          background: "rgba(8, 6, 20, 0.42)",
          border: "1px solid rgba(255,255,255,0.16)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        },
        ".text-balance": { textWrap: "balance" },
      });
    },
  ],
};

export default config;
