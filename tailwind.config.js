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
      },
      backgroundColor:{
        'glass': 'rgba(255, 255, 255, 0.1)'
      },
      dropShadow:{
        'green': '5px 5px 10px #EAFF6A',
      },
      boxShadow:{
        'card':'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',
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
      darkgrey: '#3b3b3b',
      orange: '#E54A1A'
    },
    fontSize: {
      price: '1.3rem',
      card_title: '1.5rem',
      button: '1rem'
    },
    fontWeight:{
      regular: 400,
      bold: 600,
      bolder: 800
    }
  },
  plugins: [],
}

