import { defineConfig, devices } from "@playwright/test"

/**
 * End-to-end tests. By default they run against the static export in out/ (run `pnpm build` first).
 * Set E2E_BASE_URL=https://fitwardrobe.me to run the same checks against the live site.
 */
const remote = process.env.E2E_BASE_URL

export default defineConfig({
  testDir: "e2e",
  timeout: 90_000,
  fullyParallel: true,
  workers: 2,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: remote ?? "http://127.0.0.1:4173",
    launchOptions: { args: ["--disable-gpu"] },
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "desktop",
      testIgnore: /mobile\.spec\.ts/,
      use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } },
    },
    {
      name: "mobile",
      testMatch: /(mobile|home|form)\.spec\.ts/,
      use: { ...devices["Pixel 7"] },
    },
  ],
  webServer: remote
    ? undefined
    : {
        command: "node scripts/serve-out.mjs",
        url: "http://127.0.0.1:4173/",
        reuseExistingServer: true,
        timeout: 30_000,
      },
})
