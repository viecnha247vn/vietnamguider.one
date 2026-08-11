import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // "Lacquer" palette — drawn from Vietnamese sơn mài (lacquerware):
        // deep pine ink, warm brass gold, eggshell paper.
        ink: {
          DEFAULT: "#143C34", // deep lacquer green — primary
          soft: "#1D5347",
          deep: "#0E2A25",
        },
        gold: {
          DEFAULT: "#C89B3C", // warm brass — accent / CTA
          soft: "#DDB968",
        },
        eggshell: "#FAF6EE", // paper background
        charcoal: "#1C1B19", // body text
        sage: "#6B7A70", // muted borders / secondary text
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        shell: "1200px",
      },
      boxShadow: {
        mega: "0 24px 48px -24px rgba(14, 42, 37, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
