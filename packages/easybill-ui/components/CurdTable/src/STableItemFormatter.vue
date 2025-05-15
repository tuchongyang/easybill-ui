<script setup lang="ts">
import { computed, isReactive, isRef, isVNode, type PropType, ref, watchEffect } from "vue"
import type { ColumnItem } from "./types"
const props = defineProps({
  schema: {
    type: Object as PropType<ColumnItem<Record<string, unknown>>>,
    default() {
      return { options: [] }
    },
  },
  row: {
    type: Object,
    default: () => ({}),
  },
  index: {
    type: Number,
    default: () => 0,
  },
})
const formatterResult = ref(props.schema.formatter ? props.schema.formatter(props.row, props.row.column, props.row[props.schema.prop], props.index) : props.row[props.schema.prop])
const comp = computed(() => {
  const type = formatterResult.value
  if (type !== null && type !== "" && typeof type === "object" && (isReactive(type) || isRef(type) || isVNode(type) || type.setup)) return type
  return null
})
watchEffect(() => {
  formatterResult.value = props.schema.formatter ? props.schema.formatter(props.row, props.row.column, props.row[props.schema.prop], props.index) : props.row[props.schema.prop]
})
</script>

<template>
  <component :is="comp" v-if="comp" />
  <template v-else>{{ formatterResult }}</template>
</template>
<style scoped lang="scss"></style>
