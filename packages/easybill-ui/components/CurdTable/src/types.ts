import { FormSchema } from "./../../CurdForm/src/types"
import { ParamsItem } from "../../TableFilter"
import { FormItem as FormItemType, Fields, TooltipProps } from "../../CurdForm"
import { OptionItem } from "../../ConstantStatus"
import { TableProps } from "element-plus/es/components/table/src/table/defaults"
// import { TableColumnCtx } from "element-plus"
import { FormProps } from "element-plus"
import type { VNode } from "vue"
import { FormDialogOptions } from "../../FormDialog/src/types"

export interface CurdTableProps<T = unknown> extends Partial<TableProps<T>> {
  rowKey?: string
  data?: T[]
  columns: ColumnItem<T>[]
  pageOptions?: { pageIndex?: number; pageSize?: number; total?: number } & Fields
  option?: Partial<PropOption>
  fetchData?: (opt: FeachDataParam) => Promise<{ total?: number; list?: T[] } | void>
  fetchCreate?: (formModel: Fields) => Promise<void>
  fetchEdit?: (row: T) => Promise<void>
  fetchRemove?: (row: T) => Promise<void>
}
// extends Partial<TableColumnCtx<T>>
export interface ColumnItemCtx<T> extends Partial<TableColumnCtx<T>> {
  prop: string
  label: string
  type?: string
  hidden?: boolean
  neverShow?: boolean // 表示不在列控制器里
  children?: ColumnItem<T>[]
  options?: Array<OptionItem> //数据字典
  asyncOptions?: () => Promise<OptionItem[]>
  form?: Partial<FormItemType> | ((formItem: FormItemType, row: T, query: Fields) => Partial<FormItemType>)
  filter?: ColumnItemFilter
  detail?: ColumnItemDetail
  value?: any
  copy?: boolean // 对某一列的单元格的值进行复制
  vHtml?: boolean //当前列是否v-html渲染
  header?: string | TableColumnHeader
}
interface TableColumnCtx<T> {
  className: string
  labelClassName: string
  property: string
  prop: string
  width: string | number
  minWidth: string | number
  renderHeader: (data: any) => VNode
  sortable: boolean | string
  sortMethod: (a: T, b: T) => number
  sortBy: string | ((row: T, index: number) => string) | string[]
  resizable: boolean
  columnKey: string
  rawColumnKey: string
  align: string
  headerAlign: string
  showTooltipWhenOverflow: boolean
  showOverflowTooltip: boolean
  fixed: boolean | string
  formatter: (row: T, column: ColumnItemCtx<T>, cellValue: any, index: number) => VNode | string
  selectable: (row: T, index: number) => boolean
  reserveSelection: boolean
  filterMethod: FilterMethods<T>
  filteredValue: string[]
  filters: Filters
  filterPlacement: string
  filterMultiple: boolean
  index: number | ((index: number) => number)
  sortOrders: ("ascending" | "descending" | null)[]
  renderCell: (data: any) => void
  colSpan: number
  rowSpan: number
  // children: TableColumnCtx<T>[]
  level: number
  filterable: boolean | FilterMethods<T> | Filters
  order: string
  isColumnGroup: boolean
  isSubColumn: boolean
  columns: ColumnItemCtx<T>[]
  getColumnIndex: () => number
  no: number
  filterOpened?: boolean
}
type FilterMethods<T> = (value: any, row: T, column: ColumnItemCtx<T>) => void
type Filters = {
  text: string
  value: string
}[]

export type ColumnItem<T = any> = ColumnItemCtx<T>

export interface TableColumnHeader {
  title?: string
  tooltip?: string | Partial<TooltipProps>
}

export interface PropOption {
  operationWidth: number
  operationBtnTitle: string
  hideMenu: boolean // 是否隐藏右侧工具菜单
  hideMenuAdd: boolean // 是否隐藏菜单中添加按钮
  hideMenuRight: boolean // 是否隐藏菜单右侧
  hideOperation: boolean // 是否隐藏操作列
  hideOperationEdit: boolean // 是否隐藏操作列中的编辑按钮
  hideOperationDetail: boolean // 是否隐藏操作列中的详情按钮
  hideOperationDelete: boolean // 是否隐藏操作列中的删除按钮
  hidePage: boolean // 是否隐藏分页器
  excelTitle: string //导出表格的文件名
  selectionProps: Fields //type=selection 的列属性
  downloadMod: boolean | { excludes?: string[] }
  pageProps: Fields
  filterVisible: boolean
  customActivatedFetch: boolean // 自定义执行onActivated内部的fetch执行，完全交由父组件控制
  autoload: boolean
  menuEvent: Partial<Record<MenuEventKey, () => void>>
  filterAttrs: Partial<FormProps>
  formAttrs: FormAttrs
  editOptions: FormDialogOptions
  createOptions: FormDialogOptions
}
export type MenuEventKey = "refresh" | "searchToggle" | "size" | "export" | "operation"
export type FormAttrs = Partial<FormSchema> & { width: string }
export interface ColumnItemFilter extends Partial<ParamsItem> {
  inner?: boolean
}

export interface ColumnItemDetail {
  label?: string
  span?: number
  value?: any
}

export interface TableAttr {
  size?: string
}

export interface TableListQuery {
  pageIndex?: number
  pageSize?: number
  total?: number

  [key: string]: any
}

export interface FeachDataParam {
  listQuery: TableListQuery
}

export interface FetchDataOpt {
  showLoading?: boolean
  query?: Fields
  resetPageIndex?: boolean
}

/**
 * Make all properties in T optional
 */
type Partial<T> = {
  [P in keyof T]?: T[P]
}
