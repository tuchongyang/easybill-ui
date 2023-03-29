export interface OptionItem {
  label: string
  value: string | number | boolean
  disabled?: boolean
  type?: "default" | "success" | "info" | "warning" | "danger" | "blue" | "blue-dark" | "yellow" | "blueness" | "red-purple" | "error"
  icon?: any
  hit?: boolean
  color?: string
  size?: "large" | "default" | "small"
  effect?: "dark" | "light" | "plain"
  round?: boolean
  border?: boolean
  className?: string
  iconClass?: string | string[]
  dot?: boolean
  /**
   * 供curd-form的单选或多选，选项上的tooltip
   */
  tooltip?: any
  html?: string
}
