<template>
  <div class="s-header-back" @click="back">
    <el-icon><ArrowLeft /></el-icon>
  </div>
</template>
<script lang="ts" setup>
import { ArrowLeft } from "@element-plus/icons-vue"
import { useRouter } from "vue-router"
// const props = defineProps({
//   backUrl: {
//     type: String,
//     default: "",
//   },
// })
const router = useRouter()
const back = () => {
  router.go(-1)
}
</script>
<style lang="scss" scoped>
.s-header-back {
  height: 40px;
  line-height: 40px;
  padding: 0 15px;
  display: flex;
  align-items: center;
  font-size: 18px;
  position: relative;
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
</style>
