import type { Plugin } from "vue"
import { provideGlobalConfig, GlobalConfig } from "../hooks/useGlobalConfig"
const INSTALLED_KEY = Symbol("INSTALLED_KEY")

export const makeInstaller = (components: Plugin[] = []) => {
  const install = (app: any, options?: GlobalConfig) => {
    if (app[INSTALLED_KEY]) return
    provideGlobalConfig(options)
    app[INSTALLED_KEY] = true
    components.forEach((c) => app.use(c))
  }

  return {
    install,
  }
}
