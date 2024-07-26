<template>
  <div>
    <CurdTable ref="tableRef" v-bind="table"> </CurdTable>
  </div>
</template>
<script lang="ts" setup>
import { ref, markRaw, Ref } from "vue"
import { CurdTableProps, CurdTable } from "easybill-ui/index"
import { Check } from "@element-plus/icons-vue"
import formEmpty from "@/views/form/components/formEmpty.vue"

const tableRef = ref()
const table: Ref<CurdTableProps<any>> = ref({
  data: [],
  pageOptions: { age: "8", cateId: 1 },
  columns: [
    {
      label: "云平台",
      prop: "cloudType",
      filter: {
        prop: "cloudType",
        external: true,
        type: "radio",
        props: { componentName: "button", span: 24, labelWidth: "90px", value: "", empty: markRaw(formEmpty) },
        asyncOptions: async () => {
          return [
            { label: "全部", value: "" },
            { label: "阿里云", value: "aliyun" },
            { label: "腾讯云", value: "tencent" },
          ]
        },
        eventObject: {
          optionLoaded(modelRef, formItem, context) {
            modelRef.cloudType = "tencent"
            context.loadOptions("region")
          },
          change(modelRef, formItem, context) {
            context.loadOptions("region")
          },
        },
      },
    },
    {
      label: "地域",
      prop: "region",
      filter: {
        external: true,
        type: "radio",
        props: { componentName: "button", span: 24, labelWidth: "90px", value: "", noDataText: "当前云平台下地域为空", empty: markRaw(formEmpty) },
        autoload: false,
        asyncOptions: async (modelRef) => {
          return [
            { label: "阿里地域1", value: "aliyun" },
            { label: "阿里地域2", value: "aliyun" },
          ].filter((a) => a.value == modelRef?.cloudType)
        },
      },
    },
    {
      label: "类型",
      prop: "type",
      asyncOptions: async () => {
        return [
          { label: "全部", value: "" },
          { label: "训练任务", value: 1, icon: Check },
          { label: "开发调测", value: 2 },
        ]
      },
    },
  ],
  fetchData: ({ listQuery }) => {
    return new Promise<any>((resolve) => {
      setTimeout(() => {
        const list = [
          { cloudType: "aliyun", type: 1, status: 1, listQuery, amount: "222.00", slider: "1231231233" },
          { cloudType: "tencent", type: 2, status: 2, amount: "1,233.00" },
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
