import globals from "globals";
import tseslint from "typescript-eslint";
import nextPlugin from "@next/eslint-plugin-next";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import reactPlugin from "eslint-plugin-react"; // Recommended for React specific rules
import reactHooksPlugin from "eslint-plugin-react-hooks"; // For hooks rules

/** @type {import('eslint').Linter.FlatConfig[]} */
export default tseslint.config(
  {
    // Global ignores
    ignores: [
      ".next/**",
      "node_modules/**",
      "dist/**",
      // Add other build/output directories if any
    ],
  },
  // Base configuration for all JS/TS files (applied first)
  {
    files: ["**/*.js", "**/*.jsx", "**/*.mjs", "**/*.cjs", "**/*.ts", "**/*.tsx"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  // TypeScript specific configurations
  ...tseslint.configs.recommended.map(config => ({
    ...config,
    files: ["**/*.ts", "**/*.tsx"],
  })),
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parserOptions: {
        project: true, // Use tsconfig.json
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  // React specific configurations (including Next.js which builds on React)
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    plugins: {
      "react": reactPlugin,
      "react-hooks": reactHooksPlugin,
      "@next/next": nextPlugin,
      "jsx-a11y": jsxA11yPlugin,
    },
    rules: {
      // React Core
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs["jsx-runtime"].rules, // If using React 17+ new JSX transform
      // React Hooks
      ...reactHooksPlugin.configs.recommended.rules,
      // Next.js specific
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      // JSX-A11y
      ...jsxA11yPlugin.configs.recommended.rules,
      // Custom rules / overrides
      "react/no-unescaped-entities": "off",
      "react/prop-types": "off", // Often not needed with TypeScript
      // Example of adjusting a rule:
      // "jsx-a11y/anchor-is-valid": [ "error", {
      //   "components": [ "Link" ],
      //   "specialLink": [ "hrefLeft", "hrefRight" ],
      //   "aspects": [ "invalidHref", "preferButton" ]
      // }],
      // Ensure Next.js Link components are handled correctly by jsx-a11y
      "jsx-a11y/anchor-is-valid": [
        "error",
        {
          components: ["Link"],
          specialLink: ["hrefLeft", "hrefRight"],
          aspects: ["invalidHref", "preferButton"],
        },
      ],
    },
  }
);
