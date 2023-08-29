<template>
  <div class="table-menu">
    <el-tooltip v-for="item in controlButtons" :key="item.label" :content="item.label" placement="top">
      <el-dropdown v-if="item.options" trigger="click" class="table-menu-item" @command="handleSizeCommand">
        <el-button type="info" link class="table-menu-item">
          <el-icon><component :is="item.icon"></component></el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item v-for="option in item.options" :key="option.value" :command="option.value">
              <span :style="{ color: currentSize == option.value ? 'var(--el-color-primary)' : '' }">{{ option.label }}</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-button v-else type="info" link class="table-menu-item" @click="onClick(item)">
        <el-icon><component :is="item.icon"></component></el-icon>
      </el-button>
    </el-tooltip>
    <STableColumnControl v-model:visible="visible" />
  </div>
</template>
<script lang="ts" setup>
import { computed, ref } from "vue"
import STableColumnControl from "./STableColumnControl.vue"
import { Refresh, Search, ScaleToOriginal, Download, Operation } from "@element-plus/icons-vue"
import { useGlobalConfig } from "../../../utils/hooks/useGlobalConfig"
const emits = defineEmits(["operation"])
const props = defineProps({
  filterVisible: {
    type: Boolean,
    default: true,
  },
})
const globalConfig = useGlobalConfig()
// 控制按钮逻辑
const controlButtons = computed(() => [
  { label: "刷新", value: "refresh", icon: Refresh },
  { label: props.filterVisible ? "收起查询" : "展开查询", value: "searchToggle", icon: Search },
  {
    label: "密度",
    icon: ScaleToOriginal,
    value: "size",
    options: [
      { label: "默认", value: "default" },
      { label: "宽松", value: "medium" },
      { label: "紧凑", value: "small" },
    ],
  },
  { label: "导出数据", value: "export", icon: Download },
  // { label: "打印", value: "print", icon: "Printer" },
  { label: "列设置", value: "operation", icon: Operation },
])
const visible = ref(false)
const onClick = (item: any) => {
  emits("operation", item.value)
  if (item.value == "operation") {
    visible.value = true
  }
}
const currentSize = ref(globalConfig.value.size || "default")
const handleSizeCommand = (val: any) => {
  currentSize.value = val
  emits("operation", "size", val)
}
const openColumnControl = () => {
  visible.value = true
}
defineExpose({ openColumnControl })
</script>
