<template>
   <div class="list">
    <CurdForm ref="formRef" v-model="form" :form-schema="formSchema">
      <template #operate-button>
        <el-button @click="submit">提交</el-button>
      </template>
    </CurdForm>
  </div>
</template>

<script lang="ts" setup>
import { ref, Ref, markRaw } from "vue"
import FormSuffixBtn from "./components/FormSuffixBtn.vue"
import { ElMessage } from "element-plus"
const form = ref({
  initData: { x: 1 },
  modelForm: {},
  name2: ["2"],
})

const formSchema: Ref<FormSchema> = ref({
  formItem: [
    { label: "直接显示值", prop: "anyway", value: "这是一大串文字", type: "value" },
    { label: "名称1", prop: "name", type: "input",},
    {
      label: "年龄2",
      prop: "age",
      type: "input-number",
      tooltip: "这里是提示信息",
      props: () => ({ controls: false, min: 1, max: 100 }),
      formItemProps(formModel, formItem) {
        return { rules: [{ required: true, message: "请输入" + formItem.label, trigger: "blur" }] }
      },
    },
    {
      label: "爱好1",
      prop: "name1",
      type: "radio",
      options: [
        { label: "唱歌", value: "1" },
        { label: "跳舞", value: "2" },
      ],
      value: "1",
      tooltip: (form) => ({ content: form.name1 }),
    },
    {
      label: "爱好2",
      prop: "switch",
      type: "el-switch",
      value: "1",
    },
    {
      label: "爱好3",
      prop: "name11",
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
      label: "爱好4",
      prop: "name4",
      type: "select",
      options: [
        { label: "唱歌", value: "1", html: "<div style='display:flex;justify-content:space-between;'><span>唱歌</span><span style='color:#999'>22</span></div>" },
        { label: "跳舞", value: "2" },
      ],
    },
    {
      label: "爱好5",
      prop: "name2",
      type: "checkbox",
      options: [
        { label: "唱歌", value: "1" },
        { label: "跳舞", value: "2" },
      ],
      value: ["1"],
      tooltip: (form) => "这里展示提示信息" + form.name2,
    },
    { label: "日期", prop: "date-picker", type: "date-picker", props: { format: "YYYY-MM-DD", valueFormat: "YYYY-MM-DD" }, },
    { label: "时间", prop: "time-picker", type: "time-picker"},
    { label: "测试1", prop: "input1", type: "input" },
    {
      label: "测试2测试测试ss",
      prop: "input2",
      type: "select",
      suffix: [markRaw(FormSuffixBtn)],
      asyncOptions: async () => {
        const list = [
          { label: "aa" + Math.floor(Math.random() * 100), value: 1 },
          { label: "bb" + Math.floor(Math.random() * 100), value: 2 },
        ]
        return list
      },
    },
  ],
  labelWidth: 120,
  labelPosition: "left",
  gutter: 10,
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
//   form.value.age = 22
//   form.value = { name: "111" }
}, 2000)
</script>



<style lang="scss" scoped>
  .list{
    padding:20px
  }
</style>