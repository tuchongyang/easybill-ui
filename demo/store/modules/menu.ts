import { Module } from "vuex"
import { GlobalDataProps } from "../index"
import router from "@/router"
import { Storage } from "easybill-ui/utils"
export interface MenuProps {
  currentMenuIndex: number
  currentEndMenu: EndMenuItem | undefined
  menus: Array<any>
  menuUrlMap: UrlMap
  mapPaths: Array<any>
}
export interface MenuItem {
  name: string
  url: string
  icon: string
  children: Array<MenuItem>
  sortIndex: number
}

interface EndMenuItem {
  level: number
}
interface UrlMap {
  [key: string]: string
}

const menus = Storage.get("menus") || {}
const layoutModule: Module<MenuProps, GlobalDataProps> = {
  namespaced: true,
  state: {
    currentMenuIndex: -1,
    currentEndMenu: undefined,
    mapPaths: [],
    menus: menus || [], // 菜单
    // 存储所有url对应的name，用户header显示
    menuUrlMap: {},
  } as MenuProps,
  mutations: {
    setMenu(state, preload) {
      state.menus = preload || []
      Storage.set("menus", preload)
    },
    setCurrentMenuIndex(state, preload) {
      state.currentMenuIndex = preload
    },
    setCurrentEndMenu(state, preload) {
      state.currentEndMenu = preload
    },
    setMapPaths(state, preload) {
      state.mapPaths = preload
    },
    setMenuUrlMap(state, preload) {
      const result: any = {}
      const find = (menus: Array<MenuItem>) => {
        for (let i = 0; i < menus.length; i++) {
          if (menus[i].children) {
            find(menus[i].children)
          }
          result[menus[i].url] = menus[i].name
        }
      }
      find(preload)
      state.menuUrlMap = result
    },
  },
  actions: {
    getCurrentMenuIndex({ state, commit }) {
      const parentPath = router.currentRoute.value.meta?.parent as string
      let path = parentPath || router.currentRoute.value.path
      if (router.currentRoute.value.name == "webview") {
        path = decodeURIComponent(String(router.currentRoute.value.query.src))
      }
      const find = (list: any, rootIndex: number) => {
        for (let i = 0; i < list.length; i++) {
          const menu = list[i]
          if (menu.children && menu.children.length) {
            find(menu.children, rootIndex <= -1 ? i : rootIndex)
          }
          if (menu.url == path) {
            commit("setCurrentMenuIndex", rootIndex <= -1 ? i : rootIndex)
          }
        }
      }
      find(state.menus, -1)
    },
    getCurrentEndMenu({ state, commit }) {
      const routes = state.menus[state.currentMenuIndex]?.children
      let result: EndMenuItem | undefined = undefined
      if (!routes || !routes.length) {
        commit("setCurrentEndMenu", result)
        return
      }
      // const parentPath = router.currentRoute.value.meta?.parent as string
      let path = router.currentRoute.value.path
      if (router.currentRoute.value.name == "webview") {
        path = decodeURIComponent(String(router.currentRoute.value.query.src))
      }
      let paths: any = []
      const find = (childs: Array<any>, level: number, parent: any) => {
        for (let i = 0; i < childs.length; i++) {
          if (level == 1) {
            paths = []
          }
          paths = paths.slice(0, level + 1)
          paths[level] = childs[i]
          if (childs[i].url == path) {
            if (level >= 3) {
              result = {
                ...parent,
                level,
              }
            } else {
              result = {
                ...childs[i],
                level,
              }
            }
            return
          } else if (childs[i].children && childs[i].children.length) {
            find(childs[i].children, level + 1, childs[i])
          }
        }
      }
      find(routes, 1, null)
      paths[0] = state.menus[state.currentMenuIndex]
      // console.log("result", result)
      // console.log("paths", paths)
      commit("setCurrentEndMenu", result)
      commit("setMapPaths", paths)
    },
  },
}

export default layoutModule
