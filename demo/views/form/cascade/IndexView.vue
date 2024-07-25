<template>
  <div>
    <CurdForm ref="formRef" v-model="form" :form-schema="formSchema" :extend-context="{ a: 123 }" @change="change">
      <template #operate-button>
        <el-button @click="submit">提交</el-button>
      </template>
    </CurdForm>
    {{ form }}
  </div>
</template>
<script lang="ts" setup>
import { CurdForm, FormSchema } from "easybill-ui/index"
import { ref, Ref, markRaw } from "vue"
import { ElMessage } from "element-plus"

const form = ref({
  cloudType: "huawei",
})

const formSchema: Ref<FormSchema> = ref({
  formItem: [
    {
      label: "云平台",
      prop: "cloudType",
      type: "radio",
      formItemProps: { style: "margin-bottom:0" },
      asyncOptions: async () => {
        return [
          { label: "阿里云", value: "aliyun" },
          { label: "华为云", value: "huawei" },
        ]
      },
      eventObject: {
        change(formModel, formItem, context) {
          context.loadOptions("regionId")
        },
        optionLoaded(formModel, formItem, context) {
          const cur = formItem.options && (formItem.options.find((a) => a.value == formModel[formItem.prop]) || formItem.options[0])
          //   if (formModel[formItem.prop] || cur?.value) {
          formModel[formItem.prop] = cur?.value || ""
          //   }
          context.loadOptions("regionId")
        },
      },
    },
    {
      label: "地域",
      prop: "regionId",
      type: "radio",
      formItemProps: { style: "margin-bottom:0" },
      autoload: false,
      asyncOptions: async (formModel) => {
        if (!formModel) return []
        const regionMap = {
          aliyun: [
            { label: "北京一", value: "beijing-1" },
            { label: "北京二", value: "beijing-2" },
          ],
          huawei: [
            { label: "上海一", value: "shanghai-1" },
            { label: "上海二", value: "shanghai-2" },
          ],
        }
        return regionMap[formModel.cloudType] || []
      },
      eventObject: {
        change(formModel, formItem, context) {
          console.log("formModel", formModel)
          console.log("formItem", formItem)
          console.log("context", context)
        },
        optionLoaded(formModel, formItem, context) {},
      },
    },
  ],
  rules: (form) => {
    return {
      name: [{ required: form.name1 == 1, message: "名称不能为空", trigger: "blur" }],
    }
  },
  labelWidth: 250,
  labelPosition: "right",
  // gutter: 120,
  inline: true,
  inlineMessage: true,
  size: "large",
  // disabled:true
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
