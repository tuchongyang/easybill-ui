<template>
  <div v-if="hasBack" class="header-sub">
    <div class="left">
      <div class="btn-back" @click="back">
        <el-icon><ArrowLeft /></el-icon>
      </div>
      <div class="title">{{ props.title || route.meta?.title }}</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ArrowLeft } from "@element-plus/icons-vue"
import { ref } from "vue"
import { useRoute, useRouter } from "vue-router"
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
})
const router = useRouter()
const route = useRoute()
const back = () => {
  router.back()
}
const hasBack = ref(router.options.history.state.back)
</script>
<style lang="scss" scoped>
.header-sub {
  background-color: var(--el-bg-color);

  border-bottom: 1px solid var(--el-border-color-lighter);
  box-shadow: 16px 0 6px 0px rgba(0, 0, 0, 0.15);
  padding: 0;
  height: 40px;
  line-height: 40px;
  position: relative;
  z-index: 50;
  .left {
    display: flex;
    align-items: center;
    .btn-back {
      height: 40px;
      line-height: 40px;
      padding: 0 15px;
      display: flex;
      align-items: center;
      font-size: 18px;
      position: relative;
      margin-right: 20px;
      cursor: pointer;
      &:hover {
        color: var(--el-color-primary);
      }
      &:after {
        content: "";
        width: 1px;
        height: 20px;
        display: block;
        background-color: var(--el-border-color);
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
}
</style>
