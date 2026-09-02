import { defineConfig, devices } from '@playwright/test';

const PORT = 8788;

// Escape hatch for images that ship a browser rather than letting Playwright
// download one (CI containers, Nix, sandboxes). Unset everywhere else, so
// Playwright resolves its own pinned build as usual.
const executablePath = process.env.PLAYWRIGHT_CHROMIUM_PATH;

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? 'github' : 'list',

  use: {
    baseURL: `http://127.0.0.1:${PORT}`,
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        ...(executablePath ? { launchOptions: { executablePath } } : {}),
      },
    },
  ],

  // Served by wrangler rather than a plain static server so the suite exercises
  // what production actually does with the export: extensionless URLs resolving
  // to flat .html files, 404.html as the not-found page, and public/_headers.
  webServer: {
    command: `pnpm build && pnpm exec wrangler dev --port ${PORT} --ip 127.0.0.1`,
    url: `http://127.0.0.1:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
    stdout: 'pipe',
    stderr: 'pipe',
  },
});
