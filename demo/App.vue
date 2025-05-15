<template>
  <el-config-provider :locale="locale">
    <router-view></router-view>
  </el-config-provider>
</template>
<script setup lang="ts">
import zhCn from "element-plus/es/locale/lang/zh-cn"
import { ref } from "vue"
const locale = ref(zhCn)
</script>
<style>
body {
  margin: 0;
}
.center-main {
  background-color: #fff;
  margin: 0 20px 20px;
}
</style>
