import globals from "globals";
import reactRecommended from "eslint-plugin-react/configs/recommended.js";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import babelParser from "@babel/eslint-parser";

export default [
  { ignores: ["dist", "**/*.config.js"] },
  {
    files: ["**/*.{js,jsx}"],
    ...reactRecommended,
    languageOptions: {
      ecmaVersion: "latest",
      globals: { ...globals.browser },
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ["@babel/preset-react"]
        }
      }
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true }
      ],
      "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }]
    }
  }
];