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
      hideOperation:false,
      hideOperationDetail: false, // 是否隐藏操作列中的详情按钮
      hideMenuAdd:true,
      hidePage:true,
      hideMenuRight:true,
    },
    columns: [
        {
            label:"姓名",
            prop:"name",
        },
        {
            label:"云平台",
            prop:"cloudType",
            options:[
                {label:"阿里国际",value:"alibabaCloud"},
                {label:"阿里云",value:"aliyun"},
            ]
        },
        {
            label:"状态",
            prop:"status",
        },
        { 
            label: "账期范围", 
            prop: "cycle", 
        },

    ],
    fetchData: ({ listQuery }) => {
      return new Promise<any>((resolve) => {
        setTimeout(() => {
          const list = [
            { name: "张三", age: 9, status: 1,cloudType:"aliyun"},
            { name: "李四", age: 3, status: 2,cloudType:"alibabaCloud"},
            { name: "王五", age: 3, status: 2,cloudType:"aliyun"},
            { name: "王五", age: 3, status: 2,cloudType:"alibabaCloud"},
            { name: "王五", age: 3, status: 2,cloudType:"aliyun"},
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