/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "green-dark": "#004225",
        "green-light": "#CCF0E2"
      }
    },
  },
  plugins: [],
}

