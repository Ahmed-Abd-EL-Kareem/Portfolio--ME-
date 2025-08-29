import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),
  {
    rules: {
      // تحسين الأداء
      "react/no-unescaped-entities": "off",
      "react/display-name": "off",
      "@next/next/no-img-element": "off",
      
      // تحسين جودة الكود
      "prefer-const": "error",
      "no-var": "error",
      "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
      "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
      
      // تحسين React
      "react/jsx-key": "error",
      "react/jsx-no-duplicate-props": "error",
      "react/jsx-no-undef": "error",
      "react/no-array-index-key": "warn",
      
      // تحسين TypeScript
      "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/prefer-const": "error",
      
      // تحسين Accessibility
      "jsx-a11y/alt-text": "error",
      "jsx-a11y/anchor-has-content": "error",
      "jsx-a11y/anchor-is-valid": "error",
      "jsx-a11y/aria-props": "error",
      "jsx-a11y/aria-proptypes": "error",
      "jsx-a11y/aria-unsupported-elements": "error",
      "jsx-a11y/role-has-required-aria-props": "error",
      "jsx-a11y/role-supports-aria-props": "error",
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    },
  },
];

export default eslintConfig;
