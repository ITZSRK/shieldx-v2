/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0A0A0A",
        surface: "rgba(255,255,255,0.03)",
        border: "rgba(255,255,255,0.08)",
        textPrimary: "#FFFFFF",
        textSecondary: "rgba(255,255,255,0.6)",
        accent: "#8B5CF6"
      }
    }
  },
  plugins: []
};