# 属性

<div>
    <h2 style="font-weight:600;">CurdTable 属性</h2>
    <br/>
    <el-table :data="tableData1">
        <el-table-column prop="name" label="属性名" width="180" />
        <el-table-column prop="info" label="说明" width="180" />
        <el-table-column prop="type" label="类型" />
        <el-table-column prop="default" label="默认值" />
    </el-table>
    <br/>
    <hr/>
  </div>

<script lang="ts" setup>
    const tableData1 = [
        {
            name: 'formSchema',
        },
        {
            name: "fields",
        },
        {
            name: "modelValue",
        },
        {
            name: "extendContext",
        },
    ]
</script>

<style lang="scss" scoped>
    :deep(table){
        margin:0;
    }
</style>
