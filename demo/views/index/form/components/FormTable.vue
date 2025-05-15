<template>
  <div class="form-table"><CurdTable v-bind="table"></CurdTable></div>
</template>
<script setup lang="ts">
import { ref } from "vue"
const table = ref({
  data: [],
  columns: [
    { label: "a", prop: "a" },
    { label: "b", prop: "b" },
  ],
})
</script>
<style lang="scss" scoped>
.form-table {
  width: 100%;
}
</style>
