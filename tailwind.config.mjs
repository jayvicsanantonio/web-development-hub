/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        heading: ['var(--font-nunito)', 'sans-serif'],
      },
      boxShadow: {
        'cute-sm': '0 2px 5px rgba(0, 0, 0, 0.1)',
        'cute-md': '0 4px 8px rgba(0, 0, 0, 0.15)',
        'cute-xs': '0 1px 3px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
};
