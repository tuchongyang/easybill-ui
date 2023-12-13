<template>
    <div class="list">
        <DetailInfo title="DetailInfo" :data="list" show-type="table">
        <template #default>
            <el-tag type="danger" round effect="light">这里是默认插槽的内容</el-tag>
        </template>
    </DetailInfo>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, Ref, markRaw } from "vue"
  const list: Ref<DetailDataItem[]> = ref([
    { label: "正在同步", value: 1, span: 12 },
    { label: "同步完成", value: 2, tooltip: "这是一个提示消息", span: 12 },
    { label: "普通文本", value: "这里是一大段文字" },
  ])
  </script>
  
  <style lang="scss" scoped>
  .list {
    padding: 20px;
  }
  </style>
  