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
      backgroundImage: {
        "vert-bg-gradient":
          "linear-gradient(180deg, rgba(53,55,64,0), #353740 58.85%)",
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
