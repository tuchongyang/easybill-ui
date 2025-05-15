<template>
  <div class="s-header-title">
    <div class="header-left">
      <SMenu v-if="layout == 'idc'" mode="horizontal" :default-level="2" />
      <!-- <div class="title">{{ props.title || route.meta?.title || currentEndRoute?.name }}</div> -->
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed } from "vue"
import { useSetting } from "../../hooks/useSetting"
import SMenu from "../SMenu/SMenu.vue"
const setting = useSetting()
// const props = defineProps({
//   title: {
//     type: String,
//     default: "",
//   },
// })
const layout = computed(() => setting.value.layout || "classic")
</script>
<style lang="scss" scoped>
.s-header-title {
  background: var(--layout-header-title-bg);
  box-shadow: var(--layout-header-title-box-shadow);
  padding: 0 20px 0 20px;
  height: var(--layout-header-title-height, 50px);
  line-height: var(--layout-header-title-height, 50px);
  display: flex;
  justify-content: space-between;
  .title {
    font-weight: 700;
    font-size: var(--layout-header-title-font-size, var(--el-font-size-medium));
  }
  :deep(+ .layout-main) {
    padding-top: 0;
  }
  :deep(+ .s-tabs) {
    margin-top: 0;
  }
  :deep(.s-menu) {
    --el-menu-horizontal-height: var(--layout-header-title-height, 50px);
    --el-menu-item-height: var(--layout-header-title-height, 50px);
    --el-menu-sub-item-height: calc(var(--el-menu-item-height) - 6px);
    flex: 1;
    border: 0;
  }
  .header-left {
    display: flex;
    align-items: center;
    width: 100%;
  }
}
</style>
