<template>
  <CurdForm ref="formRef" v-model="query" inline class="filter-external" :form-schema="formSchema" v-bind="option?.formProps" :extend-context="props.extendContext" @change="onChange">
    <template #defaultFilter>
      <slot></slot>
    </template>
  </CurdForm>
</template>
<script lang="ts" setup>
import { type PropType, inject, ref, watch } from "vue"
import type { Fields, FormItem, FormSchema } from "../../../CurdForm"
import CurdForm from "../../../CurdForm"
import type { FilterOption, ListQuery, ParamsItem } from "../../types"
const props = defineProps({
  selectParams: {
    type: Array as PropType<Array<ParamsItem>>,
    default: () => {
      return []
    },
  },
  listQuery: {
    type: Object as PropType<ListQuery>,
    default: () => {
      return {}
    },
  },
  hasSlot: {
    type: Boolean,
    default: false,
  },
  extendContext: {
    type: Object,
    default: () => ({}),
  },
})
const option = inject<FilterOption>("option")
const query = ref<ListQuery>({})

const formSchema = ref<FormSchema>({
  formItem: [],
})
const init = () => {
  // 特殊处理数组
  const formItemLeft = props.selectParams.filter((a) => a.external === true || a.external === "left").sort((a, b) => parseInt(String(b.sortIndex || 0)) - parseInt(String(a.sortIndex || 0))) as FormItem[]
  const formItemRight = props.selectParams.filter((a) => a.external === "right") as FormItem[]
  const as = [...formItemLeft]
  if (props.hasSlot) {
    as.push({ prop: "defaultFilter", type: "defaultFilter" })
  }
  const formItem: FormItem[] = [...as, ...formItemRight]
  formSchema.value.formItem = formItem
  // const query = deepClone(query.value)
  for (let i in formSchema.value.formItem) {
    const item = formSchema.value.formItem[i] as ParamsItem
    if (item.tableKey && props.listQuery[item.tableKey[0]]) {
      const val1 = props.listQuery[item.tableKey[0]] as string
      const val2 = props.listQuery[item.tableKey[1]] as string
      query.value[item.prop] = [val1, val2]
    }
  }
  const l = props.listQuery
  for (let i in props.listQuery) {
    const cur = formSchema.value.formItem.find((a) => a.prop == i)
    if (cur) {
      query.value[i] = l[i]
    } else {
      // const cur1 = formSchema.value.formItem.find((a) => a.tableKey && a.tableKey.includes(i))
      // if (cur1 && cur1.tableKey) {
      //   query[i] = [l[cur1.tableKey[0]], l[cur1.tableKey[1]]]
      // }
    }
  }
  // query.value = query
}
init()
watch(
  () => props.selectParams,
  () => {
    init()
  },
)

const emit = defineEmits(["change"])
watch(
  () => query.value,
  (val) => {
    const l = props.listQuery
    for (let i in val) {
      const cur = formSchema.value.formItem.find((a) => a.prop == i) as ParamsItem
      const valItem = val[i]
      if (cur && cur.tableKey && Array.isArray(valItem)) {
        l[cur.tableKey[0]] = valItem[0] || ""
        l[cur.tableKey[1]] = valItem[1] || ""
      } else {
        l[i] = val[i]
      }
    }
    //
  },
  { immediate: true, deep: true },
)
const onChange = (formModel: Fields, formItem: ParamsItem) => {
  const l = props.listQuery
  const val = formModel[formItem.prop]
  if (formItem.tableKey && Array.isArray(val)) {
    l[formItem.tableKey[0]] = val[0] || ""
    l[formItem.tableKey[1]] = val[1] || ""
  }
  if (!formItem.tableKey) {
    l[formItem.prop] = formModel[formItem.prop] as string
  }
  setTimeout(() => {
    emit("change")
  })
}
const formRef = ref()
const loadOptions = (prop: string, option?: unknown) => {
  return formRef.value.loadOptions(prop, option)
}

defineExpose({ loadOptions })
</script>
