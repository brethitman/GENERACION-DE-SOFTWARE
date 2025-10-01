/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from "@vitejs/plugin-react";  // 👈 primero
import { defineConfig } from "vite";       // 👈 luego

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
    css: true,
    clearMocks: true,
    restoreMocks: true,
  },
});
