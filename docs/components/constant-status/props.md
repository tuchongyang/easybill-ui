## 属性

  <div>
    <div style="font-weight:600;">ConstantStatus 属性</div>
    <br/>
    <el-table :data="tableData1">
        <el-table-column prop="name" label="属性名" width="180" />
        <el-table-column prop="info" label="说明" width="180" />
        <el-table-column prop="type" label="类型" />
        <el-table-column prop="default" label="默认值" />
    </el-table>
    <br/>
    <hr/>
    <div style="font-weight:600;">Options 属性</div>
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
            name: 'value',
        },
        {
            name: "options",
        }
    ]
    const tableData2 = [
        {
            name: 'label',
        },
        {
            name: "value",
        },
        {
            name: "disabled",
        },
        {
            name: "type",
        },
        {
            name: "icon",
        },
        {
            name: "hit",
        },
        {
            name: "color",
        },
        {
            name: "size",
        },
        {
            name: "effect",
        },
        {
            name: "round",
        },
        {
            name: "border",
        },
        {
            name: "className",
        },
        {
            name: "iconClass",
        },
        {
            name: "dot",
        },
        {
            name: "tooltip",
        },
        {
            name: "html",
        }
    ]
</script>

<style lang="scss" scoped>
    :deep(table){
        margin:0;
    }
</style>
