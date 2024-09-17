/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'bg-1': '#1b1b1b',
        'bg-2': '#272727',
        'bg-icon': '#2B3A52',
        'lines-dark': '#3F3F3F',
        'lines-light': '#EAEAEA',
        'text-dark': '#636363',
        'blue': '#3A86FF',
        'delete-red': '#781515'
      },
    },
  },
  plugins: [],
}

