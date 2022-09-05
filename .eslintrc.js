module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ["plugin:react/recommended", "standard"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: ["react"],
  rules: {
    "space-before-function-paren": "off",
    "comma-dangle": "off",
    "object-curly-spacing": "off",
    quotes: "off",
    "multiline-ternary": "off",
    indent: "off",
    semi: [2, "always"] // Точка с запятой в конце строки
  }
};
