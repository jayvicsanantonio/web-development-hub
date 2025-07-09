import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  // Remove v3 darkMode - v4 handles this automatically with @custom-variant
  theme: {
    // Only keep essential theme extensions that aren't duplicated in CSS
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      // Remove duplicated color definitions - these are now handled in CSS
      // Remove duplicated animations - these are now handled in CSS
      // Remove duplicated border radius - these are now handled in CSS
    },
  },
  // Use v4 plugin syntax
  plugins: [
    "@tailwindcss/typography",
    "tailwindcss-animate",
  ],
} satisfies Config;
