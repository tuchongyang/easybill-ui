# 属性

<div>
    <h2>CurdForm 属性</h2>
    <br/>
    <el-table :data="tableData1">
        <el-table-column prop="name" label="属性名" width="180">
        </el-table-column>
        <el-table-column prop="info" label="说明" width="180" />
        <el-table-column prop="type" label="类型">
        </el-table-column>
        <el-table-column prop="default" label="默认值" />
    </el-table>
    <h2>CurdForm 方法</h2>
    <el-table :data="tableData2">
        <el-table-column prop="name" label="属性名" width="180" />
        <el-table-column prop="info" label="说明" width="180" />
        <el-table-column prop="type" label="类型" />
        <el-table-column prop="default" label="默认值" />
    </el-table>
    <h2>formSchema 属性</h2>
    <el-table :data="tableData3">
        <el-table-column prop="name" label="属性名" width="180" />
        <el-table-column prop="info" label="说明" width="180" />
        <el-table-column prop="type" label="类型" />
        <el-table-column prop="default" label="默认值" />
    </el-table>
     <h2>formItem 属性</h2>
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
            name: 'formSchema',
            info: "动态验证表单配置"
        },
        {
            name: "fields",
        },
        {
            name: "modelValue / v-model",
        },
        {
            name: "extendContext",
        },
    ]
    const tableData2 = [
        {
            name: "update:modelValue"
        },
        {
            name: "change"
        }
    ]
    const tableData3 = [
        {
            name: "formItem"
        },
        {
            name: "rules"
        },
        {
            name: "getRules"
        },
        {
            name: "labelPosition"
        },
        {
            name: "gutter"
        },
        {
            name: "labelWidth"
        },
        {
            name: "inline"
        },
        {
            name: "inlineMessage"
        },
        {
            name: "statusIcon"
        },
        {
            name: "showMessage"
        },
        {
            name: "size"
        },
        {
            name: "disabled"
        },
        {
            name: "validateOnRuleChange"
        },
        {
            name: "hideRequiredAsterisk"
        },
        {
            name: "scrollToError"
        },
        
    ]

    const tableData4 = [
        {
            name: "prop"
        },
        {
            name: "label"
        },
        {
            name: "type",
            info:"表单项类型",
            type:""
        },
        {
            name: "value"
        },
        {
            name: "eventObject"
        },
         {
            name: "options"
        },
        {
            name: "asyncOptions"
        },
        {
            name: "loading"
        },
        {
            name: "hidden"
        },
        {
            name: "rules"
        },
         {
            name: "props"
        },
        {
            name: "formItemProps"
        },
        {
            name: "labelWidth"
        },
        {
            name: "span"
        },
        {
            name: "disabled"
        },
         {
            name: "tooltip"
        },
        {
            name: "autoload"
        },
        {
            name: "prefix"
        },
        {
            name: "suffix"
        },
        {
            name: "empty"
        },
         {
            name: "sortIndex"
        },
    ]
</script>

<style lang="scss" scoped>
    :deep(table){
        margin:0;
    }
</style>
