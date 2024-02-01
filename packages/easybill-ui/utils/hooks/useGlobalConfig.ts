import { ref, unref, Ref } from "vue"
const globalConfig: Ref<GlobalConfig> = ref({} as GlobalConfig)
export function useGlobalConfig() {
  return globalConfig
}
export const provideGlobalConfig = (config: any) => {
  const oldConfig = useGlobalConfig()
  const cfg = (config && unref(config)) || {}
  if (!oldConfig?.value) return cfg

  const a = mergeConfig(oldConfig.value, cfg)
  globalConfig.value = a
  return
}
const mergeConfig = (a: any, b: any): any => {
  const keys = [...new Set([...Object.keys(a), ...Object.keys(b)])]
  const obj: Record<string, any> = {}
  for (const key of keys) {
    obj[key] = b[key] ?? a[key]
  }
  return obj
}

export interface GlobalConfig {
  size: "default" | "small" | "medium"
  form?: FormConfig
}
interface FormConfig {
  components?: any[]
}
