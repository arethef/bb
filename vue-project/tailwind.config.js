/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: [ 'sans-serif'],
      serif: ['Merriweather', 'serif'],
      mono: ['monospace']
    },
    extend: {
      colors: {
        bb: {
          bg: '#fffcf2',
          txt: '#54473a',
          a: '#785130',
          a1: '#644328',
          b: '#a8886d',
          c: '#f3e5bf'
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio')
  ],
}
