import { Module, Commit } from "vuex"
import { GlobalDataProps } from "../index"
export interface tagsViewProps {
  visitedViews: Array<any>
}
export interface Actions {
  // // 用户登录
  // [Action.SING_IN](
  //     { commit }: { commit: Commit; state: State },
  //     payload: SignupRequest
  // ): Promise<string>
  // 用户登出
  // [Action.SING_OUT]({ commit }: { commit: Commit; state: State }): Promise<void>
  // 用户信息
  ["addView"]({ commit }: { commit: Commit; view: any }): Promise<undefined>
}
const tagsViewModule: Module<tagsViewProps, GlobalDataProps> = {
  namespaced: true,
  state: {
    visitedViews: [],
  } as tagsViewProps,
  mutations: {
    ADD_VISITED_VIEW: function (state: tagsViewProps, view: any) {
      const current = state.visitedViews.find((v) => v.path === view.path)
      if (current) {
        // 更新路由信息
        current.query = view.query
        current.fullPath = view.fullPath
        current.params = view.params
        return
      }
      //limit num
      if (state.visitedViews.length >= 10) {
        state.visitedViews.pop()
      }
      let title = view.meta.title || "no-name"
      const mapPaths = this.state.menu.mapPaths
      if (view.name == "webview" && mapPaths.length) {
        title = mapPaths[mapPaths.length - 1].name
      }
      state.visitedViews.push(
        Object.assign({}, view, {
          title,
        })
      )
    },

    DEL_VISITED_VIEW(state: tagsViewProps, view: any) {
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          this.commit("app/addAliveExclude", state.visitedViews[i].name)
          state.visitedViews.splice(i, 1)
          break
        }
      }
    },

    DEL_OTHERS_VISITED_VIEWS: (state: tagsViewProps, view: any) => {
      state.visitedViews = state.visitedViews.filter((v) => {
        return v.meta.affix || v.path === view.path
      })
    },

    DEL_LEFT_VIEWS: (state: tagsViewProps, path: any) => {
      const index = state.visitedViews.findIndex((v) => v.path == path)
      state.visitedViews = state.visitedViews.filter((v, i) => {
        return v.meta.affix || i >= index
      })
    },

    DEL_RIGHT_VIEWS: (state: tagsViewProps, path: any) => {
      const index = state.visitedViews.findIndex((v) => v.path == path)
      state.visitedViews = state.visitedViews.filter((v, i) => {
        return v.meta.affix || i <= index
      })
    },

    DEL_ALL_VISITED_VIEWS: (state: tagsViewProps) => {
      // keep affix tags
      state.visitedViews = state.visitedViews.filter((tag) => tag.meta.affix)
    },

    UPDATE_VISITED_VIEW: (state: tagsViewProps, view: any) => {
      for (let v of state.visitedViews) {
        if (v.path === view.path) {
          v = Object.assign(v, view)
          break
        }
      }
    },
  },
  actions: {
    addView({ dispatch }, view: any) {
      dispatch("addVisitedView", view)
    },
    addVisitedView({ commit }, view: any) {
      commit("ADD_VISITED_VIEW", view)
    },

    delView({ dispatch, state }, view: any) {
      return new Promise((resolve) => {
        dispatch("delVisitedView", view)
        resolve({
          visitedViews: [...state.visitedViews],
        })
      })
    },
    delVisitedView({ commit, state }, view) {
      return new Promise((resolve) => {
        commit("DEL_VISITED_VIEW", view)
        resolve([...state.visitedViews])
      })
    },

    delOthersViews({ dispatch, state }, view) {
      return new Promise((resolve) => {
        dispatch("delOthersVisitedViews", view)
        resolve({
          visitedViews: [...state.visitedViews],
        })
      })
    },
    delOthersVisitedViews({ commit, state }, view) {
      return new Promise((resolve) => {
        commit("DEL_OTHERS_VISITED_VIEWS", view)
        resolve([...state.visitedViews])
      })
    },
    delLeftViews({ commit, state }, path) {
      return new Promise((resolve) => {
        commit("DEL_LEFT_VIEWS", path)
        resolve([...state.visitedViews])
      })
    },
    delRightViews({ commit, state }, path) {
      return new Promise((resolve) => {
        commit("DEL_RIGHT_VIEWS", path)
        resolve([...state.visitedViews])
      })
    },

    delAllViews({ dispatch, state }, view) {
      return new Promise((resolve) => {
        dispatch("delAllVisitedViews", view)
        resolve({
          visitedViews: [...state.visitedViews],
        })
      })
    },
    delAllVisitedViews({ commit, state }) {
      return new Promise((resolve) => {
        commit("DEL_ALL_VISITED_VIEWS")
        resolve([...state.visitedViews])
      })
    },

    updateVisitedView({ commit }, view) {
      commit("UPDATE_VISITED_VIEW", view)
    },
  },
}

export default tagsViewModule
