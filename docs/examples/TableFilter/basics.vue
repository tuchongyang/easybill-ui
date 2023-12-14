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
    { label: "名称", prop: "name" },
    { label: "年龄", prop: "age" },
    { label: "分数", prop: "score" },
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
