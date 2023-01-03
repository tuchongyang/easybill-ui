<template>
  <div class="base-select" @click.stop>
    <div v-if="paramsItem.props?.filterable" class="remote-input" @click.stop>
      <el-input ref="selectInputRef" v-model="textModel" v-trim placeholder="输入搜索名称" clearable @input="onInput">
        <template #prefix>
          <el-icon class="el-input__icon"><Search /></el-icon>
        </template>
      </el-input>
    </div>
    <div v-loading="loading" class="select-spinner">
      <ul v-if="options && options.length">
        <li v-if="paramsItem.props?.all" :class="{ active: !model }" @click="onChange(allItem)">全部</li>
        <template v-for="(item, i) in options" :key="i">
          <li :class="{ active: model === item.value }" @click="onChange(item)">{{ item.label }}</li>
        </template>
      </ul>
      <el-empty v-else description="暂无数据" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch, PropType, Ref, computed, onMounted } from "vue"
import * as I from "../../../types"
import * as Utils from "../../../../../utils/common"
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

watch(
  () => props.modelValue,
  (val) => {
    model.value = val
  }
)

const paramsItem = ref(props.paramsItem)
const selectInputRef = ref()

onMounted(() => {
  if (props.paramsItem && props.paramsItem.props && props.paramsItem.props.filterable) {
    selectInputRef.value.focus()
  }
})
const textModel: Ref<string> = ref("")
const loading: Ref<boolean> = ref(false)
const allItem = { label: "全部", value: "" }
const getModel = () => {
  if (!model.value) return
  textModel.value = options.value?.find((a) => String(a.value) == String(model.value))?.label || ""
}
const paramsOptions = ref(Utils.deepClone(props.paramsItem.options))
// const remoteOptions = ref(null)
const options = computed(() => {
  return props.paramsItem.options //remoteOptions.value ? remoteOptions.value : paramsOptions.value
})
const getList = () => {
  if (paramsItem.value.options?.length && !paramsItem.value?.props?.filterable) return
  if (paramsItem.value.asyncOptions) {
    loading.value = true
    paramsItem.value
      .asyncOptions({ textModel: textModel.value, listQuery: props.listQuery, options: options.value, paramsItem: paramsItem.value })
      .then((res) => {
        // remoteOptions.value = res
        paramsItem.value.options = res
        // getModel()
      })
      .finally(() => {
        loading.value = false
      })
  }
}

const onChange = (row: I.OptionItem) => {
  paramsItem.value.tagNames = row.label
  model.value = row.value
  textModel.value = ""
  emit("update:modelValue", model.value)
  emit("change", { prop: paramsItem.value.prop, value: model.value, label: row.label })
}
const onInput = () => {
  if (paramsItem.value.asyncOptions) {
    paramsItem.value.options = []
    getList()
  } else {
    let map = paramsItem.value.options?.filter((a) => {
      if (a.label.indexOf(textModel.value) > -1) {
        return true
      }
    })
    paramsOptions.value = map
  }
}
// getModel()
getList()
const focus = () => {
  selectInputRef.value && selectInputRef.value.focus()
}
defineExpose({ focus })
</script>
<style lang="scss" scoped>
.base-select {
  --el-font-size-base: 12px;
  height: 100%;
  max-height: 300px;
  display: flex;
  flex-direction: column;

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
