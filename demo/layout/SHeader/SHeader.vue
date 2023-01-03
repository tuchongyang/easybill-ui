<template>
  <el-header class="a-header">
    <div class="header-left">
      <!-- <el-scrollbar always> -->
      <SLogo v-if="layout == 'top'" class="header-left-item header-left-logo" />
      <SAsideToggle v-if="layout !== 'top'" class="header-left-item" />
      <!-- <Breadcrumb v-if="layout !== 'top'" class="header-left-item" /> -->
      <!-- <SMenu class="header-left-item header-left-menu" mode="horizontal" /> -->
      <HeaderMenu />
      <!-- </el-scrollbar> -->
    </div>
    <div class="header-right"><SHeaderRight /></div>
  </el-header>
</template>
<script setup lang="ts">
import { ref, computed, Ref } from "vue"
import { useStore } from "vuex"
import { useRoute, useRouter } from "vue-router"
import HeaderMenu from "./HeaderMenu.vue"
import SLogo from "../SLogo"
import SAsideToggle from "../SAsideToggle"
import SHeaderRight from "../SHeaderRight"
const store = useStore()
const layout = computed(() => store.state.layout.layout)
</script>
<style scoped lang="scss">
.a-header {
  --a-heder-bg: var(--el-bg-color);
  --a-header-text-color: var(--el-text-color-primary);
  background: var(--a-heder-bg);
  // box-shadow: 24px 0px 24px 1px rgba(7, 90, 62, 0.22);
  height: var(--header-height);
  line-height: var(--header-height);
  display: flex;
  justify-content: space-between;
  position: relative;
  z-index: 60;
  padding: 0;
  display: flex;
  color: var(--a-header-text-color);
  .header-left {
    flex: 1;
    overflow-x: auto;
    overflow-y: hidden;
  }
  .header-left-item {
    float: left;
  }
  .header-left-logo {
    margin-right: 40px;
  }
  .header-left-menu {
    margin-left: 20px;
    // background: none;
    :deep(.el-menu-item) {
      height: var(--header-height);
    }
    :deep(.el-sub-menu .el-sub-menu__title) {
      height: var(--header-height);
      line-height: var(--header-height);
      // background: none !important;
    }
  }
  .header-right {
    display: flex;
  }
}
</style>
