/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'bg-1': '#1b1b1b',
        'bg-2': '#272727',
        'bg-icon': '#2B3A52',
        'lines-dark': '#2F2F2F',
        'lines-light': '#EAEAEA',
        'text-dark': '#545454',
        'blue': '#3A86FF',
      },
    },
  },
  plugins: [],
}

