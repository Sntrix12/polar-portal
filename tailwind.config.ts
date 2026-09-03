import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0A1628",
          deep: "#050C17",
          soft: "#122238",
        },
        ice: "#F0F7FF",
        frost: "#7DD3FC",
        amber: {
          DEFAULT: "#FBBF24",
          soft: "#FCD34D",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px rgba(125, 211, 252, 0.18)",
        amberGlow: "0 0 28px rgba(251, 191, 36, 0.35)",
      },
    },
  },
  plugins: [],
};
export default config;
