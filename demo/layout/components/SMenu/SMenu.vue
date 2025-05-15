<template>
  <!-- <div v-for="(menu, index) in routes" :key="index"> -->
  <el-menu :collapse="isCollapse" :default-active="defaultActive" :router="false" class="s-menu" v-bind="{ ...$attrs }">
    <template v-for="item in routes" :key="item.path">
      <SMenuItem :level="props.defaultLevel" :menu="item" />
    </template>
  </el-menu>
  <!-- </div> -->
</template>
<script lang="ts" setup>
import { computed } from "vue"
import { useRoute } from "vue-router"
import SMenuItem from "./SMenuItem.vue"

import { useState } from "../../hooks/useState"

const props = defineProps({
  defaultParentActive: {
    type: String,
    default: "",
  },
  routes: {
    type: Array,
    default: undefined,
  },
  defaultLevel: {
    type: Number,
    default: 1,
  },
})
const { routes: subRoutes, sideOpen } = useState()
const routes = computed(() => props.routes || subRoutes.value)
const isCollapse = computed(() => !sideOpen.value)
const route = useRoute()
const defaultActive = computed(() => props.defaultParentActive || route.meta?.parent || route.fullPath)
</script>
<style lang="scss" scoped>
.s-menu {
  border: 0;

  :deep(.icon) {
    margin-right: 5px;
    font-size: 16px;
  }
  :deep(.icon-txt) {
    flex: 0 0 30px;
    width: 30px;
    height: 30px;
    line-height: 30px;
    background-color: rgba(0, 0, 0, 0.1);
    text-align: center;
    border-radius: 50%;
    font-style: normal;
    + .name {
      margin-left: 5px;
    }
  }
  :deep(.name) {
    color: inherit;
    text-decoration: none;
  }

  :deep(.el-sub-menu__icon-arrow) {
    opacity: 0.5;
  }

  /**收缩样式 */
  &.el-menu--collapse {
    margin: 0;
    :deep(.el-sub-menu__title) {
      padding: 0 5px;
      justify-content: center;
    }
    :deep(.el-menu-item) {
      padding: 0 5px;
      justify-content: center;
    }
  }
  &.el-menu--horizontal {
    :deep(.el-menu-item) {
      &.is-active {
        border-bottom: 0;
        &:after {
          content: "";
          display: block;
          height: 2px;
          left: 15px;
          right: 15px;
          background-color: var(--el-menu-active-color);
          position: absolute;
          bottom: 0;
        }
      }
    }
    :deep(.el-sub-menu) {
      &.is-active .el-sub-menu__title {
        border-bottom: 0;
        &:after {
          content: "";
          display: block;
          height: 2px;
          left: 15px;
          right: 15px;
          background-color: var(--el-menu-active-color);
          position: absolute;
          bottom: 0;
        }
      }
    }
  }
}
</style>
