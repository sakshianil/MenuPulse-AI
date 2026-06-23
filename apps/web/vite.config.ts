import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");
  const apiTarget = env.API_PROXY_TARGET || "http://127.0.0.1:3000";

  return {
    plugins: [vue()],
    server: {
      port: 5173,
      proxy: {
        "/api": apiTarget,
        "/health": apiTarget
      }
    }
  };
});
