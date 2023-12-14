<template>
    <div class="list">
      <TableFilter v-model="listQuery" :schema="filterSchema" :option="option" @search="onSearch" />
    </div>
  </template>
  <script lang="ts" setup>
  import { Ref } from "vue"
  import { Fields, FilterItem, FilterOption } from "easybill-ui/index"
  import { ref } from "vue"
  const listQuery = ref({})
  const option = ref<FilterOption>({
    formProps: {
      labelPosition: "left",
      labelWidth: 100,
    },
  })
  const filterSchema: Ref<FilterItem[]> = ref([
  { 
    label: "date-picker", 
    prop: "date", 
    type: "date-picker", 
    external: true 
 },

  {
    label:"date-picker",
    prop:"month",
    type:"date-picker",
    external: true ,
    props:{
        type: "monthrange",
          format: "YYYY-MM",
          valueFormat: "YYYY-MM",
          "unlink-panels": true,
          clearable: true,
          editable: false,
    },
    tableKey: ["invoiceStartDate", "invoiceEndDate"],
    eventObject: { 
          change(formModel) {
            console.log("改变了",formModel)
          },
        },
  },
  {
    label: "el-slider",
    prop: "slider",
    type: "el-slider",
    external: true ,
    span:24,
    props: { 
        min: 1, 
        max: 100, 
        step: 1, 
        marks: { 0: "0G", 30: "30G", 50: "50G", 100: "100G" } 
    } ,
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
<style lang="scss" scoped>
.list{
    padding: 20px;
}
</style>
