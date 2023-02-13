/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: [ 'sans-serif'],
      serif: ['Merriweather', 'serif'],
      mono: ['monospace']
    },
    extend: {},
  },
  plugins: [],
}
