# 属性

  <div>
    <h2>FormDialog 属性</h2>
    <br/>
    <el-table :data="tableData1">
        <el-table-column prop="name" label="属性名" width="180" />
        <el-table-column prop="info" label="说明" width="180" />
        <el-table-column prop="type" label="类型" />
        <el-table-column prop="default" label="默认值" />
    </el-table>
    <br/>
    <hr/>
    <h2>formSchema 属性</h2>
    <el-table :data="tableData2">
        <el-table-column prop="name" label="属性名" width="180" />
        <el-table-column prop="info" label="说明" width="180" />
        <el-table-column prop="type" label="类型" />
        <el-table-column prop="default" label="默认值" />
    </el-table>
    <h2>formItem 属性</h2>
    <el-table :data="tableData3">
        <el-table-column prop="name" label="属性名" width="180" />
        <el-table-column prop="info" label="说明" width="180" />
        <el-table-column prop="type" label="类型" />
        <el-table-column prop="default" label="默认值" />
    </el-table>
    
  </div>

<script lang="ts" setup>
    const tableData1 = [
        {
            name: 'title',
            info: "FormDialog标题",
            type: "string",
            default: '" "'
        },
        {
            name: 'width',
            info: "FormDialog宽度",
            type: "string | number",
        },
        {
            name: "stepSchema",
            info: "步骤表单项",
            type: "Array"
        },
        {
            name: "formSchema",
            info: "表单项",
            type: "Object"
        },
        {
            name: "fields",
            info: "表单默认值，一般编辑时传入",
            type: "Fields"
        },
        {
            name: "setForm",
            info: "",
            type: "Function",
            default: "null"
        },
        {
            name: "handleOk",
            info: "点击确定后触发",
            type: "Function",
            default: "null",
        },
        {
            name: "stepProps",
        }
    ]
    const tableData2 = [
        {
            name:"formItem"
        },
        {
            name:"rules"
        },
        {
            name: 'getRules',
        },
        {
            name: "labelPosition",
        },
        {
            name: "gutter",
        },
        {
            name: "labelWidth",
        },
        {
            name: "inline",
        },
        {
            name: "inlineMessage",
        },
        {
            name: "statusIcon",
        },
        {
            name: "showMessage",
        },
        {
            name: "size",
        },
        {
            name: "disabled",
        },
        {
            name: "validateOnRuleChange",
        },
        {
            name: "hideRequiredAsterisk",
        },
        {
            name: "scrollToError",
        },
    ]
    const tableData3 = [
        {
            name:"prop"
        },
        {
            name:"label"
        },
        {
            name: 'type',
        },
        {
            name: "value",
        },
        {
            name: "options",
        },
        {
            name: "asyncOptions",
        },
        {
            name: "loading",
        },
        {
            name: "hidden",
        },
        {
            name: "rules",
        },
        {
            name: "props",
        },
        {
            name: "formItemProps",
        },
        {
            name: "labelWidth",
        },
        {
            name: "span",
        },
        {
            name: "disabled",
        },
        {
            name: "tooltip",
        },
        {
            name: "autoload",
        },
        {
            name: "prefix",
        },
        {
            name: "suffix",
        },
        {
            name: "empty",
        },
        {
            name: "sortIndex",
        },
    ]
</script>

<style lang="scss" scoped>
    :deep(table){
        margin:0;
    }
</style>
