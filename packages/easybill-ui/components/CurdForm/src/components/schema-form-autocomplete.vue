<template>
  <el-autocomplete v-model="model" v-bind="props" v-on="eventObject">
    <template #default="{ item }">
      <div v-if="item.html" v-html="item.html"></div>
      <div v-else>{{ item.label || item.value }}</div>
    </template>
  </el-autocomplete>
</template>
<script lang="ts" setup>
import { computed, PropType } from "vue"
import { ElCascader, CascaderOption, CascaderValue } from "element-plus"
import { FormItemProps } from "easybill-ui/components/CurdForm/src/types"
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
