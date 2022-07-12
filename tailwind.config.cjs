/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'fuga-pink': '#e50d4e',
      },
      fontFamily: {
        'montserrat': ['"Montserrat"', 'sans-serif']
      }
    },
  },
  plugins: [],
}
