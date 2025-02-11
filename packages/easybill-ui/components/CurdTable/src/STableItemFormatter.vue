<script setup lang="ts">
import { computed, isReactive, isRef, isVNode, PropType } from "vue"
import { ColumnItem } from "easybill-ui/components/CurdTable"
const props = defineProps({
  schema: {
    type: Object as PropType<ColumnItem>,
    default() {
      return { options: [] }
    },
  },
  row: {
    type: Object,
    default: () => ({}),
  },
  index: {
    type: Number,
    default: () => 0,
  },
})
const formatterResult = props.schema.formatter(props.row, props.row.column, props.row[props.schema.prop], props.index)
const comp = computed(() => {
  const type = formatterResult
  if (isReactive(type) || isRef(type) || isVNode(type) || (<any>type).setup) return type
  return null
})
</script>

<template>
  <div class="s-table-item-formatter">
    <component :is="comp" v-if="comp" />
    <div v-else>{{ formatterResult }}</div>
  </div>
</template>
<style scoped lang="scss"></style>
