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
