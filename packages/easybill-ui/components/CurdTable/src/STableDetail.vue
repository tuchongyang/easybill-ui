<template>
  <el-drawer v-model="visible" title="详情" size="40%">
    <DetailInfo :data="list" title="详情" label-width="110px" show-type="table" />
  </el-drawer>
</template>
<script lang="ts" setup>
import { ref, Ref } from "vue"
import { ColumnItem, DetailDataItem } from "./types"
import DetailInfo from "../../DetailInfo"
interface OpenOption {
  columns: Array<ColumnItem>
  data: any
}

const visible = ref(false)
const list: Ref<Array<DetailDataItem>> = ref([])
const getValue = (data, column, index) => {
  if (column.formatter) {
    return column.formatter(data, column, data[column.prop], index)
  }
  return typeof data[column.prop] == "undefined" || data[column.prop] === "" ? "--" : data[column.prop]
}
const open = (option: OpenOption) => {
  list.value = []
  option.columns.forEach((item, ci) => {
    if (item.children && item.children.length) {
      for (let i in item.children) {
        const a = item.children[i]
        if (a.hidden) continue
        list.value.push({
          label: a.label,
          value: getValue(option.data, a, i),
          span: (a.detail && a.detail.span) || 24,
          options: a.options,
        })
      }
    } else {
      if (item.hidden) return
      list.value.push({
        label: item.label,
        value: getValue(option.data, item, ci),
        span: (item.detail && item.detail.span) || 24,
        options: item.options,
      })
    }
  })
  visible.value = true
}
defineExpose({ open })
</script>
