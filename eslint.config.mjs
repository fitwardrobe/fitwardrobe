import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  // Local-only folders (git-ignored) and build output are not part of the site.
  { ignores: ["out/**", ".next/**", "next-env.d.ts", "brand/**", "internal/**", "photo-sources/**", "playwright-report/**", "test-results/**"] },
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript"],
    rules: {
      "react/no-unescaped-entities": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "@next/next/no-html-link-for-pages": "off"
    }
  }),
  // Playwright fixtures call use(); that is not a React hook.
  { files: ["e2e/**/*.ts"], rules: { "react-hooks/rules-of-hooks": "off" } },
];

export default eslintConfig;
