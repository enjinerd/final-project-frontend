module.exports = {
  settings: {
    react: {
      version: "detect",
    },
  },
  parserOptions: {
    ecmaVersion: 11,
    sourceType: "module",
  },
  env: {
    commonjs: true,
    node: true,
    browser: true,
    es6: true,
    jest: true,
  },
  plugins: ["react", "unused-imports"],
  extends: ["eslint:recommended", "plugin:react/recommended", "prettier"],
  rules: {
    "no-unused-vars": "off",
    "no-console": "warn",
    "@typescript-eslint/explicit-module-boundary-types": "off",

    //#region  //*=========== Unused Import ===========
    "@typescript-eslint/no-unused-vars": "off",
    "unused-imports/no-unused-imports": "warn",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],
    //#endregion  //*======== Unused Import ===========

    // //#region  //*=========== Import Sort ===========
    // "simple-import-sort/exports": "warn",
    // "simple-import-sort/imports": [
    //   "warn",
    //   {
    //     groups: [
    //       // ext library & side effect imports
    //       // {s}css files
    //       ["^.+\\.s?css$"],
    //       // Lib and hooks
    //       ["^lib", "^@/hooks"],
    //       // static data
    //       ["^helpers"],
    //       // components
    //       ["^components"],
    //       // zustand store
    //       ["^stores"],
    //       // Other imports
    //       // relative paths up until 3 level
    //       [
    //         "^\\./?$",
    //         "^\\.(?!/?$)",
    //         "^\\.\\./?$",
    //         "^\\.\\.(?!/?$)",
    //         "^\\.\\./\\.\\./?$",
    //         "^\\.\\./\\.\\.(?!/?$)",
    //         "^\\.\\./\\.\\./\\.\\./?$",
    //         "^\\.\\./\\.\\./\\.\\.(?!/?$)",
    //       ],
    //       // other that didnt fit in
    //       ["^"],
    //     ],
    //   },
    // ],
    //#endregion  //*======== Import Sort ===========
  },
  globals: {
    React: true,
    JSX: true,
  },
};
