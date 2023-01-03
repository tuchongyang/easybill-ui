<template>
  <el-cascader v-model="model" :options="options" v-bind="props" v-on="eventObject"></el-cascader>
</template>
<script lang="ts" setup>
import { computed, PropType } from "vue"
import { ElCascader, CascaderOption, CascaderValue } from "element-plus"
import { FormItemProps } from "../types"
const props = defineProps({
  ...FormItemProps,
  modelValue: {
    type: [String, Number] as PropType<CascaderValue>,
    default: undefined,
  }, // 表单项值
})
const emits = defineEmits(["update:modelValue"])
const model = computed({
  get: () => props.modelValue,
  set: (val) => emits("update:modelValue", val),
})
const options = computed(() => {
  const ops = props.formItem.options as CascaderOption[]
  return ops
})
</script>
