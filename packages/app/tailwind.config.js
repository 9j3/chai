/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb', // blue-600
        'primary-hover': '#1d4ed8', // blue-700
        'primary-lighter': '#60a5fa' // blue-400
      }
    }
  },
  plugins: []
}
