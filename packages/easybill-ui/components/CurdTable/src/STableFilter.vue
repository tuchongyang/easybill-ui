<template>
  <div class="s-table-filter">
    <TableFilter ref="tableFilterRef" :select-params="selectParams" :list-query="props.listQuery" v-bind="option?.filterAttrs" @search="onSearch"></TableFilter>
  </div>
</template>
<script lang="ts" setup>
import { inject, type PropType, type Ref, ref } from "vue"
import TableFilter, { type FilterItem, type ListQuery, type ParamsItem } from "../../TableFilter"
import type { PropOption } from "./types"

const emits = defineEmits(["search"])
const option = inject<PropOption>("option")
const selectParams = inject<Ref<Array<ParamsItem>>>("selectParams") || ref([])
const props = defineProps({
  listQuery: {
    type: Object as PropType<ListQuery>,
    default() {
      return {}
    },
  },
})
const onSearch = () => {
  emits("search", props.listQuery)
}
const tableFilterRef = ref()
const setItem = (prop: string, filterItem?: FilterItem) => {
  tableFilterRef.value.setItem(prop, filterItem)
}
const getSelectList = () => {
  return tableFilterRef.value.selectList
}
const loadOptions = (prop: string, config?: unknown) => {
  return tableFilterRef.value.loadOptions(prop, config)
}
const clear = (prop: string) => {
  return tableFilterRef.value.clear(prop)
}
// 刷新selectParams
const refreshSelectParams = () => {
  tableFilterRef.value.refreshSelectParams()
}
// 获取当前tableFilter的prop
const getCurrentTableFilterProp = () => {
  const currentIndex = tableFilterRef.value.getCurrentIndex()
  if (currentIndex !== undefined) {
    return selectParams.value[tableFilterRef.value.getCurrentIndex()].prop
  }
}
defineExpose({ filterRef: tableFilterRef, setItem, getSelectList, loadOptions, clear, refreshSelectParams, getCurrentTableFilterProp })
</script>
