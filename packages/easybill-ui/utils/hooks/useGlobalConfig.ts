import { ref, type Ref, unref } from "vue"
const globalConfig: Ref<GlobalConfig> = ref({} as GlobalConfig)
export function useGlobalConfig() {
  return globalConfig
}
export const provideGlobalConfig = (config: Partial<GlobalConfig>) => {
  const oldConfig = useGlobalConfig()
  const cfg = (config && unref(config)) || {}
  if (!oldConfig?.value) return cfg

  const a = mergeConfig(oldConfig.value, cfg)
  globalConfig.value = a
  return
}
const mergeConfig = (a: GlobalConfig, b: Partial<GlobalConfig>) => {
  const keys = [...new Set([...Object.keys(a), ...Object.keys(b)])]
  const obj: GlobalConfig = {} as GlobalConfig
  for (const key of keys) {
    const k = key as keyof GlobalConfig
    if (k === "size") {
      obj[k] = (b[k] ?? a[k]) as "default" | "small" | "large"
    } else if (k === "form") {
      obj[k] = (b[k] ?? a[k]) as FormConfig | undefined
    } else {
      obj[k] = b[k] ?? a[k]
    }
  }
  return obj
}

export interface GlobalConfig {
  size: "default" | "small" | "large"
  form?: FormConfig
}
interface FormConfig {
  components?: unknown[]
}
