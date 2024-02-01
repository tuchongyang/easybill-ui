<template>
  <div class="form-list" style="width: 100%">
    <div class="list-box">
      <div class="list">
        <div v-for="(item, i) in model" :key="i" class="item" :class="{ active: currentIndex == i }" @click="select(i)">
          {{ i + 1 }}
          <div class="control">
            <el-button type="primary" link :icon="Delete" @click="remove(i)"></el-button>
          </div>
        </div>
        <el-button class="item btn-add" type="primary" link @click="add">添加</el-button>
      </div>
    </div>
    <div class="config-box">
      <CurdForm v-if="form" v-model="form" :form-schema="formSchema" @change="onChange" />
    </div>
    <!-- <el-table :data="model">
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
    </el-table> -->
  </div>
</template>
<script lang="ts" setup>
import { FormItemProps } from "easybill-ui/index"
import { Delete } from "@element-plus/icons-vue"
import { ref, computed } from "vue"
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
const currentIndex = ref(0)
const form = ref(model.value[currentIndex.value])
const formSchema = ref({
  formItem: props.props.columns,
})
const select = (i) => {
  currentIndex.value = i
  form.value = null
  setTimeout(() => {
    form.value = model.value[currentIndex.value]
  })
}
const onChange = () => {
  console.log("s", model.value, form.value)
}
</script>
<style lang="scss" scoped>
.form-list {
  border: 1px solid var(--el-border-color);
  display: flex;
}
.list-box {
  padding: 10px;
  flex: 1;
  min-height: 300px;
  .list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  .item {
    width: 90px;
    height: 90px;
    background-color: var(--el-bg-color);
    border: 1px solid var(--el-border-color);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    &.active,
    &:hover,
    &:focus {
      border-color: var(--el-color-primary);
      box-shadow: 0 0 0px 1px var(--el-color-primary);
    }
    &:hover {
      .control {
        transform: translateY(0);
      }
    }
    .control {
      position: absolute;
      bottom: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.3);
      width: 100%;
      justify-content: flex-end;
      display: flex;
      padding: 3px 5px;
      box-sizing: border-box;
      transition: all 0.3s;
      transform: translateY(100%);
      .el-button {
        font-size: 15px;
        color: #fff;
      }
    }
  }
  .btn-add {
  }
}
.config-box {
  width: 300px;
  border-left: 1px solid var(--el-border-color);
  padding: 20px;
  :deep(.el-form) {
    .el-form-item {
      margin-bottom: 18px;
      flex-direction: column;
    }
  }
}
</style>
