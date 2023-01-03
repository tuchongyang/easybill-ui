import { FormRules, FormItemRule } from "element-plus"
import { PropType } from "vue"
import { OptionItem } from "../../ConstantStatus"
import { defineComponent } from "vue"
export interface FormSchema {
  formItem: Array<FormItem>
  labelWidth?: string | number
  rules?: FormRules
}
export interface FormItem {
  prop?: string
  label?: string
  type?: typeEmun | ReturnType<typeof defineComponent>
  value?: any
  eventObject?: EventObject
  options?: Array<OptionItem>
  asyncOptions?: (modelRef: Fields, formItem: FormItem) => Promise<Array<OptionItem>>
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
  /** File组件需要的配置 */
  action?: string
  headers?: {
    [key: string]: string
  }
  url?: string
  getUrl?: (formModel: Fields, formItem: FormItem) => string
  fileType?: string
  maxsize?: number
  beforeUpload?: (isJpgOrPng: boolean, isLt2M: number) => void
}
type typeEmun = "input" | "select" | "radio" | "checkbox" | "input-number" | "switch" | "file" | "date-picker" | "color-picker" | "value"
// type FormItemProps = FormItemPropObject | ((formModel: Fields, formItem: FormItem) => void)
export interface FormItemPropObject {
  [key: string]: any
}

export interface Fields {
  [key: string]: any
}
// interface EventObjectDefault {
//   change?: (formModel: Fields, formItem: FormItem, proxy: any) => void
// }
export interface EventObject {
  change?: (formModel: Fields, formItem: FormItem, proxy: any) => void
  optionLoaded?: (formModel: Fields, formItem: FormItem, proxy: any) => void
  [key: string]: ((formModel: Fields, formItem: FormItem, proxy: any) => void) | undefined
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
