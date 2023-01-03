<template>
  <el-color-picker v-model="model" show-alpha v-bind="props" v-on="eventObject"> </el-color-picker>
</template>
<script lang="ts">
import { defineComponent, computed } from "vue"
import { ElColorPicker } from "element-plus"
import { FormItemProps } from "../types"
export default defineComponent({
  name: "SchemaFormColorPicker",
  components: { ElColorPicker },
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
