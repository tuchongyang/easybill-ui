<template>
  <el-tooltip :content="tooltipModel.content" v-bind="tooltipModel || {}">
    <el-button class="tooltip" type="primary" link>
      <el-icon><Warning /></el-icon>
    </el-button>
    <template #content>
      <div v-html="tooltipModel.content"></div>
    </template>
  </el-tooltip>
</template>
<script lang="ts" setup>
import { PropType, computed } from "vue"
import { Warning } from "@element-plus/icons-vue"
import { ElButton, ElIcon, ElTooltip, ElTooltipProps } from "element-plus"
import { FormItem, Fields } from "./types"
const props = defineProps({
  tooltip: {
    type: [String, Function],
    default: null,
  },
  formItem: {
    required: true,
    type: Object as PropType<FormItem>,
  },
  formModel: {
    type: Object as PropType<Fields>,
    default: () => ({}),
  },
})

const is = (val: any, type: string) => {
  return Object.prototype.toString.call(val) === `[object ${type}]`
}
const tooltipModel = computed(() => {
  let tooltip: any = props.tooltip
  if (!tooltip) {
    return {}
  }
  if (is(tooltip, "Function")) {
    tooltip = tooltip(props.formModel, props.formItem)
    return getTooltip(tooltip)
  }
  return getTooltip(tooltip)
})
// 获取组件tooltip内容
const getTooltip = (tooltip: ElTooltipProps | String) => {
  if (!tooltip) {
    return ""
  }
  if (is(tooltip, "String")) {
    return { content: tooltip }
  }
  return tooltip
}
</script>
