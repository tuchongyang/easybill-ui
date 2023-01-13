<template>
  <span class="tit">{{ title }}</span>
  <STableItemHeaderTooltip :tooltip="tooltip" />
</template>
<script lang="ts" setup>
import { PropType, ref, computed } from "vue"
import { ColumnItem } from "./types"
import STableItemHeaderTooltip from "./STableItemHeaderTooltip.vue"
const props = defineProps({
  schemaItem: {
    type: Object as PropType<ColumnItem>,
    default: "",
  },
})
const tooltip = computed(() => {
  if (is(props.schemaItem.header, "Object")) {
    return props.schemaItem.header.tooltip
  }
  return ""
})
const title = computed(() => {
  if (!props.schemaItem.header) {
    return props.schemaItem.label
  }
  if (is(props.schemaItem.header, "String")) {
    return props.schemaItem.header
  }
  if (is(props.schemaItem.header, "Object")) {
    return props.schemaItem.header.title || props.schemaItem.label
  }
})
const getTooltipContent = () => {
  const tooltip: any = props.tooltip
  if (!tooltip) {
    return ""
  }
  if (is(tooltip, "Object")) {
    return tooltip.content
  }
  if (is(tooltip, "String")) {
    return tooltip
  }
  return ""
}
const is = (val: any, type: string) => {
  return Object.prototype.toString.call(val) === `[object ${type}]`
}
</script>
