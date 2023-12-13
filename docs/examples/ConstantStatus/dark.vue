<template>
   <div class="list">
        <div v-for="(item, i) in options3" :key="i" class="item">
            <ConstantStatus :value="item.value" :options="options3" />
        </div>
    </div>
</template>

<script lang="ts" setup>
  import { ref, Ref } from "vue"
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
</script>

<style lang="scss" scoped>
  .title {
  margin-bottom: 10px;
}
.list {
  display: flex;
  flex-wrap: wrap;
  margin:20px;
  line-height: 50px;
  .item {
    margin-right: 10px;
  }
}
</style>