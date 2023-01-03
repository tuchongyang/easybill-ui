<template>
  <el-popover :visible="visible" trigger="click" popper-class="filter-type-popper">
    <template #reference>
      <span ref="toggleRef" class="filter-dropdown-toggle" :class="{ active: typeof currentValue !== 'undefined' && currentValue !== '' }" @click.stop="openFilter">
        <el-icon><Filter /></el-icon>
      </span>
    </template>
    <FilterType ref="typeRef" :list-query="listQuery" @change="confirm" @close="visible = false"></FilterType>
  </el-popover>

  <!-- <teleport to="body">
    <FilterType ref="typeRef" :list-query="listQuery" @change="confirm"></FilterType>
  </teleport> -->
</template>
<script lang="ts" setup>
import { Filter } from "@element-plus/icons-vue"
import { PropType, ref, computed } from "vue"
import FilterType from "../../TableFilter/src/components/FilterType.vue"
import { ColumnItemFilter } from "./types"
import { Fields } from "../../CurdForm"
// import { useEventBus } from "@vueuse/core"
import { ElPopover } from "element-plus"

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
// const search = inject<any>("search")
let currentValue = ref("")
const visible = ref(false)
const listQuery = computed(() => {
  const o: any = {}
  o[props.filter.prop || ""] = props.modelValue || currentValue.value
  return o
})
const typeRef = ref()
const toggleRef = ref()
const openFilter = () => {
  visible.value = true
  typeRef.value.open(toggleRef.value, props.filter)
}
const confirm = (opt: any) => {
  currentValue.value = opt.value
  emit("change", opt.prop, opt.value)
}
// const bus = useEventBus<Fields>("tableItemFilter")
const search = (event: Fields) => {
  // let pass = false
  // for (const i in event.selectList) {
  //   const item = event.selectList[i]
  //   if (item.prop == props.filter.prop && item.label == props.filter.label) {
  currentValue.value = event.listQuery[props.filter.prop || ""]
  //     pass = true
  //   }
  // }
  // if (!pass) {
  //   currentValue.value = ""
  // }
  // console.log(pass, currentValue.value)
}
defineExpose({ search })
// listener(search)
// let hasInit = false
// onActivated(() => {
//   if (!hasInit) {
//     bus.on(listener)
//     hasInit = true
//   }
// })
// bus.on(listener)
// hasInit = true
// onDeactivated(() => {
//   bus.off(listener)
//   hasInit = false
// })
// onBeforeUnmount(() => {
//   bus.off(listener)
//   hasInit = false
// })
</script>
