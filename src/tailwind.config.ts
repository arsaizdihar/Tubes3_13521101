import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        gray: {
          "800": "#343541",
          "900": "#202123",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
