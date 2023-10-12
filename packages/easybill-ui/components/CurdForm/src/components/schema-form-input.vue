<template>
  <el-input v-model="model" v-trim :disabled="formItem.disabled || false" v-bind="props" :placeholder="(props.placeholder && String(props.placeholder)) || '请输入' + (props.label || formItem.label)" autocomplete="new-password" v-on="eventObject" />
</template>
<script lang="ts">
import { defineComponent, computed } from "vue"
import { ElInput } from "element-plus"
import { FormItemProps } from "../types"
import { directives } from "../directive"
export default defineComponent({
  name: "SchemaFormInput",
  components: { ElInput },
  directives: {
    ...directives,
  },
  props: FormItemProps,
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
