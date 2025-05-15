<template>
  <el-table-column v-if="!props.schema.hidden" :fixed="props.schema.fixed" v-bind="getColumnAttrs">
    <template #header>
      <div class="header-td" :class="[props.schema.align]">
        <slot name="header"></slot>
        <STableItemHeader v-if="!props.isSlotHeader" :schema-item="props.schema" />
        <STableItemFilter v-if="props.schema.filter && props.schema.filter.inner" ref="tableItemFilterRef" :filter="filterSchema" @change="onChange" />
      </div>
    </template>
    <template #default="scope">
      <slot v-bind="scope"></slot>
      <template v-if="props.schema.children?.length">
        <template v-for="item in props.schema.children" :key="item.label">
          <STableItem :ref="(el) => (tableItemRefs[item.prop] = el)" :schema="item" :is-slot="props.isSlot" :is-slot-header="props.isSlotHeader" :option="option" @search="onItemChange">
            <template #default>
              <slot :name="item.prop"></slot>
            </template>
            <template #header>
              <slot :name="item.prop + 'Header'"></slot>
            </template>
          </STableItem>
        </template>
      </template>
      <template v-if="!props.isSlot">
        <ConstantStatus v-if="props.schema.options" :value="scope.row[props.schema.prop]" :options="props.schema.options" />
        <span v-else-if="props.schema.copy">
          <el-icon class="copy" title="点击复制" @click.stop="copyValue(getValue(scope.row))"><CopyDocument /></el-icon>
          <span v-if="props.schema.vHtml" v-html="getValue(scope.row)"></span>
          <template v-else-if="props.schema.formatter"> <STableItemFormatter :row="scope.row" :index="scope.index" :schema="props.schema" /> </template>
          <template v-else>{{ getValue(scope.row) }}</template>
        </span>
        <span v-else>
          <span v-if="props.schema.vHtml" v-html="getValue(scope.row)"></span>
          <template v-else-if="props.schema.formatter">
            <STableItemFormatter :row="scope.row" :index="scope.index" :schema="props.schema" />
          </template>
          <template v-else>{{ getValue(scope.row) }}</template>
        </span>
      </template>
    </template>
  </el-table-column>
</template>
<script lang="ts" setup>
import { CopyDocument } from "@element-plus/icons-vue"
import { ElMessage } from "element-plus"
import { computed, inject, type PropType, ref, type Ref } from "vue"
import ConstantStatus from "../../ConstantStatus"
import type { ParamsItem } from "../../TableFilter"
import { copy } from "../utils/common"
import STableItemFilter from "./STableItemFilter.vue"
import STableItemFormatter from "./STableItemFormatter.vue"
import STableItemHeader from "./STableItemHeader.vue"
import type { ColumnItem } from "./types"

const props = defineProps({
  schema: {
    type: Object as PropType<ColumnItem<Record<string, unknown>>>,
    default() {
      return { options: [] }
    },
  },
  isSlot: {
    type: Boolean,
    default: false,
  },
  isSlotHeader: {
    type: Boolean,
    default: false,
  },
  option: {
    type: Object,
    default: () => ({}),
  },
})
const selectParams = inject<Ref<Array<ParamsItem>>>("selectParams")
const filterSchema = computed(() => {
  let result = selectParams?.value.filter((a) => a.prop == props.schema.filter?.prop || a.prop == props.schema.prop) //getFilterFromColumn(props.schema)
  if (result && result.length > 1) {
    result = result?.filter((a) => a.label == props.schema.label)
  }
  return (result && result[0]) || {}
})
const getColumnAttrs = computed(() => {
  const { children, ...args } = props.schema
  return args || children
})
const getValue = (row: Record<string, unknown>) => {
  return typeof row[props.schema.prop] == "undefined" || row[props.schema.prop] === "" ? "--" : row[props.schema.prop]
}

// 复制值
const copyValue = async (value: unknown) => {
  copy(String(value))
  ElMessage.success(`复制成功: ${value}`)
}
const emits = defineEmits(["search"])
const onChange = (prop: string, value: string) => {
  emits("search", prop, value, filterSchema.value)
}
const tableItemFilterRef = ref<InstanceType<typeof STableItemFilter>>()
const search = (opt: { listQuery: Record<string, unknown> }) => {
  if (tableItemFilterRef.value) tableItemFilterRef.value.search(opt)
}
const tableItemRefs: Ref<Record<string, unknown>> = ref({})
const onItemChange = (prop: string, value: string) => {
  emits("search", prop, value, filterSchema.value)
}
defineExpose({ search })
</script>
