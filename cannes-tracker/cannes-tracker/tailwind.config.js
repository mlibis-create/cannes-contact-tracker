/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        blurple: '#4E4EFF',
        'paid-black': '#12131B',
        'paid-white': '#F2F0EB',
        'paid-card': '#1C1D27',
        'paid-card2': '#21232D',
        'paid-purple': '#8383FF',
        'cannes-gold': '#C9A84C',
      },
      fontFamily: {
        sans: ['Instrument Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
