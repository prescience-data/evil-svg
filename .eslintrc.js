require("@rushstack/eslint-config/patch/modern-module-resolution")

const when = (env) => (process.env.NODE_ENV === env ? "error" : "off")

module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: [
    "@rushstack/eslint-config/mixins/friendly-locals",
    "@rushstack/eslint-config/profile/web-app",
  ],
  ignorePatterns: [ "**/*.d.ts", "bin", "dist", "lib", "test" ],
  overrides: [
    {
      files: [ "*.md" ],
      parser: "markdown-eslint-parser",
    },
    {
      files: [ "**/*.ts" ],
      parserOptions: {
        project: [ "./tsconfig.json" ],
      },
    },
    {
      files: [ "**/*.js", "**/*.cjs", "**/*.mjs" ],
      parser: "espree",
      parserOptions: {
        ecmaVersion: 6,
      },
      rules: {
        "@typescript-eslint/naming-convention": "off",
      },
    },
    {
      files: [ "**/types.ts", "**/types/*.ts" ],
      rules: {
        "@typescript-eslint/no-explicit-any": "off",
        "@rushstack/no-new-null": "off",
      },
    },
  ],
  parserOptions: {
    parser: "@typescript-eslint/parser",
  },
  plugins: [ "simple-import-sort", "prefer-arrow" ],
  rules: {
    "no-eval":"off",
    "@typescript-eslint/member-ordering": "error",
    "@typescript-eslint/naming-convention": [
      "warn",
      {
        custom: {
          match: false,
          regex: "^I[A-Z]",
        },
        format: [ "PascalCase" ],
        selector: "interface",
      },
    ],
    "@typescript-eslint/no-floating-promises": when("test"),
    "@typescript-eslint/no-non-null-assertion": "warn",
    "@typescript-eslint/no-unused-vars": [ "error" ],
    "@typescript-eslint/typedef": "off",
    "arrow-body-style": [ "error", "as-needed" ],
    "block-spacing": "error",
    "import/order": "off",
    "lines-around-comment": [
      "error",
      {
        afterBlockComment: false,
        afterLineComment: false,
        allowBlockStart: true,
        allowClassStart: true,
        allowObjectStart: true,
        beforeBlockComment: true,
        beforeLineComment: true,
      },
    ],
    "no-console": when("production"),
    "no-debugger": when("production"),
    "no-return-await": "error",
    "no-unused-vars": "off",
    "object-curly-spacing": [ "error", "always" ],
    "prefer-arrow/prefer-arrow-functions": [
      "error",
      {
        classPropertiesAllowed: false,
        disallowPrototype: true,
        singleReturnOnly: false,
      },
    ],
    "simple-import-sort/exports": "error",
    "simple-import-sort/imports": "error",
  },
}
