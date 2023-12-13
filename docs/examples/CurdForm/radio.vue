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

const formSchema: Ref<FormSchema> = ref({
  formItem: [
    {
      label: "基础用法",
      type: "radio",
      prop: "basic",
      options: [
        { label: "Options1", value: "1" },
        { label: "Options2", value: "2" },
        { label: "Options3", value: "3" },
      ],
    },
    {
      label: "禁用状态",
      type: "radio",
      prop: "disabled",
      options: [
        { label: "Options1", value: "1" },
        { label: "Options2", value: "2" },
        { label: "Options3", value: "3" },
      ],
      value: "2", //默认值
      props: () => ({ disabled: true }),
    },
    {
      label: "按钮样式",
      prop: "button",
      type: "radio",
      props: { componentName: "button" },
      options: [
        { label: "Options1", value: "1" },
        { label: "Options2", value: "2" },
      ],
      value: "1",
    },
    {
      label: "数据为空",
      prop: "emptyData",
      span: 12,
      type: "radio",
      props: { componentName: "button", noDataText: "数据空空的内容", },
      empty: markRaw(formEmpty),
      options: [],
      value: "1",
    },
  ],
  labelWidth: 100,
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
  // form.value.age = 22
  // form.value = { name: "111" }
}, 2000)
</script>
<style lang="scss" scoped>
.list {
  padding: 20px;
}
</style>
