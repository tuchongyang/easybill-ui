<template>
  <div class="filter-search-box" :class="{ 'is-focus': state.isFocus }">
    <FilterToggle v-model:index="currentIndex" :select-params="props.selectParams" />
    <FilterItem ref="filterItemRef" :params-item="props.selectParams[currentIndex]" :list-query="props.listQuery" @search="confirm"></FilterItem>
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
import { PropType, Ref, ref, inject } from "vue"
import * as I from "../types"
import { Search } from "@element-plus/icons-vue"
import FilterToggle from "./components/FilterToggle.vue"
import FilterItem from "./components/FilterItem.vue"

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
const confirm = () => {
  const current = props.selectParams[currentIndex.value]
  if (typeof current.type == "undefined" || current.type == "input") {
    filterItemRef.value.setValue(props.selectParams[currentIndex.value].prop)
  }
  emit("search", props.selectParams[currentIndex.value])
}

const state = inject<Ref<any>>("state") || ref({})
const setIndex = (i: number) => {
  currentIndex.value = i
  filterItemRef.value.focus()
}
defineExpose({ currentIndex, setIndex })
</script>
