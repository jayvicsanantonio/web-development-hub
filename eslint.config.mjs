import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypeScript from 'eslint-config-next/typescript';

/**
 * Flat config, replacing the former `.eslintrc.json`. Next 16 removed `next
 * lint`, so the `lint` script calls `eslint` directly, and eslint-config-next
 * v16 ships flat-config arrays that spread straight in.
 *
 * Pinned to ESLint 9: no stable eslint-plugin-react supports ESLint 10 yet
 * (its peer range stops at ^9.7), and eslint-config-next depends on it.
 */
const config = [
  {
    ignores: [
      '.next/**',
      '.open-next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
    ],
  },

  ...nextCoreWebVitals,
  ...nextTypeScript,

  {
    rules: {
      'react/no-unescaped-entities': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
    },
  },

  {
    // The service worker runs outside the bundler, in its own global scope.
    files: ['public/sw.js'],
    languageOptions: {
      globals: {
        self: 'readonly',
        caches: 'readonly',
        clients: 'readonly',
        fetch: 'readonly',
        Response: 'readonly',
        Request: 'readonly',
        URL: 'readonly',
      },
    },
  },
];

export default config;
