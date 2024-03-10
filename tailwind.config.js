/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mainColor: "#f48a0b",
        secondColor: "#fd6003",
        textColor:"#5a5b5e"
      }
    },
  },
  plugins: [],
}

