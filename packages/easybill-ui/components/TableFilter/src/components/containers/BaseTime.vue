<template>
  <div class="base-time">
    <el-date-picker v-model="pickerModel" class="time-picker" size="small" value-format="YYYY-MM-DD" format="YYYY-MM-DD" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :placeholder="'请选择' + props.paramsItem.label" v-bind="paramsItem.props" @change="onChange" />
  </div>
</template>
<script lang="ts" setup>
import { deepClone } from "../../../../../utils/common"
import { ElDatePicker } from "element-plus"
import { PropType, Ref, ref, watch } from "vue"
import * as I from "../../../types"
const emit = defineEmits(["update:modelValue", "change", "cancel"])
const props = defineProps({
  paramsItem: {
    type: Object as PropType<I.ParamsItem>,
    default: () => {
      return {}
    },
  },
  modelValue: {
    type: [String, Array] as PropType<string | Array<string>>,
    default: "",
  },
})
const model: Ref<string | string[]> = ref(props.modelValue)

watch(
  () => props.modelValue,
  (val) => {
    model.value = val
    pickerModel.value = deepClone(val)
  }
)
watch(
  () => model.value,
  (val) => {
    emit("update:modelValue", val)
  }
)
const paramsItem = ref(props.paramsItem)
const pickerModel: Ref<any> = ref(deepClone(props.modelValue))

const onChange = () => {
  model.value = deepClone(pickerModel.value)
  emit("change", { prop: paramsItem.value.prop, value: model.value })
}
</script>
<style lang="scss" scoped>
.base-time {
  width: 100%;
  vertical-align: top;
  height: 32px;
  :deep(.time-picker) {
    width: 100%;
    .el-input__wrapper {
      border-color: transparent;
      box-shadow: none;
    }
  }
  .floor {
    border-top: 1px solid var(--el-color-info-light-7);
    padding: 5px 10px;
    text-align: right;
  }
}
</style>
