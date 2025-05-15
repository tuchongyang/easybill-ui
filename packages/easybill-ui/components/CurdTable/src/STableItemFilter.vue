<template>
  <el-popover :visible="visible" trigger="click" popper-class="filter-type-popper">
    <template #reference>
      <span ref="toggleRef" class="filter-dropdown-toggle" :class="{ active: typeof currentValue !== 'undefined' && currentValue !== '' }" @click.stop="openFilter">
        <el-icon><Filter /></el-icon>
      </span>
    </template>
    <FilterType ref="typeRef" :list-query="listQuery" @change="confirm" @close="visible = false"></FilterType>
  </el-popover>
</template>
<script lang="ts" setup>
import { Filter } from "@element-plus/icons-vue"
import { ElPopover } from "element-plus"
import { computed, type PropType, ref } from "vue"
import type { Fields } from "../../CurdForm"
import FilterType from "../../TableFilter/src/components/FilterType.vue"
import type { ColumnItemFilter } from "./types"

const props = defineProps({
  filter: {
    type: Object as PropType<ColumnItemFilter>,
    default() {
      return {}
    },
  },
  modelValue: {
    type: [String, Number, Boolean],
    default: "",
  },
})
const emit = defineEmits(["change"])
let currentValue = ref<unknown>("")
const visible = ref(false)
const listQuery = computed(() => {
  const o: Record<string, unknown> = {}
  o[props.filter.prop || ""] = props.modelValue || currentValue.value
  return o
})
const typeRef = ref()
const toggleRef = ref()
const openFilter = () => {
  visible.value = true
  typeRef.value.open(toggleRef.value, props.filter)
}
const confirm = (opt: { prop: string; value: unknown }) => {
  currentValue.value = opt.value
  emit("change", opt.prop, opt.value)
}
const search = (event: { listQuery: Fields }) => {
  currentValue.value = event.listQuery[props.filter.prop || ""]
}
defineExpose({ search })
</script>
