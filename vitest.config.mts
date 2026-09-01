import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    // Tests live beside the code they cover, per AGENTS.md. e2e/ is Playwright's
    // and must not be picked up here — it uses a different test runner.
    include: ['**/*.test.{ts,tsx}'],
    exclude: ['node_modules', '.next', 'out', 'e2e'],
  },
  resolve: {
    alias: { '@': import.meta.dirname },
  },
});
