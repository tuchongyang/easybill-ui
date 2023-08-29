import { FormItem, FormItemTypeEmun } from "../CurdForm"
import { defineComponent } from "vue"
export interface ParamsItem extends FormItem {
  type?: FormItemTypeEmun | ReturnType<typeof defineComponent>
  tableKey?: Array<string>
  external?: boolean | "left" | "right"
  all?: boolean
  sortIndex?: number // 排序，数字越大越靠前
  tagNames?: string
}
export interface FilterItem extends ParamsItem {}
export interface TableFilterContext {
  loadOptions: (prop: string, config?: any) => void
  setValue: (prop: string, value: any) => void
  search: () => void
}
export interface ListQuery {
  [key: string]: any //string | boolean | number | Array<string> | Array<number>
}
