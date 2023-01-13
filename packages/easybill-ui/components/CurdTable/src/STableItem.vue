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
      <template v-if="!props.isSlot">
        <ConstantStatus v-if="props.schema.options" :value="scope.row[props.schema.prop]" :options="props.schema.options" />
        <template v-else-if="props.schema.form && props.schema.form.type == 'file'">
          <el-image :src="scope.row[props.schema.prop]" :preview-src-list="[scope.row[props.schema.prop]]" style="width: 40px; height: 40px; vertical-align: top" fit="cover" @click.stop></el-image>
        </template>
        <span v-else-if="props.schema.copy">
          <el-icon class="copy" title="点击复制" @click.stop="copyValue(getValue(scope))"><CopyDocument /></el-icon>
          <span v-if="props.schema.vHtml" v-html="getValue(scope)"></span>
          <template v-else> {{ getValue(scope) }} </template>
        </span>
        <span v-else>
          <span v-if="props.schema.vHtml" v-html="getValue(scope)"></span>
          <template v-else> {{ getValue(scope) }} </template>
        </span>
      </template>
    </template>
  </el-table-column>
</template>
<script lang="ts" setup>
import { computed, inject, PropType, ref, Ref } from "vue"
import ConstantStatus from "../../ConstantStatus"
import STableItemFilter from "./STableItemFilter.vue"
import STableItemHeader from "./STableItemHeader.vue"
import { ParamsItem } from "../../TableFilter"
import { ColumnItem } from "./types"
import { CopyDocument } from "@element-plus/icons-vue"
import { ElMessage } from "element-plus"
import { copy } from "../utils/common"

const props = defineProps({
  schema: {
    type: Object as PropType<ColumnItem>,
    default() {
      return {}
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
const getValue = (scope: any) => {
  if (props.schema.formatter) {
    return props.schema.formatter(scope.row, scope.column, scope.row[props.schema.prop], scope.index)
  }
  return typeof scope.row[props.schema.prop] == "undefined" || scope.row[props.schema.prop] === "" ? "--" : scope.row[props.schema.prop]
}

// 复制值
const copyValue = async (value: any) => {
  copy(value)
  ElMessage.success(`复制成功: ${value}`)
}
const emits = defineEmits(["search"])
const onChange = (prop: string, value: string) => {
  emits("search", prop, value, filterSchema.value)
}
const tableItemFilterRef = ref()
const search = (opt: any) => {
  tableItemFilterRef.value?.search && tableItemFilterRef.value.search(opt)
}
defineExpose({ search })
</script>
