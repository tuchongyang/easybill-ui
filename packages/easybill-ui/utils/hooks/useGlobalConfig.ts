import { ref, App, unref } from "vue"
const globalConfig = ref()
export function useGlobalConfig() {
  return globalConfig
}
export const provideGlobalConfig = (config: any, app?: App, global = false) => {
  const oldConfig = useGlobalConfig()
  const cfg = unref(config)
  if (!oldConfig?.value) return cfg

  return mergeConfig(oldConfig.value, cfg)
}
const mergeConfig = (a: any, b: any): any => {
  const keys = [...new Set([...Object.keys(a), ...Object.keys(b)])]
  const obj: Record<string, any> = {}
  for (const key of keys) {
    obj[key] = b[key] ?? a[key]
  }
  return obj
}
