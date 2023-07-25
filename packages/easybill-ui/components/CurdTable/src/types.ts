import { ParamsItem } from "../../TableFilter"
import { EventObject, FormItem as FormItemType, Fields } from "../../CurdForm"
import { OptionItem } from "../../ConstantStatus"
import { TableProps } from "element-plus/es/components/table/src/table/defaults"
import { TableColumnCtx } from "element-plus/es/components/table/src/table-column/defaults"
import { FormProps } from "element-plus"

export interface CurdTableProps<T = unknown> extends Partial<TableProps<T>> {
  rowKey?: string
  data?: T[]
  columns: ColumnItem<T>[]
  pageOptions?: { pageIndex?: number; pageSize?: number; total?: number } & Fields
  option?: PropOption
  fetchData?: (opt: FeachDataParam) => Promise<{ total?: number; list?: T[] } | void>
  fetchCreate?: (formModel: Fields) => Promise<void>
  fetchEdit?: (row: T) => Promise<void>
  fetchRemove?: (row: T) => Promise<void>
}

export interface ColumnItemCtx<T> {
  prop: string
  label: string
  hidden?: boolean
  neverShow?: boolean // 表示不在列控制器里
  children?: Array<ColumnItem> // 暂时不支持
  options?: Array<OptionItem> //数据字典
  asyncOptions?: () => Promise<OptionItem[]>
  form?: Partial<FormItemType> | ((formItem: FormItemType, row: T) => Partial<FormItemType>)
  filter?: ColumnItemFilter
  detail?: ColumnItemDetail
  //继承自el-table-column属性
  minWidth?: number
  width?: number
  showOverflowTooltip?: boolean
  align?: string
  fixed?: string
  formatter?: (row: T) => string
  value?: any
  className?: string
  copy?: boolean // 对某一列的单元格的值进行复制
  vHtml?: boolean //当前列是否v-html渲染
  header?: string | TableColumnHeader
}

export type ColumnItem<T = any> = Partial<TableColumnCtx<T>> & ColumnItemCtx<T>

export interface TableColumnHeader {
  title?: string
  tooltip?: string | Partial<import("element-plus/es/components/tooltip").ElTooltipProps>
}

export interface PropOption {
  operationWidth?: number
  operationBtnTitle?: string
  hideMenu?: boolean // 是否隐藏右侧工具菜单
  hideMenuAdd?: boolean // 是否隐藏菜单中添加按钮
  hideMenuRight?: boolean // 是否隐藏菜单右侧
  hideOperation?: boolean // 是否隐藏操作列
  hideOperationEdit?: boolean // 是否隐藏操作列中的编辑按钮
  hideOperationDetail?: boolean // 是否隐藏操作列中的详情按钮
  hideOperationDelete?: boolean // 是否隐藏操作列中的删除按钮
  hidePage?: boolean // 是否隐藏分页器
  excelTitle?: string //导出表格的文件名
  selectionProps?: Fields //type=selection 的列属性
  downloadMod?: boolean | { excludes?: string[] }
  pageProps?: Fields
  filterVisible?: boolean
  customActivatedFetch?: boolean // 自定义执行onActivated内部的fetch执行，完全交由父组件控制
  autoload?: boolean
  menuEvent?: Partial<Record<MenuEventKey, () => void>>
  filterAttrs?: Partial<FormProps>
  formAttrs?: Partial<FormProps> & { width: string }
}
export type MenuEventKey = "refresh" | "searchToggle" | "size" | "export" | "operation"

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
