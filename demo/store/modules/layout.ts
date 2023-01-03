import { Storage } from "easybill-ui/utils"
import { Module } from "vuex"
import { GlobalDataProps } from "@/store/index"
const layout = Storage.get("layout") || {}

export interface LayoutProps {
  sideOpen: boolean
  layout: BigIntToLocaleStringOptions
  tagViewType: string
  screenlock: boolean
  [key: string]: any
}
const layoutModule: Module<LayoutProps, GlobalDataProps> = {
  namespaced: true,
  state: {
    sideOpen: true, // 左侧菜单
    layout: "slide",
    tagViewType: "tab",
    screenlock: layout.screenlock || false,
    theme: layout.theme || "light",
    title: "Easybill Ui",
    logo: "",
  } as LayoutProps,
  mutations: {
    toggleSide(state) {
      state.sideOpen = !state.sideOpen
    },
    setTheme(state, preload) {
      state.theme = preload
      Storage.set("layout", state)
    },
    setLayout(state, preload) {
      state.layout = preload
    },
    setTagViewType(state, preload) {
      state.tagViewType = preload
    },
    setScreenlock(state, preload) {
      state.screenlock = preload
      Storage.set("layout", state)
    },
  },
}

export default layoutModule
