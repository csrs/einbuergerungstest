import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    include: ["src/**/*.test.tsx", "src/**/*.test.ts"],
    globals: true,
    environment: "jsdom",
    clearMocks: true,
  },
});
