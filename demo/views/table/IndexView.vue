<template>
  <div>
    <CurdTable v-bind="table" />
  </div>
</template>
<script lang="ts" setup>
import { ref, Ref } from "vue"
import { CurdTableProps } from "easybill-ui/index"
import { useGlobalConfig } from "element-plus"
const config = useGlobalConfig()
console.log("config", config)
const table: Ref<CurdTableProps> = ref({
  data: [],
  columns: [
    { label: "姓名", prop: "name", filter: {} },
    { label: "年龄", prop: "age", filter: {} },
    { label: "状态", prop: "status" },
  ],
  fetchData: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const list = [
          { name: "张三", age: 9, status: 1 },
          { name: "李四", age: 3, status: 2 },
        ]
        resolve({
          list,
          total: list.length,
        })
      }, 500)
    })
  },
})
</script>
