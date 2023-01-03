import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { resolve } from "path"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "demo"),
      "easybill-ui": resolve(__dirname, "packages/easybill-ui"),
    },
    extensions: [".ts", ".js", ".vue", ".json", ".mjs"],
  },
})
