<template>
    <div class="list">
      <CurdForm ref="formRef2" v-model="form" :form-schema="formSchema2">
        <template #ageBottom>
            底部插槽
        </template>
      </CurdForm>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, Ref, markRaw } from "vue"
  import { ElMessage } from "element-plus"
  import FormSuffixBtn from "./components/FormSuffixBtn.vue"
  const form = ref({})
  const formSchema2: Ref<FormSchema> = ref({
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
  ],
  rules: (form) => {
    return {
      name: [{ required: form.name1 == 1, message: "名称不能为空", trigger: "blur" }],
    }
  },
  labelWidth: 80,
  labelPosition: "left",
  gutter: 10,
})
  const tableData = [
    {
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-02',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
  ]
  </script>
  
  <style lang="scss" scoped>
    .list{
      padding: 20px;
    }
  </style>