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
import { ElMessage } from "element-plus"
const form = ref({
  initData: { x: 1 },
  modelForm: {},
  name2: ["2"],
})


const formSchema: Ref<FormSchema> = ref({
  formItem: [
    { label: "直接显示值", prop: "anyway", value: "这是一大串文字", type: "value" },
    { label: "名称1", prop: "name", type: "input" },
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
    { label: "名称3", prop: "name", type: "input", span: 12 },
    { label: "名称4", prop: "name", type: "input", span: 12 },
  ],
  labelWidth: 120,
  labelPosition: "right",
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
.list {
  padding: 20px;
}
</style>
