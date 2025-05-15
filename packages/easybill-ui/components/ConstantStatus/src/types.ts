export interface OptionItem extends Record<string, unknown> {
  label: string
  value: string | number | boolean
  disabled?: boolean
  type?: string | "default" | "primary" | "success" | "info" | "warning" | "danger" | "blue" | "blue-dark" | "yellow" | "blueness" | "red-purple" | "error"
  icon?: unknown
  hit?: boolean
  color?: string
  size?: string | "large" | "default" | "small"
  effect?: string | "dark" | "light" | "plain"
  round?: boolean
  border?: boolean
  className?: string
  iconClass?: string | string[]
  dot?: boolean
  tooltip?: unknown
  html?: string
}
