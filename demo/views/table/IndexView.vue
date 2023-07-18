<template>
  <div>
    <CurdTable ref="tableRef" v-bind="table" />
  </div>
</template>
<script lang="ts" setup>
import { ref, Ref } from "vue"
import { CurdTableProps } from "easybill-ui/index"
import { useGlobalConfig } from "easybill-ui/index"
const config = useGlobalConfig()
const tableRef = ref()
console.log("config", config)
console.log("tableRef", tableRef)
const table = ref<CurdTableProps<any>>({
  data: [],
  option: {
    autoload: true,
    filterAttrs: {
      labelPosition: "left",
    },
    menuEvent: {
      export() {
        alert("自定义导出")
      },
    },
  },
  columns: [
    { label: "姓名", prop: "name", filter: {}, header: "姓名字符串", form: {} },
    { label: "年龄", prop: "age", filter: {}, header: { tooltip: "这是年龄的提示" }, form: { type: "input-number" } },
    {
      label: "云平台",
      prop: "cloudType",
      filter: { external: true, type: "radio", props: { componentName: "button" }, span: 24, labelWidth: "90px", value: "" },
      options: [
        { label: "全部", value: "" },
        { label: "阿里云", value: "aliyun" },
        { label: "腾讯云", value: "tencent" },
      ],
    },
    { label: "账期", prop: "name", filter: { external: true, labelWidth: "90px" } },
    { label: "账期范围", prop: "cycle", filter: { external: true, labelWidth: "90px", type: "date-picker", props: { type: "monthrange", format: "YYYY-MM", valueFormat: "YYYY-MM" }, tableKey: ["startTime", "endTime"], value: ["2023-04", "2023-05"] } },
    {
      label: "类目一",
      prop: "cateId",
      filter: {
        type: "select",
        asyncOptions: async (modelRef, formItem, context, config) => {
          return [
            { label: "一级1", value: 1 },
            { label: "一级2", value: 2 },
          ]
        },
        eventObject: {
          change(formModel, formItem, context) {
            formModel.subCateId = ""
            console.log("context", context)
            context.loadOptions("subCateId")
            context.setValue("subCateId")
          },
        },
      },
    },
    {
      label: "类目二",
      prop: "subCateId",
      filter: {
        type: "select",
        asyncOptions: async (modelRef, formItem, context, config) => {
          return modelRef.cateId == 1
            ? [
                { label: "二级11", value: 11 },
                { label: "二级12", value: 12 },
              ]
            : [
                { label: "二级21", value: 21 },
                { label: "二级22", value: 22 },
              ]
        },
      },
    },
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
    {
      label: "日期",
      prop: "date",
      filter: { type: "time", props: { clearable: true } },
    },
  ],
  fetchData: ({ listQuery }) => {
    return new Promise((resolve, reject) => {
      console.log("listQuery", listQuery)
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
setTimeout(() => {
  table.value.option.hideOperation = true
}, 1000)
</script>
