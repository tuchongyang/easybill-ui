<template>
  <span class="tit">{{ title }}</span>
  <STableItemHeaderTooltip :tooltip="tooltip" />
</template>
<script lang="ts" setup>
import { PropType, computed } from "vue"
import { ColumnItem } from "./types"
import STableItemHeaderTooltip from "./STableItemHeaderTooltip.vue"
const props = defineProps({
  schemaItem: {
    type: Object as PropType<ColumnItem>,
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
  if (is(props.schemaItem.header, "Object")) {
    return props.schemaItem.header.title || props.schemaItem.label
  }
  return ""
})
const is = (val: any, type: string) => {
  return Object.prototype.toString.call(val) === `[object ${type}]`
}
</script>
