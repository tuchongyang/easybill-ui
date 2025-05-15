<template>
  <el-tooltip v-if="props.tooltip" v-bind="typeof props.tooltip == 'object' ? props.tooltip : {}">
    <el-button class="tooltip" type="info" link>
      <el-icon><Warning /></el-icon>
    </el-button>
    <template #content>
      <div v-html="getTooltipContent()"></div>
    </template>
  </el-tooltip>
</template>
<script lang="ts" setup>
import { Warning } from "@element-plus/icons-vue"
const props = defineProps({
  tooltip: {
    type: [String, Object],
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
