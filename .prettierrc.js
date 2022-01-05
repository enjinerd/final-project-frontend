module.exports = {
  arrowParens: "always",
  singleQuote: false,
  jsxSingleQuote: false,
  tabWidth: 2,
  plugins: [require("@trivago/prettier-plugin-sort-imports")],
  importOrderParserPlugins: ["classProperties", "typescript", "jsx"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
