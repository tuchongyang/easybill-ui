<template>
  <div v-if="visible" ref="wrapperRef" class="table-filter-type" :style="style" @mousedown.stop>
    <component :is="typeList[params.type || 'input']" v-model="query[params.prop]" :list-query="listQuery" :params-item="params" @change="onChange" @cancel="onCancel" />
  </div>
</template>
<script lang="ts" setup>
import { type PropType, ref, type Ref, watch } from "vue"
import * as I from "../../types"

import * as Utils from "../../../../utils/common"
import type { ListQuery } from "../../types"
import TagsSelect from "./containers/TagsSelect.vue"

const props = defineProps({
  listQuery: {
    type: Object as PropType<ListQuery>,
    default: () => {
      return {}
    },
  },
})
const emit = defineEmits(["click", "change", "cancel", "close"])
const listQuery: Ref<ListQuery> = ref(props.listQuery)
const query: Ref<ListQuery> = ref(Utils.deepClone(props.listQuery))
const params = ref<I.ParamsItem>({} as I.ParamsItem)
const visible: Ref<boolean> = ref(false)
const style = ref({})
const typeList: Record<string, unknown> = { select: TagsSelect }

watch(
  () => props.listQuery,
  (val) => {
    let q = Utils.deepClone(val)
    let arr: Array<string> = []
    if (params.value.tableKey && params.value.tableKey.length) {
      params.value.tableKey.forEach((a) => {
        arr.push(listQuery.value[a] + "")
      })
      q[params.value.prop] = arr
    }
    query.value = q
  },
  { immediate: true, deep: true },
)
const wrapperRef = ref()
const open = (_event: Event, option: I.ParamsItem) => {
  params.value = option
  visible.value = true
  console.log("params", params)
  document.getElementById("app")?.addEventListener("mousedown", close)
}
const close = () => {
  visible.value = false
  emit("close")
}
defineExpose({ close, open })
const onChange = (option: ChangeOption) => {
  const val = option.value
  if (params.value.tableKey && params.value.tableKey.length && Array.isArray(val)) {
    params.value.tableKey.forEach((a, i) => {
      listQuery.value[a] = val[i]
    })
  } else {
    listQuery.value[option.prop] = val
  }
  emit("change", option, params.value)
  close()
}

const onCancel = () => {
  close()
  emit("cancel")
}
interface ChangeOption {
  prop: string
  value: unknown
}
</script>
