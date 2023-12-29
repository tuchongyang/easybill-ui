# 属性

<div>
    <h2>CurdForm 属性</h2>
    <br/>
    <el-table :data="tableData1">
        <el-table-column prop="name" label="属性名" width="180">
        </el-table-column>
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
                            <el-button class="m-2" round  link v-if="row.enum" >| enum<el-icon class="el-icon--right"><Warning /></el-icon></el-button>
                        </div>
                    </template>
                </el-popover>
                <el-popover
                    v-if="Object.keys(row).findIndex((item)=>item=='object')!=-1"
                    placement="bottom-start"
                    :width="200"
                    trigger="click"
                >
                    <template #default>
                        <span>{{row.object}}</span>
                    </template>
                    <template #reference>
                        <div>
                            <span>{{row.type}}</span>
                            <el-button class="m-2" round  link v-if="row.object" >object<el-icon class="el-icon--right"><Warning /></el-icon></el-button>
                        </div>
                    </template>
                </el-popover>
            </template>
        </el-table-column>
        <el-table-column prop="default" label="默认值" />
    </el-table>
    <h2>CurdForm 方法</h2>
    <el-table :data="tableData2">
        <el-table-column prop="name" label="属性名" width="180" />
        <el-table-column prop="info" label="说明" width="180" />
        <el-table-column prop="type" label="类型">
             <template #="{row}">
                <el-popover
                    v-if="Object.keys(row).findIndex((item)=>item=='func')!=-1"
                    placement="bottom-start"
                    :width="200"
                    trigger="click"
                >
                    <template #default>
                        <span>{{row.func}}</span>
                    </template>
                    <template #reference>
                        <div>
                            <span>{{row.type}}</span>
                            <el-button class="m-2" round  link v-if="row.func" >function<el-icon class="el-icon--right"><Warning /></el-icon></el-button>
                        </div>
                    </template>
                </el-popover>
            </template>
        </el-table-column>
        <el-table-column prop="default" label="默认值" />
    </el-table>
    <h2>formSchema 属性</h2>
    <el-table :data="tableData3">
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
                            <el-button class="m-2" round  link v-if="row.enum" >| enum<el-icon class="el-icon--right"><Warning /></el-icon></el-button>
                        </div>
                    </template>
                </el-popover>
                <el-popover
                    v-if="Object.keys(row).findIndex((item)=>item=='object')!=-1"
                    placement="bottom-start"
                    :width="200"
                    trigger="click"
                >
                    <template #default>
                        <span>{{row.object}}</span>
                    </template>
                    <template #reference>
                        <div>
                            <span>{{row.type}}</span>
                            <el-button class="m-2" round  link v-if="row.object" >object<el-icon class="el-icon--right"><Warning /></el-icon></el-button>
                        </div>
                    </template>
                </el-popover>
            </template>
        </el-table-column>
        <el-table-column prop="default" label="默认值" />
    </el-table>
     <h2>formItem 属性</h2>
    <el-table :data="tableData4">
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
                            <el-button class="m-2" round  link v-if="row.enum" >| enum<el-icon class="el-icon--right"><Warning /></el-icon></el-button>
                        </div>
                    </template>
                </el-popover>
                <el-popover
                    v-if="Object.keys(row).findIndex((item)=>item=='object')!=-1"
                    placement="bottom-start"
                    :width="200"
                    trigger="click"
                >
                    <template #default>
                        <span>{{row.object}}</span>
                    </template>
                    <template #reference>
                        <div>
                            <span>{{row.type}}</span>
                            <el-button class="m-2" round  link v-if="row.object" >object<el-icon class="el-icon--right"><Warning /></el-icon></el-button>
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
            name: 'form-schema',
            info: "动态验证表单配置",
            type: '',
            default: '{}',
            object:'PropType<FormSchema>'
        },
        {
            name: "fields",
            info: '预置字段默认值',
            object: 'PropType<Fields>',
            default: '{}'
        },
        {
            name: "modelValue / v-model",
            info: '表单绑定的数据对象',
            object: 'PropType<Fields>',
            default: '——'
        },
        {
            name: "extend-context",
            info: '绑定给CurdForm的额外文本',
            type: '',
            object:'PropType<Record<string, any>>',
            default: '——'
        },
    ]
    const tableData2 = [
        {
            name: "update:modelValue"
        },
        {
            name: "change",
            info: '表单改变事件',
            func: '(formModel,formItem) => void',
            default: '——'
        }
    ]
    const tableData3 = [
        {
            name: "formItem",
            info: '表单项',
            object: 'FormItem[]'
        },
        {
            name: "rules",
            info: '表单验证规则',
        },
        {
            name: "getRules",
        },
        {
            name: "labelPosition",
            info: '表单项标题对齐方式',
            enum: '"left" | "right" | "top"',
            type: 'string'
        },
        {
            name: "gutter",
            info: '表单项间隔(左右padding值)',
            type: 'number'

        },
        {
            name: "labelWidth",
            info: '表单项标题的宽度',
            type: 'number | string',
        },
        {
            name: "inline",
            info: '表单项是否独占一行纵向排列',
            type: 'boolean',
            default: 'false'
        },
        {
            name: "inlineMessage",
            info: '是否以行内形式展示校验信息，当值为false时校验信息会position:absolute展示，值为true时校验信息会position:relative展示',
            type: 'boolean',
            default: 'false'
        },
        {
            name: "statusIcon",
            info: '是否在输入框中显示校验结果反馈图标',
            type: 'boolean',
            default: 'false'
        },
        {
            name: "showMessage",
            info: '是否显示校验错误信息',
            type: 'boolean',
            default: 'true',
        },
        {
            name: "size",
            info: '用于控制该表单项的尺寸',
            type: 'string',
            enum: '"default" | "small" | "large"'
        },
        {
            name: "disabled",
            info: '是否禁用该表单内的所有组件。 如果设置为 true, 它将覆盖内部组件的 disabled 属性',
            type: 'boolean',
            default: 'false'

        },
        {
            name: "validateOnRuleChange",
            info: '是否在 rules 属性改变后立即触发一次验证',
            type: 'boolean',
            default: 'false'
        },
        {
            name: "hideRequiredAsterisk",
            info: '是否隐藏必填字段标签旁边的红色星号',
            type: 'boolean',
            default: 'false'
        },
        {
            name: "scrollToError",
            info: '当校验失败时，滚动到第一个错误表单项',
            type: 'boolean',
            default: 'false',
        },
        
    ]

    const tableData4 = [
        {
            name: "prop",

        },
        {
            name: "label",
            info: '表单项标题'
        },
        {
            name: "type",
            info:"表单项类型",
            type:"ReturnType<typeof defineComponent>",
            enum: '"input" | "select" | "radio" | "checkbox" | "input-number" | "switch" | "file" | "date-picker" | "time-picker" | "color-picker" | "value"'
        },
        {
            name: "value",
            info: '表单项的绑定值',
            type: 'any'
        },
        {
            name: "eventObject",
            info: '绑定给formItem的事件函数对象',
            object: 'change?: (formModel: Fields, formItem: FormItem, context: FormContext, ...args: any[]) => void | boolean;       optionLoaded?: (formModel: Fields, formItem: FormItem, context: FormContext, config?: any) => void;        [key: string]: ((formModel: Fields, formItem: FormItem, context: FormContext, config?: any) => void) | undefined;',
            default: '{}'
        },
         {
            name: "options",
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
