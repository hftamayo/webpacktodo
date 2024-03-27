const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: "media", // or 'class'
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", ...defaultTheme.fontFamily.sans],
      },
      crudTable: {
        "crud-row": "bg-white border-b",
        "crud-cell":
          "text-lg text-gray-900 font-light px-6 py-4 whitespace-nowrap",
      },
    },
  },
  variants: {},
  plugins: [],
};
