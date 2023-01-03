<template>
  <div>
    <TableFilter :list-query="listQuery" :select-params="selectParams" />
  </div>
</template>
<script lang="ts" setup>
import { ParamsItem } from "easybill-ui/index"
import { ref, Ref } from "vue"
const listQuery = ref({})
const selectParams: Ref<ParamsItem[]> = ref([
  { label: "名称", prop: "name" },
  { label: "年龄", prop: "age" },
])
</script>
