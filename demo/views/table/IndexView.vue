<template>
  <div>
    <CurdTable v-bind="table" />
  </div>
</template>
<script lang="ts" setup>
import { ref, Ref } from "vue"
import { CurdTableProps } from "easybill-ui/index"
import { useGlobalConfig } from "easybill-ui/index"
const config = useGlobalConfig()
console.log("config", config)
const table: Ref<CurdTableProps> = ref({
  data: [],
  columns: [
    { label: "姓名", prop: "name", filter: {}, header: "姓名字符串" },
    { label: "年龄", prop: "age", filter: {}, header: { tooltip: "这是年龄的提示" } },
    {
      label: "状态",
      prop: "status",
      options: [
        { label: "唱歌", value: "1" },
        { label: "跳舞", value: "2" },
      ],
      header: { tooltip: { content: "这是状态的提示", placement: "right" } },
      filter: { inner: true, type: "select" },
    },
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
