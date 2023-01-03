<template>
  <div class="simple-page">
    <span v-if="props.total > -1">共 {{ props.total }} 条</span>
    <span v-if="props.total == -1"
      ><el-icon class="is-loading"><Loading /></el-icon>总页数计算中...</span
    >
    <span
      >第 {{ props.currentPage }}<span v-if="maxPage > 0">/{{ maxPage }}</span> 页</span
    >

    <el-button :disabled="props.currentPage <= 1" @click="prev">&lt;</el-button>
    <el-button :disabled="(total > -1 && props.currentPage >= maxPage) || list.length < props.pageSize" @click="next">&gt;</el-button>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed, PropType,onBeforeUnmount,watch } from "vue"
import { Loading } from "@element-plus/icons-vue"
const props = defineProps({
  currentPage: {
    type: Number,
    default: 1,
  },
  pageSize: {
    type: Number,
    default: 10,
  },
  total: {
    type: Number,
    default: -1,
  },
  list: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
  fetchData: {
    type: Function,
    default: null,
  },
})
const emit = defineEmits(["update:currentPage", "current-change"])
const lastIdMap = ref<any>({})
const total = ref(-1)
const maxPage = computed(() => Math.ceil(props.total / props.pageSize))
const totalIdList = props.list.map((a) => a.id) || []
const prev = () => {
  emit("update:currentPage", props.currentPage - 1)
  emit("current-change", { query: { lastId: lastIdMap.value[props.currentPage - 2] } })
}
const next = () => {
  emit("update:currentPage", props.currentPage + 1)
  emit("current-change", { query: { lastId: lastIdMap.value[props.currentPage] } })
}

const initLastId = () => {
  if (props.list && props.list.length) {
    const c = props.currentPage
    lastIdMap.value[c] = props.list[props.list.length - 1].id
  }
  if (props.list.length < props.pageSize) {
    // total.value = props.list.length
  }
}
initLastId()
let timer: any = null
let isOn = true
const fetchData = () => {
  if (!isOn) return
  if (props.total == -1 && props.fetchData) {
    timer = setTimeout(() => {
      props.fetchData({ showLoading: false }).finally(() => {
        fetchData()
      })
    }, 3000)
  } else if (props.total > -1) {
    total.value = props.total
  }
}
fetchData()
onBeforeUnmount(() => {
  isOn = false
  timer && window.clearTimeout(timer)
})
watch(
  () => props.list,
  (val) => {
    if (!val.length) return
    lastIdMap.value[props.currentPage] = val[val.length - 1].id
    for (let i = 0; i < val.length; i++) {
      if (!totalIdList.includes(val[i].id)) {
        totalIdList.push(val[i].id)
      }
    }
    if (val.length < props.pageSize) {
      // total.value = totalIdList.length
    }
  }
)
</script>
<style lang="scss" scoped>

</style>
