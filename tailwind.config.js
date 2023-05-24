/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        white: {
          bg: '#F2F7FB',
          1: '#fff'
        },
        black: {
          1: '#5a5e66'
        }
      }
    }
  },
  plugins: []
}

