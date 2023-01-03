import { createStore } from "vuex"
import layout, { LayoutProps } from "./modules/layout"
import tagsView, { tagsViewProps } from "./modules/tagsView"
import app, { AppProps } from "./modules/app"
import menu, { MenuProps } from "./modules/menu"
import header, { HeaderProps } from "./modules/header"
export interface GlobalDataProps {
  layout: LayoutProps
  tagsView: tagsViewProps
  app: AppProps
  menu: MenuProps
  header: HeaderProps
}

export default createStore<GlobalDataProps>({
  mutations: {},
  actions: {},
  modules: {
    layout,
    tagsView,
    app,
    menu,
    header,
  },
})
