<template>
    <div class="list">
      <DetailInfo title="用户信息" :data="list" show-type="table" />
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, Ref } from "vue"
  const list: Ref<DetailDataItem[]> = ref([
    { label: "用户名", value: "张三", span: 12 },
    { label: "籍贯", value: "汉", span: 12 },
    { label: "联系电话", value: "1008600000", span: 8},
    { label: "备注", value: "XXXXXXXXXXX", span: 8 },
    { label: "住址", value: "XXXXXXXXXXX", span: 8 },
    
  ])
  </script>
  <style lang="scss" scoped>
      .list{
          padding: 20px;
      }
  </style>
  
  