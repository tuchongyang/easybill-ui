import type { App, Component } from "vue"
import type { SFCWithInstall } from "./typescript"

export const withInstall = <T, E extends Record<string, unknown>>(main: T, extra?: E) => {
  ;(main as SFCWithInstall<T>).install = (app: App): void => {
    for (const comp of [main, ...Object.values(extra ?? {})]) {
      const component = comp as Component
      app.component(component.name || "", component)
    }
  }

  if (extra) {
    for (const [key, comp] of Object.entries(extra)) {
      ;(main as Record<string, unknown>)[key] = comp
    }
  }
  return main as SFCWithInstall<T> & E
}
