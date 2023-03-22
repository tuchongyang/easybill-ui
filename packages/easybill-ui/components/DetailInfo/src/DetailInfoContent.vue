<template>
  <el-tooltip v-if="props.data.showOverflowTooltip" v-bind="getTooltipProps">
    <div v-if="props.data.rawContent" style="text-overflow: ellipsis; white-space: nowrap; overflow: hidden" v-html="props.data.value"></div>
    <div v-else style="text-overflow: ellipsis; white-space: nowrap; overflow: hidden">{{ props.data.value }}</div>
    <!-- <template #content>
      <div v-html="props.data.value"></div>
    </template> -->
  </el-tooltip>
  <template v-else>
    <div v-if="props.data.rawContent" v-html="props.data.value"></div>
    <div v-else>{{ props.data.value }}</div>
  </template>
</template>
<script lang="ts" setup>
import { PropType, computed } from "vue"
import { DetailDataItem } from "./types"
const props = defineProps({
  data: {
    type: Object as PropType<DetailDataItem>,
    default: {},
  },
})
const getTooltipProps = computed(() => {
  if (typeof props.data.showOverflowTooltip == "object") {
    return { content: props.data.value, ...props.data.showOverflowTooltip }
  }
  return { content: props.data.value }
})
</script>
