import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        gray: {
          "700": "#40414F",
          "800": "#343541",
          "900": "#202123",
        },
      },
      fontFamily: {
        soehne: [
          "Söhne",
          ...require("tailwindcss/defaultTheme").fontFamily.sans,
        ],
      },
    },
  },
  plugins: [],
} satisfies Config;
