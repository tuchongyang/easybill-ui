<template>
  <div class="table-filter">
    <slot name="top"></slot>
    <div>
      <FilterExternal ref="filterExternalRef" :select-params="selectParams" :list-query="listQuery" :has-slot="selectParams.some((a) => !a.external)" v-bind="$attrs" @change="onChange">
        <template #default>
          <FilterSearchBox v-if="selectParams.some((a) => !a.external)" ref="searchRef" :select-params="selectParams.filter((a) => !a.external)" :select-list="selectList" :list-query="listQuery" @search="onChange" />
        </template>
      </FilterExternal>
    </div>
    <FilterTags :select-list="selectList" :list-query="listQuery" @remove="onRemove" @change="onChange" @item-click="onTagClick"></FilterTags>
    <slot name="bottom"></slot>
  </div>
</template>
<script lang="ts">
export default { name: "TableFilter" }
</script>
<script lang="ts" setup>
import { PropType, provide, Ref, ref, reactive, onMounted } from "vue"
import * as I from "../types"
import FilterExternal from "./FilterExternal/FilterExternal.vue"
import FilterSearchBox from "./FilterSearchBox.vue"
import FilterTags from "./components/FilterTags.vue"
import { deepClone } from "../../CurdTable/utils/common"
import { CurdFormOptionItem } from "easybill-ui/components/CurdForm"

const props = defineProps({
  /**
   * @deprecated since version 1.0
   */
  selectParams: {
    type: Array as PropType<Array<I.ParamsItem>>,
    default: () => {
      return []
    },
  },
  schema: {
    type: Array as PropType<Array<I.ParamsItem>>,
    default: undefined,
  },
  /**
   * @deprecated  since version 1.0
   */
  listQuery: {
    type: Object as PropType<I.ListQuery>,
    default: () => {
      return {}
    },
  },
  modelValue: {
    type: Object as PropType<I.ListQuery>,
    default: undefined,
  },
  option: {
    type: Object as PropType<Partial<I.FilterOption>>,
    default: undefined,
  },
})
const emit = defineEmits(["search"])
const searchRef = ref()
const selectList: Ref<I.ParamsItem[]> = ref([])
const selectParams = ref<I.ParamsItem[]>(props.schema || props.selectParams || [])
const listQuery = reactive<I.ListQuery>(props.modelValue || props.listQuery || {})

const onChange = (d: any) => {
  if (d) {
    const cur = selectList.value.find((j) => d.prop == j.prop && d.label == j.label)
    if (cur) {
      if (listQuery[cur.prop] === "" || listQuery[cur.prop] === null || listQuery[cur.prop] === undefined) {
        selectList.value.splice(
          selectList.value.findIndex((j) => d.prop == j.prop),
          1,
        )
      } else {
        cur.tagNames = d.tagNames
      }
    } else {
      typeof listQuery[d.prop] !== "undefined" && listQuery[d.prop] !== "" && selectList.value.push(d)
    }
    emit("search", listQuery, selectList.value)
    return
  }
  emit("search", listQuery, selectList.value)
}
const onRemove = () => {
  emit("search", listQuery, selectList.value)
}
const getTags = () => {
  selectParams.value.forEach((a) => {
    let i = selectList.value.findIndex((j) => a.prop == j.prop)
    if (!a.external && i == -1 && listQuery[a.prop]) {
      if (a.options && a.options.length) {
        const prop = String(listQuery[a.prop])
        // const propI = prop.indexOf(",")
        let tagNames = a.tagNames || a.options.find((j) => j.value == listQuery[a.prop])?.label
        // 处理多选value的值
        if (!a.tagNames && a.type == "checkbox") {
          let propList = prop.split(",").map((item) => {
            return a?.options?.find((j) => String(j.value) == String(item))?.label
          })
          tagNames = propList.join(" | ")
        }
        selectList.value.push({ ...a, tagNames: tagNames })
      } else if (a.asyncOptions) {
        loadOptions(a.prop).then((res: CurdFormOptionItem[]) => {
          selectList.value.push({
            ...a,
            tagNames: a.tagNames || res.find((j: any) => j.value == listQuery[a.prop])?.label || "",
          })
        })
      } else {
        selectList.value.push(a)
      }
    }
  })
}

const setItem = (prop: string, paramsItem?: any) => {
  // 加延时是因为在curdtable那边筛选后，调用setItem时，listQuery更新不及时
  setTimeout(() => {
    let item = paramsItem || selectParams.value.find((a) => a.prop == prop)
    if (!item || item.external) return
    const current = selectList.value.find((a) => a.prop == prop && a.label == item.label)
    if (!current) {
      if (typeof listQuery[prop] !== "undefined" && listQuery[prop] !== "") {
        selectList.value.push({
          ...item,
          tagNames: item.tagNames || item.options?.find((j: any) => j.value == listQuery[prop])?.label,
        })
      }
    } else if (item.options && item.options.length) {
      let tagNames = item.options?.find((j: any) => j.value == listQuery[prop])?.label
      // 处理多选value的值
      if (!item.tagNames && item.type == "checkbox") {
        let propList = prop.split(",").map((a) => {
          return item?.options?.find((j: any) => String(j.value) == String(a))?.label
        })
        tagNames = propList.join(" | ")
      }
      current.tagNames = tagNames
    } else if (item.asyncOptions) {
      item.asyncOptions(listQuery, item, tableFilterContext).then((res: any) => {
        current.tagNames = item.tagNames || res.find((j: any) => j.value == listQuery[prop])?.label
      })
    }
    if ((current && typeof current.tagNames == "undefined") || (current && current.tagNames === "")) {
      selectList.value.splice(
        selectList.value.findIndex((a) => a.prop == prop),
        1,
      )
    }
  })
}
//主动赋值
const setValue = (prop: string, value: any) => {
  listQuery[prop] = value
  setItem(prop)
}
const state = ref({
  isFocus: false,
})
const filterExternalRef = ref()
const loadOptions = (prop: string, option?: any) => {
  const current = selectParams.value.find((a) => a.prop == prop)
  if (!current || !current.asyncOptions) return
  if (current.external) {
    return filterExternalRef.value.loadOptions(prop, option)
  }
  return searchRef.value.loadOptions(prop, option)
}
const clear = () => {
  for (let i = 0; i < selectList.value.length; i++) {
    delete listQuery[selectList.value[i].prop]
    selectList.value.splice(i, 1)
    i--
  }
  emit("search", listQuery, selectList.value)
}
// 重新调用selectParams
const refreshSelectParams = () => {
  if (props.schema) {
    selectParams.value = deepClone(props.schema)
  }
}
const getCurrentIndex = () => {
  return searchRef.value && searchRef.value.currentIndex
}
//点标签，切换到当前项
const onTagClick = (item: I.ParamsItem) => {
  const i = selectParams.value.findIndex((a) => a.prop == item.prop && a.label == item.label)
  searchRef.value.setIndex(i)
}
const tableFilterContext = reactive<I.TableFilterContext>({
  loadOptions,
  search: () => {
    emit("search", listQuery, selectList.value)
  },
  setValue,
})
provide("tableFilter", tableFilterContext)
provide("state", state)
provide("selectList", selectList)
provide("selectParams", selectParams)
provide("option", props.option)
defineExpose({ setItem, selectList, loadOptions, clear, refreshSelectParams, getCurrentIndex, listQuery, selectParams })
onMounted(() => {
  getTags()
})
</script>
