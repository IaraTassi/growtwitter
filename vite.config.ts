/// <reference types="vitest" />

import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "localhost",
    port: 3000,
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./tests/setup.ts",
    coverage: {
      provider: "v8",
    },
    pool: "forks",
    maxWorkers: 1,
    alias: {
      "@mui/icons-material": path.resolve(
        __dirname,
        "tests/mocks/mui-icons.ts",
      ),
    },
  },
});
