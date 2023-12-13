<template>
   <div class="list">
      <div v-for="(item, i) in options2" :key="i" class="item">
        <ConstantStatus :value="item.value" :options="options2" />
      </div>
    </div>
</template>

<script lang="ts" setup>
  import { ref, Ref } from "vue"
  const options2 = ref<OptionItem[]>([
  { 
    label: "primary",
    value: 0, 
    dot: true, 
    type: "primary", 
    effect: "plain", 
    border: false 
  },
  { 
    label: "warning", 
    value: 1, 
    dot: true, 
    type: "warning", 
    effect: "plain", 
    border: false 
  },
  { 
    label: "success", 
    value: 2, 
    dot: true, 
    type: "success", 
    effect: "plain", 
    border: false 
  },
  { 
    label: "info", 
    value: 3, 
    dot: true, 
    type: "info", 
    effect: "plain", 
    border: false 
  },
  { 
    label: "danger", 
    value: 4, 
    dot: true, 
    type: "danger", 
    effect: "plain", 
    border: false 
  },
  { 
    label: "yellow", 
    value: 5, 
    dot: true, 
    type: "yellow", 
    effect: "plain", 
    border: false 
  },
  { 
    label: "blue", 
    value: 6, 
    dot: true, 
    type: "blue", 
    effect: "plain", 
    border: false 
  },
  { 
    label: "blue-dark", 
    value: 7, 
    dot: true, 
    type: "blue-dark", 
    effect: "plain", 
    border: false 
  },
  { 
    label: "red-purple", 
    value: 8, 
    dot: true, 
    type: "red-purple", 
    effect: "plain", 
    border: false 
  },
  { 
    label: "blueness", 
    value: 9, 
    dot: true, 
    type: "blueness", 
    effect: "plain", 
    border: false 
  },
])
</script>

<style lang="scss" scoped>
  .title {
  margin-bottom: 10px;
}
.list {
  display: flex;
  flex-wrap: wrap;
  line-height: 50px;
  margin:20px;
  .item {
    margin-right: 10px;
  }
}
</style>