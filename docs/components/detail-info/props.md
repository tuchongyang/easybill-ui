# 属性

  <div>
    <h2>DetailInfo 属性</h2>
    <br/>
    <el-table :data="tableData1">
        <el-table-column prop="name" label="属性名" width="180" />
        <el-table-column prop="info" label="说明" width="180" />
        <el-table-column prop="type" label="类型">
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
        <el-table-column prop="default" label="默认值"/>
    </el-table>
    <br/>
    <hr/>
    <h2>data 属性</h2>
    <el-table :data="tableData2">
        <el-table-column prop="name" label="属性名" width="180" />
        <el-table-column prop="info" label="说明" width="180" />
        <el-table-column prop="type" label="类型">
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
            name: 'data',
            info: "绑定的数据源",
            type: "Array",
            default: "[ ]"
        },
        {
            name: "title",
            info: "DetailInfo的标题",
            type: "String",
            default: '""',
        },
        {
            name: "show-type",
            info: "显示风格",
            type: "String",
            enum: '"table" | "normal" | "card" ',
            default: '"normal"',
        },
        {
            name: "labelWidth",
            info: '内容标题的宽度',
            type: 'Number | String',
            default: '""'

        },
        {
            name: "labelPosition",
        },
        {
            name: "shadow",
            info: '当show-type为card时，可以生成阴影',
        }
    ]
    const tableData2 = [
        {
            name:"label",
            info: '标签的标题',
            type: 'String',
            default: '""'

        },
        {
            name:"value",
            info: '标签的内容',
            type: 'Any',
            default: '——',

        },
        {
            name: 'span',
            info: '当前项占的宽度，以24分栏',
            type: 'Number',
            default: '24'
        },
        {
            name: "options",
            info: '当前标签的选项，里面包含的图标、颜色信息会自动显示',
            type: 'Array'
        },
        {
            name: "type",
            info: '标签内容的类型',
            type: 'String ',
            enum: '"image" | "el-image" | ReturnType<typeof defineComponent>'
        },
        {
            name: "labelWidth",
            info: '标签的标题宽度',
            type: 'Number | String'
        },
        {
            name: "props",
            info: '标签内容的属性'
        },
        {
            name: "slot",
            info: '标签内容插槽名',
            type: 'String'
        },
        {
            name: "tooltip",
            info: '标签提示框',
            type: 'String '
        },
        {
            name: "labelPosition",
            info: '标签标题的位置',
            type: 'String',
            enum: '"left" | "right" | "center"'
        },
        {
            name: "labelStyle",
            info: '标签标题的样式'
        },
        {
            name: "showOverflowTooltip",
            info: '是否隐藏额外内容并在单元格悬停时使用 Tooltip 显示它们。这将影响全部列的展示。',
            type: 'Boolean | String ',
            enum: 'Partial<ElTooltipProps>'
        },
        {
            name: "rawContent",
            info: '使标签能够解析html语法',
            type: 'Boolean'
        },
        {
            name: "hidden",
            info: '隐藏标签',
            type: 'Boolean | ((data: DetailDataItem[]) => boolean)'
        },
    ]
</script>

<style lang="scss" scoped>
    :deep(table){
        margin:0;
    }
</style>
