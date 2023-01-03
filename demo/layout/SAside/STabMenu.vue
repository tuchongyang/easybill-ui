<template>
  <div class="aside-menu-tab">
    <ul>
      <li v-for="(item, i) in routes" :key="i" :class="{ active: currentTabPath == item.path }" @click="select(item)">
        <el-icon v-if="item.meta && item.meta.icon" class="icon"><component :is="item.meta.icon" /></el-icon>
        <span class="name">{{ (item.meta && item.meta.title) || item.name }}</span>
      </li>
    </ul>
  </div>

  <div class="aside-menu-container">
    <el-menu :default-active="defaultActive" :router="true" class="aside-menu">
      <template v-for="(item, i) in childRoutes" :key="i">
        <SMenuItem :menu="item" />
      </template>
    </el-menu>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, Ref } from "vue"
import { useStore } from "vuex"
import { useRoute, useRouter } from "vue-router"
import { deepClone } from "easybill-ui/utils/common"
import { RouteRecordRaw } from "vue-router"
const route = useRoute()
const router = useRouter()
const allroutes = deepClone(router.getRoutes())
const rootRoute = allroutes.find((a) => a.path == "/" && a.children.length)
const currentTabPath = ref("") //当前高亮的菜单
// 递归查找子菜单，重新组装url
const getChildren = (childrens: Array<RouteRecordRaw> | undefined, parentPath: string, paths: any) => {
  const result: any[] = []
  // for (let i = 0; childrens && i < childrens?.length; i++) {
  //   const child = childrens[i]
  //   const { path, name, children, meta = {} } = child
  //   const prefix = !/^\//.test(path) ? "/" : ""
  //   const curPath = prefix + path
  //   const childpaths = [...paths, curPath]
  //   if (child.children && child.children.length) {
  //     child.children = getChildren(child.children, child.path, childpaths)
  //   }
  //   if (child.name) {
  //     result.push({ path: parentPath + curPath, name, children, meta, paths: childpaths } as RouteRecordRaw)
  //     //顺便判断下当前路由
  //     if (parentPath + curPath == route.path) {
  //       currentTabPath.value = childpaths[0]
  //     }
  //   }
  // }
  return result
}
const routes = getChildren(rootRoute?.children, "", [])
const defaultActive = computed(() => route.path)
const childRoutes = computed(() => {
  const cur = routes.find((a) => a.path == currentTabPath.value)
  return (cur && cur.children) || []
})

const select = (item: any) => {
  router.push(item.path)
  currentTabPath.value = item.paths[0]
}
</script>
<style scoped lang="scss">
.aside-menu-tab {
  position: fixed;
  left: 0;
  li {
    padding: 10px;
    text-align: center;
    color: #fff;
    width: var(--aside-width-close);
    cursor: pointer;
    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }
    &.active {
      background: var(--el-color-primary);
      color: #fff;
    }
    .icon {
      font-size: 20px;
    }
    .name {
      display: block;
    }
  }
}
.aside-menu-container {
  margin-left: var(--aside-width-close);
  height: calc(100vh - 50px);
  background: #fff;
  .aside-menu {
    border-right: 0;
  }
}
</style>
