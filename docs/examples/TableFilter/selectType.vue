<template>
    <div class="list">
      <TableFilter v-model="listQuery" :schema="filterSchema" :option="option" @search="onSearch" />
    </div>
  </template>
  <script lang="ts" setup>
  import { Ref } from "vue"
  import { Fields, FilterItem, FilterOption } from "easybill-ui/index"
  import { ref } from "vue"
  const listQuery = ref({})
  const option = ref<FilterOption>({
    formProps: {
      labelPosition: "left",
      labelWidth: 100,
    },
  })
  const filterSchema: Ref<FilterItem[]> = ref([
  {
    label: "爱好",
    prop: "ai",
    type: "select",
    options: [
      { label: "打球", value: "1" },
      { label: "跑步", value: "2" },
      { label: "测试超长label测试超长label测试超长label测试超长label测试超长label测试超长label测试超长label", value: "3" },
    ],
  },
  {
    label: "状态",
    prop: "status",
    type: "select",
    external: true,
    span: 12,
    options: [
      { label: "全部", value: "" },
      { label: "启用", value: 1 },
      { label: "禁用", value: 2 },
    ],
  },
])
  
  const onSearch = (query: Fields) => {
    console.log("listQuery", listQuery.value)
    console.log("query", query)
  }
  </script>
<style lang="scss" scoped>
.list{
    padding: 20px;
}
</style>
