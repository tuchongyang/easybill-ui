<template>
  <div class="el-tag constant-status" :class="tagClass" v-bind="currentProps">
    <el-icon v-if="(current.icon || current.iconClass) && !current.dot" :class="current.iconClass" style="margin-right: 5px">
      <component :is="current.icon" v-if="current.icon" class="icon" :size="14" style="width: 12px; height: 12px" />
    </el-icon>
    <span v-if="current.dot" class="dot"></span>
    <span v-if="current.html" class="name" v-html="current.label"></span>
    <span v-else class="name">{{ current.label }}</span>
  </div>
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
  return (result && result.find((a) => a.value == props.value)) || {}
})
const currentProps = computed(() => {
  const defaults = { type: "", label: "", value: "", style: {} } as OptionItem
  const result = props.options || []
  const cur = result.find((a) => a.value == props.value)
  if (!cur) return {}
  const { label, value, border, type, ...args } = cur
  if (typeof border !== "undefined") {
    defaults.style = args.color ? { color: args.color, backgroundColor: "transparent" } : {}
  }
  return { ...defaults, ...args }
})
const tagClass = computed(() => {
  const result = [current.value?.dot ? "dot-status" : "", "el-tag--" + (current.value?.type || "default"), "el-tag--" + (current.value?.effect || "light")]
  if (current.value?.size) {
    result.push("el-tag--" + current.value?.size)
  }
  if (current.value?.hit) {
    result.push("is-hit")
  }
  if (current.value?.round) {
    result.push("is-round")
  }
  if (typeof current.value?.border !== "undefined") {
    result.push("no-border")
  }
  return result
})
</script>
