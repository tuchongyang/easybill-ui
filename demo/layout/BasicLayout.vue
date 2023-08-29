<template>
  <el-container class="a-container" :class="{ 'has-aside': routes.length }">
    <SAside />
    <el-container class="right-container" :class="layout" direction="vertical">
      <SHeader />
      <TagsView />
      <Breadcrumb />
      <SSubHeader />
      <el-main class="center-main">
        <router-view v-slot="{ Component }">
          <keep-alive :exclude="aliveExcludes">
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script setup lang="ts">
import { computed } from "vue"
import { useStore } from "vuex"
import SHeader from "./SHeader"
import SAside from "./SAside"
import TagsView from "./TagsView"
import Breadcrumb from "./Breadcrumb"
import SSubHeader from "./SSubHeader"
const store = useStore()
const layout = computed(() => store.state.layout.layout)
const routes = computed(() => (store.state.menu.menus && store.state.menu.menus[store.state.menu.currentMenuIndex]?.children) || [])
const aliveExcludes = computed(() => store.state.app.aliveExcludes)
</script>
<style scoped lang="scss">
.a-container {
  background: var(--el-bg-color-page);
  --aside-width-open: 220px;
  --aside-width-close: 64px;
  --header-height: 50px;

  &.has-aside {
    .a-header {
      :deep(.s-logo) {
        display: none;
      }
    }
  }
}

.right-container {
  height: 100vh;
  position: relative;
}
</style>
