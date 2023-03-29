import { OptionItem } from "../ConstantStatus"
export interface ParamsItem {
  type: typeEunm | IDatePickerType
  label: string
  prop: string
  options?: Array<OptionItem>
  tableKey?: Array<string>
  asyncOptions?: (options: AsyncOptionsParams) => Promise<any>
  external?: boolean | "left" | "right"
  all?: boolean
  sortIndex?: number // 排序，数字越大越靠前
  tagNames?: string
  props?: ParamsItemProps
  eventObject?: {
    change?: (query: ListQuery, paramsItem: ParamsItem, context: TableFilterContext) => void
  }
}
export interface TableFilterContext {
  loadOptions: (prop: string) => void
  setValue: (prop: string, value: any) => void
}
export interface ListQuery {
  [key: string]: any //string | boolean | number | Array<string> | Array<number>
}
export interface AsyncOptionsParams {
  /**
   * textModel远程搜索时使用
   */
  textModel: string
  listQuery: ListQuery
  options?: any
  paramsItem?: ParamsItem
}
export interface ParamsItemProps {
  [key: string]: any
}
export type typeEunm = "select" | "checkbox" | "time" | "input" | "date-picker"
type IDatePickerType = "year" | "month" | "date" | "dates" | "week" | "datetime" | "datetimerange" | "daterange" | "monthrange"

export interface TeleportStyle {
  top?: string
  left?: string
  display?: string
}

export interface Setting {
  inputModel?: string | boolean | number
  currentIndex?: number
  typeModel?: string | boolean | number
  typeShow?: boolean
  listShow?: boolean
}
