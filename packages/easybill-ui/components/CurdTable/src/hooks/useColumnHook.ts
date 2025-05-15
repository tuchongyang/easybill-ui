import { provide, type Ref, ref, shallowRef } from "vue"
import type { ParamsItem } from "../../../TableFilter"
import { deepClone } from "../../utils/common"
import type { ColumnItem } from "../types"

export function useColumnHook<T>() {
  const columns: Ref<Array<ColumnItem<T>>> = shallowRef([])

  provide("columns", columns)
  const getSchema = (colss: ColumnItem<T>[]) => {
    const result: Array<ParamsItem> = []
    const getFilter = (cols: Array<ColumnItem<T>>) => {
      for (const i in cols) {
        const a = deepClone(cols[i])
        if (a.children && a.children.length) {
          getFilter(a.children)
          continue
        }
        if (a.filter) {
          result.push(getFilterFromColumn<T>(a))
        }
      }
    }
    getFilter(colss)
    return result
  }
  const selectParams = ref<ParamsItem[]>([])
  // selectParams.value = getSchema()
  provide("selectParams", selectParams)
  async function initColumn(propsColumns: ColumnItem<T>[]) {
    const cs = deepClone(propsColumns)
    columns.value = cs //.filter((a) => !a.hidden)
    const find = async (cs: ColumnItem<T>[]) => {
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

  return {
    tableColumns: columns,
    selectParams,
    initColumn,
  }
}
export function getFilterFromColumn<T>(a: ColumnItem<T>) {
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
  if (!item.eventObject && a.eventObject) {
    item.eventObject = a.eventObject
  }
  return item
}
