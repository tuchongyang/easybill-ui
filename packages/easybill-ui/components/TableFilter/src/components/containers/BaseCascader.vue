<template>
  <el-cascader v-if="visible" v-model="model" class="base-select" popper-class="filter-select-popper" v-bind="paramsItem.props" :options="paramsItem.options" @focus="onFocus" @blur="onBlur" @change="onChange"> </el-cascader>
</template>
<script lang="ts" setup>
import { PropType, ref, Ref, watch, inject } from "vue"
import * as I from "../../../types"
import { deepClone } from "../../../../../utils/common"

const emit = defineEmits(["update:modelValue", "change", "search"])
const props = defineProps({
  paramsItem: {
    type: Object as PropType<I.ParamsItem>,
    default: () => {
      return {}
    },
  },
  modelValue: {
    type: [String, Number, Boolean, Array],
    default: "",
  },
  listQuery: {
    type: Object as PropType<I.ListQuery>,
    default: () => {
      return {}
    },
  },
})
const model: Ref<string | number | boolean | Array<any>> = ref(props.modelValue)

watch(
  () => props.modelValue,
  (val) => {
    model.value = val
  }
)
const paramsItem = ref(deepClone(props.paramsItem))
const visible = ref(false)

const textModel: Ref<string> = ref("")
const loading: Ref<boolean> = ref(false)
const getList = () => {
  if (paramsItem.value.options?.length && !paramsItem.value?.props?.filterable) return
  if (paramsItem.value.asyncOptions) {
    loading.value = true
    paramsItem.value
      .asyncOptions({
        textModel: textModel.value,
        listQuery: props.listQuery,
        options: paramsItem.value.options,
        paramsItem: paramsItem.value,
      })
      .then((res) => {
        // remoteOptions.value = res
        paramsItem.value.options = res
        const paramIem = props.paramsItem
        paramIem.options = res
        // getModel()
      })
      .finally(() => {
        loading.value = false
      })
  }
}
const onChange = () => {
  const labelArray: string[] = []
  const find = (list, level) => {
    for (let i in list) {
      if (list[i].value == model.value[level]) {
        labelArray[level] = list[i].label
        // 找到了，就不需要循环下一个了 ，只需要继续找children
        if (list[i].children && list[i].children.length) {
          find(list[i].children, level + 1)
        }
        return
      }
    }
  }

  find(paramsItem.value.options, 0)
  // console.log("labelArray", labelArray)
  const separator = props.paramsItem.props?.separator || "/"
  // const row = paramsItem.value.options?.find((a) => a.value == model.value) || { label: "全部", value: "" }
  paramsItem.value.tagNames = labelArray.join(separator)
  const p = props.paramsItem
  p.tagNames = labelArray.join(separator)
  textModel.value = ""
  emit("update:modelValue", model.value)
  emit("change", { prop: paramsItem.value.prop, value: model.value })
}

const state = inject<Ref<any>>("state") || ref({})
const onFocus = () => {
  state.value.isFocus = true
}
const onBlur = () => {
  state.value.isFocus = false
}
watch(
  () => props.paramsItem?.label,
  () => {
    visible.value = false
    setTimeout(() => {
      paramsItem.value = deepClone(props.paramsItem)
      visible.value = true
      // getModel()
      getList()
    })
  },
  {
    immediate: true,
  }
)
// 用于解决分配云商账号后继续追加账号后，selectListOpt不及时更新的问题
watch(
  () => props.paramsItem?.options,
  (newVal, oldValue) => {
    setTimeout(() => {
      if (newVal) {
        paramsItem.value.options = deepClone(newVal)
      }
    })
  },
  {
    deep: true,
  }
)
</script>
<style lang="scss" scoped>
.base-select {
  --el-font-size-base: 12px;
  height: 100%;
  max-height: 300px;
  display: flex;
  flex-direction: column;

  :deep(.el-input) {
    .el-input__wrapper {
      box-shadow: none !important;
    }
  }

  .remote-input {
    width: 100%;

    :deep(.el-input) {
      --el-input-border-radius: 0;
      --el-input-bg-color: var(--el-bg-color-page);
      --el-input-border: none;
      --el-input-hover-border-color: transparent;
      --el-input-focus-border-color: var(--el-border-color);
    }
  }

  :deep(.el-empty__image svg) {
    height: 50px;
  }

  .select-spinner {
    flex: 1;
    position: relative;
    overflow-y: auto;

    ul {
      li {
        list-style: none;
        padding: 6px 10px;
        cursor: pointer;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: var(--el-font-size-base);

        &.active {
          color: var(--el-color-primary);
        }

        &:hover {
          background: var(--el-color-primary-light-9);
          color: var(--el-color-primary);
        }
      }
    }
  }
}
</style>
<style lang="scss">
.filter-select-popper {
  .el-select-dropdown__item {
    font-size: 12px;
    height: auto;
    line-height: 18px;
    padding: 5px 10px;
  }
}
</style>
