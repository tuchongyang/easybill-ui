<template>
  <div>
    <div class="title">默认样式</div>
    <div class="list">
      <div v-for="(item, i) in options1" :key="i" class="item"><ConstantStatus :value="item.value" :options="options1" /></div>
    </div>
    <div class="title">dot风格</div>
    <div class="list">
      <div v-for="(item, i) in options2" :key="i" class="item"><ConstantStatus :value="item.value" :options="options2" /></div>
    </div>
    <div class="title">effect:dark</div>
    <div class="list">
      <div v-for="(item, i) in options3" :key="i" class="item"><ConstantStatus :value="item.value" :options="options3" /></div>
    </div>
    <div class="title">effect:plain</div>
    <div class="list">
      <div v-for="(item, i) in options4" :key="i" class="item"><ConstantStatus :value="item.value" :options="options4" /></div>
    </div>
    <div class="title">effect:light</div>
    <div class="list">
      <div v-for="(item, i) in options5" :key="i" class="item"><ConstantStatus :value="item.value" :options="options5" /></div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { OptionItem } from "easybill-ui/index"
import { ref, Ref } from "vue"

const options1: Ref<OptionItem[]> = ref([
  { label: "default", value: 10, type: "default" },
  { label: "primary", value: 0, type: "primary" },
  { label: "warning", value: 1, type: "warning" },
  { label: "success", value: 2, type: "success" },
  { label: "info", value: 3, type: "info" },
  { label: "danger", value: 4, type: "danger" },
  { label: "yellow", value: 5, type: "yellow" },
  { label: "blue", value: 6, type: "blue" },
  { label: "blue-dark", value: 7, type: "blue-dark" },
  { label: "red-purple", value: 8, type: "red-purple" },
  { label: "blueness", value: 9, type: "blueness" },
])
const options2 = ref<OptionItem[]>([
  { label: "primary", value: 0, dot: true, type: "primary", effect: "plain", border: false },
  { label: "warning", value: 1, dot: true, type: "warning", effect: "plain", border: false },
  { label: "success", value: 2, dot: true, type: "success", effect: "plain", border: false },
  { label: "info", value: 3, dot: true, type: "info", effect: "plain", border: false },
  { label: "danger", value: 4, dot: true, type: "danger", effect: "plain", border: false },
  { label: "yellow", value: 5, dot: true, type: "yellow", effect: "plain", border: false },
  { label: "blue", value: 6, dot: true, type: "blue", effect: "plain", border: false },
  { label: "blue-dark", value: 7, dot: true, type: "blue-dark", effect: "plain", border: false },
  { label: "red-purple", value: 8, dot: true, type: "red-purple", effect: "plain", border: false },
  { label: "blueness", value: 9, dot: true, type: "blueness", effect: "plain", border: false },
])
const options3 = ref<OptionItem[]>([
  { label: "primary", value: 0, type: "primary", effect: "dark" },
  { label: "warning", value: 1, type: "warning", effect: "dark" },
  { label: "success", value: 2, type: "success", effect: "dark" },
  { label: "info", value: 3, type: "info", effect: "dark" },
  { label: "danger", value: 4, type: "danger", effect: "dark" },
  { label: "yellow", value: 5, type: "yellow", effect: "dark" },
  { label: "blue", value: 6, type: "blue", effect: "dark" },
  { label: "blue-dark", value: 7, type: "blue-dark", effect: "dark" },
  { label: "red-purple", value: 8, type: "red-purple", effect: "dark" },
  { label: "blueness", value: 9, type: "blueness", effect: "dark" },
])
const options4 = ref<OptionItem[]>([
  { label: "primary", value: 0, type: "primary", effect: "plain" },
  { label: "warning", value: 1, type: "warning", effect: "plain" },
  { label: "success", value: 2, type: "success", effect: "plain" },
  { label: "info", value: 3, type: "info", effect: "plain" },
  { label: "danger", value: 4, type: "danger", effect: "plain" },
  { label: "yellow", value: 5, type: "yellow", effect: "plain" },
  { label: "blue", value: 6, type: "blue", effect: "plain" },
  { label: "blue-dark", value: 7, type: "blue-dark", effect: "plain" },
  { label: "red-purple", value: 8, type: "red-purple", effect: "plain" },
  { label: "blueness", value: 9, type: "blueness", effect: "plain" },
])
const options5 = ref<OptionItem[]>([
  { label: "primary", value: 0, type: "primary", effect: "light" },
  { label: "warning", value: 1, type: "warning", effect: "light" },
  { label: "success", value: 2, type: "success", effect: "light" },
  { label: "info", value: 3, type: "info", effect: "light" },
  { label: "danger", value: 4, type: "danger", effect: "light" },
  { label: "yellow", value: 5, type: "yellow", effect: "light" },
  { label: "blue", value: 6, type: "blue", effect: "light" },
  { label: "blue-dark", value: 7, type: "blue-dark", effect: "light" },
  { label: "red-purple", value: 8, type: "red-purple", effect: "light" },
  { label: "blueness", value: 9, type: "blueness", effect: "light" },
  { label: "自定义颜色", value: 10, type: "primary", style: { borderColor: "#e0c1fd", color: "#8154c7", backgroundColor: "#f9f0ff" } },
])
</script>
<style lang="scss" scoped>
.title {
  margin-bottom: 10px;
}
.list {
  display: flex;
  margin-bottom: 20px;
  .item {
    margin-right: 10px;
  }
}
</style>
