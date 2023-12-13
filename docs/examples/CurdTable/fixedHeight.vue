<template>
    <div class="list">
      <CurdTable ref="tableRef" v-bind="table" max-height="150px">
      </CurdTable>
    </div>
  </template>
  <script lang="ts" setup>
  import { ref, markRaw, Ref } from "vue"
  import { CurdTableProps, CurdTable } from "easybill-ui/index"
  
  const tableRef = ref()
  const table: Ref<CurdTableProps<any>> = ref({
    data: [],
    option: {
      hideOperation:true,
      hideMenuAdd:true,
      hidePage:true,
      hideMenuRight:true,
    },
    columns: [
        {label:"姓名",prop:"name"},
        {label:"年龄",prop:"age"},
        {label:"状态",prop:"status"},

    ],
    fetchData: ({ listQuery }) => {
      return new Promise<any>((resolve) => {
        setTimeout(() => {
          const list = [
            { name: "张三", age: 9, status: 1},
            { name: "李四", age: 3, status: 2},
            { name: "王五", age: 3, status: 2},
            { name: "王五", age: 3, status: 2},
            { name: "王五", age: 3, status: 2},
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
    <style lang="scss" scoped>
    .list{
      padding: 20px;
    }
    :deep(table){
        margin:0;
    }
  </style>