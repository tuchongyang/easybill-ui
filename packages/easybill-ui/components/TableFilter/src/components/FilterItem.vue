<template>
  <div ref="wrapperRef" class="filter-item" style="flex: 1">
    <component :is="typeList[props.paramsItem.type || 'input']" ref="comRef" v-model="query[props.paramsItem.prop]" :list-query="listQuery" :params-item="props.paramsItem" @change="onChange" />
  </div>
</template>
<script lang="ts" setup>
import { ref, watch, Ref, PropType } from "vue"
import * as I from "../../types"
import container from "./containers"
import * as Utils from "../../../../utils/common"
import { ListQuery } from "../../types"

const props = defineProps({
  listQuery: {
    type: Object as PropType<ListQuery>,
    default: () => {
      return {}
    },
  },
  paramsItem: {
    type: Object as PropType<I.ParamsItem>,
    default: () => ({}),
  },
})
const emit = defineEmits(["change", "search"])
const listQuery: Ref<ListQuery> = ref(props.listQuery)
const query: Ref<ListQuery> = ref(Utils.deepClone(props.listQuery))
const typeList = container
// 两个watch导致循环无限调用问题，去掉了query的watch，该由change主动触发listQuery的改变
// watch(
//   () => query.value,
//   (val) => {
//     let q = val as I.ListQuery
//     if (props.paramsItem.tableKey && props.paramsItem.tableKey.length) {
//       props.paramsItem.tableKey.forEach((a, i) => {
//         q[a] = val[props.paramsItem.prop][i]
//       })
//     }
//     for (let i in q) {
//       let item = q[i]
//       listQuery.value[i] = item
//     }
//     console.log("query监听里面", JSON.stringify(listQuery.value))
//   },
//   { immediate: true }
// )
watch(
  () => props.listQuery,
  (val) => {
    let q = Utils.deepClone(val)
    let arr: Array<string> = []
    if (props.paramsItem.tableKey && props.paramsItem.tableKey.length) {
      props.paramsItem.tableKey.forEach((a) => {
        arr.push(listQuery.value[a] + "")
      })
      q[props.paramsItem.prop] = arr
    }
    query.value = q
  },
  { immediate: true, deep: true }
)
const comRef = ref()
watch(
  () => props.paramsItem,
  () => {
    setTimeout(() => {
      comRef.value && comRef.value.focus && comRef.value.focus()
    })
  }
)

const wrapperRef = ref()

const onChange = (option: ChangeOption) => {
  if (props.paramsItem.tableKey && props.paramsItem.tableKey.length) {
    props.paramsItem.tableKey.forEach((a, i) => {
      listQuery.value[a] = option.value[i]
    })
  } else {
    listQuery.value[option.prop] = option.value
  }
  // emit("change", option, props.paramsItem)
  emit("search", props.paramsItem)
  // close()
}
const setValue = (prop) => {
  listQuery.value[prop] = query.value[prop]
}
const focus = () => {
  comRef.value && comRef.value.focus && comRef.value.focus()
}
defineExpose({ setValue, focus })
interface ChangeOption {
  prop: string
  value: any
}
</script>
