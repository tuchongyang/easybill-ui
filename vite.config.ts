import vue from "@vitejs/plugin-vue"
import { resolve } from "path"
import { defineConfig } from "vite"
import pages from "vite-plugin-pages"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    pages({
      dirs: "demo/views",
      extensions: ["vue"],
      exclude: ["**/components/*.vue", "**/components/**/*.vue"],
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "demo"),
      "easybill-ui": resolve(__dirname, "packages/easybill-ui"),
    },
    extensions: [".ts", ".js", ".vue", ".json", ".mjs"],
  },
})
