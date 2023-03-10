<template>
  <div class="table-container">
    <STableFilter v-if="selectParams.length && filterVisible" ref="sTableFilter" :list-query="search" @search="onSearch" />
    <div v-if="!option.hideMenu" class="table-control">
      <div class="btn-control">
        <el-button v-if="!option.hideMenuAdd && props.fetchCreate" type="primary" :icon="Plus" @click="create()"> 添加</el-button>
        <slot name="menuLeft"></slot>
      </div>
      <div class="min-control">
        <slot name="menuRight"></slot>
        <STableMenu v-if="!option.hideMenuRight" ref="tableMenuRef" :filter-visible="filterVisible" @operation="onMenuOption" />
      </div>
    </div>
    <el-table ref="tableRef" v-loading="loading" stripe :data="list" scrollbar-always-on v-bind="{ ...$attrs, ...tableAttrs }" @row-click="onRowClick" @selection-change="selectionChange">
      <slot name="default"></slot>
      <el-table-column v-if="$attrs.index !== undefined" type="index" />
      <el-table-column v-if="$attrs.selection !== undefined && $attrs.selection !== false" type="selection" v-bind="option.selectionProps" />
      <template v-for="item in columns" :key="item.label">
        <el-table-column v-if="item.children && item.children.length" :key="item.prop" :label="item.label">
          <template v-for="sub in item.children" :key="sub.prop">
            <STableItem :ref="(el) => (tableItemRefs[sub.prop] = el)" :is-slot="!!$slots[sub.prop]" :is-slot-header="!!$slots[sub.prop + 'Header']" :schema="sub" :option="props.option" @search="onItemChange">
              <template #default="scope1">
                <slot :name="sub.prop" v-bind="scope1"></slot>
              </template>
              <template #header>
                <slot :name="sub.prop + 'Header'"></slot>
              </template>
            </STableItem>
          </template>
        </el-table-column>
        <template v-else>
          <STableItem :ref="(el) => (tableItemRefs[item.prop] = el)" :schema="item" :is-slot="!!$slots[item.prop]" :is-slot-header="!!$slots[item.prop + 'Header']" :option="props.option" @search="onItemChange">
            <template #default="scope">
              <slot :name="item.prop" v-bind="scope"></slot>
            </template>
            <template #header>
              <slot :name="item.prop + 'Header'"></slot>
            </template>
          </STableItem>
        </template>
      </template>
      <el-table-column v-if="!option.hideOperation" label="操作" fixed="right" :width="option.operationWidth || '200'" align="left">
        <template #default="scope">
          <slot name="operation" v-bind="scope"></slot>
          <template v-if="!$slots.operationBtn">
            <el-button v-if="!option.hideOperationEdit && props.fetchEdit" type="primary" link :icon="Edit" @click.stop="create(scope.row)">编辑 </el-button>
            <el-button v-if="!option.hideOperationDetail" type="primary" link :icon="Document" @click.stop="detail(scope.row)">详情 </el-button>
            <el-button v-if="!option.hideOperationDelete && props.fetchRemove" type="primary" link style="color: #ff0000" :icon="Delete" @click.stop="startremove(scope)">删除 </el-button>
          </template>
          <template v-else>
            <el-dropdown trigger="click" popper-class="curd-table-dropdown-menu">
              <el-button type="primary" link>
                {{ props.option.operationBtnTitle || "更多" }}
                <el-icon>
                  <ArrowDown />
                </el-icon>
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <slot name="operationBtn" v-bind="scope"></slot>
                  <el-dropdown-item v-if="!option.hideOperationEdit && props.fetchEdit">
                    <el-button type="primary" link @click.stop="create(scope.row)">编辑</el-button>
                  </el-dropdown-item>
                  <el-dropdown-item v-if="!option.hideOperationDetail">
                    <el-button type="primary" link @click.stop="detail(scope.row)">详情</el-button>
                  </el-dropdown-item>
                  <el-dropdown-item v-if="!option.hideOperationDelete && props.fetchRemove">
                    <el-button type="primary" link style="color: #ff0000" @click.stop="startremove(scope)">删除 </el-button>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
        </template>
      </el-table-column>
      <template #empty>
        <slot name="empty"></slot>
        <el-empty v-if="!$slots.empty" :image-size="30" />
      </template>
    </el-table>
    <STableSinglePage v-if="total == -1" v-model:current-page="listQuery.pageIndex" v-model:page-size="listQuery.pageSize" :total="total" :fetch-data="fetchData" :list="list" @current-change="fetchData" />
    <el-pagination
      v-if="total != -1 && !option.hidePage"
      v-model:current-page="listQuery.pageIndex"
      v-model:page-size="listQuery.pageSize"
      class="pagination"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      v-bind="option.pageProps"
      @current-change="fetchData"
      @size-change="fetchData"
    >
      <ul class="el-pager">
        <li class="is-active number">{{ listQuery.pageIndex }}</li>
      </ul>
    </el-pagination>
    <STableDetail ref="STableDetailRef" />
  </div>
</template>
<script lang="ts">
export default {
  name: "CurdTable",
}
</script>
<script lang="ts" setup>
import { computed, ref, reactive, watch, onActivated, getCurrentInstance, provide, PropType, Ref } from "vue"
import STableItem from "./STableItem.vue"
import STableFilter from "./STableFilter.vue"
import STableMenu from "./STableMenu.vue"
import STableDetail from "./STableDetail.vue"
import STableSinglePage from "./STableSinglePage.vue"
import { deepClone } from "../utils/common"
import { Edit, Delete, Plus, ArrowDown, Document } from "@element-plus/icons-vue"
import { ColumnItem, PropOption, TableAttr, FetchDataOpt } from "./types"
import TableFilter, { ListQuery } from "../../TableFilter"
import FormDialog from "../../FormDialog"
import { ElMessageBox, ElMessage, ElLoading, ElNotification, ElTable, dayjs } from "element-plus"
import { FormItem, FormSchema, Fields } from "../../CurdForm"
import { useColumnHook } from "./hooks/useColumnHook"
import { useGlobalConfig } from "../../../utils/hooks/useGlobalConfig"

const props = defineProps({
  // 表格的数据
  data: {
    type: Array as PropType<Array<any>>,
    default() {
      return []
    },
  },
  // 表格列模型
  columns: {
    type: Array as PropType<Array<ColumnItem>>,
    default() {
      return []
    },
  },
  pageOptions: {
    type: Object,
    default() {
      return {
        pageIndex: 1,
        pageSize: 10,
      }
    },
  },
  // 调用接口获取数据
  fetchData: {
    type: Function,
    default: null,
  },
  // 自定义创建函数
  fetchCreate: {
    type: Function,
    default: null,
  },
  // 自定义编辑函数
  fetchEdit: {
    type: Function,
    default: null,
  },
  // 自定义删除函数
  fetchRemove: {
    type: Function,
    default: null,
  },
  // 专门配置一些公共的参数
  option: {
    type: Object as PropType<PropOption>,
    default() {
      return {
        operationWidth: 200,
        operationBtnTitle: "更多",
        hideMenu: false, // 是否隐藏右侧工具菜单
        hideMenuAdd: false, // 是否隐藏菜单中添加按钮
        hideMenuRight: false, // 是否隐藏菜单右侧
        hideOperation: false, // 是否隐藏操作列
        hideOperationEdit: false, // 是否隐藏操作列中的编辑按钮
        hideOperationDetail: false, // 是否隐藏操作列中的详情按钮
        hideOperationDelete: false, // 是否隐藏操作列中的删除按钮
        hidePage: false, // 是否隐藏分页器
        excelTitle: "", //导出表格的文件名
        selectionProps: null,
        downloadMod: false,
        pageProps: null,
        filterVisible: true,
        customActivatedFetch: false, // 自定义执行onActivated内部的fetch执行，完全交由父组件控制 false 是自动的，true 开发者自己控制
      }
    },
  },
})
const emits = defineEmits(["selectionChange", "row-click"])
const list = ref(props.data)
watch(
  () => props.data,
  (val) => {
    list.value = val
  },
  { deep: true }
)
const globalConfig = useGlobalConfig()
const tableAttrs: Ref<TableAttr> = ref({ size: globalConfig.value.size || "default" })
const listQuery = reactive({
  pageIndex: 1,
  pageSize: props.pageOptions?.pageSize || 10,
})

// 调用接口获取数据
const setPageIndex = (pageIndex: number) => {
  listQuery.pageIndex = pageIndex
}
const search = reactive<ListQuery>(
  (() => {
    const { pageIndex, pageSize, total, ...args } = deepClone(props.pageOptions || {})
    return args
  })()
)
provide("search", search)
provide("option", props.option)
const filterVisible = ref(typeof props.option?.filterVisible == "undefined" ? true : props.option?.filterVisible)
const loading = ref(false)
const listTotal = ref(0)
const setTotal = (num: number) => {
  listTotal.value = num
}
// 总数量由外面决定
const total = computed(() => listTotal.value || (typeof props.pageOptions.total == "undefined" ? props.data.length || 0 : props.pageOptions.total))
const fetchData = async (opt?: FetchDataOpt) => {
  if (props.fetchData) {
    if (!(opt && opt.showLoading == false)) {
      loading.value = true
    }
    if (opt && opt.resetPageIndex) {
      listQuery.pageIndex = 1
    }
    const optQuery = (opt && opt.query) || {}
    // 外面指定了筛选条件
    for (let i in optQuery) {
      search[i] = optQuery[i]
      // 更新tableFilter组件
      sTableFilter.value?.setItem(i)
      tableItemRefs.value[i]?.search && tableItemRefs.value[i].search({ listQuery: search })
    }
    const params: Fields = { ...listQuery, ...search }
    const fetchDataRes = await props.fetchData({ listQuery: params }).finally(() => {
      loading.value = false
    })
    if (fetchDataRes && typeof fetchDataRes.total !== "undefined") {
      listTotal.value = fetchDataRes.total
    }
    if (fetchDataRes && typeof fetchDataRes.list !== "undefined") {
      list.value = fetchDataRes.list
    }
  }
}
const tableItemRefs: Ref<Record<string, any>> = ref({})
// 搜索
const onSearch = (params?: ListQuery) => {
  if (params) {
    for (let i in params) {
      search[i] = params[i]
    }
  }
  listQuery.pageIndex = 1
  fetchData()
  for (let i in tableItemRefs.value) {
    tableItemRefs.value[i]?.search && tableItemRefs.value[i].search({ listQuery: params })
  }
}
const sTableFilter: Ref<InstanceType<typeof TableFilter> | undefined> = ref()
const onItemChange = (prop: string, value: string, filter: any) => {
  sTableFilter.value?.setItem(prop, filter)
  search[prop] = value

  listQuery.pageIndex = 1
  fetchData()
}

let hasInit = false
onActivated(() => {
  // props.option?.customActivatedFetch为true时，参考/system/partner/account/vendor写法
  if (!props.option?.customActivatedFetch && hasInit) {
    fetchData()
  } else {
    hasInit = true
  }
})
fetchData()
// 组装columns
const { columns, selectParams } = useColumnHook(props)
// 菜单点击事件
const onMenuOption = (option: string, val: string) => {
  switch (option) {
    case "refresh":
      fetchData()
      break
    case "searchToggle":
      filterVisible.value = !filterVisible.value
      break
    case "size": {
      if (val) {
        tableAttrs.value.size = val
      }
      break
    }
    case "export": {
      import("../utils/Export2Excel").then((excel) => {
        const getTableValue = (val: string | number, schema: ColumnItem, row: any) => {
          if (schema.options) {
            const vals = String(val).split(",")
            const curs = vals.map((item) => {
              const cur = schema.options?.find((a) => a.value == item)
              return (cur && cur.label) || cur
            })
            return curs.join(",")
          }
          if (schema.formatter) {
            const result = schema.formatter(row)
            return result === "--" ? "" : result
          }
          return val
        }
        const data = list.value.map((a) => columns.value.filter((b) => !b.hidden && !b.neverShow).map((b) => getTableValue(a[b.prop], b, a)))
        excel.export_json_to_excel({
          header: columns.value.filter((b) => !b.hidden && !b.neverShow).map((a) => a.label),
          data,
          filename: props.option.excelTitle || "导出数据",
        })
        ElMessage.success("导出成功!")
      })
      break
    }
  }
}

// 添加/编辑
const create = (row?: any) => {
  const formSchema: FormSchema = {
    formItem: [],
    rules: {},
    labelWidth: "110px",
  }
  const setItem = (a: ColumnItem) => {
    if (!a.form) return
    let formValue: FormItem
    if (a.form instanceof Function) {
      formValue = a.form(a, row)
    } else {
      formValue = a.form
    }
    const { rules, ...formProps } = formValue
    const item: FormItem = {
      span: 24,
      label: a.label,
      prop: a.prop,
      options: a.options,
      asyncOptions: a.asyncOptions,
      ...formProps,
    }
    formSchema.formItem.push(item)
    if (formValue && formValue.rules) {
      if (!formSchema.rules) formSchema.rules = {}
      formSchema.rules[a.prop] = rules
    }
  }
  columns.value.map((a) => {
    if (a.children && a.children.length) {
      for (let i in a.children) {
        a.children[i].form && setItem(a.children[i])
      }
    } else {
      a.form && setItem(a)
    }
  })
  FormDialog.show({
    title: row ? "编辑" : "添加",
    formSchema: formSchema,
    fields: row,
    width: 600,
    handleOk: async (modelRef: Fields) => {
      const fun = row ? "fetchEdit" : "fetchCreate"
      return await (props[fun] && props[fun](modelRef, row))
    },
  })
}
const instance = getCurrentInstance()
const startremove = (scope: any) => {
  ElMessageBox.confirm("确认删除当前数据吗", "提示", {
    type: "warning",
    cancelButtonText: "取消",
    confirmButtonText: "确定",
  }).then(async () => {
    const loading = ElLoading.service({ fullscreen: true })
    await (props.fetchRemove && props.fetchRemove(scope.row, scope.$index)).finally(() => {
      loading.close()
    })
    ElMessage({
      type: "success",
      message: "删除成功",
    })
  })
}

// 详情
const STableDetailRef = ref()
const detail = (row: any) => {
  STableDetailRef.value.open({ data: row, columns: columns.value })
}
// 行点击事件
const onRowClick = (row: any, column: any, event: Event) => {
  if (instance && typeof instance.attrs["click-row-to-view"] !== "undefined") {
    detail(row)
  }
  emits("row-click", row, column, event)
}
// 多选事件
const selectionChange = (rows: any) => {
  emits("selectionChange", rows)
}
const tableRef = ref<any>() // 表格的实例

const toggleRowSelection = (row: any, isChecked?: boolean) => {
  setTimeout(() => {
    tableRef.value?.toggleRowSelection(row, isChecked)
  })
}
const tableMenuRef = ref()
defineExpose({
  fetchData,
  tableRef,
  tableFilterRef: sTableFilter,
  tableMenuRef,
  toggleRowSelection,
  setPageIndex,
  setTotal,
  search,
  getEl() {
    return instance?.proxy?.$el
  },
})
</script>
