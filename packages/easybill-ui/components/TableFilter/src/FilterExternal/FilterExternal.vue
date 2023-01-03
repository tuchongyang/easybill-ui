<template>
  <CurdForm v-model="listQuery" inline class="filter-external" :form-schema="formSchema" @change="onChange">
    <template #defaultFilter>
      <slot></slot>
    </template>
  </CurdForm>
</template>
<script lang="ts" setup>
import { ref, Ref, PropType } from "vue"
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
})
const listQuery = ref<any>({})
// 特殊处理数组
const formItemLeft = props.selectParams.filter((a) => a.external === true || a.external === "left").sort((a, b) => parseInt(String(b.sortIndex || 0)) - parseInt(String(a.sortIndex || 0))) as FormItem[]
const formItemRight = props.selectParams.filter((a) => a.external === "right") as FormItem[]
const formSchema: Ref<FormSchema> = ref({
  formItem: [...formItemLeft, { prop: "defaultFilter", type: "defaultFilter" }, ...formItemRight],
})
const init = () => {
  for (let i in formSchema.value.formItem) {
    const item = formSchema.value.formItem[i] as ParamsItem
    if (item.tableKey) {
      listQuery.value[item.prop] = [props.listQuery[item.tableKey[0]], props.listQuery[item.tableKey[1]]]
    }
  }
  const l = props.listQuery
  for (let i in props.listQuery) {
    const cur = formSchema.value.formItem.find((a) => a.prop == i)
    if (cur) {
      listQuery.value[i] = l[i]
    } else {
      // const cur1 = formSchema.value.formItem.find((a) => a.tableKey && a.tableKey.includes(i))
      // if (cur1 && cur1.tableKey) {
      //   listQuery.value[i] = [l[cur1.tableKey[0]], l[cur1.tableKey[1]]]
      // }
    }
  }
}
init()
const emit = defineEmits(["change"])
const onChange = (formModel: Fields, formItem: any) => {
  const l = props.listQuery
  if (formItem.tableKey && formModel[formItem.prop] && formModel[formItem.prop].length) {
    l[formItem.tableKey[0]] = formModel[formItem.prop][0]
    l[formItem.tableKey[1]] = formModel[formItem.prop][1]
  }
  if (!formItem.tableKey) {
    l[formItem.prop] = formModel[formItem.prop]
  }
  emit("change")
}
</script>
