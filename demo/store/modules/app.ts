import { Module } from "vuex"
import { GlobalDataProps } from "@/store/index"
import { OptionItem } from "easybill-ui/index"
import { Storage } from "easybill-ui/utils"

export interface AppProps {
  enums: { [key: string]: OptionItem[] }
  tenantInfo: TenantInfo
  aliveExcludes: string[]
}
export interface TenantInfo extends Record<string, string> {
  favicon: string
  faviconDesc: string
  logo: string
  logoLight: string
  logoDesc: string
  sideTheme: string
  headerTheme: string
  primaryColor: string
}

const layoutModule: Module<AppProps, GlobalDataProps> = {
  namespaced: true,
  state: {
    enums: Storage.get("enums") || {},
    tenantInfo: {} as TenantInfo,
    aliveExcludes: [],
  } as AppProps,
  mutations: {
    setEnums(state, preload) {
      state.enums = preload
      Storage.set("enums", preload)
    },
    setTenantItem(state, preload) {
      state.tenantInfo[preload.key] = preload.value
    },
    setTenantInfo(state, preload) {
      state.tenantInfo = preload
      document.title = preload.faviconDesc || "Bill"
      // 设置favicon
      const dom = document.getElementById("FaviconLogo") as HTMLLinkElement
      dom && (dom.href = preload.favicon || "")
      // 设置主题
      const classAttr = document.documentElement
        .getAttribute("class")
        ?.replace(/header-[a-z]+\s?/, "")
        .replace(/side-[a-z]+\s?/, "")
      document.documentElement.setAttribute("class", classAttr || "")
      ;["sideTheme", "headerTheme"].forEach((key) => {
        const value = preload[key]
        if (value) {
          document.documentElement.classList.add(value)
        }
      })

      // 设置主题色
      // if (preload.primaryColor) {
      //   setPrimaryColor(preload.primaryColor)
      // }
    },
    addAliveExclude(state, preload) {
      if (!state.aliveExcludes.includes(preload)) {
        state.aliveExcludes.push(preload)
      }
    },
    clearAliveExclude(state) {
      state.aliveExcludes = []
    },
  },
  actions: {},
}

export default layoutModule
