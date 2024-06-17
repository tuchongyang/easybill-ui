<template>
  <div class="schema-form-radio">
    <div v-if="formItem.loading" class="loading" style="color: #999; font-size: 12px">
      <el-icon class="is-loading"><Loading /></el-icon> 加载中...
    </div>
    <el-radio-group v-if="!formItem.loading && formItem.options && formItem.options.length" v-model="model" :class="[props?.showType]" v-bind="props" v-on="eventObject">
      <template v-for="option in formItem.options" :key="option.value">
        <el-radio-button v-if="props?.componentName == 'button'" :value="option.value" :disabled="option.disabled">
          <span v-if="option.html" v-html="option.html"></span>
          <span v-else>{{ option.label }}</span>
          <FormTooltip v-if="option.tooltip" :tooltip="option.tooltip" :form-item="formItem" :form-model="formModel" />
        </el-radio-button>
        <el-radio v-else :value="option.value" :disabled="option.disabled">
          <span v-if="option.html" v-html="option.html"></span>
          <span v-else>{{ option.label }}</span>
          <FormTooltip v-if="option.tooltip" :tooltip="option.tooltip" :form-item="formItem" :form-model="formModel" />
        </el-radio>
      </template>
    </el-radio-group>
    <div v-if="!formItem.loading && !formItem.options?.length" class="empty">
      <component :is="empty" v-if="empty" :form-model="formModel" :form-item="formItem" :props="props" />
      <template v-else>
        <el-icon><Warning /></el-icon> <span>{{ props.noDataText || "暂无数据" }}</span>
      </template>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, toRaw } from "vue"
import { Loading, Warning } from "@element-plus/icons-vue"
import { ElIcon, ElRadioGroup, ElRadio, ElRadioButton } from "element-plus"
import { FormItemProps } from "../types"
import FormTooltip from "../FormTooltip.vue"
export default defineComponent({
  name: "SchemaFormRadio",
  components: { Loading, ElIcon, ElRadioGroup, ElRadio, ElRadioButton, Warning, FormTooltip },
  props: {
    ...FormItemProps,
    modelValue: {
      type: [String, Number, Boolean],
      default: null,
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const model = computed({
      get: () => props.modelValue,
      set: (val) => emit("update:modelValue", val),
    })
    return {
      model,
      empty: toRaw(props.props.empty) || "",
    }
  },
})
</script>
