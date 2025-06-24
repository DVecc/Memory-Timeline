// tailwind.config.js
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // You can customize here if you want:
        // yellow: defaultTheme.colors.yellow,
      },
    },
  },
  plugins: [],
}