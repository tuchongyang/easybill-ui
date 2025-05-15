import type { App, Plugin } from "vue"
import { type GlobalConfig, provideGlobalConfig } from "../hooks/useGlobalConfig"
const INSTALLED_KEY = Symbol("INSTALLED_KEY")

export const makeInstaller = (components: Plugin[] = []) => {
  const install = (app: App, options?: GlobalConfig) => {
    if (Reflect.get(app, INSTALLED_KEY)) return
    if (options) provideGlobalConfig(options)
    Reflect.set(app, INSTALLED_KEY, true)
    components.forEach((c) => app.use(c))
  }

  return {
    install,
  }
}
