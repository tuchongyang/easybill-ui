<script setup lang="ts">
import { computed, isReactive, isRef, ref, isVNode, PropType, watchEffect } from "vue"
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
const formatterResult = ref(props.schema.formatter(props.row, props.row.column, props.row[props.schema.prop], props.index))
const comp = computed(() => {
  const type = formatterResult.value
  if (type !== null && typeof type === "object" && (isReactive(type) || isRef(type) || isVNode(type) || (<any>type).setup)) return type
  return null
})
watchEffect(() => {
  formatterResult.value = props.schema.formatter(props.row, props.row.column, props.row[props.schema.prop], props.index)
})
</script>

<template>
  <component :is="comp" v-if="comp" />
  <template v-else>{{ formatterResult }}</template>
</template>
<style scoped lang="scss"></style>
