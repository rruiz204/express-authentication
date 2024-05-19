/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.vue"],
  theme: {
    extend: {
      fontFamily: {
        "chivo-bold": ["Chivo-Bold", "sans-serif"],
        "chivo-semi": ["Chivo-Semi", "sans-serif"],
        "chivo-medium": ["Chivo-Medi", "sans-serif"],
        "chivo-regular": ["Chivo-Regular", "sans-serif"],
        "chivo-light": ["Chivo-Light", "sans-serif"],
      }
    },
  },
  plugins: [],
}

