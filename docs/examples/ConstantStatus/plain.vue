<template>
    <div class="list">
         <div v-for="(item, i) in options4" :key="i" class="item">
             <ConstantStatus :value="item.value" :options="options4" />
         </div>
     </div>
 </template>
 
 <script lang="ts" setup>
   import { ref, Ref } from "vue"
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