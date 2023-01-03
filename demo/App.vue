<template>
  <el-config-provider :locale="locale">
    <router-view></router-view>
  </el-config-provider>
</template>
<script setup lang="ts">
import { ref } from "vue"
import zhCn from "element-plus/lib/locale/lang/zh-cn"
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
