<template>
  <el-aside v-show="asideShow" class="a-aside" :width="asideWidth">
    <STabMenu v-if="setting.layout === 'columns' && !isCollapse" v-model:hasChild="hasTabChild" v-model:current-tab-path="currentTabPath" :default-parent-active="defaultParentActive" />
    <div v-else class="a-aside-menu">
      <el-scrollbar>
        <SLogo v-if="['vertical'].includes(setting.layout)" />
        <div v-if="['comprehensive'].includes(setting.layout)" class="aside-top-title">
          <div class="title">{{ currentTabRoute?.name }}</div>
        </div>
        <SMenu v-if="['vertical', 'classic', 'columns', 'comprehensive'].includes(setting.layout)" :default-parent-active="defaultParentActive" />
      </el-scrollbar>
    </div>
    <SAsideToggle v-if="['classic', 'comprehensive'].includes(setting.layout)" class="asideToggle" />
  </el-aside>
</template>
<script setup lang="ts">
import { useSetting } from "@/layout"
import { computed, ref } from "vue"
import { useState } from "../../hooks/useState"
import SAsideToggle from "../SAsideToggle"
import SLogo from "../SLogo"
import SMenu from "../SMenu"
import STabMenu from "./STabMenu.vue"
const setting = useSetting()
const { routes, currentTabPath, defaultParentActive, sideOpen } = useState()
const isCollapse = computed(() => !sideOpen.value)
const hasTabChild = ref(false)
const asideWidth = computed(() => {
  if (setting.value.layout == "columns") {
    return !isCollapse.value && hasTabChild.value ? "var(--aside-width-open)" : "var(--aside-width-close)"
  } else {
    return !isCollapse.value ? "var(--aside-width-open)" : "var(--aside-width-close)"
  }
})
const asideShow = computed(() => {
  if (setting.value.layout == "comprehensive") {
    return routes.value.length
  }
  return setting.value.routes.length
})
const currentTabRoute = computed(() => setting.value.routes.find((a) => a.path == currentTabPath.value))
</script>
<style scoped lang="scss">
.a-aside {
  height: 100%;
  background: var(--layout-aside-bg);
  color: var(--layout-aside-color);
  transition: width 0.3s;
  z-index: 50;
  box-shadow: var(--layout-aside-boxshadow);
  display: flex;
  flex-direction: column;
  height: calc(100% - var(--layout-aside-spacing, var(--layout-spacing)) - var(--layout-aside-spacing, var(--layout-spacing)));
  margin: var(--layout-aside-spacing, var(--layout-spacing)) 0 0 var(--layout-aside-spacing, var(--layout-spacing));
  border-radius: 4px;
  :deep(.s-logo) {
    .logo {
      padding: 25px 0 10px;
      vertical-align: top;
      margin: 0 10px;
      img {
        max-height: 50px;
        vertical-align: top;
      }
    }
    .title {
      display: block;
    }
  }
  .aside-top-title {
    margin: 0 20px;
    padding: 20px 0;
    border-bottom: 1px solid var(--layout-aside-border-color);
    font-size: var(--el-font-size-medium);
    font-weight: 700;
  }
  .a-aside-menu {
    flex: 1;
    height: calc(100% - 64px);
    :deep(.el-menu-item.is-active) {
      background-color: var(--el-color-primary-light-9);
    }
  }
  .asideToggle {
    width: 64px;
    text-align: center;
  }
}
</style>
