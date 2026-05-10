import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import turboPlugin from "eslint-plugin-turbo";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import tseslint from "typescript-eslint";
import onlyWarn from "eslint-plugin-only-warn";

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const config = [
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,

  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },

    rules: {
      "simple-import-sort/imports": [
        "warn",
        {
          groups: [
            // Packages. `react` and `next` related packages come first.
            [
              "server-only",
              "client-only",
              "^react",
              "^next",
              "^@?\\w",
              "^(@|@company|@ui|components|utils|config|vendored-lib)(/.*|$)",
              "^.+\\.s?css$",
            ],
          ],
        },
      ],
      "simple-import-sort/exports": "warn",
    },
  },

  {
    plugins: {
      turbo: turboPlugin,
    },
    rules: {
      "turbo/no-undeclared-env-vars": "warn",
    },
  },
  {
    plugins: {
      onlyWarn,
    },
  },
  {
    ignores: ["dist/**"],
  },
];
