const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  mode: "jit",
  purge: ["./index.html", "./src/**/*.jsx"],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Epilogue ", ...fontFamily.mono],
        secondary: ["Inter ", ...fontFamily.sans],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
