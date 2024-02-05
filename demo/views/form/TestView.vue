<template>
  <div>
    <CurdForm ref="formRef" v-model="form" :form-schema="formSchema" :extend-context="extendContext">
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
import FormTable from "@/components/FormTable/IndexView.vue"
import formEmpty from "./components/formEmpty.vue"

const form = ref({
  initData: { x: 1 },
  modelForm: {},
  name2: ["2"],
})
const extendContext = { components: { "w-grid": FormTable } }

const formSchema: Ref<FormSchema> = ref({
  formItem: [
    { label: "空内容", prop: "name", type: "input" },
    {
      label: "数据为空",
      prop: "emptyData",
      span: 12,
      type: "radio",
      props: (form) => ({ componentName: "button", noDataText: form.name || "数据空空的" }),
      empty: markRaw(formEmpty),
      options: [
        // { label: "唱歌", value: "1" },
        // { label: "跳舞", value: "2" },
      ],
      value: "1",
    },
    {
      label: "列表",
      prop: "items",
      type: "w-grid",
      props: {
        columns: [
          { label: "标题", prop: "title" },
          { label: "描述", prop: "desc", props: { type: "textarea", rows: 3 } },
          { label: "图片", prop: "image", type: "image" },
        ],
      },
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
</script>
