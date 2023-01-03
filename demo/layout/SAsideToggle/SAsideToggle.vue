<template>
  <div class="aside-toggle" @click="toggle">
    <el-icon> <expand v-if="!sideOpen" /><fold v-else /> </el-icon>
  </div>
</template>
<script setup lang="ts">
import { Expand, Fold } from "@element-plus/icons-vue"
import { ref, computed, Ref } from "vue"
import { useStore } from "vuex"
import { useRoute, useRouter } from "vue-router"
const store = useStore()
const sideOpen = computed(() => store.state.layout.sideOpen)
const toggle = () => {
  store.commit("layout/toggleSide")
}
</script>
<style scoped lang="scss">
.aside-toggle {
  cursor: pointer;
  display: inline-block;
  vertical-align: top;
  height: var(--header-height);
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
