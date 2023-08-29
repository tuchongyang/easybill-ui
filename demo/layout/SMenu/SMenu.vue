<template>
  <!-- <div v-for="(menu, index) in routes" :key="index"> -->
  <el-menu :collapse="isCollapse" :default-active="defaultActive" :router="false" v-bind="{ ...$attrs }" class="s-menu">
    <template v-for="(item, i) in routes" :key="i">
      <SMenuItem :menu="item" />
    </template>
  </el-menu>
  <!-- </div> -->
</template>
<script lang="ts" setup>
import { computed } from "vue"
import { useStore } from "vuex"
import { useRoute, useRouter, RouteRecordRaw } from "vue-router"
import SMenuItem from "./SMenuItem.vue"
const store = useStore()
const isCollapse = computed(() => !store.state.layout.sideOpen)
const route = useRoute()

const router = useRouter()
const allroutes = router.getRoutes()
const rootRoute = allroutes.find((a) => a.path == "/" && a.children.length)
const getChildren = (childrens: Array<RouteRecordRaw>, parentPath: string) => {
  const result: Array<RouteRecordRaw> = []
  for (let i in childrens) {
    const child = childrens[i]
    let children: Array<RouteRecordRaw> = []
    if (child.children && child.children.length) {
      children = getChildren(child.children, child.path)
    }
    const { path, name, meta = {} } = child
    if (child.name) {
      const prefix = !/^\//.test(path) ? "/" : ""
      result.push({ url: parentPath + prefix + path, path: parentPath + prefix + path, name, children, meta } as RouteRecordRaw)
    }
  }
  return result
}
const routes = getChildren(rootRoute?.children || [], "")
const defaultActive = computed(() => route.path)
// const menus = computed(() => store.state.menu.menus)
// const currentMenuIndex = computed(() => store.state.menu.currentMenuIndex)
// const current = computed(() => store.state.menu.currentMenuIndex)
// const defaultOpeneds = computed(() => (routes.value && routes.value.map((a: any) => a.path)) || [])

// console.log("router", routes)
</script>
<style scoped lang="scss">
.s-menu {
  border: 0;
  margin: 0 var(--menu-margin);
  --el-menu-item-height: 32px;
  --menu-item-border-radius: 3px;
  --menu-margin: 10px;
  :deep(.el-menu-item.is-active) {
    background-color: var(--el-menu-active-bg-color);
    // border-radius: 15px;
  }
  :deep(.el-sub-menu .el-menu-item) {
    height: 32px;
    line-height: 32px;
    border-radius: var(--menu-item-border-radius);
    margin-bottom: 1px;
    min-width: 120px;
  }
  :deep(.icon) {
    margin-right: 5px;
    font-size: 18px;
    color: var(--el-color-primary);
  }
  > .el-menu-item {
    margin-bottom: 10px;
    border-radius: var(--menu-item-border-radius);
  }
  > .el-sub-menu {
    border-bottom: 1px solid var(--el-border-color-lighter);
    margin-bottom: 10px;
    padding-bottom: 10px;
    :deep(.el-sub-menu__title) {
      // font-size: 16px;
      border-radius: var(--menu-item-border-radius);
      + .el-menu {
        margin-top: 10px;
      }
    }
    &.is-active {
      :deep(.el-sub-menu__title) {
        color: var(--el-color-primary) !important;
      }
    }
    &:last-child {
      border-bottom: 0;
    }
  }

  /**收缩样式 */
  &.el-menu--collapse {
    margin: 0;
  }
}
</style>
