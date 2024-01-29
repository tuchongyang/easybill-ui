<template>
  <div class="schema-form-radio">
    <div v-if="formItem.loading" class="loading" style="color: #999; font-size: 12px">
      <el-icon class="is-loading"><Loading /></el-icon> 加载中...
    </div>
    <el-tree-select v-if="!formItem.loading && formItem.options && formItem.options.length" v-model="model" :class="[props?.showType]" style="width: 100%" :data="formItem.options" v-bind="props" v-on="eventObject"> </el-tree-select>
    <div v-if="!formItem.loading && !formItem.options?.length" class="empty">
      <component :is="empty" v-if="empty" :form-model="formModel" :form-item="formItem" :props="props" />
      <template v-else>
        <el-icon><Warning /></el-icon> <span>{{ props.noDataText || "暂无数据" }}</span>
      </template>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, PropType, toRaw } from "vue"
import { Loading, Warning } from "@element-plus/icons-vue"
import { ElCheckbox, ElCheckboxButton, ElCheckboxGroup, ElIcon } from "element-plus"
import { FormItemProps } from "../types"
export default defineComponent({
  name: "SchemaFormTreeSelect",
  components: { Loading, ElCheckbox, ElCheckboxButton, ElCheckboxGroup, ElIcon, Warning },
  props: {
    ...FormItemProps,
    modelValue: {
      type: Array as PropType<(string | number)[]>,
      default: () => [],
    }, // 表单项值
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const model = computed({
      get: () => props.modelValue,
      set: (val) => emit("update:modelValue", val),
    })
    if (!(model.value instanceof Array)) {
      model.value = []
    }

    return {
      model,
      empty: toRaw(props.props.empty) || "",
    }
  },
})
</script>
