<template>
  <el-autocomplete v-model="model" v-bind="props.props" v-on="props.eventObject">
    <template #default="{ item }">
      <div v-if="item.html" v-html="item.html"></div>
      <div v-else>{{ item.label || item.value }}</div>
    </template>
  </el-autocomplete>
</template>
<script lang="ts" setup>
import { FormItemProps } from "easybill-ui/components/CurdForm/src/types"
import { CascaderValue } from "element-plus"
import { computed, PropType } from "vue"
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
</script>
