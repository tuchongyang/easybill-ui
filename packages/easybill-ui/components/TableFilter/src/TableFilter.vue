<template>
  <div class="table-filter">
    <slot name="top"></slot>
    <div>
      <FilterExternal :select-params="selectParams" :list-query="listQuery" @change="onChange">
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
export default {
  name: "TableFilter",
}
</script>
<script lang="ts" setup>
import { PropType, provide, Ref, ref } from "vue"
import * as I from "../types"
import FilterExternal from "./FilterExternal/FilterExternal.vue"
import FilterSearchBox from "./FilterSearchBox.vue"
import FilterTags from "./components/FilterTags.vue"
import { deepClone } from "../../CurdTable/utils/common"

const props = defineProps({
  selectParams: {
    type: Array as PropType<Array<I.ParamsItem>>,
    default: () => {
      return []
    },
  },
  listQuery: {
    type: Object as PropType<I.ListQuery>,
    default: () => {
      return {}
    },
  },
})
const emit = defineEmits(["search"])
const searchRef = ref()
const selectList: Ref<I.ParamsItem[]> = ref([])
const selectParams: Ref<Array<I.ParamsItem>> = ref(deepClone(props.selectParams) || [])
const listQuery: Ref<I.ListQuery> = ref(props.listQuery || {})

const onChange = (d: any) => {
  if (d) {
    const cur = selectList.value.find((j) => d.prop == j.prop && d.label == j.label)
    if (cur) {
      if (listQuery.value[cur.prop] === "") {
        selectList.value.splice(
          selectList.value.findIndex((j) => d.prop == j.prop),
          1
        )
      } else {
        cur.tagNames = d.tagNames
      }
    } else {
      typeof listQuery.value[d.prop] !== "undefined" && listQuery.value[d.prop] !== "" && selectList.value.push(d)
    }
    // console.log("selectList1", selectList)
    // console.log("listQuery.value1", listQuery.value)
    emit("search", listQuery.value, selectList.value)
    return
  }
  // selectParams.value.forEach((a) => {
  //   let i = selectList.value.findIndex((j) => a.prop == j.prop)
  //   // selectList.value.splice(i, 1)

  //   if (listQuery.value[a.prop] && !a.external) {
  //     if (i > -1) {
  //       selectList.value[i] = a
  //     } else {
  //       selectList.value.push(a)
  //     }
  //   }
  // })
  // console.log("selectList", selectList)
  // console.log("listQuery.value", listQuery.value)
  emit("search", listQuery.value, selectList.value)
}
const onRemove = () => {
  emit("search", listQuery.value, selectList.value)
}
const getTags = () => {
  selectParams.value.forEach((a) => {
    let i = selectList.value.findIndex((j) => a.prop == j.prop)
    if (!a.external && i == -1 && listQuery.value[a.prop]) {
      if (a.options && a.options.length) {
        const prop = String(listQuery.value[a.prop])
        // const propI = prop.indexOf(",")
        let tagNames = a.tagNames || a.options.find((j) => j.value == listQuery.value[a.prop])?.label
        // ????????????value??????
        if (!a.tagNames && a.type == "checkbox") {
          let propList = prop.split(",").map((item) => {
            return a?.options?.find((j) => String(j.value) == String(item))?.label
          })
          tagNames = propList.join(" | ")
        }
        selectList.value.push({ ...a, tagNames: tagNames })
      } else if (a.asyncOptions) {
        a.asyncOptions({ textModel: "", listQuery: {} }).then((res) => {
          selectList.value.push({
            ...a,
            tagNames: a.tagNames || res.find((j: any) => j.value == listQuery.value[a.prop])?.label,
          })
        })
      } else {
        selectList.value.push(a)
      }
    }
  })
}

const setItem = (prop: string, paramsItem?: any) => {
  // ?????????????????????curdtable????????????????????????setItem??????listQuery???????????????
  setTimeout(() => {
    let item = paramsItem || selectParams.value.find((a) => a.prop == prop)
    if (!item || item.external) return
    const current = selectList.value.find((a) => a.prop == prop && a.label == item.label)
    if (!current) {
      if (typeof listQuery.value[prop] !== "undefined" && listQuery.value[prop] !== "") {
        selectList.value.push({
          ...item,
          tagNames: item.tagNames || item.options?.find((j: any) => j.value == listQuery.value[prop])?.label,
        })
      }
    } else if (item.options && item.options.length) {
      let tagNames = item.options?.find((j: any) => j.value == listQuery.value[prop])?.label
      // ????????????value??????
      if (!item.tagNames && item.type == "checkbox") {
        let propList = prop.split(",").map((a) => {
          return item?.options?.find((j: any) => String(j.value) == String(a))?.label
        })
        tagNames = propList.join(" | ")
      }
      current.tagNames = tagNames
    } else if (item.asyncOptions) {
      item.asyncOptions({ textModel: "", listQuery: {} }).then((res: any) => {
        current.tagNames = item.tagNames || res.find((j: any) => j.value == listQuery.value[prop])?.label
      })
    }
    if ((current && typeof current.tagNames == "undefined") || (current && current.tagNames === "")) {
      selectList.value.splice(
        selectList.value.findIndex((a) => a.prop == prop),
        1
      )
    }
  })
}
const state = ref({
  isFocus: false,
})
const loadOptions = (prop: string) => {
  const current = selectParams.value.find((a) => a.prop == prop)
  if (!current || !current.asyncOptions) return
  current
    .asyncOptions({
      textModel: "",
      listQuery: props.listQuery,
      options: current.options,
      paramsItem: current,
    })
    .then((res) => {
      current.options = res
    })
}
const clear = () => {
  for (let i = 0; i < selectList.value.length; i++) {
    delete listQuery.value[selectList.value[i].prop]
    selectList.value.splice(i, 1)
    i--
  }
  emit("search", listQuery.value, selectList.value)
}
// ????????????selectParams
const refreshSelectParams = () => {
  selectParams.value = deepClone(props.selectParams)
}
const getCurrentIndex = () => {
  return searchRef.value && searchRef.value.currentIndex
}
//??????????????????????????????
const onTagClick = (item: I.ParamsItem) => {
  const i = selectParams.value.findIndex((a) => a.prop == item.prop && a.label == item.label)
  searchRef.value.setIndex(i)
}

provide("state", state)
provide("selectList", selectList)
defineExpose({ setItem, selectList, loadOptions, clear, refreshSelectParams, getCurrentIndex })
getTags()
</script>
