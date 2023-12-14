# 属性

<div>
    <h2>CurdTable属性</h2>
    <br/>
    <el-table :data="tableData1">
        <el-table-column prop="name" label="属性名" width="180">
        </el-table-column>
        <el-table-column prop="info" label="说明" width="180" />
        <el-table-column prop="type" label="类型">
        </el-table-column>
        <el-table-column prop="default" label="默认值" />
    </el-table>
    <h2>CurdTable 方法</h2>
    <el-table :data="tableData2">
        <el-table-column prop="name" label="属性名" width="180" />
        <el-table-column prop="info" label="说明" width="180" />
        <el-table-column prop="type" label="类型" />
        <el-table-column prop="default" label="默认值" />
    </el-table>
    <h2>Column 属性</h2>
    <el-table :data="tableData3">
        <el-table-column prop="name" label="属性名" width="180" />
        <el-table-column prop="info" label="说明" width="180" />
        <el-table-column prop="type" label="类型" />
        <el-table-column prop="default" label="默认值" />
    </el-table>
     <h2>options 属性</h2>
    <el-table :data="tableData4">
        <el-table-column prop="name" label="属性名" width="180" />
        <el-table-column prop="info" label="说明" width="180" />
        <el-table-column prop="type" label="类型">
            <template #="{row}">
                <el-popover
                    v-if="row.name=='type'"
                    placement="top-start"
                    :width="200"
                    trigger="hover"
                >
                    <template #default>
                        "input" | "select" | "radio" | "checkbox" | "input-number" | "switch" | "file" | "date-picker" | "time-picker" | "color-picker" | "value"
                    </template>
                    <template #reference>
                    <el-button class="m-2" round  link :icon="Warning" >emun</el-button>
                    </template>
                </el-popover>
            </template>
        </el-table-column>
        <el-table-column prop="default" label="默认值" />
    </el-table>
  </div>

<script lang="ts" setup>
    import {Warning} from '@element-plus/icons-vue'
    const tableData1 = [
        {
            name: 'data',
            info:"表格的数据"
        },
        {
            name: "columns",
            info:"表格列模型"
        },
        {
            name: "pageOptions",
        },
        {
            name: "option",
            info:"公共的参数配置"
        },
    ]
    const tableData2 = [
        {
            name: "selectionChange",
            info: "列多选监听事件"
        },
        {
            name: "row-click"
        },
        {
            name: "fetchData",
            info:"调用接口获取数据",
        },
        {
            name: "fetchCreate",
            info:"自定义创建函数",
        },
        {
            name: "fetchEdit",
            info:"自定义编辑函数",
        },
        {
            name: "fetchRemove",
            info:"自定义删除函数",
        },
    ]
    const tableData3 = [
        {
            name: "prop",
            info: "字段名称，对应列内容的字段名"
        },
        {
            name: "label",
            info: "显示的标题",
        },
        {
            name: "type",
            info: "对应列的类型"
        },
        {
            name: "hidden"
        },
        {
            name: "neverShow"
        },
        {
            name: "children"
        },
        {
            name: "options"
        },
        {
            name: "asyncOptions"
        },
        {
            name: "eventObject"
        },
        {
            name: "form"
        },
        {
            name: "filter"
        },
        {
            name: "empty"
        },
        {
            name: "detail"
        },
        {
            name: "value"
        },
        {
            name: "copy",
            info: "对某一列的单元格的值进行复制"
        },
         {
            name: "vHtml",
            info: "当前列是否v-html渲染"
        },
         {
            name: "header"
        },
        {
            name: "className"
        },
        {
            name: "labelClassName"
        },
        {
            name: "property"
        },
        {
            name: "props"
        },
        {
            name: "width"
        },
        {
            name: "minWidth"
        },
        {
            name: "renderHeader"
        },
        {
            name: "sortable"
        },
        {
            name: "sortMethod"
        },
        {
            name: "sortBy"
        },
        {
            name: "resizable"
        },
        {
            name: "columnKey"
        },
        {
            name: "rawColumnKey"
        },
        {
            name: "align",
            info: "对齐方式",
        },
        {
            name: "headerAlign"
        },
        {
            name: "showTooltipWhenOverflow"
        },
        {
            name: "showOverflowTooltip",
            info: "当内容过长被隐藏时显示 tooltip",
        },
        {
            name: "fixed",
            info: "列是否固定在左侧或者右侧。 true 表示固定在左侧"
        },
        {
            name: "formatter",
            info: "用来格式化内容",
        },
        {
            name: "selectable",
            info: "仅对 type=selection 的列有效，类型为 Function，Function 的返回值用来决定这一行的 CheckBox 是否可以勾选"
        },
        {
            name: "reserveSelection"
        },
        {
            name: "filterMethod"
        },
        {
            name: "filteredValue"
        },
        {
            name: "filters"
        },
        {
            name: "filterPlacement"
        },
        {
            name: "filterMultiple"
        },
        {
            name: "index"
        },

        {
            name: "sortOrders"
        },
        {
            name: "renderCell"
        },
        {
            name: "colSpan"
        },
        {
            name: "rowSpan"
        },
        {
            name: "level"
        },
        {
            name: "filterable"
        },
        {
            name: "order"
        },
        {
            name: "isColumnGroup"
        },
        {
            name: "isSubColumn"
        },
        {
            name: "columns"
        },
        {
            name: "getColumnIndex"
        },
        {
            name: "no"
        },
        {
            name: "filterOpened"
        },
        
    ]

    const tableData4 = [
        {
            name: "operationWidth",
            info: "操作列宽度",
        },
        {
            name: "operationBtnTitle",
            info: "操作列下拉按钮标题"
        },
        {
            name: "hideMenu",
            info: "是否隐藏右侧工具菜单",
        },
        {
            name: "hideMenuAdd",
            info: "是否隐藏菜单中添加按钮",
        },
        {
            name: "hideMenuRight",
            info: "是否隐藏菜单右侧",
        },
         {
            name: "hideOperation",
            info: "是否隐藏操作列",
        },
        {
            name: "hideOperationEdit",
            info: "是否隐藏操作列中的编辑按钮",
        },
        {
            name: "hideOperationDetail",
            info: "是否隐藏操作列中的详情按钮",
        },
        {
            name: "hideOperationDelete",
            info: "是否隐藏操作列中的删除按钮",
        },
        {
            name: "hidePage",
            info: "是否隐藏分页器",
        },
         {
            name: "excelTitle",
            info: "导出表格的文件名",
        },
        {
            name: "selectionProps"
        },
        {
            name: "downloadMod"
        },
        {
            name: "pageProps"
        },
        {
            name: "filterVisible"
        },
         {
            name: "customActivatedFetch",
            info: "自定义执行onActivated内部的fetch执行，完全交由父组件控制 false 是自动的，true 开发者自己控制",
        },
        {
            name: "autoload"
        },
        {
            name: "menuEvent"
        },
        {
            name: "filterAttrs"
        },
        {
            name: "formAttrs"
        },
         {
            name: "editOptions"
        },
        {
            name: "createOptions"
        },
    ]
</script>

<style lang="scss" scoped>
    :deep(table){
        margin:0;
    }
</style>
