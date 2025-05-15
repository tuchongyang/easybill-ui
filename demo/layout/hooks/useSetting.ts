import type { Ref } from "vue"
import { ref, unref } from "vue"
import { setLayoutStyle } from "../utils"

const globalSetting: Ref<SettingConfig> = ref({ routes: [], layout: "classic", title: "", logo: "", tabs: "tab", pageType: "common" } as SettingConfig)

export function useSetting() {
  return globalSetting
}

export const provideSetting = (config: MergeParam) => {
  const oldConfig = useSetting()
  const cfg = (config && unref(config)) || {}
  if (!oldConfig?.value) return cfg

  const a = mergeConfig(oldConfig.value as MergeParam, cfg)
  globalSetting.value = a as SettingConfig
  setLayoutStyle(globalSetting.value)
  return
}
interface MergeParam extends Partial<SettingConfig> {
  [key: string]: unknown
}
const mergeConfig = (a: MergeParam, b: MergeParam) => {
  const keys = [...new Set([...Object.keys(a), ...Object.keys(b)])]
  const obj: MergeParam = {}
  for (const key of keys) {
    obj[key] = b[key] ?? a[key]
  }
  return obj
}

export interface SettingConfig {
  layout: "vertical" | "classic" | "transverse" | "columns" | "comprehensive" | "idc"
  routes: RouteItem[]
  theme?: "dark" | "light"
  title: string
  logo: string
  themeColor?: Partial<ThemeColor>
  tabs?: boolean | string
  pageType?: "card" | "common"
  logoPath?: string
}

export interface RouteItem {
  id: string
  path: string
  name: string
  icon?: string
  fullPath?: string
  title?: string
  disabled?: boolean
  children?: RouteItem[]
}

export interface TabItem {
  path: string
  name: string
}

export interface ThemeColor extends Record<string, string> {
  colorPrimary: string
  headerBg: string
  headerColor: string
  asideBg: string
  asideColor: string
}
