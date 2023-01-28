<template>
  <div>
    <TableFilter :list-query="listQuery" :select-params="selectParams" />
  </div>
</template>
<script lang="ts" setup>
import { ParamsItem } from "easybill-ui/index"
import { ref, Ref } from "vue"
const listQuery = ref({})
const selectParams: Ref<ParamsItem[]> = ref([
  { label: "名称", prop: "name" },
  { label: "年龄", prop: "age" },
  {
    label: "爱好",
    prop: "ai",
    type: "select",
    options: [
      { label: "打球", value: "1" },
      { label: "跑步", value: "2" },
    ],
  },
  {
    label: "dd",
    prop: "a",
    type: "cascader",
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
    // options: [
    //   {
    //     value: "guide",
    //     label: "Guide",
    //     children: [
    //       {
    //         value: "disciplines",
    //         label: "Disciplines",
    //       },
    //     ],
    //   },
    // ],
  },
])
</script>
