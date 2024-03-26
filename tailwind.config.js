/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      'yellow': '#FCD702',
      'white': '#FFF',
      'black': '#2E2D31',
      'light-blue': '#F2F9FA',
      'light-yellow': '#FFFDEC',
      'light-yellow-2': '#FAF8F0',
      'light-gray': '#f1f7f8',
      'dark-gray': '#444',
      'gray-d8': '#d8d8d8',
      'gray': '#F5F5F5',
      'danger': "#D62627"
    },
    fontFamily: {
      'gotham': ["Gotham-bold", 'serif'],
      'mulish': ['Mulish', 'sans-serif']
    },
    fontSize: {
      '4xl': '78px',
      '3xl': '68px',
      '2xl': '62px',
      'xl': '36px',
      'l': '24px',
      'm': '18px',
      's': '12px',
      'xs': '10px'
    },
    screens: {
      'xs': '500px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      boxShadow:{
        'lg': '0px 4px 15px 0px rgba(0, 0, 0, 0.07)',
      },
      scale:{
        "101": "1.01"
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ]
}

