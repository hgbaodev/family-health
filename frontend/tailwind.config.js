/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00A76F",
        "primary-hover": "#007867",
      },
      backgroundColor: (theme) => ({
        ...theme('colors'),
      }),
      textColor: (theme) => ({
        ...theme('colors'),
      }),
      borderColor: (theme) => ({
        ...theme('colors'),
      }),
    },
  },
  plugins: [],
}