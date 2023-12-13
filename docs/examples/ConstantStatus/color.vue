<template>
  <div>
    <div class="list">
        <div v-for="(item, i) in options5" :key="i" class="item">
            <ConstantStatus :value="item.value" :options="options5" />
        </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, Ref } from "vue"
const options5 = ref<OptionItem[]>([
  { label: "自定义颜色1", value: 1, type: "primary", style: { borderColor: "#e0c1fd", color: "#8154c7", backgroundColor: "#f9f0ff" } },
  { label: "自定义颜色2", value: 2, type: "primary", style: { borderColor: "#e0c1fd", color: "#fff", backgroundColor: "skyblue" } },
  { label: "自定义颜色3", value: 3, type: "primary", style: { borderColor: "#FFAEBD", color: "#fff", backgroundColor: "#FFE0E6" } },
  { label: "自定义颜色4", value: 4, type: "primary", style: { borderColor: "#73C79F", color: "#fff", backgroundColor: "#73C79F" } },
])
</script>

<style lang="scss" scoped>
.title {
  margin-bottom: 10px;
}
.list {
  display: flex;
  flex-wrap: wrap;
  margin: 20px;
  line-height: 50px;
  .item {
    margin-right: 10px;
  }
}
</style>
