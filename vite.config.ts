import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import polyfillNode from "rollup-plugin-node-polyfills";

export default defineConfig({
  base: "/",
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
