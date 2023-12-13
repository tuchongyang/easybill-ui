<template>
    <div class="list">
         <div v-for="(item, i) in options5" :key="i" class="item">
             <ConstantStatus :value="item.value" :options="options5" />
         </div>
     </div>
 </template>
 
 <script lang="ts" setup>
   import { ref, Ref } from "vue"
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