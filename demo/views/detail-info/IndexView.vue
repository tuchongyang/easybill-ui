<template>
  <div>
    <DetailInfo title="默认模式" :data="list" />
    <DetailInfo title="表格模式" :data="list" show-type="table" label-width="120px" />
    <DetailInfo title="卡片模式" :data="list" show-type="card" shadow label-width="120px" label-position="left">
      <template #headerRight>
        <el-button type="primary" link>编辑按钮</el-button>
        <el-button type="danger" link>删除</el-button>
      </template>
    </DetailInfo>
  </div>
</template>
<script lang="ts" setup>
import { ref, Ref } from "vue"
import { DetailDataItem } from "easybill-ui/index"
const list = ref<DetailDataItem[]>([
  { label: "正在同步", value: 1 },
  { label: "同步完成", value: 2, tooltip: "这是一个提示消息" },
  { label: "已取消", value: 3 },
  { label: "错误", value: 4 },
  { label: "描述", value: "这里是一大段文字这里是一大段文<span style='color:red'>字这</span>里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字", labelStyle: "align-items: flex-start" },
  {
    label: "描述",
    value:
      "<div style='width: 400px'>这里是<span style='color:red'>一大段文字</span>这里是一大段文字这里是一大这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字段文字这里是一大段文字这里是一大段文字这里是一大段文字</div>",
    showOverflowTooltip: { rawContent: true },
    span: 6,
    rawContent: true,
  },
  { label: "描述", value: "这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字", showOverflowTooltip: true, span: 6 },
  { label: "描述", value: "这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字", showOverflowTooltip: true, span: 6 },
  { label: "描述", value: "这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字", showOverflowTooltip: true, span: 6 },
])
</script>
