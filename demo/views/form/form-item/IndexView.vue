<template>
  <h3>单个表单</h3>
  <CurdFormItem v-model="model" :form-item="formItem" />
  <CurdFormItem v-model="model" :form-item="formItem1" />
  {{ model }}
  <CurdFormItem v-model="model2" :form-item="formItem2" />
</template>
<script lang="ts" setup>
import { ref } from "vue"
import { CurdFormItem } from "easybill-ui/index"
const formItem = ref({
  label: "名称",
  prop: "name",
})
const formItem1 = ref({
  label: "爱好",
  prop: "ai",
  type: "select",
  options: [{ label: "a", value: "a" }],
})
const formItem2 = ref({})
const model = ref("")
const model2 = ref("")

setTimeout(() => {
  formItem.value.type = "input-number"
}, 1000)
setTimeout(() => {
  formItem1.value = { label: "aa", prop: "ai", type: "radio", options: [{ label: "a", value: "a" }] }
}, 1000)
setTimeout(() => {
  formItem2.value = {
    label: "异步options",
    prop: "ai",
    type: "select",
    asyncOptions: async () => {
      return [{ label: "aa", value: "aa" }]
    },
  }
}, 1000)
</script>
