import path from "node:path";

import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";

import { playwright } from "@vitest/browser-playwright";

const dirname = import.meta.dirname;

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  resolve: {
    alias: { "@": dirname },
  },
  test: {
    projects: [
      {
        extends: true,
        plugins: [react()],
        test: {
          name: "unit",
          environment: "jsdom",
          include: ["app/**/*.test.{ts,tsx}"],
        },
      },
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({ configDir: path.join(dirname, ".storybook") }),
        ],
        test: {
          name: "storybook",
          // The Playwright CDN is not reachable from this machine, so the
          // system Chrome install is used instead of a downloaded Chromium.
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({ launchOptions: { channel: "chrome" } }),
            instances: [{ browser: "chromium" }],
          },
        },
      },
    ],
  },
});
