<template>
  <div class="s-table-filter">
    <TableFilter ref="tableFilterRef" :select-params="selectParams" :list-query="props.listQuery" v-bind="option.filterAttrs" @search="onSearch"></TableFilter>
  </div>
</template>
<script lang="ts" setup>
import { inject, PropType, Ref, ref } from "vue"
import { ListQuery, ParamsItem } from "../../TableFilter"
import TableFilter from "../../TableFilter"

const emits = defineEmits(["search"])
const option = inject("option")
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
const setItem = (prop: string, filterItem?: any) => {
  tableFilterRef.value.setItem(prop, filterItem)
}
const getSelectList = () => {
  return tableFilterRef.value.selectList
}
const loadOptions = (prop: string) => {
  return tableFilterRef.value.loadOptions(prop)
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
