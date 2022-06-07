module.exports = {
  content: [ "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        main: 'Roboto Condensed'
      }
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}
