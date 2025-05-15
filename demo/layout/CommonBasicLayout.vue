<!-- 💥 这里是一次性加载 LayoutComponents -->
<template>
  <el-container class="layout-container" :direction="['classic', 'transverse', 'columns', 'comprehensive', 'idc'].includes(settings.layout) ? 'vertical' : 'horizontal'" :class="settings.layout">
    <SHeader v-if="['classic', 'transverse', 'columns', 'comprehensive', 'idc'].includes(settings.layout)">
      <template #headerLeft>
        <slot name="headerLeft"></slot>
      </template>
      <template #headerRight>
        <slot name="headerRight"></slot>
      </template>
      <template #logoRight>
        <slot name="logoRight"></slot>
      </template>
    </SHeader>
    <SAside v-if="['vertical'].includes(settings.layout)" />
    <el-container class="main-container" :direction="['classic', 'columns', 'comprehensive'].includes(settings.layout) ? 'horizontal' : 'vertical'">
      <SHeader v-if="['vertical'].includes(settings.layout)">
        <template #headerLeft>
          <slot name="headerLeft"></slot>
        </template>
        <template #headerRight>
          <slot name="headerRight"></slot>
        </template>
        <template #logoRight>
          <slot name="logoRight"></slot>
        </template>
      </SHeader>
      <SAside v-if="['classic', 'columns', 'comprehensive'].includes(settings.layout)" />
      <el-container direction="vertical" class="center-container" :class="{ 'tags-hidden': settings.tabs == 'false', 'sub-header-hide': !routes.length }">
        <!--        <SHeaderSub v-if="route.meta?.parent" />-->
        <TagsView v-if="settings.tabs !== false && settings.tabs !== 'false'" v-show="!route.meta?.parent" />
        <!-- <STabs v-if="tabs?.length" /> -->
        <SHeaderTitle />
        <SMain>
          <template #foot><slot name="foot"></slot></template>
        </SMain>
      </el-container>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { onActivated, watch } from "vue"
import { useRoute } from "vue-router"
import SHeader from "./components/SHeader"
// import SHeaderBack from "./components/SHeaderBack/SHeaderBack.vue"
import SAside from "./components/SAside"
import SHeaderTitle from "./components/SHeaderTitle/SHeaderTitle.vue"
import TagsView from "./components/TagsView"
// import STabs from "./components/STabs/STabs.vue"
import SMain from "./components/SMain/SMain.vue"
// import SCenterMain from "./components/SMain/SCenterMain.vue"
import type { RouteItem } from "./hooks/useSetting"
import { provideSetting, useSetting } from "./hooks/useSetting"
import { useState } from "./hooks/useState"
const props = defineProps({
  setting: {
    type: Object,
    default: null,
  },
})

const route = useRoute()
watch(
  () => props.setting,
  (val) => {
    const a = JSON.parse(JSON.stringify(val))
    provideSetting(a)
  },
  { deep: true },
)
const { routes, currentEndRoute, tabs, currentTabPath, defaultParentActive, getRoutes } = useState()
const settings = useSetting()

if (props.setting) {
  provideSetting(props.setting)
}
type FindRouteItem = RouteItem & { paths?: string[] }
// 同时遍历查找一级高亮菜单与四级菜单的高亮
// 当为四级菜单时，高亮四级菜单的上级菜单
const findCurrentPath = (list: FindRouteItem[], level: number, rootParent?: RouteItem, parent?: RouteItem, paths: string[] = []) => {
  for (const i in list) {
    list[i].paths = [...paths, list[i].path]
    const comparePath = (route.meta?.parent || route.path) as string
    if (comparePath.indexOf(list[i].path) === 0) {
      currentTabPath.value = rootParent?.path || list[i].path
      if (list[i].path.indexOf(defaultParentActive.value)) defaultParentActive.value = list[i].path
      if (level >= 4) {
        //设置tabs
        tabs.value = parent?.children || []
        //设置当前路由
        currentEndRoute.value = parent
      } else {
        //设置当前路由
        currentEndRoute.value = route.meta?.parent ? undefined : list[i]
      }
    }
    if (list[i].children && list[i].children?.length) {
      const children = list[i].children || []
      findCurrentPath(children, level + 1, rootParent || list[i], list[i], list[i].paths)
    }
  }
}
const initState = () => {
  // currentTabPath.value = (settings.value.routes.length && settings.value.routes[0].path) || ""
  findCurrentPath(settings.value.routes, 1, undefined, undefined, [])
  routes.value = getRoutes()
}
initState()
onActivated(() => {
  initState()
})
watch(
  () => route.path,
  () => {
    defaultParentActive.value = ""
    tabs.value = []
    currentEndRoute.value = undefined
    currentTabPath.value = ""
    findCurrentPath(settings.value.routes, 1, undefined, undefined, [])
  },
)
watch(
  () => settings.value.routes,
  () => {
    currentTabPath.value = ""
    findCurrentPath(settings.value.routes, 1, undefined, undefined, [])
    routes.value = getRoutes()
  },
)
</script>
<style lang="scss">
:root {
  --aside-width-open: 220px;
  --aside-width-close: 64px;
  --layout-bg-color-page: var(--el-bg-color-page);
  --layout-header-height: 50px;
  --layout-color-primary: var(--el-color-primary);
  --layout-header-bg: var(--el-bg-color);
  --layout-header-color: var(--el-text-color-primary);
  --layout-header-hover-bg-color: var(--el-color-primary-light-9);
  --layout-header-active-bg-color: var(--el-color-primary-light-9);
  --layout-header-hover-text-color: var(--el-color-primary);
  --layout-header-active-color: var(--el-color-primary);
  --layout-aside-bg: var(--el-bg-color);
  --layout-aside-color: var(--el-text-color-primary);
  --layout-aside-menu-bg: var(--el-bg-color);
  --layout-aside-boxshadow: rgba(0, 0, 0, 0.05) 1px 1px 5px 1px;
  --layout-tabmenu-border-color: var(--el-border-color);
  --layout-tagsview-height: 50px;
  --el-menu-tab-item-height: 70px;
  --layout-spacing: 10px;
  --layout-aside-spacing: 0px;
}
</style>
<style scoped lang="scss">
.layout-container {
  background: var(--layout-bg-color-page);

  height: 100vh;
  .main-container {
    height: calc(100vh - var(--layout-header-height) - var(--layout-sub-header-height));
  }
  .center-container {
    height: calc(100vh - var(--layout-header-height) - var(--layout-sub-header-height));
    &.tags-hidden {
      --layout-tagsview-height: 0px;
    }
    &.sub-header-hide {
      --layout-header-title-height: 0px;
    }
  }
  :deep(.a-header) {
    .s-logo {
      display: flex;
      align-items: center;
      min-width: var(--aside-width-open);
      // flex: 0 0 var(--aside-width-open);
      padding: 0 20px;
      box-sizing: border-box;
    }
    // header下的菜单颜色跟随header
    .el-menu {
      --el-menu-bg-color: var(--layout-header-bg);
      --el-menu-text-color: var(--layout-header-color);
      --el-menu-hover-bg-color: rgba(0, 0, 0, 0.1);
    }
  }
  :deep(.a-aside) {
    // header下的菜单颜色跟随header
    .aside-menu-tab {
      --el-menu-bg-color: var(--layout-aside-bg);
      --el-menu-text-color: var(--layout-aside-color);
    }
  }
  :deep(.s-tabs) {
    + .layout-main {
      padding-top: 0;
    }
  }
  &.classic,
  &.vertical,
  &.comprehensive {
    :deep(.a-aside) {
      // header下的菜单颜色跟随header
      // .s-menu {
      --el-menu-bg-color: var(--layout-aside-bg);
      --el-menu-text-color: var(--layout-aside-color);
      --el-menu-hover-bg-color: var(--layout-aside-hover-bg-color, var(--el-color-primary-light-9));
      // }
    }
  }

  &.columns {
    --aside-width-close: 80px;
    --aside-width-open: 230px;
    --aside-tab-width: 200px;
    --el-menu-item-height: 36px;
    --el-menu-sub-item-height: 36px;
    :deep(.a-header) {
      .header-left .s-logo {
        width: auto;
        flex: 0 0 auto;
      }
    }
    :deep(.a-aside) {
      .aside-menu-tab {
        --el-menu-bg-color: var(--layout-aside-bg);
        --el-menu-text-color: var(--layout-aside-color);
        --el-menu-hover-bg-color: var(--layout-aside-hover-bg-color, var(--el-color-primary-light-9));
      }
    }
    :deep(.aside-menu-container) {
      padding: 20px 0;
      .aside-menu {
        margin-left: 10px;
        margin-right: 10px;
        .el-menu-item {
          border-radius: 4px;
          margin: 0 0 10px 0;
          position: relative;
        }
        .el-sub-menu__title {
          margin: 0 0 10px 0;
        }
        .el-sub-menu {
          .el-menu-item {
            --el-menu-text-color: rgba(124, 129, 139, 1);
          }
        }
      }
      .el-menu-item.is-active,
      .el-sub-menu.is-active > .el-sub-menu__title {
        border: 0;
        background-color: var(--el-color-primary-light-9);
        &:after {
          content: "";
          width: 3px;
          height: 21px;
          display: block;
          border-radius: 2px;
          position: absolute;
          left: 100%;
          margin-left: 10px;
          transform: translateX(-100%);
          background-color: var(--el-color-primary);
        }
      }
    }
    :deep(.el-menu--collapse) {
      width: var(--aside-width-close);
      --el-menu-bg-color: var(--layout-aside-bg);
      --el-menu-text-color: var(--layout-aside-color);
      // 一级的item
      > .el-menu-item {
        flex-direction: column;
        line-height: 1;
        justify-content: center;
        padding: 0;
        height: var(--el-menu-tab-item-height);
        border-bottom: 1px solid var(--layout-tabmenu-border-color);
        > i {
          font-size: 20px;
          margin: 0 0 10px;
        }
        &.is-active {
          background-color: var(--el-color-primary);
          color: #fff;
        }
        &:hover {
          background-color: rgba(0, 0, 0, 0.1);
        }
      }

      // 二级的item
      > .el-sub-menu {
        > .el-sub-menu__title {
          flex-direction: column;
          line-height: 1;
          justify-content: center;
          padding: 0;
          height: var(--el-menu-tab-item-height);
          border-bottom: 1px solid var(--layout-tabmenu-border-color);
          > i {
            font-size: 20px;
            margin: 0 0 10px;
          }
          &:hover {
            background-color: rgba(0, 0, 0, 0.1);
          }
        }
        &.is-active {
          background-color: var(--el-color-primary);
          color: #fff;
          > .el-sub-menu__title {
            color: #fff;
          }
        }
      }
      > .el-menu-item-group > ul > .el-sub-menu > .el-sub-menu__title > span,
      > .el-menu-item > span,
      > .el-sub-menu > .el-sub-menu__title > span {
        width: auto;
        height: auto;
        visibility: visible;
        display: block;
      }
    }
  }
}
</style>
