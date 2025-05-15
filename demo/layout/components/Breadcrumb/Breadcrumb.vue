<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span v-if="item.redirect === 'noRedirect' || index === levelList.length - 1 || index == 0" class="no-redirect">
          {{ item.name }}
        </span>
        <a v-else @click.prevent="handleLink(item)">{{ item.name }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref, watch, type Ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import { deepClone } from "../../utils"

import type { RouteItem } from "@/layout"
import { useSetting } from "@/layout"
const setting = useSetting()
let levelList: Ref<Array<LevelItem>> = ref([])

const route = useRoute()
const router = useRouter()
interface RouteItemCtx extends RouteItem {
  $Parent?: RouteItemCtx
}
interface LevelItem {
  path: string
  name: string
  redirect?: string
}
const getBreadcrumb = () => {
  let breadcrumb: RouteItem[] = []
  // 定义当前高亮的菜单
  const currRoutePath = (route.meta?.parent || route.path) as string
  let Menus = deepClone(setting.value.routes) || []
  const finallyMenus = (menu: RouteItemCtx, arr: RouteItemCtx[] = []) => {
    arr.unshift(menu)
    if (menu["$Parent"]) {
      finallyMenus(menu["$Parent"], arr)
      delete menu["$Parent"]
    }
    return arr
  }
  const find = (menus: RouteItem[] = [], parent?: RouteItem) => {
    for (let i = 0; menus.length && i < menus.filter((m) => m.path).length; i++) {
      const menu = menus[i] as RouteItemCtx
      if (parent) menu["$Parent"] = parent as RouteItemCtx
      if (currRoutePath.toLocaleLowerCase() === menu.path.toLocaleLowerCase()) {
        breadcrumb = breadcrumb.concat(finallyMenus(menu))
        break
      }
      if (menu.children && menu.children.length) {
        find(menu.children, menu)
      }
    }
  }
  find(Menus)
  if (!breadcrumb.length || breadcrumb[0].path != "/") {
    breadcrumb.unshift({ id: String(Date.now()), path: "/", name: "首页" })
  }
  levelList.value = breadcrumb
}

const pathCompile = (path: string) => {
  const toPath = () => {
    return path
  }
  return toPath()
}
const handleLink = (item: LevelItem) => {
  const { redirect, path } = item
  if (redirect && typeof redirect == "string") {
    router.push(redirect)
    return
  }
  router.push(pathCompile(path))
}
watch(
  () => route.path,
  () => {
    getBreadcrumb()
  },
  { immediate: true },
)

onBeforeMount(() => {
  getBreadcrumb()
})
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-flex;
  align-items: center;
  font-size: 12px;
  opacity: 0.7;

  .no-redirect {
    // color: #666;
    cursor: text;
  }
  :deep(.el-breadcrumb__inner),
  :deep(.el-breadcrumb__inner a) {
    font-weight: normal;
    color: var(--layout-header-color);
  }
}
/* breadcrumb transition */
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.25s;
}

.breadcrumb-enter-from,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-leave-active {
  position: absolute;
}
</style>
