<template>
  <div>
    <CurdForm v-model="form" :form-schema="formSchema">
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
})
const formSchema: Ref<FormSchema> = ref({
  formItem: [
    { label: "直接显示值", prop: "anyway", value: "1", type: "value" },
    { label: "名称", prop: "name" },
    { label: "年龄", prop: "age", tooltip: "这里是提示信息" },
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
  ],
  rules: {
    name: [{ required: true, message: "名称不能为空", trigger: "blur" }],
  },
  labelWidth: 120,
})
const submit = () => {
  console.log("form", form.value)
}
</script>
