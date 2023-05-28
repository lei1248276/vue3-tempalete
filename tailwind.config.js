/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  corePlugins: {
    preflight: false
  },
  theme: {
    extend: {
      colors: {
        white: {
          DEFAULT: '#fff',
          bg: '#F2F7FB'
        },
        black: {
          DEFAULT: '#333',
          1: '#5a5e66'
        }
      }
    }
  },
  plugins: []
}

