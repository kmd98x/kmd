/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        'alegreya-sans': ['var(--font-alegreya-sans)', 'sans-serif'],
        'alegreya-sans-sc': ['var(--font-alegreya-sans-sc)', 'sans-serif'],
        'montez': ['var(--font-montez)', 'cursive'],
      },
      keyframes: {
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "projects-marquee": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "spin-slow": "spin-slow 24s linear infinite",
        "projects-marquee": "projects-marquee var(--projects-marquee-duration, 75s) linear infinite",
      },
    },
  },
  plugins: [],
};
