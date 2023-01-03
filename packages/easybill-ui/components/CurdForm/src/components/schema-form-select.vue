<template>
  <el-select v-model="model" style="width: 100%" :loading="formItem.loading" v-bind="props" v-on="eventObject">
    <el-option v-if="props.all && !props.multiple" value="" label="全部"></el-option>
    <el-checkbox v-if="props.all && props.multiple" v-model="checked" label="全选" class="schema-form-select-check" @change="selectAll" />
    <template v-for="option in formItem.options" :key="option.value">
      <el-option :value="option.value" :label="option.label" :disabled="option.disabled"></el-option>
    </template>
  </el-select>
</template>
<script lang="ts">
import { defineComponent, computed, onMounted } from "vue"
import { ElSelect, ElOption, ElCheckbox } from "element-plus"
import { FormItemProps } from "../types"
export default defineComponent({
  name: "SchemaFormSelect",
  components: { ElSelect, ElOption, ElCheckbox },
  props: {
    ...FormItemProps,
    modelValue: {
      type: [String, Number, Boolean, Array],
      default: null,
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const model = computed({
      get: () => props.modelValue,
      set: (val) => emit("update:modelValue", val),
    })
    const checked = ref(false)
    watch(
      () => model.value,
      (val) => {
        if (Array.isArray(val) && val.length == props.formItem?.options?.length) {
          checked.value = true
        } else {
          checked.value = false
        }
      },
      {
        deep: true,
      }
    )
    // 有的options是从接口里拿的，掉接口需要时间，初始全选的时候全选的按钮没有勾选上，所以监听options
    watch(
      () => props.formItem.options,
      (val) => {
        if (Array.isArray(val) && val.length == props.formItem?.options?.length) {
          checked.value = true
        } else {
          checked.value = false
        }
      },
      {
        deep: true,
      }
    )
    const selectAll = () => {
      if (checked.value) {
        let list: any[] = []
        props.formItem?.options?.forEach((a) => {
          list.push(a.value)
        })
        model.value = list
      } else {
        model.value = []
      }
      props?.eventObject?.change && props?.eventObject?.change()
    }
    onMounted(() => {
      if (props.props.multiple && props.props.all && Array.isArray(model.value) && model.value.length == props.formItem?.options?.length) {
        checked.value = true
      }
    })
    return {
      model,
      selectAll,
      checked,
    }
  },
})
</script>
