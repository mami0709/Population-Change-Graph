import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  retries: 1,
  use: {
    baseURL: 'http://localhost:4000',
    headless: true,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 0,
    video: 'on-first-retry',
  },
  webServer: {
    command: 'npm run dev',
    port: 4000,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
  reporter: 'html',
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],
});
