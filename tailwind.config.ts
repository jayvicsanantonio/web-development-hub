import type { Config } from "tailwindcss";
export default {
  content: [
    "./app*.{js,ts,jsx,tsx}",
    "./pages*.{js,ts,jsx,tsx}",
    "./components*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        background: {
          DEFAULT: "hsl(222 47% 11%)", 
          secondary: "hsl(215 28% 17%)",
          muted: "hsl(210 38% 15%)",
        },
        foreground: {
          DEFAULT: "hsl(0 0% 98%)", 
          muted: "hsl(0 0% 80%)",
        },
        accent: {
          neon: "hsl(150 100% 50%)", 
          purple: "hsl(280 100% 60%)", 
        },
        card: {
          DEFAULT: "hsl(222 47% 14%)",
          foreground: "hsl(0 0% 98%)",
        },
        popover: {
          DEFAULT: "hsl(222 47% 14%)",
          foreground: "hsl(0 0% 98%)",
        },
        primary: {
          DEFAULT: "hsl(150 100% 50%)", 
          foreground: "hsl(222 47% 11%)",
        },
        secondary: {
          DEFAULT: "hsl(280 100% 60%)", 
          foreground: "hsl(0 0% 98%)",
        },
        muted: {
          DEFAULT: "hsl(215 28% 20%)",
          foreground: "hsl(0 0% 70%)",
        },
        border: "hsl(215 28% 25%)",
        ring: "hsl(150 100% 50%)",
      },
      borderRadius: {
        lg: "0.75rem", 
        md: "0.5rem", 
        sm: "0.25rem", 
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      animation: {
        "dot-bounce": "dot-bounce 0.5s ease-in-out",
        "fade-in": "fade-in 0.3s ease-in-out",
      },
      keyframes: {
        "dot-bounce": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwindcss-animate"),
  ],
} satisfies Config;
