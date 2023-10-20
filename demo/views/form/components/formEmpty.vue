<template>
  <div class="form-empty">这里是自定义的空的模版</div>
</template>
<script lang="ts" setup>
import { Plus, Refresh } from "@element-plus/icons-vue"
import { useForm, FormItemProps, FormDialog } from "easybill-ui/index"
const props = defineProps({
  ...FormItemProps,
})
const { formContext } = useForm()
console.log("formContext", formContext)
const refresh = () => {
  formContext?.loadOptions(props.formItem.prop)
}
</script>
<style lang="scss" scoped>
.form-suffix-btn {
  display: flex;
  padding-left: 10px;
}
</style>
