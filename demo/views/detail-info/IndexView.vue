<template>
  <div>
    <DetailInfo title="默认模式" :data="list" />
    <DetailInfo title="表格模式" :data="list" show-type="table" label-width="120px" />
  </div>
</template>
<script lang="ts" setup>
import { ref, Ref } from "vue"
import { DetailDataItem } from "easybill-ui/index"
const list: Ref<DetailDataItem> = ref([
  { label: "正在同步", value: 1 },
  { label: "同步完成", value: 2, tooltip: "这是一个提示消息" },
  { label: "已取消", value: 3 },
  { label: "错误", value: 4 },
])
</script>
