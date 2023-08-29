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
    type: [String, Function] as PropType<string | ((formModel: Fields, formItem: FormItem) => Partial<ElTooltipProps> | string) | Partial<ElTooltipProps>>,
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

const tooltipModel = computed(() => {
  let tooltip: any = props.tooltip
  if (!tooltip) {
    return { content: "" }
  }
  if (typeof tooltip == "function") {
    tooltip = tooltip(props.formModel, props.formItem)
    return getTooltip(tooltip)
  }
  return getTooltip(tooltip)
})
// 获取组件tooltip内容
const getTooltip = (tooltip: Partial<ElTooltipProps> | string): Partial<ElTooltipProps> => {
  if (!tooltip) {
    return { content: "" }
  }
  let t: Partial<ElTooltipProps> = {}
  if (typeof tooltip == "string") {
    t = { content: tooltip }
  } else {
    t = tooltip
  }
  return t
}
</script>
