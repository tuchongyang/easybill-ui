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
        {
            label:"姓名",
            prop:"name",
            filter:{}
        },
        {
            label:"云平台",
            prop:"cloudType",
            filter:{
                external:true,  //筛选项分离到外部
                type:"radio",   
                props:{
                    componentName:"button",
                },
                value:"aliyun"  //筛选默认值
            },
            options:[
                {label:"阿里国际",value:"alibabaCloud"},
                {label:"阿里云",value:"aliyun"},
            ]
        },
        {
            label:"状态",
            prop:"status",
            filter:{
                inner:true,     //表头可点击出现筛选弹框
                type:"select",  //筛选搜索栏类型
                asyncOptions: async (modelRef,formItem,context)=>{   //异步获取搜索选项
                    return [
                        {label:"1",value:1},
                        {label:"2",value:2},
                    ]
                },
                props:{
                    all:true,    //筛选 全部选项
                    filterable:true,    //表头筛选弹框内搜索栏
                }
            }
        },
        { 
            label: "账期范围", 
            prop: "cycle", 
            filter: { 
                external: true, 
                labelWidth: "90px", 
                type: "date-picker", 
                props: { 
                    type: "monthrange", 
                    format: "YYYY-MM", 
                    valueFormat: "YYYY-MM" 
                }, 
                tableKey: ["startTime", "endTime"], 
                value: ["2023-04", "2023-05"] 
            } 
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