module.exports = {
  // "parser": "babel-eslint",
  parser: '@typescript-eslint/parser',
  // env: {
  //   browser: true,
  //   es6: true,
  // },
  extends: [
    "plugin:react/recommended",
    // "airbnb",
    "airbnb-typescript",
  ],
  // globals: {
  //   Atomics: "readonly",
  //   SharedArrayBuffer: "readonly",
  // },
  parserOptions: {
    // ecmaFeatures: {
    //   jsx: true,
    // },
    // ecmaVersion: 2018,
    // sourceType: "module",
    project: './tsconfig.json',
  },
  plugins: [
    "react",
    "react-hooks",
      '@typescript-eslint',
  ],
  settings: {
    react: {
      version: "detect" // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/quotes": [
      "error",
      "double"
    ],
    "quotes": [
      "error",
      "double",
    ],
    "linebreak-style": [
      "error",
      "windows",
    ],
    "react/state-in-constructor": ["error", "never"],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "lines-between-class-members": "off",
    "@typescript-eslint/lines-between-class-members": "off",
  },
};
