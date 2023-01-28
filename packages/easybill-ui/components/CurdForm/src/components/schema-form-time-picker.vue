<template>
  <el-time-picker v-model="model" v-bind="props" :placeholder="(formItem.props && props.placeholder && String(props.placeholder)) || '请选择' + formItem.label" v-on="eventObject"> </el-time-picker>
</template>
<script lang="ts">
import { defineComponent, computed, PropType } from "vue"
import { ElDatePicker, ModelValueType } from "element-plus"
import { FormItemProps } from "../types"
export default defineComponent({
  name: "SchemaFormDatePicker",
  components: { ElDatePicker },
  props: {
    ...FormItemProps,
    modelValue: {
      type: [Array, String] as PropType<ModelValueType>,
      default: "",
    }, // 表单项值
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const model = computed({
      get: () => props.modelValue,
      set: (val) => emit("update:modelValue", val),
    })

    return {
      model,
    }
  },
})
</script>
