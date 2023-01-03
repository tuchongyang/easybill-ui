import { Module } from "vuex"
import { GlobalDataProps } from "@/store/index"

export interface HeaderProps {
  refresh: null | (() => void)
  headerHidden: boolean
  headerTitle: string
  headerMenu: Array<any>
  headerLeft: Array<any>
  headerRight: Array<any>
}

const layoutModule: Module<HeaderProps, GlobalDataProps> = {
  namespaced: true,
  state: {
    refresh: null,
    headerHidden: false,
    headerTitle: "",
    headerMenu: [],
    headerLeft: [],
    headerRight: [],
  } as HeaderProps,
  mutations: {
    setRefresh(state, preload) {
      state.refresh = preload
    },
    setHeaderTitle(state, preload) {
      state.headerTitle = preload
    },
    setHeaderHidden(state, preload) {
      state.headerHidden = preload
    },
    setHeaderLeft(state, preload) {
      state.headerLeft = preload
    },
    setHeaderMenu(state, preload) {
      state.headerMenu = preload
    },
    setHeaderRight(state, preload) {
      state.headerRight = preload
    },
  },
  actions: {},
}

export default layoutModule
