// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require("eslint-config-expo/flat");
const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended");

module.exports = defineConfig([
  expoConfig,
  eslintPluginPrettierRecommended,
  {
    extends: ["expo", "prettier"],
    plugins: ["prettier", "react-native"],
    rules: {
      "prettier/prettier": "error",
      "react-native/no-unused-styles": "error",
    },
    ignorePatterns: ["dist/*"],
  },
]);
