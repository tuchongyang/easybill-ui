<template>
  <div class="form-list" style="width: 100%">
    <el-table :data="model">
      <el-table-column v-for="column in props.props.columns" :key="column.prop" v-bind="column">
        <template #default="{ row }">
          <CurdFormItem v-model="row[column.prop]" :form-item="column" />
        </template>
      </el-table-column>
      <el-table-column width="50">
        <template #default="{ $index }">
          <el-button type="danger" link :icon="Delete" @click="remove($index)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" link @click="add">添加</el-button>
  </div>
</template>
<script lang="ts" setup>
import { FormItemProps } from "easybill-ui/index"
import { Delete } from "@element-plus/icons-vue"
import { ref } from "vue"
const props = defineProps({
  ...FormItemProps,
  modelValue: {
    type: Array,
    default: () => [],
  },
})
const emit = defineEmits(["update:modelValue"])
const model = ref(props.modelValue || [])
const add = () => {
  model.value.push({})
  emit("update:modelValue", model.value)
}
const remove = (i) => {
  model.value.splice(i, 1)
}
</script>
