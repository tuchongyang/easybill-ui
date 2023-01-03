<template>
  <el-input ref="inputRef" v-model="model" class="base-input" :placeholder="props.paramsItem?.props?.placeholder || '模糊搜索'" clearable @focus="onFocus" @blur="onBlur" @keyup.enter="onSearch"></el-input>
</template>
<script lang="ts" setup>
import { ref, PropType,computed, Ref,inject, onMounted } from "vue"
import * as I from "../../../types"
const emit = defineEmits(["update:modelValue", "change", "search"])
const props = defineProps({
  paramsItem: {
    type: Object as PropType<I.ParamsItem>,
    default: () => {
      return {}
    },
  },
  modelValue: {
    type: [String, Number, Boolean],
    default: "",
  },
  listQuery: {
    type: Object as PropType<I.ListQuery>,
    default: () => {
      return {}
    },
  },
})
const model: Ref<string | number | boolean> = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit("update:modelValue", val)
  },
})
const state = inject<Ref<any>>("state") || ref({})
const onChange = () => {
  emit("change", { prop: props.paramsItem.prop, value: model.value })
}
const onSearch = () => {
  onChange()
  // emit("search", { prop: paramsItem.value.prop, value: model.value })
  inputRef.value.blur()
}
const inputRef = ref()
onMounted(() => {
  // if (props.paramsItem && props.paramsItem.props && props.paramsItem.props.filterable) {
  // inputRef.value.focus()
  // }
})
// onActivated(() => {
//   inputRef.value.focus()
// })
const onFocus = () => {
  state.value.isFocus = true
}
const onBlur = () => {
  state.value.isFocus = false
}
const focus = () => {
  inputRef.value.focus()
}
defineExpose({ focus })
</script>
<style lang="scss" scoped>
.base-input {
  width: 100%;
  vertical-align: top;
  :deep(.el-input__wrapper) {
    --el-input-border-radius: 0;
    box-shadow: none;
    font-size: 12px;
  }
}
</style>
