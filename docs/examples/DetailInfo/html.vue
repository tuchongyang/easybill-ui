<template>
  <div class="list">
    <DetailInfo title="HTML渲染" :data="list" />
  </div>
</template>


<script lang="ts" setup>
import { ref, Ref } from "vue"
const list: Ref<DetailDataItem[]> = ref([
  { label: "正在同步", value: 10086, span: 12 },
  { label: "同步完成", value: 10086, tooltip: "这是一个提示消息", span: 12 },
  { 
    label: "普通文本", 
    value: "这里是一大段文字这里是一大段文<span style='color:red'>字这</span>里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字", 
    labelStyle: "align-items: flex-start" 
  },
  {
    label: "HTML文本",
    value: "这里是一大段文字这里是一大段文<span style='color:red'>字这</span>里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字",
    rawContent: true,
  },
  { 
    label: "文本溢出", 
    value: "<div style='width: 400px'>这里是<span style='color:red'></span></div>一大段文字", 
    showOverflowTooltip: true,
  },
  {
    label: "溢出框内解析HTML",
    value:"<div style='width: 400px'>这里是<span style='color:red'>一大段文字</span>这里是一大段文字这里是一大这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字段文字这里是一大段文字这里是一大段文字这里是一大段文字</div>",
    showOverflowTooltip: { rawContent: true },
    rawContent: true,
  },
])
</script>


<style lang="scss" scoped>
  .list{
    padding: 20px;
  }
</style>