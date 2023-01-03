<template>
  <div v-loading="loading" class="base-checkbox" @mousedown.stop>
    <div v-if="paramsItem.props?.filterable" class="remote-input">
      <el-input v-model="textModel" v-trim placeholder="输入搜索名称" @input="onInput" />
    </div>
    <div v-spin="loading" class="checkbox-spinner">
      <el-checkbox-group v-if="options && options.length" v-model="checkList" @change="isCheckAll" @keydown.enter="confirm">
        <div v-for="(item, index) in options" :key="index" class="checkbox-item">
          <el-checkbox :label="item.value">{{ item.label }}</el-checkbox>
        </div>
      </el-checkbox-group>
      <el-empty v-else description="暂无数据" />
      <div class="floor">
        <div class="check-all">
          <el-checkbox v-if="paramsItem.props?.all" v-model="checkAll" :indeterminate="isIndeterminate" label="全选" size="large" style="margin-right: 20px" @change="allChange" />
        </div>
        <div class="floor-btn">
          <el-button size="small" @click="cancel">取消</el-button>
          <el-button size="small" @click="confirm">确认</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed, Ref, PropType, watch } from "vue"
import * as I from "../../../types"
import * as Utils from "../../../../../utils/common"

const emit = defineEmits(["update:modelValue", "change", "cancel"])
const props = defineProps({
  paramsItem: {
    type: Object as PropType<I.ParamsItem>,
    default: () => {
      return {}
    },
  },
  modelValue: {
    type: String,
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
const textModel: Ref<string> = ref("")
const loading: Ref<boolean> = ref(false)
const checkList: Ref<Array<string | number | boolean>> = ref([])
const checkAll: Ref<boolean> = ref(false)
const paramsOptions = ref(Utils.deepClone(props.paramsItem.options))
const remoteOptions = ref(null)
const confirmOpen: Ref<boolean> = ref(true)
const options = computed(() => {
  const list = remoteOptions.value ? remoteOptions.value : paramsOptions.value
  return list?.map((a) => {
    a.value = String(a.value) // 把所有的value转化成字符串类型
    return a
  })
})
const isIndeterminate = computed(() => {
  return checkList.value.length && checkList.value.length != options.value?.length ? true : false
})
const getModel = () => {
  if (!model.value) return
  textModel.value = options.value?.find((a) => String(a.value) == String(model.value))?.label || ""
}
const getList = () => {
  if (paramsItem.value.asyncOptions) {
    loading.value = true
    paramsItem.value
      .asyncOptions({ textModel: textModel.value, listQuery: props.listQuery, options: options.value, paramsItem: paramsItem.value })
      .then((res) => {
        remoteOptions.value = res
        getCheck()
        getModel()
      })
      .finally(() => {
        loading.value = false
      })
  } else {
    getCheck()
    getModel()
  }
}
const onInput = () => {
  if (paramsItem.value.asyncOptions) {
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
const allChange = () => {
  checkList.value = []
  if (checkAll.value) {
    options.value?.forEach((a) => {
      checkList.value.push(a.value)
    })
  }
}
const isLabel = () => {
  if (checkList.value.length) {
    let map = options.value
      ?.filter((a) => {
        if (checkList.value.findIndex((i) => i == a.value) > -1) {
          return true
        }
      })
      .map((a) => a.label)
    return map?.length ? map.join(" | ") : ""
  }
  return ""
}
const getCheck = () => {
  if (confirmOpen.value) {
    checkList.value = []
  }
  checkList.value = model.value ? String(model.value).split(",") : []
  isCheckAll()
}

const isCheckAll = () => {
  if (checkList.value.length == options.value?.length) {
    checkAll.value = true
  } else {
    checkAll.value = false
  }
}
const confirm = () => {
  checkList.value = checkList.value.filter((a) => {
    if (String(a)) {
      return true
    } else {
      return false
    }
  })
  model.value = checkList.value.join(",")
  paramsItem.value.tagNames = isLabel()
  textModel.value = ""
  emit("change", { prop: paramsItem.value.prop, value: model.value })
  emit("update:modelValue", model.value)
}
const cancel = () => {
  textModel.value = ""
  emit("cancel")
}
getList()
</script>
<style lang="scss" scoped>
.base-checkbox {
  width: 100%;
  .checkbox-spinner {
    position: relative;
    max-height: 300px;
    overflow-y: auto;
    :deep(.el-empty__image svg) {
      height: 50px;
    }
  }
  :deep(.el-checkbox-group) {
    width: 100%;

    .el-checkbox {
      padding: 0 10px;
      width: 100%;
      &.is-checked {
        .el-checkbox__inner {
          background-color: var(--el-color-primary);
          border-color: var(--el-color-primary);
        }
        .el-checkbox__label {
          color: var(--el-color-primary);
        }
      }
    }
    .checkbox-item {
      width: 100%;
      .el-checkbox__label {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: calc(100% - 24px);
      }
      &:hover {
        background: var(--el-color-primary-light-9);
        .el-checkbox__label {
          color: var(--el-color-primary);
        }
      }
    }
  }
  .floor {
    border-top: 1px solid var(--el-color-info-light-7);
    padding: 5px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    white-space: nowrap;
    .check-all {
      :deep(.el-checkbox) {
        width: 100%;
        &.is-checked {
          .el-checkbox__inner {
            background-color: var(--el-color-primary);
            border-color: var(--el-color-primary);

            .el-checkbox__label {
              color: var(--el-color-primary);
            }
          }
        }
        &:hover {
          .el-checkbox__label {
            color: var(--el-color-primary);
          }
        }
      }
    }
  }
}
</style>
