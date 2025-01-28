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
        primary: {
          DEFAULT: '#1a4789',
          dark: '#0d2b54',
        },
        secondary: '#e5f0ff',
        accent: '#ff4b4b',
      },
      backgroundImage: {
        'hero-pattern': "url('/images/mount-fuji-train.jpg')",
      },
    },
  },
  plugins: [],
};

export default config;