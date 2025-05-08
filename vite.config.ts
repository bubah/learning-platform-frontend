import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import polyfillNode from "rollup-plugin-node-polyfills";

// https://vite.dev/config/
export default defineConfig({
  // base: '/frontend/main/latest/',
  plugins: [react()],
  define: {
    global: "window",
  },
  resolve: {
    alias: {
      buffer: "buffer",
    },
  },
  build: {
    rollupOptions: {
      plugins: [polyfillNode() as unknown as import("rollup").Plugin],
    },
  },
  optimizeDeps: {
    include: ["buffer"],
  },
});
