import { loadEnv } from "vite";
import { defineConfig } from "vitest/config";

export default defineConfig(({ mode }) => ({
  test: {
    setupFiles: ["dotenv/config"],
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "**/cypress/**",
      "**/.idea/**",
      "**/test-results/**",
      "**/tmp/**",
    ],
    env: loadEnv(mode, process.cwd(), ""),
  },
}));
