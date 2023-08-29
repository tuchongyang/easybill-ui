<template>
  <div>
    <CurdTable ref="tableRef" v-bind="table">
      <template #menuLeft>
        <el-button type="primary" plain>左边插槽</el-button>
      </template>
      <template #menuRight>
        <el-button type="primary" plain>右边边插槽</el-button>
      </template>
      <template #pageLeft>
        <el-button type="primary" plain>左边插槽</el-button>
      </template>
      <template #expand> 这里是展开杭 </template>
    </CurdTable>
  </div>
</template>
<script lang="ts" setup>
import { ref, markRaw, Ref } from "vue"
import { CurdTableProps, LabelPosition } from "easybill-ui/index"
import { CircleCheck } from "@element-plus/icons-vue"
import FormSuffixBtn from "../form/components/FormSuffixBtn.vue"

const tableRef = ref()
const table: Ref<CurdTableProps<any>> = ref({
  data: [],
  pageOptions: { age: "8", cateId: 1 },
  option: {
    autoload: true,
    filterAttrs: {
      labelPosition: LabelPosition.LEFT,
    },
    menuEvent: {
      // export() {
      //   alert("自定义导出")
      // },
    },
  },
  columns: [
    {
      label: "三级表头",
      prop: "third",
      children: [
        {
          label: "用户信息",
          prop: "s",
          children: [
            {
              label: "姓名",
              prop: "name",
              filter: {},
              header: "姓名字符串",
              form: {
                suffix: [markRaw(FormSuffixBtn)],
              },
            },
            { label: "年龄", prop: "age", filter: {}, header: { tooltip: "这是年龄的提示" }, form: { type: "input-number", value: 1 } },
          ],
        },
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
      ],
    },
    { label: "账期", prop: "name", filter: { external: true, labelWidth: "90px" } },
    { label: "账期范围", prop: "cycle", filter: { external: true, labelWidth: "90px", type: "date-picker", props: { type: "monthrange", format: "YYYY-MM", valueFormat: "YYYY-MM" }, tableKey: ["startTime", "endTime"], value: ["2023-04", "2023-05"] } },
    {
      label: "类目一",
      prop: "cateId",
      filter: {
        type: "select",
        inner: true,
        props: { filterable: true },
        asyncOptions: async (modelRef, formItem, context, config) => {
          return [
            { label: "一级1", value: 1 },
            { label: "一级2", value: 2 },
          ].filter((a) => a.label.includes(config?.queryString || ""))
        },
        eventObject: {
          change(formModel, formItem, context) {
            formModel.subCateId = ""
            context.loadOptions("subCateId")
            context.change(formModel, formItem)
          },
        },
      },
    },
    {
      label: "类目二",
      prop: "subCateId",
      filter: {
        type: "select",
        props: { all: true },
        inner: true,
        asyncOptions: async (modelRef) => {
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
        { label: "唱歌", value: "1", type: "success", border: false, effect: "plain", icon: markRaw(CircleCheck) },
        { label: "跳舞", value: "2", type: "danger" },
      ],
      header: { tooltip: { content: "这是状态的提示" } },
      filter: { inner: true, type: "select" },
    },
    { label: "序号", prop: "index", type: "index" },
    { label: "选项", prop: "sel", type: "selection" },
    { label: "展开", prop: "expand", type: "expand" },
    {
      label: "日期",
      prop: "date",
      filter: { type: "time", props: { clearable: true } },
      form: (form, row, query) => {
        return { value: [query.startTime, query.endTime], type: "date-picker", props: { type: "monthrange", valueFormat: "YYYY-MM", format: "YYYY-MM" } }
      },
    },
    {
      label: "滑动条",
      prop: "slider",
      form: { type: "el-slider" },
    },
  ],
  fetchData: () => {
    return new Promise((resolve) => {
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
  fetchCreate: async () => {},
})
setTimeout(() => {
  table.value.option && (table.value.option.hideOperation = true)
}, 1000)
</script>
