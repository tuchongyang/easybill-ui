<template>
  <CurdForm ref="formRef" v-model="query" inline class="filter-external" :form-schema="formSchema" @change="onChange">
    <template #defaultFilter>
      <slot></slot>
    </template>
  </CurdForm>
</template>
<script lang="ts" setup>
import { ref, watch, PropType } from "vue"
import CurdForm from "../../../CurdForm"
import { ParamsItem, ListQuery } from "../../types"
import { Fields, FormSchema, FormItem } from "../../../CurdForm"
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
})
const query = ref<any>({})
// 特殊处理数组
const formItemLeft = props.selectParams.filter((a) => a.external === true || a.external === "left").sort((a, b) => parseInt(String(b.sortIndex || 0)) - parseInt(String(a.sortIndex || 0))) as FormItem[]
const formItemRight = props.selectParams.filter((a) => a.external === "right") as FormItem[]
const as = [...formItemLeft]
if (props.hasSlot) {
  as.push({ prop: "defaultFilter", type: "defaultFilter" })
}
const formItem: FormItem[] = [...as, ...formItemRight]
const formSchema = ref<FormSchema>({
  formItem,
})
const init = () => {
  // const query = deepClone(query.value)
  for (let i in formSchema.value.formItem) {
    const item = formSchema.value.formItem[i] as ParamsItem
    if (item.tableKey && props.listQuery[item.tableKey[0]]) {
      query.value[item.prop] = [props.listQuery[item.tableKey[0]], props.listQuery[item.tableKey[1]]]
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

const emit = defineEmits(["change"])
watch(
  () => query.value,
  (val) => {
    const l = props.listQuery
    for (let i in val) {
      const cur = formSchema.value.formItem.find((a) => a.prop == i) as any
      if (cur && cur.tableKey) {
        l[cur.tableKey[0]] = (val[i] && val[i][0]) || ""
        l[cur.tableKey[1]] = (val[i] && val[i][1]) || ""
      } else {
        l[i] = val[i]
      }
    }
    //
  },
  { immediate: true, deep: true },
)
const onChange = (formModel: Fields, formItem: any) => {
  const l = props.listQuery
  if (formItem.tableKey) {
    l[formItem.tableKey[0]] = formModel[formItem.prop]?.length ? formModel[formItem.prop][0] : ""
    l[formItem.tableKey[1]] = formModel[formItem.prop]?.length ? formModel[formItem.prop][1] : ""
  }
  if (!formItem.tableKey) {
    l[formItem.prop] = formModel[formItem.prop]
  }
  emit("change")
}
const formRef = ref()
const loadOptions = (prop: string, option?: any) => {
  return formRef.value.loadOptions(prop, option)
}
defineExpose({ loadOptions })
</script>
