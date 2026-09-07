import type { Config } from "tailwindcss";

/**
 * Single source of truth for colour — a light, photo-led public-science palette
 * in the spirit of antarctica.gov.au and bas.ac.uk. Mirrored as CSS variables in
 * globals.css for raw CSS, SVG, canvas and Leaflet marker markup.
 *
 * Note: no colour is named `base` — Tailwind already ships `text-base` as a
 * font-size utility and the two silently collide.
 */
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        page: "#FBFCFD", // warm off-white page background
        surface: {
          DEFAULT: "#FFFFFF", // cards — soft shadows, not borders
          soft: "#F5F9FC", // subtle raised/hover fills
        },
        primary: {
          DEFAULT: "#0EA5E9", // bright glacial blue
          soft: "#7DD3FC",
          dark: "#0284C7",
        },
        secondary: "#0369A1", // deep sea blue — headings and nav
        accent: {
          DEFAULT: "#F59E0B", // warm amber — CTAs, map markers
          soft: "#FCD34D",
          ink: "#B45309", // amber dark enough to read as text on white
        },
        highlight: "#FB7185", // coral — game elements, used sparingly
        mint: "#34D399", // success / fresh
        ink: {
          DEFAULT: "#334155", // slate body text — never pure black
          soft: "#64748B",
          muted: "#94A3B8",
        },
        line: "#E2E8F0", // hairlines where a border is unavoidable
        wash: "#E0F2FE", // pale blue for section gradients
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(15,23,42,0.04), 0 8px 24px rgba(15,23,42,0.06)",
        cardHover: "0 2px 6px rgba(15,23,42,0.06), 0 18px 44px rgba(15,23,42,0.11)",
        accentGlow: "0 8px 22px rgba(245,158,11,0.35)",
        primaryGlow: "0 8px 22px rgba(14,165,233,0.30)",
        lift: "0 10px 30px rgba(3,105,161,0.10)",
      },
      keyframes: {
        pop: {
          "0%": { transform: "scale(0.85)", opacity: "0" },
          "60%": { transform: "scale(1.06)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        bobble: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        pop: "pop 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
        bobble: "bobble 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
