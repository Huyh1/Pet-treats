/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        lg: "2.5rem",
        xl: "3.5rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px",
      },
    },
    extend: {
      colors: {
        cream: {
          DEFAULT: "#F4EDE0",
          50: "#FBF7EE",
          100: "#F4EDE0",
          200: "#E8DCC4",
          300: "#DCC9A6",
        },
        cocoa: {
          DEFAULT: "#2B1A12",
          50: "#5A4636",
          100: "#3E2A1E",
          200: "#2B1A12",
          300: "#1A0F08",
        },
        ember: {
          DEFAULT: "#E2602B",
          light: "#F08957",
          dark: "#B84A1E",
        },
        moss: {
          DEFAULT: "#5C6B3B",
          light: "#7E8D5B",
          dark: "#3F4A28",
        },
        gold: {
          DEFAULT: "#C9A35C",
          light: "#DDBE7F",
        },
        ink: "#1A0F08",
      },
      fontFamily: {
        display: ['"Fraunces"', "Georgia", "serif"],
        body: ['"Noto Sans SC"', "-apple-system", "sans-serif"],
        mono: ['"Space Mono"', "ui-monospace", "monospace"],
        hand: ['"Caveat"', "cursive"],
      },
      fontSize: {
        hero: ["clamp(3rem, 8vw, 7rem)", { lineHeight: "0.95", letterSpacing: "-0.02em" }],
        display: ["clamp(2rem, 4.5vw, 4rem)", { lineHeight: "1.05", letterSpacing: "-0.015em" }],
        section: ["clamp(1.75rem, 3.5vw, 3rem)", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
      },
      borderRadius: {
        pill: "999px",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(43, 26, 18, 0.04), 0 8px 24px rgba(43, 26, 18, 0.06)",
        lift: "0 4px 8px rgba(43, 26, 18, 0.06), 0 20px 40px rgba(43, 26, 18, 0.12)",
        emboss: "inset 0 1px 0 rgba(255, 255, 255, 0.5), 0 1px 2px rgba(43, 26, 18, 0.08)",
      },
      backgroundImage: {
        "paper-grain":
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.17 0 0 0 0 0.10 0 0 0 0 0.07 0 0 0 0.08 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-2deg)" },
          "50%": { transform: "rotate(2deg)" },
        },
      },
      animation: {
        floaty: "floaty 6s ease-in-out infinite",
        wiggle: "wiggle 0.4s ease-in-out",
      },
    },
  },
  plugins: [],
};
