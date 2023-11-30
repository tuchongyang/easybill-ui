# 属性

  <div>
    <h2>DetailInfo 属性</h2>
    <br/>
    <el-table :data="tableData1">
        <el-table-column prop="name" label="属性名" width="180" />
        <el-table-column prop="info" label="说明" width="180" />
        <el-table-column prop="type" label="类型" />
        <el-table-column prop="default" label="默认值" />
    </el-table>
    <br/>
    <hr/>
    <h2>data 属性</h2>
    <el-table :data="tableData2">
        <el-table-column prop="name" label="属性名" width="180" />
        <el-table-column prop="info" label="说明" width="180" />
        <el-table-column prop="type" label="类型" />
        <el-table-column prop="default" label="默认值" />
    </el-table>
  </div>

<script lang="ts" setup>
    const tableData1 = [
        {
            name: 'data',
        },
        {
            name: "title",
        },
        {
            name: "showType",
        },
        {
            name: "labelWidth",
        },
        {
            name: "labelPosition",
        }
    ]
    const tableData2 = [
        {
            name:"label"
        },
        {
            name:"value"
        },
        {
            name: 'span',
        },
        {
            name: "options",
        },
        {
            name: "type",
        },
        {
            name: "labelWidth",
        },
        {
            name: "props",
        },
        {
            name: "slot",
        },
        {
            name: "tooltip",
        },
        {
            name: "labelPosition",
        },
        {
            name: "labelStyle",
        },
        {
            name: "showOverflowTooltip",
        },
        {
            name: "rawContent",
        },
        {
            name: "hidden",
        },
    ]
</script>

<style lang="scss" scoped>
    :deep(table){
        margin:0;
    }
</style>
