/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        backgroundImage: {
          'main': "url('/images/Site_BG1.webp')",
          'login': "url('/images/Site_BG.webp')",
        }
      }
    },
    fontFamily:{
      raleway:['Raleway', 'sans-serif'],
      opensans:['Open Sans', 'sans-serif'],
    },
    colors:{
      csGreen: '#EAFF6A',
      white: '#FFFFFF',
      black: '#000000',
      grey: '#555555',
      darkgrey: 'darkgrey',
      orange: '#E54A1A'
    },
    fontSize: {
      price: '2.5rem',
      card_title: '2.5rem',
      button: '1.8rem'
    },
    fontWeight:{
      regular: 400,
      bold: 600,
      bolder: 800
    }
  },
  plugins: [],
}

