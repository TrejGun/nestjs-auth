import typescriptRules from "@ethberry/eslint-config/presets/tsx.mjs";
import jestRules from "@ethberry/eslint-config/tests/jest.mjs";

export default [
  {
    ignores: ["**/dist", "**/coverage"],
  },

  {
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.eslint.json", "./*/tsconfig.eslint.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      "import/resolver": {
        typescript: {
          project: ["./tsconfig.eslint.json", "./*/tsconfig.eslint.json"],
        },
      },
    },
  },

  ...typescriptRules,
  ...jestRules,
];
