import typescriptRules from "@ethberry/eslint-config/presets/tsx.mjs";
import jestRules from "@ethberry/eslint-config/tests/jest.mjs";

export default [
  {
    ignores: ["**/dist"],
  },

  {
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.eslint.json", "./*/tsconfig.eslint.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  ...typescriptRules,
  ...jestRules,
];
