import { FormItem, FormItemTypeEmun } from "../CurdForm"
export interface ParamsItem extends FormItem {
  type: ParamsItemTypeEunm
  tableKey?: Array<string>
  external?: boolean | "left" | "right"
  all?: boolean
  sortIndex?: number // 排序，数字越大越靠前
  tagNames?: string
}
export interface TableFilterContext {
  loadOptions: (prop: string) => void
  setValue: (prop: string, value: any) => void
  search: () => void
}
export interface ListQuery {
  [key: string]: any //string | boolean | number | Array<string> | Array<number>
}

export type ParamsItemTypeEunm =
  | "input"
  | "select"
  | "radio"
  | "checkbox"
  | "input-number"
  | "switch"
  | "file"
  | "date-picker"
  | "time-picker"
  | "color-picker"
  | "value"
  | "time"
  | "input"
  | "date-picker"
  | "year"
  | "month"
  | "date"
  | "dates"
  | "week"
  | "datetime"
  | "datetimerange"
  | "daterange"
  | "monthrange"
type IDatePickerType = "year" | "month" | "date" | "dates" | "week" | "datetime" | "datetimerange" | "daterange" | "monthrange"

type A = "aa" | "bb" | undefined
const a: A = "aa"
const a1 = ref<A>("aa")
const a2 = ref<A>("a1")
const a11: Ref<A> = ref("aa")
const a22: Ref<A> = ref("a1")

interface B {
  a?: A
}
import { ref, Ref } from "vue"
const b: Ref<B> = ref({
  a: "aa",
})
