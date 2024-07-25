<template>
  <el-select v-model="model" style="width: 100%" :loading="formItem.loading || loading" :placeholder="'请选择' + formItem.label" v-bind="selectProps" v-on="eventObject">
    <el-option v-if="props.all && !props.multiple" value="" label="全部"></el-option>
    <el-checkbox v-if="props.all && props.multiple" v-model="checked" label="全选" class="schema-form-select-check" />
    <template v-for="option in list" :key="option.value">
      <el-option :value="option.value" :label="option.label" :disabled="option.disabled">
        <div v-if="option.html" v-html="option.html"></div>
        <template v-else>{{ option.label }}</template>
      </el-option>
    </template>
  </el-select>
</template>
<script lang="ts">
import { defineComponent, computed, onMounted, ref, watch } from "vue"
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
    const checked = computed({
      get() {
        return Array.isArray(model.value) && model.value.length && props.formItem?.options?.every((item) => model.value?.includes(item.value))
      },
      set(val) {
        model.value = val ? props.formItem?.options?.map((a) => a.value) : []
        props?.eventObject?.change && props?.eventObject?.change()
      },
    })
    const loading = ref(false)
    // 有的options是从接口里拿的，掉接口需要时间，初始全选的时候全选的按钮没有勾选上，所以监听options
    const list = ref(props.formItem.options)
    watch(
      () => props.formItem.options,
      (val) => {
        list.value = val
      },
      {
        deep: true,
      },
    )
    onMounted(() => {})
    const { filterMethod, remoteMethod, ...selectProps } = props.props
    // 前端筛选
    if (filterMethod) {
      selectProps.filterMethod = function (val) {
        list.value = props.formItem?.options?.filter((a) => filterMethod(val, a))
      }
    }
    // 远程筛选
    if (selectProps.remote && remoteMethod) {
      selectProps.remoteMethod = function (val) {
        loading.value = true
        remoteMethod(val)
          .then((res) => {
            list.value = res
          })
          .finally((e) => {
            loading.value = false
          })
      }
    }
    return {
      model,
      checked,
      selectProps,
      list,
      loading,
    }
  },
})
</script>
