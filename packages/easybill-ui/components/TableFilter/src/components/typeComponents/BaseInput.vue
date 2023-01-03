<template>
  <div class="base-input">
    <el-input ref="inputRef" v-model="model" :placeholder="paramsItem?.props?.placeholder || '模糊搜索'" class="input-with-select" clearable @keyup.enter="onSearch">
      <template #append>
        <el-button :icon="Search" @click="onSearch" />
      </template>
    </el-input>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch, PropType, Ref, onMounted } from "vue"
import * as I from "../../../types"
import { Search } from "@element-plus/icons-vue"
const emit = defineEmits(["update:modelValue", "change"])
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
const model: Ref<string | number | boolean> = ref(props.modelValue)
const paramsItem = ref(props.paramsItem)

watch(
  () => props.modelValue,
  (val) => {
    model.value = val
  }
)
const onSearch = () => {
  emit("update:modelValue", model.value)
  emit("change", { prop: paramsItem.value.prop, value: model.value })
  model.value = ""
}
const inputRef = ref()
onMounted(() => {
  if (props.paramsItem && props.paramsItem.props && props.paramsItem.props.filterable) {
    inputRef.value.focus()
  }
})
</script>
<style lang="scss" scoped>
.base-input {
  width: 200px;
  :deep(.el-input) {
    --el-input-border-radius: 0;
  }
}
</style>
