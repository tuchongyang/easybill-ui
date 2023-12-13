<template>
    <div class="list">
      <CurdForm ref="formRef" v-model="form" :form-schema="formSchema">
        <template #ageItem>
            表单项插槽
        </template>
      </CurdForm>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, Ref, markRaw } from "vue"
  import { ElMessage } from "element-plus"
  const form = ref({})
  const formSchema = ref({
    formItem: [
      {
        label: "年龄",
        prop: "age",
        type: "input-number",
        tooltip: "这里是提示信息",
        props: () => ({ controls: false, min: 1, max: 100 }),
        formItemProps(formModel, formItem) {
          return { rules: [{ required: true, message: "请输入" + formItem.label, trigger: "blur" }] }
        },
      },
      {
        label: "爱好",
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
    ],
    rules: (form) => {
      return {
        name: [{ required: form.name1 == 1, message: "名称不能为空", trigger: "blur" }],
      }
    },
    labelWidth: 50,
    labelPosition: "left",
    gutter: 10,
  })
  const formRef = ref()
  const submit = () => {
    formRef.value?.validate((valid) => {
      if (!valid) {
        return ElMessage.error("请检查参数是否完整")
      }
      console.log("form", form.value)
    })
  }
  </script>
  
  <style lang="scss" scoped>
    .list{
      padding: 20px;
    }
  </style>