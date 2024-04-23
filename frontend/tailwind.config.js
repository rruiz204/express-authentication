/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.vue"],
  theme: {
    extend: {
      fontFamily: {
        "poppins-semi": ["Poppins-Semi", "sans-serif"],
        "poppins-regular": ["Poppins-Regular", "sans-serif"],
        "poppins-light": ["Poppins-Light", "sans-serif"],
      }
    },
  },
  plugins: [require("daisyui")],
}