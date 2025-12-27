import type { Config } from "tailwindcss";

const config: Config = {
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
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      screens: {
        // Mobile-first approach (default styles apply to mobile)
        // mobile: default (no breakpoint, styles apply from 0px)
        tablet: "768px",   // Tablet and up (768px+)
        desktop: "1024px", // Desktop and up (1024px+)
        // Standard Tailwind breakpoints (also available):
        // sm: '640px',   // Small devices (mobile landscape)
        // md: '768px',   // Medium devices (tablet) - same as 'tablet'
        // lg: '1024px',  // Large devices (desktop) - same as 'desktop'
        // xl: '1280px',  // Extra large devices
        // '2xl': '1536px', // 2X large devices
      },
    },
  },
  plugins: [],
};
export default config;

