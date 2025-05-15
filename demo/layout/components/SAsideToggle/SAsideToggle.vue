<template>
  <div class="aside-toggle" @click="toggle">
    <el-icon> <expand v-if="!sideOpen" /><fold v-else /> </el-icon>
  </div>
</template>
<script setup lang="ts">
import { Expand, Fold } from "@element-plus/icons-vue"
import { useState } from "../../hooks/useState"
const { sideOpen } = useState()
const toggle = () => {
  sideOpen.value = !sideOpen.value
}
</script>
<style scoped lang="scss">
.aside-toggle {
  cursor: pointer;
  display: inline-block;
  vertical-align: top;
  height: var(--layout-header-height);
  padding-top: 16px;
  padding-left: 10px;
  padding-right: 10px;
  opacity: 0.8;
  box-sizing: border-box;
  &:hover {
    opacity: 1;
  }
  .el-icon {
    vertical-align: top;
    font-size: 18px;
  }
}
</style>
