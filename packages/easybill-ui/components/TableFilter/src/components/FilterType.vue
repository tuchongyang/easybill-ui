<template>
  <div v-if="visible" ref="wrapperRef" class="table-filter-type" :style="style" @mousedown.stop>
    <component :is="typeList[params.type || 'input']" v-model="query[params.prop]" :list-query="listQuery" :params-item="params" @change="onChange" @cancel="onCancel" />
  </div>
</template>
<script lang="ts" setup>
import { ref, watch, Ref, PropType } from "vue"
import * as I from "../../types"

import * as Utils from "../../../../utils/common"
import { ListQuery } from "../../types"
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
const typeList: Record<string, any> = { select: TagsSelect }

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
const open = (event: any, option: I.ParamsItem) => {
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
  if (params.value.tableKey && params.value.tableKey.length) {
    params.value.tableKey.forEach((a, i) => {
      listQuery.value[a] = option.value[i]
    })
  } else {
    listQuery.value[option.prop] = option.value
  }
  emit("change", option, params)
  close()
}

const onCancel = () => {
  close()
  emit("cancel")
}
interface ChangeOption {
  prop: string
  value: any
}
</script>
