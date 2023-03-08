<template>
  <el-form ref="schemaFormRef" :model="modelRef" :rules="rulesRef" v-bind="$attrs" class="curd-form" :label-width="sFormSchema.labelWidth" @submit.prevent>
    <template v-for="formItem in schemaItems" :key="formItem.prop">
      <el-form-item v-if="!$slots[formItem.type + 'Item']" :label="formItem.label" :prop="formItem.prop" :label-width="formItem.labelWidth" :style="getFormItemStyle(formItem)" v-bind="getFormItemProps(formItem)">
        <slot :name="formItem.prop" :form-item="formItem" :form-model="modelRef"></slot>
        <FormItem v-if="!(formItem.prop && $slots[formItem.prop])" :form-item="formItem" :form-model="modelRef" @change="onChange">
          <template #prefix>
            <slot :name="formItem.prop + 'Prefix'" :form-item="formItem" :form-model="modelRef"></slot>
          </template>
          <template #suffix>
            <slot :name="formItem.prop + 'Suffix'" :form-item="formItem" :form-model="modelRef"></slot>
          </template>
        </FormItem>
        <slot :name="formItem.prop + 'Bottom'" :form-item="formItem" :form-model="modelRef"></slot>
      </el-form-item>
      <slot :name="formItem.prop + 'Item'" :form-item="formItem" :form-model="modelRef"></slot>
    </template>
    <template v-if="$slots['operate-button']">
      <el-form-item style="max-width: 100%">
        <slot name="operate-button"></slot>
      </el-form-item>
    </template>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, Ref, getCurrentInstance, computed, watch, PropType } from "vue"
import { isFunction, isAsyncFunction, isObject } from "./utils/is"
import components from "./components"
import { ElForm, ElFormItem } from "element-plus"
import { FormSchema, Fields, FormItem as FormItemType } from "./types"
import FormItem from "./FormItem.vue"
export default defineComponent({
  name: "CurdForm",
  components: {
    ...components,
    ElForm,
    ElFormItem,
    FormItem,
  },
  props: {
    // 动态验证表单
    formSchema: {
      required: true,
      type: Object as PropType<FormSchema>,
    },
    // 预置字段默认值
    fields: {
      type: Object as PropType<Fields>,
      default: () => ({}),
    },
    modelValue: {
      type: Object as PropType<Fields>,
      default: undefined,
    },
  },
  emits: ["update:modelValue", "change"],
  setup(props, { emit, attrs }) {
    const schemaFormRef = ref()
    const sFormSchema: Ref<FormSchema> = ref(props.formSchema)

    const modelRef = reactive<Fields>(props.modelValue || {})
    watch(
      () => props.modelValue,
      () => {
        for (let i in modelRef) {
          delete modelRef[i]
        }
        Object.assign(modelRef, props.modelValue)
      }
    )
    watch(
      () => modelRef,
      (val) => {
        emit("update:modelValue", val)
      }
    )

    // 先从schema中读取默认值
    const schemaValues = sFormSchema.value.formItem.reduce<Fields>((previousValue, currentValue) => {
      currentValue.eventObject ??= {}
      typeof currentValue.value == "undefined" ? false : currentValue.prop && (previousValue[currentValue.prop] = currentValue.value)
      return previousValue
    }, {})

    Object.assign(modelRef, schemaValues)
    // 如果有默认值，则覆盖
    props.fields && Object.assign(modelRef, props.fields)
    Object.assign(modelRef, props.modelValue)
    // props.modelValue && Object.assign(modelRef, props.modelValue)
    const instance = getCurrentInstance()
    // 异步设置默认数据
    sFormSchema.value.formItem.forEach(async (item) => {
      // 异步选项
      if (item.asyncOptions && (isFunction(item.asyncOptions) || isAsyncFunction(item.asyncOptions))) {
        item.loading = true
        item.options = await item.asyncOptions(modelRef, item).finally(() => (item.loading = false))
        item.eventObject?.optionLoaded && item.eventObject?.optionLoaded(modelRef, item, instance?.proxy)
      } else if (item.prop && item.asyncValue && (isFunction(item.asyncValue) || isAsyncFunction(item.asyncValue))) {
        // 异步默认值
        item.loading = true
        modelRef[item.prop] = await item.asyncValue(modelRef, item).finally(() => (item.loading = false))
      }
    })

    const schemaItems = computed(() => {
      return sFormSchema.value.formItem.filter((item) => {
        if (!item.hidden) {
          return true
        }
        if (item.hidden instanceof Function) {
          return !item.hidden(modelRef)
        }
        return !item.hidden
      })
    })
    // 生成表单验证规则
    const rulesRef = computed(() => {
      return sFormSchema.value.rules
    })

    // 供外部使用
    const validate = (callback: (valid: boolean) => void) => {
      return schemaFormRef.value.validate(callback)
    }
    // 调用某个表单项的异步数据接口
    const loadOptions = async (prop: string) => {
      const cur = sFormSchema.value.formItem.find((a) => a.prop == prop)
      if (cur && cur.asyncOptions) {
        cur.loading = true
        cur.options =
          (await cur
            .asyncOptions(modelRef, cur)
            .catch((err) => console.error("loadOptionError", err))
            .finally(() => (cur.loading = false))) || []
        cur.eventObject?.optionLoaded && cur.eventObject?.optionLoaded(modelRef, cur, instance?.proxy)
      }
      return cur
    }
    const onChange = (formModel: Fields, formItem: FormItemType) => {
      emit("change", formModel, formItem)
    }
    const getFormItemStyle = (formItem: FormItemType) => {
      return { maxWidth: formItem.span && (100 * formItem.span) / 24 + "%", flex: typeof attrs.inline == "undefined" ? "0 0 " + (100 * (formItem.span || 24)) / 24 + "%" : "" }
    }
    const getFormItemProps = (formItem: FormItemType) => {
      if (formItem.formItemProps) {
        if (formItem.formItemProps instanceof Function) {
          return formItem.formItemProps(modelRef, formItem)
        }
        const { ...attrs } = formItem.formItemProps
        return attrs
      }
      return {}
    }

    return {
      modelRef,
      schemaFormRef,
      rulesRef,
      schemaItems,
      sFormSchema,
      getFormItemStyle,
      getFormItemProps,
      validate,
      loadOptions,
      onChange,
    }
  },
})
</script>
