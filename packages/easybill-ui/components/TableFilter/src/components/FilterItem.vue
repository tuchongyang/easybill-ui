<template>
  <div ref="wrapperRef" class="filter-item" style="flex: 1">
    <CurdForm v-if="show" ref="formRef" v-model="query" :form-schema="formSchema" @change="onChange" />
  </div>
</template>
<script lang="ts" setup>
import { ref, watch, inject, reactive, Ref, PropType } from "vue"
import * as I from "../../types"
import * as Utils from "../../../../utils/common"
import { ListQuery } from "../../types"
import { FormSchema } from "../../../CurdForm"

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
const query: Ref<ListQuery> = defineModel<any>() //ref(Utils.deepClone(props.listQuery))
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
    ;(formSchema.value.formItem = selectParams.value
      .filter((a) => !a.external)
      .map((a) => {
        a.hidden = props.paramsItem.prop != a.prop
        return a
      })),
      setTimeout(() => {
        show.value = true
      })
  },
)
// watch(
//   () => props.listQuery,
//   (val) => {
//     let q = Utils.deepClone(val)
//     let arr: Array<string> = []
//     if (props.paramsItem.tableKey && props.paramsItem.tableKey.length) {
//       props.paramsItem.tableKey.forEach((a) => {
//         arr.push(listQuery[a] + "")
//       })
//       q[props.paramsItem.prop] = arr
//     }
//     console.log("外面变了", q)
//     query.value = q
//   },
//   { immediate: true, deep: true },
// )

const wrapperRef = ref()

const onChange = () => {
  if (props.paramsItem.tableKey && props.paramsItem.tableKey.length) {
    props.paramsItem.tableKey.forEach((a, i) => {
      listQuery[a] = query.value[props.paramsItem.prop][i]
    })
  } else {
    listQuery[props.paramsItem.prop] = query.value[props.paramsItem.prop]
  }
  emit("search", props.paramsItem)
}
const setValue = (prop: string) => {
  listQuery[prop] = query.value[prop]
}
const loadOptions = (prop: string, config?: any) => {
  return formRef.value.loadOptions(prop, config)
}
defineExpose({ setValue, loadOptions })
</script>
