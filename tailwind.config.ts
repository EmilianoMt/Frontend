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
        brand: {
          dark: "#112E40",
          bg: "#C7D2D9",
          primary: "#025949",
          accent: "#1FBF92",
          light: "#6CD9BA",
        },
      },
    },
  },
  plugins: [],
};

export default config;
