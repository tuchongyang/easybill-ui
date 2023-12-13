# 插槽
## 表单内容插槽
:::demo
CurdForm/contentSlot
:::
## 前后缀插槽
:::demo
CurdForm/prefixSlot
:::
## 底部插槽
:::demo 使用 `formItem` 的 `prop` + `Bottom` 即可实现
CurdForm/bottomSlot
:::
## 表单项插槽
:::demo 使用 `formItem` 的 `prop` + `Item` 即可实现
CurdForm/itemSlot
:::
## 操作按钮插槽
:::demo
CurdForm/operateSlot
:::
  <div>
    <h2>插槽</h2>
      <el-table :data="tableData1">
        <el-table-column prop="name" label="插槽名" width="200" />
        <el-table-column prop="info" label="说明" width="180" />
        <el-table-column prop="type" label="类型" />
        <el-table-column prop="default" label="默认值" />
    </el-table>
  </div>


<script lang="ts" setup>
import { CurdForm, FormSchema } from "easybill-ui/index"
import { ref, Ref, markRaw } from "vue"
import FormSuffixBtn from "./components/FormSuffixBtn.vue"
import { ElMessage } from "element-plus"
import FormTable from "./components/FormTable.vue"
import formEmpty from "./components/formEmpty.vue"
const tableData1 = [
        {
            name: 'formItem.prop',
            info: '表单内容插槽'
        },
        {
            name: "formItem.prop + 'Prefix'",
            info: '前缀插槽'
        },
        {
            name: "formItem.prop + 'Suffix'",
            info: '后缀插槽'
        },
        {
            name: "formItem.prop + 'Bottom'",
            info: '底部插槽'
        },
        {
            name: "formItem.prop + 'Item'",
            info: '表单项插槽'
        },
        {
            name: 'operate-button',
            info: '操作按钮插槽'
        }]
</script>

<style lang="scss" scoped>
    :deep(table){
        margin:0;
    }
</style>
