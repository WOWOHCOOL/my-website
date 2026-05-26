/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{njk,html}',
    './main.src.js',
    './main.js',
    './de/js/de-main.js',
  ],
  theme: {
    extend: {
      colors: {
        brandOrange: '#FF6B00',
        brandBlue: '#0A192F',
        darkBg: '#020B1A',
      },
      zIndex: {
        '100': '100',
        '150': '150',
        '300': '300',
        '500': '500',
      },
    },
  },
  corePlugins: {
    preflight: true,
  },
};
