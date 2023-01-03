<template>
  <div v-html="model"></div>
</template>
<script lang="ts">
import { defineComponent, computed } from "vue"
import { FormItemProps } from "../types"
export default defineComponent({
  name: "SchemaFormValue",
  components: {},
  props: {
    ...FormItemProps,
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
