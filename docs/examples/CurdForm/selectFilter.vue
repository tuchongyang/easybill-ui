<template>
  <div class="list">
    <CurdForm v-model="form" :form-schema="formSchema"></CurdForm>
  </div>
</template>
<script lang="ts" setup>
import { CurdForm, FormSchema } from "easybill-ui/index"
import { ref, Ref } from "vue"

const form = ref({})
const arrayData = [
  { label: "aaaa", value: "aaaa" },
  { label: "bbbb", value: "bbbb" },
  { label: "cccc", value: "cccc" },
  { label: "dddd", value: "dddd" },
  { label: "eeee", value: "eeee" },
  { label: "ffff", value: "ffff" },
]
const formSchema: Ref<FormSchema> = ref({
  formItem: [
    {
      label: "前端筛选",
      prop: "select",
      type: "select",
      props: {
        filterable: true,
        filterMethod(val, row) {
          if (!val) return true
          return row.label.includes(val)
        },
      },
      asyncOptions: async () => {
        return arrayData
      },
    },
    {
      label: "远程接口筛选",
      prop: "selectremote",
      type: "select",
      props: {
        filterable: true,
        remote: true,
        remoteMethod: async (query) => {
          await new Promise<void>((resolve) => {
            setTimeout(() => {
              resolve()
            }, 1000)
          })
          return arrayData.filter((a) => a.label.includes(query))
        },
      },
      asyncOptions: async () => {
        return arrayData
      },
    },
  ],
  labelWidth: 100,
  labelPosition: "left",
  gutter: 10,
})
</script>
<style lang="scss" scoped>
.list {
  padding: 20px;
}
</style>
