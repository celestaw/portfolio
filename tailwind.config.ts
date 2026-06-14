import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#1F3A5F",   // 落ち着いた紺（唯一のアクセント）
        accentsoft: "#2E5A8C",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "var(--font-jp)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        prose2: "720px",
      },
    },
  },
  plugins: [],
};
export default config;
