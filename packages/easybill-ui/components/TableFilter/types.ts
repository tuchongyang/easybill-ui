import { defineComponent } from "vue"
import type { FormContext, FormItem, FormItemTypeEmun } from "../CurdForm"
export interface ParamsItem extends FormItem {
  type?: FormItemTypeEmun | ReturnType<typeof defineComponent>
  tableKey?: Array<string>
  external?: boolean | "left" | "right"
  all?: boolean
  sortIndex?: number // 排序，数字越大越靠前
  tagNames?: string
}
export type FilterItem = ParamsItem
export interface TableFilterContext extends FormContext {
  loadOptions: (prop: string, config?: unknown) => void
  setValue: (prop: string, value: unknown) => void
  search: () => void
}

export interface ListQuery {
  [key: string]: unknown
}
export interface FilterOption {
  formProps: {
    labelWidth?: string | number
    labelPosition?: "left" | "right" | "center" | string
  }
}

export interface State {
  isFocus: boolean
}
