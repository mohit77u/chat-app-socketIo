/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-primary' : '#0d1117',
        'green-primary' : '#238636',
        'dark-main' : '#010409',
      }
    },
  },
  plugins: [],
}
