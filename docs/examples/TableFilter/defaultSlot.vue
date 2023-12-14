<template>
  <div class="list">
    <TableFilter v-model="listQuery" :schema="filterSchema" :option="option" @search="onSearch">
      <template #bottom> 这里是bottom插槽 </template>
    </TableFilter>
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
    label: "特长",
    prop: "skill",
    type: "radio",
    external: true,
    span: 24,
    options: [
      { label: "全部", value: "" },
      { label: "唱歌", value: 1 },
      { label: "跳舞", value: 2 },
    ],
  },
  {
    label: "状态",
    prop: "status",
    type: "radio",
    props: { componentName: "button" },
    external: true,
    span: 24,
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
.list {
  padding: 20px;
}
</style>
