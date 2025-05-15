<template>
  <el-switch v-model="model" v-bind="props" v-on="eventObject" />
</template>
<script lang="ts">
import { ElSwitch } from "element-plus"
import { computed, defineComponent } from "vue"
import { FormItemProps } from "../types"
export default defineComponent({
  name: "SchemaFormTextarea",
  components: { ElSwitch },
  props: {
    ...FormItemProps,
    modelValue: {
      type: [String, Number, Boolean],
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
