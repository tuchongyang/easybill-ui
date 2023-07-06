<template>
  <div class="form-suffix-btn">
    <el-button type="primary" link :icon="Refresh" @click="refresh"></el-button>
    <el-button type="primary" link :icon="Plus" @click="add"></el-button>
  </div>
</template>
<script lang="ts" setup>
import { Plus, Refresh } from "@element-plus/icons-vue"
import { useForm, FormItemProps, FormDialog } from "easybill-ui/index"
const props = defineProps({
  ...FormItemProps,
})
const { formContext } = useForm()
const refresh = () => {
  formContext.loadOptions(props.formItem.prop)
}
const add = () => {
  FormDialog.show({
    title: "添加",
    formSchema: {
      formItem: [
        { label: "名称", prop: "label" },
        { label: "值", prop: "value" },
      ],
    },
  })
}
</script>
<style lang="scss" scoped>
.form-suffix-btn {
  display: flex;
  padding-left: 10px;
}
</style>
