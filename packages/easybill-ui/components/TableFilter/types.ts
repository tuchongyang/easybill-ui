import { FormItem, FormItemTypeEmun } from "../CurdForm"
export interface ParamsItem extends FormItem {
  type: ParamsItemTypeEunm | IDatePickerType | FormItemTypeEmun
  tableKey?: Array<string>
  external?: boolean | "left" | "right"
  all?: boolean
  sortIndex?: number // 排序，数字越大越靠前
  tagNames?: string
}
export interface TableFilterContext {
  loadOptions: (prop: string) => void
  setValue: (prop: string, value: any) => void
}
export interface ListQuery {
  [key: string]: any //string | boolean | number | Array<string> | Array<number>
}

export type ParamsItemTypeEunm = "select" | "checkbox" | "time" | "input" | "date-picker"
type IDatePickerType = "year" | "month" | "date" | "dates" | "week" | "datetime" | "datetimerange" | "daterange" | "monthrange"
