import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    host: true,
    proxy: {
      "/api": {
        target: "http://localhost:3333",
        // target: "http://34.27.92.129:3333",
        // target: process.env.VITE_API_BASE_URL,
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false,
        // ws: true
      },
    },
    hmr: {
      overlay: false,
    },
  },
  css: {
    devSourcemap: true,
  },
});
