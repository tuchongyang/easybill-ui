<template>
  <el-header class="a-header">
    <div class="header-left">
      <SLogo v-if="['transverse', 'classic', 'columns', 'comprehensive'].includes(layout)" class="header-left-item header-left-logo">
        <slot name="logoRight"></slot>
      </SLogo>
      <SAsideToggle v-if="['vertical', 'columns'].includes(layout)" class="header-left-item" />
      <Breadcrumb v-if="['classic', 'columns', 'vertical'].includes(layout)" class="header-left-item" />
      <SMenu v-if="layout == 'transverse'" class="header-left-item header-left-menu" mode="horizontal" />
      <HeaderMenu v-if="['comprehensive'].includes(layout)" />
      <slot name="headerLeft"></slot>
    </div>
    <div class="header-right">
      <slot name="headerRight"></slot>
    </div>
  </el-header>
</template>
<script setup lang="ts">
import { computed } from "vue"
import { useSetting } from "../../hooks/useSetting"
import Breadcrumb from "../Breadcrumb"
import SAsideToggle from "../SAsideToggle/SAsideToggle.vue"
import SLogo from "../SLogo/SLogo.vue"
import SMenu from "../SMenu"
import HeaderMenu from "./HeaderMenu.vue"
const setting = useSetting()
const layout = computed(() => setting.value.layout || "classic")
</script>
<style scoped lang="scss">
.a-header {
  background: var(--layout-header-bg);
  border-bottom: 1px solid var(--layout-header-border-color);
  height: var(--layout-header-height);
  line-height: var(--layout-header-height);
  display: flex;
  justify-content: space-between;
  position: relative;
  z-index: 60;
  padding: 0;
  color: var(--layout-header-text-color);
  .header-left {
    flex: 1;
    display: flex;
    overflow: hidden;
    // overflow-x: auto;
    // overflow-y: hidden;
  }
  .header-left-item {
    float: left;
  }
  .header-left-logo {
    margin-right: 20px;
  }
  .header-left-menu {
    margin-left: 20px;
    flex: 1;
    :deep(.el-menu) {
      border: none;
    }
    :deep(.el-menu-item) {
      height: var(--layout-header-height);
    }
    :deep(.el-sub-menu .el-sub-menu__title) {
      height: var(--layout-header-height);
      line-height: var(--layout-header-height);
    }
  }
  .header-right {
    display: flex;
  }
}
.idc-sub-header {
  background: var(--layout-sub-header-bg, rgba(61, 61, 61, 1));
  border-bottom: 1px solid var(--layout-sub-header-border-color);
  height: var(--layout-sub-header-height, 40px);
  line-height: var(--layout-sub-header-height, 40px);
  color: var(--layout-sub-header-text-color, #fff);
  padding: 0 20px;
}
</style>
