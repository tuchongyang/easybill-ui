import { ref, watch } from "vue"
import type { RouteItem } from "./useSetting"
import { useSetting } from "./useSetting"
const routes = ref<RouteItem[]>([])
// 最后的路由，当有四级时，为父级路由
const currentEndRoute = ref<RouteItem | undefined>()
// 四级路由tab
const tabs = ref<RouteItem[]>([])
// 当前高亮的一级菜单
const currentTabPath = ref<string>("")
// 当前高亮的菜单,如果是四级，则取parent
const defaultParentActive = ref("")
const setting = useSetting()
const sideOpen = ref(true)

const getRoutes = () => {
  if (["comprehensive", "idc"].includes(setting.value.layout)) {
    return setting.value.routes.find((a) => a.path == currentTabPath.value)?.children || []
  } else {
    return setting.value.routes
  }
}

watch(
  () => currentTabPath.value,
  () => {
    if (["comprehensive", "idc"].includes(setting.value.layout)) {
      routes.value = getRoutes()
    }
  },
)
export function useState() {
  return { routes, currentEndRoute, tabs, currentTabPath, defaultParentActive, sideOpen, getRoutes }
}
