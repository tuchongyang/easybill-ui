<template>
  <div class="filter-search-box" :class="{ 'is-focus': state.isFocus }">
    <FilterToggle v-model:index="currentIndex" :select-params="props.selectParams" />
    <FilterItem ref="filterItemRef" :params-item="props.selectParams[currentIndex]" v-model="query" @search="confirm"></FilterItem>
    <div class="filter-action">
      <div class="search" @click="confirm">
        <el-icon>
          <Search />
        </el-icon>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Search } from "@element-plus/icons-vue"
import { inject, type PropType, type Ref, ref, watch } from "vue"
import * as I from "../types"
import FilterItem from "./components/FilterItem.vue"
import FilterToggle from "./components/FilterToggle.vue"

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
const currentIndex = ref(0)
const filterItemRef = ref()
const query = ref(props.listQuery)
watch(
  () => query.value,
  () => {
    const m = props.listQuery
    for (let i in m) {
      m[i] = query.value[i]
    }
  },
)
const confirm = () => {
  const current = props.selectParams[currentIndex.value]
  if (typeof current.type == "undefined" || current.type == "input") {
    filterItemRef.value.setValue(props.selectParams[currentIndex.value].prop)
  }
  emit("search", props.selectParams[currentIndex.value])
}

const state = inject<Ref<I.State>>("state", ref({} as I.State))
const setIndex = (i: number) => {
  currentIndex.value = i
  // filterItemRef.value.focus()
}
const loadOptions = (prop: string, config?: unknown) => {
  return filterItemRef.value.loadOptions(prop, config)
}
defineExpose({ currentIndex, setIndex, loadOptions })
</script>
