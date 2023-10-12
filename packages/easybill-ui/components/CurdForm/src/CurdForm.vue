<template>
  <el-form ref="schemaFormRef" :model="formModel" :rules="rules" v-bind="{ ...$attrs, ...getFormProps }" class="curd-form" :style="getFormStyle()" @submit.prevent>
    <template v-for="formItem in schemaItems" :key="formItem.prop">
      <el-form-item v-if="!$slots[formItem.prop + 'Item']" :label="formItem.label" :prop="formItem.prop" :label-width="formItem.labelWidth" :style="getFormItemStyle(formItem)" v-bind="getFormItemProps(formItem)">
        <slot :name="formItem.prop" :form-item="formItem" :form-model="formModel"></slot>
        <FormItem v-if="!(formItem.prop && $slots[formItem.prop])" :form-item="formItem" :form-model="formModel" @change="onChange">
          <template #prefix>
            <slot :name="formItem.prop + 'Prefix'" :form-item="formItem" :form-model="formModel"></slot>
          </template>
          <template #suffix>
            <slot :name="formItem.prop + 'Suffix'" :form-item="formItem" :form-model="formModel"></slot>
          </template>
        </FormItem>
        <slot :name="formItem.prop + 'Bottom'" :form-item="formItem" :form-model="formModel"></slot>
      </el-form-item>
      <slot :name="formItem.prop + 'Item'" :form-item="formItem" :form-model="formModel"></slot>
    </template>
    <template v-if="$slots['operate-button']">
      <el-form-item style="max-width: 100%">
        <slot name="operate-button"></slot>
      </el-form-item>
    </template>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, reactive, provide, ref, computed, watch, PropType, Ref, getCurrentInstance, onMounted, triggerRef } from "vue"
import { isFunction, isAsyncFunction } from "./utils/is"
import { deepClone } from "./utils/common"
import components from "./components"
import { ElForm, ElFormItem } from "element-plus"
import { FormSchema, Fields, FormItem as FormItemType, CurdFormOptionItem, FormContext } from "./types"
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
      default: () => ({}),
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
    extendContext: {
      type: Object as PropType<Record<string, any>>,
      default: undefined,
    },
  },
  emits: ["update:modelValue", "change"],
  setup(props, { emit, attrs }) {
    const schemaFormRef = ref<InstanceType<typeof ElForm> | undefined>()
    const sFormSchema: Ref<FormSchema> = ref(props.formSchema)
    let formModel = reactive<Fields>(props.modelValue || {})
    const curdFormContext = reactive<FormContext>({} as FormContext)
    const instance = getCurrentInstance()
    watch(
      () => props.modelValue,
      (val) => {
        const value = deepClone(val)
        for (let i in formModel) {
          delete formModel[i]
        }
        Object.assign(formModel, value)
      },
    )
    watch(
      () => formModel,
      (val) => {
        emit("update:modelValue", val)
      },
      { deep: true },
    )
    // 先从schema中读取默认值
    const schemaValues = sFormSchema.value.formItem.reduce<Fields>((previousValue, currentValue) => {
      currentValue.eventObject ??= {}
      typeof currentValue.value == "undefined" ? false : currentValue.prop && (typeof formModel[currentValue.prop] == "undefined" || formModel[currentValue.prop] === "" || formModel[currentValue.prop] === null) && (previousValue[currentValue.prop] = currentValue.value)
      return previousValue
    }, {})

    Object.assign(formModel, schemaValues)
    // 如果有默认值，则覆盖
    props.fields && Object.assign(formModel, props.fields)
    // Object.assign(formModel, props.modelValue)
    // props.modelValue && Object.assign(formModel, props.modelValue)

    const schemaItems = computed(() => {
      return sFormSchema.value.formItem.filter((item) => {
        if (!item.hidden) {
          return true
        }
        if (item.hidden instanceof Function) {
          return !item.hidden(formModel)
        }
        return !item.hidden
      })
    })
    // 异步设置默认数据
    sFormSchema.value.formItem.forEach(async (item) => {
      //
      // 异步选项
      if (item.asyncOptions && (item.autoload || typeof item.autoload == "undefined") && (isFunction(item.asyncOptions) || isAsyncFunction(item.asyncOptions))) {
        item.loading = true
        item.options = await item.asyncOptions(formModel, item, curdFormContext).finally(() => (item.loading = false))
        !instance?.isUnmounted && item.eventObject?.optionLoaded && item.eventObject?.optionLoaded(formModel, item, curdFormContext)
      }
    })

    // 生成表单验证规则
    const rules = computed(() => {
      if (typeof sFormSchema.value.rules == "function") {
        return sFormSchema.value.rules(formModel, curdFormContext)
      }
      if (typeof sFormSchema.value.getRules == "function") {
        return sFormSchema.value.getRules(formModel, curdFormContext)
      }
      return sFormSchema.value.rules
    })

    // 供外部使用
    const validate = (callback: (valid: boolean) => void) => {
      return schemaFormRef.value?.validate(callback)
    }
    // 调用某个表单项的异步数据接口
    const loadOptions = async (prop: string, option?: any) => {
      const cur: FormItemType | undefined = sFormSchema.value.formItem.find((a) => a.prop == prop)
      if (cur && cur.asyncOptions && !instance?.isUnmounted) {
        cur.loading = true
        triggerRef(schemaItems)
        cur.options =
          (await cur
            .asyncOptions(formModel, cur, curdFormContext, option)
            .catch((err) => console.error("loadOptionError", err))
            .finally(() => (cur.loading = false))) || []
        triggerRef(schemaItems)
        !instance?.isUnmounted && cur.eventObject?.optionLoaded && cur.eventObject?.optionLoaded(formModel, cur, curdFormContext, option)
      }
      return cur?.options || []
    }
    // 给某个item赋值options
    const setOptions = async (prop: string, options: CurdFormOptionItem[], option?: any) => {
      const cur = sFormSchema.value.formItem.find((a) => a.prop == prop)
      if (cur) {
        cur.options = options
        !instance?.isUnmounted && cur.eventObject?.optionLoaded && cur.eventObject?.optionLoaded(formModel, cur, curdFormContext, option)
      }
      // return cur
    }
    const onChange = (formModel: Fields, formItem: FormItemType) => {
      emit("change", formModel, formItem)
    }
    const getFormItemStyle = (formItem: FormItemType) => {
      const gutter = props.formSchema.gutter || 0
      return { maxWidth: formItem.span && (100 * formItem.span) / 24 + "%", flex: typeof attrs.inline == "undefined" || typeof formItem.span != "undefined" ? "0 0 " + (100 * (formItem.span || 24)) / 24 + "%" : "", padding: "0 " + gutter + "px" }
    }
    const getFormItemProps = (formItem: FormItemType) => {
      if (formItem.formItemProps) {
        if (formItem.formItemProps instanceof Function) {
          return formItem.formItemProps(formModel, formItem)
        }
        const { ...attrs } = formItem.formItemProps
        return { ...attrs }
      }
      return {}
    }
    const getFormStyle = () => {
      const gutter = props.formSchema.gutter
      if (gutter) {
        const guPx = +parseFloat(String(gutter))
        return { marginLeft: -guPx + "px", marginRight: -guPx + "px" }
      }
      return {}
    }
    const getFormProps = computed(() => {
      const args: any = {}
      const sm = props.formSchema as any
      for (const i in sm) {
        if (!["formItem", "rules", "getRules"].includes(i)) {
          args[i] = sm[i]
        }
      }
      return { ...args }
    })

    curdFormContext.loadOptions = loadOptions
    curdFormContext.setOptions = setOptions
    curdFormContext.change = onChange
    curdFormContext.formModel = formModel

    props.extendContext && Object.assign(curdFormContext, props.extendContext)
    provide("curdFormContext", curdFormContext)
    onMounted(() => {
      curdFormContext.formRef = schemaFormRef.value
    })
    return {
      formModel,
      schemaFormRef,
      rules,
      schemaItems,
      sFormSchema,
      getFormStyle,
      getFormProps,
      getFormItemStyle,
      getFormItemProps,
      validate,
      loadOptions,
      setOptions,
      onChange,
    }
  },
})
</script>
