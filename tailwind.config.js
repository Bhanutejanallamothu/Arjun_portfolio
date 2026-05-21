import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: "#e8a020",
        mtext: "#f0f0f0",
        text: "#0a0a0a",
        bw: "#f5f5f5",
        border: "#000000",
      },
      spacing: {
        boxShadowX: "4px",
        boxShadowY: "4px",
        reverseBoxShadowX: "-4px",
        reverseBoxShadowY: "-4px",
      },
      borderRadius: {
        base: "4px",
      },
      boxShadow: {
        shadow: "4px 4px 0px rgba(0, 0, 0, 1)",
      },
      fontWeight: {
        base: "600",
      },
      fontSize: {
        sm: "0.875rem",
      },
    },
  },
  plugins: [],
}
