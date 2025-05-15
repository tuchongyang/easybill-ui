<template>
  <div class="s-tabs">
    <el-tabs v-model="current" @tab-click="handleClick">
      <el-tab-pane v-for="(item, i) in tabs" :key="i" :label="item.name" :name="item.path"></el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang="ts" setup>
import router from "@/router"
import { ref, watch } from "vue"
import { useRoute } from "vue-router"
import { useState } from "../../hooks/useState"
const route = useRoute()
const { tabs } = useState()
const current = ref(route.meta?.parent || route.path)
const handleClick = () => {
  setTimeout(() => {
    router.push(current.value)
  })
}
// 路由变化，导航高亮跟着变化
watch(
  () => route.path,
  (val) => {
    current.value = val
  },
)
</script>
<style lang="scss" scoped>
.s-tabs {
  margin: 5px 20px;
  .el-tabs {
    :deep(.el-tabs__header) {
      margin-bottom: 0;
      border-bottom: 0;
      .el-tabs__nav-wrap::after {
        display: none;
      }
      .el-tabs__item.is-active {
        font-weight: bold;
      }
    }
  }
}
</style>
