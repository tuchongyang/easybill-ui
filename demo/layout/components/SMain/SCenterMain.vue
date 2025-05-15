<template>
  <div class="layout-center-main" :class="setting.pageType">
    <el-scrollbar>
      <div class="lcm-header">
        <div class="top-bar-left">
          <slot name="topBarLeft"></slot>
        </div>
        <div>
          <slot name="top-bar-right"></slot>
        </div>
      </div>
      <div class="lcm-main">
        <router-view v-slot="{ Component, route }">
          <!-- <transition appear name="fade-transform" mode="out-in"> -->
          <component :is="Component" :key="route.path" />
          <!-- </transition> -->
        </router-view>
      </div>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { useSetting } from "../../hooks/useSetting"
const setting = useSetting()
</script>

<style scoped lang="scss">
.layout-center-main {
  display: block;
  flex: 1;
  flex-basis: auto;
  overflow: auto;
  box-sizing: border-box;
  &.card {
    .lcm-header {
      // border-bottom: 1px solid var(--el-border-color-light);
      background-color: var(--el-bg-color);
      border-radius: 4px 4px 0 0;
      margin: 0 20px;
      padding: 10px 10px 0;
    }
  }
  .lcm-header {
    height: var(--layout-header-height);
    line-height: var(--layout-header-height);
    display: flex;
    justify-content: space-between;
    position: relative;
    z-index: 60;
    color: var(--layout-header-color);
  }
  .lcm-main {
    padding: 0 20px;
    background-color: var(--el-bg-color);
    margin: 0 20px;
    border-radius: 0 0 4px 4px;
    min-height: calc(100vh - 280px);
  }
  .top-bar-left {
    display: flex;
    justify-items: start;
    align-items: center;
  }
}
</style>
