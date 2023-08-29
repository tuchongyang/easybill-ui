<template>
  <el-tag v-if="current" class="constant-status" :class="{ 'dot-status': current.dot }" v-bind="currentProps">
    <el-icon v-if="(current.icon || current.iconClass) && !current.dot" :class="current.iconClass" style="margin-right: 5px">
      <component :is="current.icon" v-if="current.icon" class="icon" :size="14" style="width: 12px; height: 12px" />
    </el-icon>
    <span v-if="current.dot" class="dot"></span>
    <span v-if="current.html" class="name" v-html="current.label"></span>
    <span v-else class="name">{{ current.label }}</span>
  </el-tag>
  <span v-else>{{ typeof value === "undefined" || value === "" ? "--" : value }}</span>
</template>
<script lang="ts">
export default {
  name: "ConstantStatus",
}
</script>
<script lang="ts" setup>
import { computed, PropType } from "vue"
import { OptionItem } from "./types"
const props = defineProps({
  value: {
    type: [String, Number, Boolean],
    default: undefined,
  },
  options: {
    type: Array as PropType<Array<OptionItem>>,
    default: () => [],
  },
})
const current = computed(() => {
  const result = props.options || []
  const value = props.value
  if (typeof value == "string" && value.indexOf(",") > -1) {
    var curs = result.filter((a) => value.indexOf(a.value + "") > -1)
    return {
      ...curs[0],
      label: curs.map((a) => a.label).join(","),
    }
  }
  if (value === "" || value === undefined) {
    return undefined
  }
  return result && result.find((a) => a.value == props.value)
})
const currentProps = computed(() => {
  const defaults = { type: "", label: "", value: "", class: [""], style: {} } as OptionItem
  const result = props.options || []
  const cur = result.find((a) => a.value == props.value)
  if (!cur) return {}
  const { label, value, border, type, ...args } = cur
  if (typeof border !== "undefined") {
    defaults.class = ["no-border"]
    defaults.style = args.color ? { color: args.color, backgroundColor: "transparent" } : {}
  }
  // 判断type在不在里面
  if (type && ["success", "info", "warning", "danger"].includes(String(type))) {
    defaults.type = type
  } else {
    defaults.class.push("el-tag--" + (type || "default"))
  }
  return { ...defaults, ...args }
})
</script>
