import type { ElTooltipProps } from "element-plus"
import { defineComponent } from "vue"
import type { OptionItem } from "../../ConstantStatus/src/types"

export interface DetailDataItem extends Record<string, unknown> {
  label?: string
  value?: unknown
  /** 当前项占的宽度，最大24, 默认24 */
  span?: number
  /** 当前数据的选项，里面包含的图标、颜色信息会自动显示 */
  options?: Array<OptionItem>
  /** type为image时，会把value当做image的url来显示图片 */
  type?: string | ReturnType<typeof defineComponent>
  labelWidth?: number | string
  props?: Record<string, string>
  slot?: string
  tooltip?: string | import("element-plus/es/components/tooltip").ElTooltipProps
  labelPosition?: "left" | "right" | "center"
  labelStyle?: string | Record<string, string | number>
  showOverflowTooltip?: boolean | string | Partial<ElTooltipProps>
  rawContent?: boolean
  hidden?: boolean | ((data: DetailDataItem[]) => boolean)
}
