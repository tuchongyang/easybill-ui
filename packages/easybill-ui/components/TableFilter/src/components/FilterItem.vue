<template>
  <div ref="wrapperRef" class="filter-item" style="flex: 1">
    <component :is="typeList[props.paramsItem.type || 'input']" ref="comRef" v-model="query[props.paramsItem.prop]" :list-query="listQuery" :params-item="props.paramsItem" @change="onChange" />
  </div>
</template>
<script lang="ts" setup>
import { ref, watch, inject, reactive, Ref, PropType } from "vue"
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
const listQuery = reactive<ListQuery>(props.listQuery)
const query: Ref<ListQuery> = ref(Utils.deepClone(props.listQuery))
const typeList = container
const tableFilter = inject("tableFilter")
watch(
  () => props.listQuery,
  (val) => {
    let q = Utils.deepClone(val)
    let arr: Array<string> = []
    if (props.paramsItem.tableKey && props.paramsItem.tableKey.length) {
      props.paramsItem.tableKey.forEach((a) => {
        arr.push(listQuery[a] + "")
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
      listQuery[a] = option.value[i]
    })
  } else {
    listQuery[option.prop] = option.value
  }
  if (props.paramsItem.eventObject?.change) {
    props.paramsItem.eventObject?.change(listQuery, props.paramsItem, tableFilter)
  }
  emit("search", props.paramsItem)
  // close()
}
const setValue = (prop: string) => {
  listQuery[prop] = query.value[prop]
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
