/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
 
    extend: {
      colors: {
        'DarkGreen': '#2E5834',
        'LightBlack': '#1D1D1D',
        'Brown': '#C57D5D',
        'LightGreen': '#D7E0D8',
        'LightGrey': '#FBFBFB',
        'White': '#FFFFFF',
         'borderColor':'rgba(111, 111, 111, 0.3)'
      },
    },
  },
  plugins: [],
}
