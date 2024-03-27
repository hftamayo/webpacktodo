const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: "media", // or 'class'
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {},
  plugins: [],
};
