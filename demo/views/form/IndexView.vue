<template>
  <div>
    <CurdForm ref="formRef" v-model="form" :form-schema="formSchema" :extend-context="{ a: 123 }" @change="change">
      <template #operate-button>
        <el-button @click="submit">提交</el-button>
      </template>
    </CurdForm>
  </div>
</template>
<script lang="ts" setup>
import { CurdForm, FormSchema } from "easybill-ui/index"
import { ref, Ref, markRaw } from "vue"
import FormSuffixBtn from "./components/FormSuffixBtn.vue"
import { ElMessage } from "element-plus"
import FormTable from "./components/FormTable.vue"
import formEmpty from "./components/formEmpty.vue"

const form = ref({
  initData: { x: 1 },
  modelForm: {},
  name2: ["2"],
})
const change = (formModel, formItem) => {
  console.log("1", formModel, formItem)
}

const formSchema: Ref<FormSchema> = ref({
  formItem: [
    { label: "直接显示值", prop: "anyway", value: "1", type: "value" },
    { label: "名称", prop: "name", type: "input", prefix: '<span style="color:red;white-space:nowrap;margin-right: 20px;">前缀</span>', suffix: '<span style="color:orange;white-space:nowrap;margin-left: 20px;">后缀</span>', disabled: true },
    {
      label: "年龄",
      prop: "age",
      type: "input-number",
      tooltip: "这里是提示信息",
      props: () => ({ controls: false, min: 1, max: 100 }),
      formItemProps(formModel, formItem) {
        return { rules: [{ required: true, message: "请输入" + formItem.label, trigger: "blur" }] }
      },
      eventObject: {
        change: (formModel, formItem, context) => {
          console.log("formModel", formModel)
          console.log("formItem", formItem)
          console.log("context", context)
        },
      },
    },
    {
      label: "爱好",
      prop: "name1",
      span: 12,
      type: "radio",
      options: [
        { label: "唱歌", value: "1" },
        { label: "跳舞", value: "2" },
      ],
      value: "1",
      tooltip: (form) => ({ content: form.name1 }),
    },
    {
      label: "爱好",
      prop: "name11",
      span: 12,
      type: "radio",
      props: { componentName: "button" },
      options: [
        { label: "唱歌", value: "1" },
        { label: "跳舞", value: "2" },
      ],
      value: "1",
      tooltip: (form) => ({ content: form.name1 }),
    },
    {
      label: "名称",
      prop: "name4",
      span: 12,
      type: "select",
      options: [
        { label: "唱歌", value: "1", html: "<div style='display:flex;justify-content:space-between;'><span>唱歌</span><span style='color:#999'>22</span></div>" },
        { label: "跳舞", value: "2" },
      ],
      eventObject: {
        change: (formModel, formItem, context) => {
          console.log("formModel", formModel)
          console.log("formItem", formItem)
          console.log("context", context)
        },
      },
    },
    {
      label: "名称",
      prop: "name2",
      span: 12,
      type: "checkbox",
      options: [
        { label: "唱歌", value: "1" },
        { label: "跳舞", value: "2" },
      ],
      value: ["1"],
      tooltip: (form) => "这里展示提示信息" + form.name2,
    },
    { label: "日期", prop: "date-picker", type: "date-picker", props: { format: "YYYY-MM-DD", valueFormat: "YYYY-MM-DD" }, span: 12 },
    { label: "时间", prop: "time-picker", type: "time-picker", span: 12 },
    { label: "测试1", prop: "input1", type: "input", span: 12 },
    {
      label: "测试2测试测试ss",
      prop: "input2",
      type: "tree-select",
      span: 12,
      suffix: [markRaw(FormSuffixBtn)],
      asyncOptions: async () => {
        const list = [
          { label: "aa" + Math.floor(Math.random() * 100), value: 1, children: [{ label: "子集", value: "子集" }] },
          { label: "bb" + Math.floor(Math.random() * 100), value: 2 },
        ]
        return list
      },
    },
    { label: "插件自带组件", prop: "slider", type: "el-slider", span: 12, props: { min: 1, max: 100, step: 1, marks: { 0: "0G", 30: "30G", 50: "50G", 100: "100G" } } },
    { label: "自定义表格", prop: "table", type: markRaw(FormTable), span: 24 },

    {
      label: "数据为空",
      prop: "emptyData",
      span: 12,
      type: "radio",
      props: { componentName: "button", noDataText: "数据空空的内容" },
      empty: markRaw(formEmpty),
      options: [],
      value: "1",
    },
  ],
  rules: (form) => {
    return {
      name: [{ required: form.name1 == 1, message: "名称不能为空", trigger: "blur" }],
    }
  },
  labelWidth: 250,
  labelPosition: "right",
  // gutter: 120,
  inline: true,
  inlineMessage: true,
  size: "large",
  // disabled:true
})
const formRef = ref<InstanceType<typeof CurdForm>>()
const submit = () => {
  formRef.value?.validate((valid) => {
    if (!valid) {
      return ElMessage.error("请检查参数是否完整")
    }
    console.log("form", form.value)
  })
}
setTimeout(() => {
  // form.value.age = 22
  // form.value = { name: "111" }
}, 2000)
</script>
