<template>
  <div>
    <CurdForm v-model="a" :form-schema="formSchema">
      <template #operate-button>
        <el-button @click="submit">提交</el-button>
      </template>
    </CurdForm>
  </div>
</template>
<script lang="ts" setup>
import { FormSchema } from "easybill-ui/index"
import { ref, Ref } from "vue"
const form = ref({
  initData: { x: 1 },
  modelForm: {},
})
const a = ref(form.value.modelForm)

const formSchema: Ref<FormSchema> = ref({
  formItem: [
    { label: "直接显示值", prop: "anyway", value: "1", type: "value" },
    { label: "名称", prop: "name" },
    { label: "年龄", prop: "age", type: "input-number", tooltip: "这里是提示信息" },
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
    },
    { label: "日期", prop: "date-picker", type: "date-picker", span: 12 },
    { label: "时间", prop: "time-picker", type: "time-picker", span: 12 },
    { label: "测试1", prop: "input1", type: "input", span: 12 },
    { label: "测试2测试测试ss", prop: "input2", type: "input", span: 12 },
  ],
  rules: {
    name: [{ required: true, message: "名称不能为空", trigger: "blur" }],
  },
  labelWidth: 120,
  labelPosition: "left",
  gutter: 10,
})
const submit = () => {
  console.log("form", form.value)
}
setTimeout(() => {
  // form.value.age = 22
  // form.value = { name: "111" }
}, 2000)
</script>
