// eslint.config.js (Flat Config – React + TS)
import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import jsxA11y from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";

export default [
  // Ignorar artefactos
  { ignores: ["dist/**", "build/**", "node_modules/**"] },

  // Base JS y TS
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // Reglas específicas para React + Hooks + A11y + Imports
  {
    plugins: {
      react,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
      import: importPlugin,
    },
    settings: {
      react: { version: "detect" },
      "import/resolver": { typescript: true },
    },
    rules: {
      "react/react-in-jsx-scope": "off", // React 17+
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      "import/order": [
        "error",
        {
          "newlines-between": "always",
          alphabetize: { order: "asc" },
        },
      ],

      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
    },
  },

  // 🔧 Override solo para tests
  {
    files: ["**/*.test.ts", "**/*.test.tsx"],
    rules: {
      "import/order": "off", // desactiva orden en tests
    },
  },

  // Desactiva choques con Prettier (formato lo hace Prettier)
  eslintConfigPrettier,
];
