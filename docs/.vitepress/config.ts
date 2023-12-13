import { defineConfig } from "vitepress"
import nav from "./src/nav"
import sidebar from "./src/sidebar"
import { resolve } from "path"
import { mdPlugin } from "./config/plugins.ts"

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "My Awesome Project",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav,

    sidebar,

    socialLinks: [{ icon: "github", link: "https://github.com/vuejs/vitepress" }],
  },
  vite: {
    resolve: {
      alias: {
        "@": resolve(__dirname, "demo"),
        "easybill-ui": resolve(__dirname, "../../packages/easybill-ui"),
      },
      extensions: [".ts", ".js", ".vue", ".json", ".mjs"],
    },
  },

  markdown: {
    config: (md) => mdPlugin(md),
  },
})
