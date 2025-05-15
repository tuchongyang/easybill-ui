<template>
  <span class="tit">{{ title }}</span>
  <STableItemHeaderTooltip :tooltip="tooltip" />
</template>
<script lang="ts" setup>
import { type PropType, computed } from "vue"
import STableItemHeaderTooltip from "./STableItemHeaderTooltip.vue"
import type { ColumnItem } from "./types"
const props = defineProps({
  schemaItem: {
    type: Object as PropType<ColumnItem<Record<string, unknown>>>,
    default: () => ({}),
  },
})
const tooltip = computed(() => {
  if (typeof props.schemaItem.header != "string") {
    return props.schemaItem.header?.tooltip
  }
  return ""
})
const title = computed(() => {
  if (!props.schemaItem.header) {
    return props.schemaItem.label
  }
  if (typeof props.schemaItem.header == "string") {
    return props.schemaItem.header
  }
  if (typeof props.schemaItem.header === "object") {
    return props.schemaItem.header.title || props.schemaItem.label
  }
  return ""
})
</script>
