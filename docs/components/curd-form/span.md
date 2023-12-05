# 栅格
使用 `span`属性，基于24分栏

  <div>
    <CurdForm ref="formRef" v-model="form" :form-schema="formSchema">
    </CurdForm>
  </div>


<script lang="ts" setup>
import { CurdForm, FormSchema } from "easybill-ui/index"
import { ref, Ref, markRaw } from "vue"
import FormSuffixBtn from "./components/FormSuffixBtn.vue"
import { ElMessage } from "element-plus"
import FormTable from "./components/FormTable.vue"
import formEmpty from "./components/formEmpty.vue"

const form = ref({
//   initData: { x: 1 },
//   modelForm: {},
//   name2: ["2"],
})

const formSchema: Ref<FormSchema> = ref({
  formItem: [
    {
      label: "年龄",
      prop: "age",
      type: "input-number",
      span:24,
      props: () => ({ controls: false, min: 1, max: 100 }),
    },
    {
      label: "爱好",
      prop: "age",
      type: "input-number",
      span:12,
      props: () => ({ controls: false, min: 1, max: 100 }),
    },
    {
      label: "年龄",
      prop: "age",
      type: "input-number",
      span:12,
      props: () => ({ controls: false, min: 1, max: 100 }),
    },
    {
      label: "年龄",
      prop: "age",
      type: "input-number",
      span:6,
      props: () => ({ controls: false, min: 1, max: 100 }),
    },
    {
      label: "年龄",
      prop: "age",
      type: "input-number",
      span:6,
      props: () => ({ controls: false, min: 1, max: 100 }),
    },
    {
      label: "年龄",
      prop: "age",
      type: "input-number",
      span:6,
      props: () => ({ controls: false, min: 1, max: 100 }),
    },
    {
      label: "年龄",
      prop: "age",
      type: "input-number",
      span:6,
      props: () => ({ controls: false, min: 1, max: 100 }),
    },
  ],
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
  // form.value.age = 22
  // form.value = { name: "111" }
}, 2000)

</script>
