import { Ref, ref, provide, watch } from "vue"
import { ColumnItem } from "../types"
import { deepClone } from "../../utils/common"
import { ParamsItem } from "../../../TableFilter"

export function useColumnHook(props: any) {
  const columns: Ref<Array<ColumnItem>> = ref([])
  const cs = deepClone(props.columns)
  columns.value = cs //.filter((a) => !a.hidden)
  provide("columns", columns)
  const getSchema = (colss: ColumnItem[]) => {
    const result: Array<ParamsItem> = []
    const getFilter = (cols: Array<ColumnItem>) => {
      for (const i in cols) {
        const a = deepClone(cols[i])
        if (a.children && a.children.length) {
          getFilter(a.children)
          continue
        }
        if (a.filter) {
          result.push(getFilterFromColumn(a))
        }
      }
    }
    getFilter(colss)
    return result
  }
  const selectParams = ref<ParamsItem[]>([])
  // selectParams.value = getSchema()
  provide("selectParams", selectParams)
  async function initColumn() {
    const find = async (cs: ColumnItem[]) => {
      for (let i = 0; i < cs.length; i++) {
        const item = cs[i]
        if (item.children && item.children.length) {
          find(item.children)
        } else if (item.asyncOptions) {
          item.options = await item.asyncOptions()
        }
      }
    }
    find(columns.value)
    selectParams.value = getSchema(columns.value).sort((a, b) => (b.sortIndex || 0) - (a.sortIndex || 0))
  }

  initColumn()
  watch(
    () => props.columns,
    (val) => {
      columns.value = deepClone(val)

      initColumn()
    }
  )
  return {
    columns,
    selectParams,
  }
}
export function getFilterFromColumn(a: ColumnItem) {
  const options = a.filter?.options || a.options
  const item: ParamsItem = deepClone(a.filter) as ParamsItem
  if (!item.prop) {
    item.prop = a.prop
  }
  // label可能传空字符串
  if (typeof item.label == "undefined") {
    item.label = a.label
  }
  if (!item.options && options) {
    item.options = options
  }
  if (!item.asyncOptions && a.asyncOptions) {
    item.asyncOptions = a.asyncOptions
  }
  return item
}
