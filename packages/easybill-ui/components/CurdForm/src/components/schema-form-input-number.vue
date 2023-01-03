<template>
  <el-input-number v-model="model" style="width: 100%" v-bind="props" v-on="eventObject" />
</template>

<script lang="ts">
import { defineComponent, computed } from "vue"
import { ElInputNumber } from "element-plus"
import { FormItemProps } from "../types"
export default defineComponent({
  name: "SchemaFormInputNumber",
  components: { ElInputNumber },
  props: {
    ...FormItemProps,
    modelValue: {
      type: Number,
      default: null,
    },
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
