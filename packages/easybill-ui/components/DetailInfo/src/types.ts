export interface OptionItem {
  label: string
  value: string | number | boolean
}

export interface DetailDataItem {
  label?: string
  value?: string | number | boolean
  /** 当前项占的宽度，最大24, 默认24 */
  span?: number
  /** 当前数据的选项，里面包含的图标、颜色信息会自动显示 */
  options?: Array<OptionItem>
  /** type为image时，会把value当做image的url来显示图片 */
  type?: string
  labelWidth?: number
  props?: {
    [key: string]: string
  }
  slot?: string
  tooltip: string | import("element-plus/es/components/tooltip").ElTooltipProps
}
