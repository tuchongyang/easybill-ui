## 属性

  <div>
    <div style="font-weight:600;">ConstantStatus 属性</div>
    <br/>
    <el-table :data="tableData1">
        <el-table-column prop="name" label="属性名" width="150" />
        <el-table-column prop="info" label="说明" width="180" />
        <el-table-column prop="type" label="类型" width="180"/>
        <el-table-column prop="default" label="默认值" />
    </el-table>
    <br/>
    <hr/>
    <div style="font-weight:600;">Options 属性</div>
    <el-table :data="tableData2">
        <el-table-column prop="name" label="属性名" width="150" />
        <el-table-column prop="info" label="说明" width="180" />
        <el-table-column prop="type" label="类型"  width="180">
            <template #="{row}">
                <el-popover
                    v-if="Object.keys(row).findIndex((item)=>item=='enum')!=-1"
                    placement="bottom-start"
                    :width="200"
                    trigger="click"
                >
                    <template #default>
                        <span>{{row.enum}}</span>
                    </template>
                    <template #reference>
                        <div>
                            <span>{{row.type}}</span>
                            <el-button class="m-2" round  link >| enum<el-icon class="el-icon--right"><Warning /></el-icon></el-button>
                        </div>
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
            name: 'value',
            info: "绑定值",
            type: "String | Number | Boolean",
            default: "undefined",
        },
        {
            name: "options",
            info: "配置项",
            type: "Array",
            default: "[ ]"
        }
    ]
    const tableData2 = [
        {
            name: 'label',
            info: "显示的内容",
            type: "String",
        },
        {
            name: "value",
            info: "每项对应的绑定值",
            type: "String | Number |Boolean"
        },
        {
            name: "disabled",
            info: "",
            type: "Boolean"

        },
        {
            name: "type",
            info: "ConstantStatus 的类型",
            type: 'String',
            enum: `"default" | "primary" | "success" | "info" | "warning" | "danger" | "blue" | "blue-dark" | "yellow" | "blueness" | "red-purple" | "error"`
        },
        {
            name: "icon",
            info: "图标",
            type: "Any"
        },
        {
            name: "hit",
            info: "让普通风格的 ConstantStatus 有边框描边 (没有dot、effect属性时)",
            type: "Boolean",
            default: "false"
        },
        {
            name: "color",
            info: "背景色",
            type: "String",
        },
        {
            name: "size",
            info: "尺寸",
            type: "String",
            enum: `"large" | "default" | "small"`
        },
        {
            name: "effect",
            info: "风格",
            type: "String",
            enum: `"dark" | "light" | "plain"`
        },
        {
            name: "round",
            info: "是否为圆形",
            type: "Boolean"
        },
        {
            name: "border",
            info: "只要有border属性，ConstantStatus就没有边框及背景",
            type: "Boolean",
        },
        {
            name: "className",
            info: "给 ConstantStatus 添加类名",
            type: "String"
        },
        {
            name: "iconClass",
            info: "",
            type: "String | String[]"
        },
        {
            name: "dot",
            info: "是否显示dot风格",
            type: "Boolean",
        },
        {
            name: "tooltip",
            info: "",
            type: "Any",
        },
        {
            name: "html",
            info: "让 label 显示的内容能够解析 html",
            type: "String"
        }
    ]
</script>

<style lang="scss" scoped>
    :deep(table){
        margin:0;
    }
</style>
