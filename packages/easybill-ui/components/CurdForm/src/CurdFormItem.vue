<template>
  <FormItemVue :form-model="model" :form-item="props.formItem" @change="onChange"></FormItemVue>
</template>
<script lang="ts">
export default {
  name: "CurdFormItem",
}
</script>
<script lang="ts" setup>
import { PropType, ref, watch, getCurrentInstance, reactive } from "vue"
import FormItemVue from "./FormItem.vue"
import { FormItem, Fields } from "./types"
const props = defineProps({
  formItem: {
    required: true,
    type: Object as PropType<FormItem>,
  },
  formModel: {
    type: Object as PropType<Fields>,
    default: () => ({}),
  },
  modelValue: {
    type: [String, Array, Object],
    default: "",
  },
})
const emit = defineEmits(["update:modelValue"])
const model = ref(props.formModel || {})
const onChange = () => {
  emit("update:modelValue", model.value[props.formItem.prop])
}
watch(
  () => props.modelValue,
  (val) => {
    model.value[props.formItem.prop] = val
  },
)
const instance = getCurrentInstance()
const curdFormContext = reactive({})
// 调用某个表单项的异步数据接口
const loadOptions = async (cur) => {
  if (cur && cur.asyncOptions && !instance?.isUnmounted) {
    cur.loading = true
    cur.options =
      (await cur
        .asyncOptions(model.value, cur, curdFormContext)
        .catch((err) => console.error("loadOptionError", err))
        .finally(() => (cur.loading = false))) || []
    !instance?.isUnmounted && cur.eventObject?.optionLoaded && cur.eventObject?.optionLoaded(model.value, cur, curdFormContext)
  }
  return cur?.options || []
}
const init = () => {
  if (props.formItem.asyncOptions) {
    loadOptions(props.formItem)
  }
}
curdFormContext.loadOptions = loadOptions
init()
watch(
  () => props.formItem,
  () => {
    init()
  },
)
</script>
