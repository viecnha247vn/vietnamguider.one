import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: "#143C34", soft: "#1D5347", deep: "#0E2A25" },
        gold: { DEFAULT: "#C89B3C", soft: "#DDB968" },
        eggshell: "#FAF6EE",
        charcoal: "#1C1B19",
        sage: "#6B7A70",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      maxWidth: { shell: "1200px" },
      boxShadow: { mega: "0 24px 48px -24px rgba(14, 42, 37, 0.35)" },
    },
  },
  plugins: [typography],
};
export default config;
