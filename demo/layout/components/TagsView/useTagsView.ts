import { reactive } from "vue"

import type { RouteItem } from "../../hooks/useSetting"
import { useSetting } from "../../hooks/useSetting"
import type { TagItem } from "./types"
interface State {
  visitedViews: TagItem[]
}
export function useTagsView() {
  const state = reactive<State>({
    visitedViews: [],
  })
  const setting = useSetting()
  const actions = {
    addView(view: TagItem) {
      actions.addVisitedView(view)
    },
    addVisitedView(view: TagItem) {
      const current: TagItem | undefined = state.visitedViews.find((v) => v.path === view.path)
      let cur: RouteItem | undefined = undefined
      const find = (list: RouteItem[]): RouteItem | undefined => {
        for (const i in list) {
          if (list[i].path == view.fullPath) {
            return list[i]
          }
          if (list[i].children?.length) {
            const found = find(list[i].children)
            if (found) return found
          }
        }
        return undefined
      }
      cur = find(setting.value.routes)
      if (current) {
        // 更新路由信息
        current.query = view.query
        current.fullPath = view.fullPath
        current.params = view.params
        return
      }
      if (state.visitedViews.length >= 10) {
        state.visitedViews.pop()
      }

      const title = (cur ? cur.name : view.meta.title) || "no-name"
      state.visitedViews.push(Object.assign({}, view, { title }))
    },

    delView(view: TagItem) {
      return new Promise<{ visitedViews: TagItem[] }>((resolve) => {
        actions.delVisitedView(view)
        resolve({
          visitedViews: [...state.visitedViews],
        })
      })
    },
    delVisitedView(view: TagItem) {
      return new Promise((resolve) => {
        for (const [i, v] of state.visitedViews.entries()) {
          if (v.path === view.path) {
            state.visitedViews.splice(i, 1)
            break
          }
        }
        resolve([...state.visitedViews])
      })
    },

    delOthersViews(view: TagItem) {
      return new Promise((resolve) => {
        actions.delOthersVisitedViews(view)
        resolve({
          visitedViews: [...state.visitedViews],
        })
      })
    },
    delOthersVisitedViews(view: TagItem) {
      return new Promise((resolve) => {
        state.visitedViews = state.visitedViews.filter((v) => {
          return v.meta.affix || v.path === view.path
        })
        resolve([...state.visitedViews])
      })
    },
    delLeftViews(path: string) {
      return new Promise((resolve) => {
        const index = state.visitedViews.findIndex((v) => v.path == path)
        state.visitedViews = state.visitedViews.filter((v, i) => {
          return v.meta.affix || i >= index
        })
        resolve([...state.visitedViews])
      })
    },
    delRightViews(path: string) {
      return new Promise((resolve) => {
        const index = state.visitedViews.findIndex((v) => v.path == path)
        state.visitedViews = state.visitedViews.filter((v, i) => {
          return v.meta.affix || i <= index
        })
        resolve([...state.visitedViews])
      })
    },

    delAllViews() {
      return new Promise<{ visitedViews: TagItem[] }>((resolve) => {
        actions.delAllVisitedViews()
        resolve({
          visitedViews: [...state.visitedViews],
        })
      })
    },
    delAllVisitedViews() {
      return new Promise((resolve) => {
        state.visitedViews = state.visitedViews.filter((tag) => tag.meta.affix)
        resolve([...state.visitedViews])
      })
    },

    updateVisitedView(view: TagItem) {
      for (let v of state.visitedViews) {
        if (v.path === view.path) {
          v = Object.assign(v, view)
          break
        }
      }
    },
  }
  return { state, actions }
}
