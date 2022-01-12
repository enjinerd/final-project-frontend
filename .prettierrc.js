module.exports = {
  arrowParens: "always",
  singleQuote: false,
  jsxSingleQuote: false,
  tabWidth: 2,
  plugins: [
    require("@trivago/prettier-plugin-sort-imports"),
    require("prettier-plugin-sort-class-names"),
  ],
  importOrderParserPlugins: ["classProperties", "typescript", "jsx"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  sortClassNamesUnknownClassesSeparator: "",
  sortClassNamesPrefixes:
    "xs:,sm:,md:,lg:,xl:,2xl:,dark:,motion-safe:,motion-reduce:,first:,last:,odd:,even:,visited:,checked:,group-hover:,group-focus:,focus-within:,hover:,focus:,focus-visible:,active:,disabled:",
  sortClassNamesSortFunctions: "clsx,classNames,cx,clsxm",
};
