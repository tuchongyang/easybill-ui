<template>
  <el-tooltip v-if="props.tooltip" v-bind="typeof props.tooltip == 'object' ? props.tooltip : {}">
    <el-button class="tooltip" type="primary" link>
      <el-icon><Warning /></el-icon>
    </el-button>
    <template #content>
      <div v-html="getTooltipContent()"></div>
    </template>
  </el-tooltip>
</template>
<script lang="ts" setup>
import { Warning } from "@element-plus/icons-vue"
import type { PropType } from "vue"
const props = defineProps({
  tooltip: {
    type: [String, Object] as PropType<string | import("element-plus/es/components/tooltip").ElTooltipProps>,
    default: "",
  },
})
const getTooltipContent = () => {
  const tooltip = props.tooltip
  if (!tooltip) {
    return ""
  }
  if (typeof tooltip === "string") {
    return tooltip
  }
  if (typeof tooltip === "object") {
    return tooltip.content
  }
  return ""
}
</script>
