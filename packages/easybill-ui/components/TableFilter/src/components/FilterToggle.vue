<template>
  <el-popover ref="popoverRef" trigger="click" placement="bottom-start" popper-class="table-filter-tag-popper">
    <template #reference>
      <div ref="toggleRef" class="table-filter-toggle">
        <span class="current-filter-label">{{ props.selectParams[props.index].label }}</span>
        <el-icon><ArrowDown /></el-icon>
      </div>
    </template>
    <div ref="wrapperRef" class="table-filter-List">
      <ul>
        <template v-for="(item, i) in props.selectParams" :key="i">
          <li v-if="!item.external" :class="{ active: props.index == i }" @click="select(i)">{{ item?.label }}</li>
        </template>
      </ul>
    </div>
  </el-popover>
</template>
<script lang="ts" setup>
import { PropType, ref } from "vue"
import { ArrowDown } from "@element-plus/icons-vue"
import * as I from "../../types"
const props = defineProps({
  selectParams: {
    type: Array as PropType<Array<I.ParamsItem>>,
    default: () => {
      return []
    },
  },
  index: {
    type: Number,
    default: 0,
  },
})
const emits = defineEmits(["update:index"])
const popoverRef = ref()
const select = (i) => {
  popoverRef.value.hide()
  emits("update:index", i)
}
</script>
