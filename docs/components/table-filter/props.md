# 属性

  <div>
    <h2>TableFilter 属性</h2>
    <br/>
    <el-table :data="tableData1">
        <el-table-column prop="name" label="属性名" width="180" />
        <el-table-column prop="info" label="说明" width="180" />
        <el-table-column prop="type" label="类型" />
        <el-table-column prop="default" label="默认值" />
    </el-table>
    <br/>
    <hr/>
    <h2>TableFilter 方法</h2>
    <el-table :data="tableData2">
        <el-table-column prop="name" label="方法名" width="180" />
        <el-table-column prop="info" label="说明" width="180" />
        <el-table-column prop="type" label="类型" />
        <el-table-column prop="default" label="默认值" />
    </el-table>
    <h2>schema 属性</h2>
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
            name: 'selectParams',
        },
        {
            name: "schema",
        },
        {
            name: "listQuery",
        },
        {
            name: "v-model / modelValue",
        },
        {
            name: "option",
        }
    ]
    const tableData2 = [
        {
            name:"search",
            info:"确认筛选项时触发",
            type:"Function"
        },
    ]
    const tableData3 = [
        {
            name:"type",
        },
        {
            name:"tableKey",
        },
        {
            name:"external",
        },
        {
            name:"all",
        },
        {
            name:"sortIndex",
            info:"排序，数字越大越靠前"
        },
        {
            name:"tagNames",
        },
        {
            name:"prop",
        },
        {
            name:"label",
        },
        {
            name:"value",
        },
        {
            name:"eventObject",
        },
        {
            name:"options",
        },
        {
            name:"asyncOptions",
        },
        {
            name:"loading",
        },
        {
            name:"hidden",
        },
        {
            name:"rules",
        },
        {
            name:"props",
        },
        {
            name:"formItemProps",
        },
        {
            name:"labelWidth",
        },
        {
            name:"span",
        },
        {
            name:"disabled",
        },
        {
            name:"tooltip",
        },
        {
            name:"autoload",
        },
        {
            name:"prefix",
        },
        {
            name:"suffix",
        },
         {
            name:"empty",
        },
        {
            name:"sortIndex",
        },
    ]
</script>

<style lang="scss" scoped>
    :deep(table){
        margin:0;
    }
</style>
