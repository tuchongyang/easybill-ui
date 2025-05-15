<template>
  <div class="layout-main">
    <el-scrollbar ref="scrollRef">
      <div class="layout-wrapper">
        <router-view v-slot="{ Component }">
          <!-- <transition appear name="fade-transform" mode="out-in"> -->
          <component :is="Component" />
          <!-- </transition> -->
        </router-view>
      </div>
      <slot name="foot"></slot>
      <el-backtop target=".layout-main .el-scrollbar__wrap" :right="20" :bottom="100" />
    </el-scrollbar>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, provide, reactive, ref } from "vue"
const scrollbarRef = ref()
const scrollContext = reactive({
  scrollTo: (options: ScrollToOptions | number, yCoord?: number) => {
    scrollbarRef.value?.scrollTo(options, yCoord)
  },
  setScrollTop: (scrollTop: number) => {
    scrollbarRef.value?.setScrollTop(scrollTop)
  },
})
provide("scrollContext", scrollContext)
const scrollRef = ref()
const target = ref("body")
onMounted(() => {
  target.value = scrollRef.value.$el.children[0]
})
</script>
<style lang="scss" scoped>
.layout-main {
  display: block;
  flex: 1;
  flex-basis: auto;
  overflow: auto;
  box-sizing: border-box;
  .layout-wrapper {
    padding: var(--layout-spacing);
    height: calc(100vh - var(--layout-header-height) - var(--layout-sub-header-height) - var(--layout-header-title-height) - var(--layout-tagsview-height));
    display: flex;
    flex-direction: column;
    min-height: 1px;
    box-sizing: border-box;
    :deep(.card-box[main]) {
      flex: 1;
      overflow: auto;
      .el-table {
        overflow: visible;
        .el-table__header-wrapper {
          position: sticky;
          top: 0;
          z-index: 100;
        }
      }
    }
  }
}
</style>
