# 对齐方式
可以使用 `labelPosition` 属性设置表头的对齐方式

  <div>
    <h2>左对齐</h2>
    <CurdForm ref="formRef" v-model="form" :form-schema="formSchema">
    </CurdForm>
    <h2>右对齐</h2>
    <CurdForm ref="formRef2" v-model="form" :form-schema="formSchema2">
    </CurdForm>
    <h2>顶部对齐</h2>
    <CurdForm ref="formRef3" v-model="form" :form-schema="formSchema3">
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
      tooltip: "这里是提示信息",
      props: () => ({ controls: false, min: 1, max: 100 }),
      formItemProps(formModel, formItem) {
        return { rules: [{ required: true, message: "请输入" + formItem.label, trigger: "blur" }] }
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
  ],
  rules: (form) => {
    return {
      name: [{ required: form.name1 == 1, message: "名称不能为空", trigger: "blur" }],
    }
  },
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
  // form.value.age = 22
  // form.value = { name: "111" }
}, 2000)

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
  ],
  rules: (form) => {
    return {
      name: [{ required: form.name1 == 1, message: "名称不能为空", trigger: "blur" }],
    }
  },
  labelWidth: 120,
  labelPosition: "right",
  gutter: 10,
})
const formRef2 = ref<InstanceType<typeof CurdForm>>()
const submit2 = () => {
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

const formSchema3: Ref<FormSchema> = ref({
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
  ],
  rules: (form) => {
    return {
      name: [{ required: form.name1 == 1, message: "名称不能为空", trigger: "blur" }],
    }
  },
  labelWidth: 120,
  labelPosition: "top",
  gutter: 10,
})
const formRef3 = ref<InstanceType<typeof CurdForm>>()
const submit3 = () => {
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
