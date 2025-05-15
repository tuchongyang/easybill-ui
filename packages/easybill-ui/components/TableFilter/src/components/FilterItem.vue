<template>
  <div ref="wrapperRef" class="filter-item" style="flex: 1">
    <CurdForm v-if="show" ref="formRef" v-model="query" :form-schema="formSchema" @change="onChange" />
  </div>
</template>
<script lang="ts" setup>
import { inject, type PropType, reactive, ref, type Ref, watch } from "vue"
import type { FormSchema } from "../../../CurdForm"
import type { ListQuery } from "../../types"
import * as I from "../../types"

const props = defineProps({
  modelValue: {
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

const listQuery = reactive<ListQuery>(props.modelValue)
const query = defineModel<ListQuery>({} as ListQuery) //ref(Utils.deepClone(props.listQuery))
const formRef = ref()
const selectParams = inject<Ref<I.ParamsItem[]>>("selectParams") || ref([])
const formSchema = ref<FormSchema>({
  formItem: [
    ...selectParams.value
      .filter((a) => !a.external)
      .map((a) => {
        a.hidden = props.paramsItem.prop != a.prop
        return a
      }),
  ],
})
const show = ref(true)
watch(
  () => props.paramsItem.prop,
  () => {
    show.value = false
    formSchema.value.formItem = selectParams.value
      .filter((a) => !a.external)
      .map((a) => {
        a.hidden = props.paramsItem.prop != a.prop
        return a
      })
    setTimeout(() => {
      show.value = true
    })
  },
)
const wrapperRef = ref()

const onChange = () => {
  const val = query.value && query.value[props.paramsItem.prop]
  if (props.paramsItem.tableKey && props.paramsItem.tableKey.length && Array.isArray(val)) {
    props.paramsItem.tableKey.forEach((a, i) => {
      listQuery[a] = val[i]
    })
  } else {
    listQuery[props.paramsItem.prop] = val || ""
  }
  emit("search", props.paramsItem)
}
const setValue = (prop: string) => {
  if (query.value) listQuery[prop] = query.value[prop]
}
const loadOptions = (prop: string, config?: unknown) => {
  return formRef.value.loadOptions(prop, config)
}
defineExpose({ setValue, loadOptions })
</script>
