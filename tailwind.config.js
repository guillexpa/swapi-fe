/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: 'Inter, Avenir, Helvetica, Arial, sans-serif',
    },
    extend: {},
  },
  plugins: [],
};
