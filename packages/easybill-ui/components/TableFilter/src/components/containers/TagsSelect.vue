<template>
  <div class="base-select" @click.stop>
    <div v-if="ps.filterable" class="remote-input" @click.stop>
      <el-input ref="selectInputRef" v-model="textModel" placeholder="输入搜索名称" clearable @input="onInput">
        <template #prefix>
          <el-icon class="el-input__icon"><Search /></el-icon>
        </template>
      </el-input>
    </div>
    <div v-loading="loading" class="select-spinner">
      <ul v-if="options && options.length">
        <li v-if="ps.all" :class="{ active: !model }" @click="onChange(allItem)">全部</li>
        <template v-for="(item, i) in options" :key="i">
          <li :class="{ active: model === item.value }" @click="onChange(item)">{{ item.label }}</li>
        </template>
      </ul>
      <el-empty v-else description="暂无数据" :image-size="40" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, inject, PropType, Ref, computed, onMounted } from "vue"
import * as I from "../../../types"
import { Search } from "@element-plus/icons-vue"
import { CurdFormOptionItem } from "easybill-ui/components/CurdForm"
const emit = defineEmits(["update:modelValue", "change"])
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

const tableFilterContext = inject<any>("tableFilter")

const paramsItem = ref(props.paramsItem)
const selectInputRef = ref()

onMounted(() => {
  const ps = props.paramsItem && props.paramsItem.props
  if (typeof ps != "function" && ps?.filterable) {
    selectInputRef.value.focus()
    tableFilterContext?.loadOptions(paramsItem.value.prop)
  }
})
const ps = computed(() => {
  let ps = props.paramsItem && props.paramsItem.props
  if (typeof ps == "function") {
    return ps(props.listQuery, props.paramsItem)
  }
  return ps || {}
})
const textModel: Ref<string> = ref("")
const loading: Ref<boolean> = ref(false)
const allItem = { label: "全部", value: "" }

const options = computed(() => {
  return paramsItem.value.asyncOptions ? props.paramsItem.options : props.paramsItem.options?.filter((a) => a.label.includes(textModel.value))
})

const onChange = (row: CurdFormOptionItem) => {
  paramsItem.value.tagNames = row.label
  model.value = row.value
  textModel.value = ""
  emit("update:modelValue", model.value)
  emit("change", { prop: paramsItem.value.prop, value: model.value, label: row.label })
}
const onInput = () => {
  if (paramsItem.value.asyncOptions) {
    paramsItem.value.options = []
    tableFilterContext?.loadOptions(paramsItem.value.prop, { queryString: textModel.value })
  }
}
const focus = () => {
  selectInputRef.value && selectInputRef.value.focus()
}
defineExpose({ focus })
</script>
