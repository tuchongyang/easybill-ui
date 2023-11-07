import { FormRules, FormItemRule, ElForm, TooltipTriggerType } from "element-plus"
import type { Arrayable } from "element-plus/es/utils"
import { PropType } from "vue"
import { OptionItem } from "../../ConstantStatus"
import { defineComponent } from "vue"
export interface FormSchema {
  formItem: FormItem[]
  rules?: FormRules | ((formModel: Fields, context: FormContext) => FormRules)
  getRules?: (formModel: Fields, context: FormContext) => FormRules
  labelPosition?: "left" | "right" | "top" | string
  gutter?: number
  labelWidth?: number | string
  inline?: boolean
  inlineMessage?: boolean
  statusIcon?: boolean
  showMessage?: boolean
  size?: "default" | "small" | "large" | string
  disabled?: boolean
  validateOnRuleChange?: boolean
  hideRequiredAsterisk?: boolean
  scrollToError?: boolean
}
export interface FormItem {
  prop: string
  label?: string
  type?: FormItemTypeEmun | ReturnType<typeof defineComponent>
  value?: any
  eventObject?: EventObject
  options?: Array<CurdFormOptionItem>
  asyncOptions?: (modelRef: Fields, formItem: any, context: FormContext, config?: any) => Promise<Array<CurdFormOptionItem>>
  loading?: boolean
  hidden?: boolean | ((model: Fields) => boolean)
  rules?: Arrayable<FormItemRule>
  props?: FormItemPropObject | ((formModel: Fields, formItem: any) => FormItemPropObject)
  formItemProps?: FormItemPropObject | ((formModel: Fields, formItem: any) => void)
  labelWidth?: string | number
  span?: number
  disabled?: boolean
  tooltip?: string | ((formModel: Fields, formItem: any) => Partial<TooltipProps> | string) | Partial<TooltipProps>
  autoload?: boolean
  prefix?: string | any
  suffix?: string | any
  empty?: string | any
  sortIndex?: number
}
export type FormItemTypeEmun = "input" | "select" | "radio" | "checkbox" | "input-number" | "switch" | "file" | "date-picker" | "time-picker" | "color-picker" | "value"
export interface FormItemPropObject {
  [key: string]: any
}
export interface TooltipProps {
  effect: "dark" | "light"
  content: string
  rawContent: boolean
  placement: import("element-plus/es/components/popper").Placement
  disabled: boolean
  offset: number
  transition: string
  popperOptions: any
  showAfter: number
  showArrow: boolean
  hideAfter: number
  autoClose: number
  popperClass: string
  enterable: boolean
  teleported: boolean
  trigger: TooltipTriggerType
}
export interface FormContext {
  loadOptions: (prop: string, config?: Fields) => void
  setOptions: (prop: string, options: CurdFormOptionItem[], config?: any) => void
  change: (formModel: Fields, formItem: FormItem) => void
  formModel: Fields
  formRef: InstanceType<typeof ElForm> | undefined
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
  change?: (formModel: Fields, formItem: FormItem, context: FormContext, ...args: any[]) => void | boolean
  optionLoaded?: (formModel: Fields, formItem: FormItem, context: FormContext, config?: any) => void
  [key: string]: ((formModel: Fields, formItem: FormItem, context: FormContext, config?: any) => void) | undefined
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
