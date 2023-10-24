/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements-react/dist/js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: '#121212ed',
        secondaryColor:'#00000099',
        highlight: '#8f5849',
        danger: '#cf0007',
        background: '#ebdece7a',
        borderColor: '#dfdee2',
        color: '#6b7280'
      },
      fontSize: {
        'base': "15px"
      },
    },
  },
  darkMode: "class",
  plugins: [require("tw-elements-react/dist/plugin.cjs")]
}