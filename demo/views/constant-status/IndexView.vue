<template>
  <div>
    <ConstantStatus :value="1" :options="options" />
    <ConstantStatus :value="2" :options="options" />
    <ConstantStatus :value="3" :options="options" />
    <ConstantStatus :value="4" :options="options" />
  </div>
</template>
<script lang="ts" setup>
import { OptionItem } from "easybill-ui/index"
import { ref, Ref } from "vue"
const options: Ref<OptionItem[]> = ref([
  { label: "正在同步", value: 1, dot: true, type: "warning", effect: "plain", border: false },
  { label: "同步完成", value: 2, dot: true, type: "success", effect: "plain", border: false },
  { label: "已取消", value: 3, dot: true, type: "info", effect: "plain", border: false },
  { label: "错误", value: 4, dot: true, type: "danger", effect: "plain", border: false },
])
</script>
