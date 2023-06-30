import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        deepBlack: "#101010",
        black: "#1E1E1E",
        darkGrey: "#333333",
        grey: "#7D7D7D",
        lightGrey: "#D9D9D9",
        red: "#9B0000",
        green: "#148C27",
        yellow: "#F2C94C"
      },
      fontSize:{
        h1: ["4rem", "4.5rem"],
        h2: ["2.25rem", "2.75rem"],
        h3: ["1.5rem", "2rem"],
        regular: ["1rem", "1.5rem"]
      },
      borderRadius: {
        meap: '10px'
      },
      boxShadow:{
        cardShadow: `2px 2px #1E1E1E`
      }
    },
  },
  plugins: [],
} satisfies Config;
