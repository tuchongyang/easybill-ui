<template>
  <div>
    <TableFilter v-model="listQuery" :schema="filterSchema" @search="onSearch" />
  </div>
</template>
<script lang="ts" setup>
import { Ref } from "vue"
import { Fields, FilterItem } from "easybill-ui/index"
import { ref } from "vue"
const listQuery = ref({})
const filterSchema: Ref<FilterItem[]> = ref([
  { label: "名称", prop: "name" },
  { label: "年龄", prop: "age" },
  { label: "账期", prop: "date", type: "date-picker", external: true },
  {
    label: "多选",
    prop: "checkboc",
    type: "checkbox",
    options: [
      { label: "11", value: 1 },
      { label: "22", value: 2 },
    ],
  },
  {
    label: "爱好",
    prop: "ai",
    type: "select",
    options: [
      { label: "打球", value: "1" },
      { label: "跑步,测试超长label测试超长label测试超长label测试超长label测试超长label测试超长label测试超长label", value: "2" },
    ],
  },
  {
    label: "dd",
    prop: "a",
    type: "el-cascader",
    asyncOptions: () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            {
              value: "guide",
              label: "Guide",
              children: [
                {
                  value: "disciplines",
                  label: "Disciplines",
                },
              ],
            },
          ])
        }, 1000)
      })
    },
  },
])

const onSearch = (query: Fields) => {
  console.log("listQuery", listQuery.value)
  console.log("query", query)
}
</script>
