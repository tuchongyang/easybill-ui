import { FormRules, FormItemRule, FormProps, ElForm } from "element-plus"
import { PropType, Ref } from "vue"
import { OptionItem } from "../../ConstantStatus"
import { defineComponent } from "vue"
export interface FormSchema extends Partial<FormProps> {
  formItem: Array<FormItem>
  rules?: FormRules
  labelPosition?: "left" | "right" | "top"
  gutter?: number
}
export interface FormItem {
  prop: string
  label?: string
  type?: FormItemTypeEmun | ReturnType<typeof defineComponent>
  value?: any
  eventObject?: EventObject
  options?: Array<CurdFormOptionItem>
  asyncOptions?: (modelRef: Fields, formItem: FormItem, context: FormContext, config?: Fields) => Promise<Array<CurdFormOptionItem>>
  asyncValue?: (modelRef: Fields, formItem: FormItem) => Promise<string | number | boolean>
  loading?: boolean
  hidden?: boolean | ((model: Fields) => boolean)
  rules?: FormItemRule[]
  props?: FormItemPropObject | ((formModel: Fields, formItem: FormItem) => void)
  formItemProps?: FormItemPropObject | ((formModel: Fields, formItem: FormItem) => void)
  labelWidth?: string
  span?: number
  disabled?: boolean
  tooltip?: string
  autoload?: boolean
  prefix?: string | any[]
  suffix?: string | any[]
}
export type FormItemTypeEmun = "input" | "select" | "radio" | "checkbox" | "input-number" | "switch" | "file" | "date-picker" | "time-picker" | "color-picker" | "value"
// type FormItemProps = FormItemPropObject | ((formModel: Fields, formItem: FormItem) => void)
export interface FormItemPropObject {
  [key: string]: any
}
export interface FormContext {
  loadOptions: (prop: string) => void
  setOptions: (prop: string, options: CurdFormOptionItem[]) => void
  change: (formModel: Fields, formItem: FormItem) => void
  formModel: Fields
  formRef: Ref<InstanceType<typeof ElForm> | undefined>
  setValue: (prop: string, value?: any) => void
}
export interface Fields {
  [key: string]: any
}
export interface CurdFormOptionItem extends OptionItem {
  [key: string]: any
}
// interface EventObjectDefault {
//   change?: (formModel: Fields, formItem: FormItem, proxy: any) => void
// }
export interface EventObject {
  change?: (formModel: Fields, formItem: FormItem, context: FormContext) => void
  optionLoaded?: (formModel: Fields, formItem: FormItem, context: FormContext) => void
  [key: string]: ((formModel: Fields, formItem: FormItem, context: FormContext) => void) | undefined
}
// export interface OptionItem {
//   label: string
//   value: string | number | boolean
//   disabled?: boolean
//   tooltip?: string | ((formModel: Fields, formItem: FormItem) => string)
//   [key: string]: any
// }
interface FormItemEventObject {
  change?: () => void
  [key: string]: any
}
export const FormItemProps = {
  formItem: {
    type: Object as PropType<FormItem>,
    default: () => ({}),
  },
  formModel: {
    type: Object as PropType<Fields>,
    default: () => ({}),
  },
  props: {
    type: Object as PropType<Fields>,
    default: () => ({}),
  },
  eventObject: {
    type: Object as PropType<FormItemEventObject>,
    default: () => ({}),
  },
  modelValue: {
    type: String,
    default: "",
  },
}
