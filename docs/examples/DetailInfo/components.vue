<template>
  <div class="list">
    <DetailInfo title="自定义组件" :data="list" />
  </div>
</template>


<script lang="ts" setup>
import { ref, Ref,markRaw } from "vue"
import TestSlot from "./components/TestSlot.vue"
const list: Ref<DetailDataItem[]> = ref([
  { 
    label: "正在同步", 
    value: 111, 
    span: 12 
  },
  { 
    label: "tooltip", 
    value: 2, 
    tooltip: "这是一个tooltip提示消息", 
    span: 12 
  },
  { 
    label: "自定义组件", 
    value: "11", 
    type: markRaw(TestSlot),
    props:{
        style:"color:skyblue"
    } 
  },
  {
    label:"image",
    type:"image",
    value:"https://element-plus.gitee.io/images/element-plus-logo.svg",
    props:{
        style:{
            width:"200px",
            height:"50px"
        }
    }
  },
  { 
    label: "el-image", 
    span: 12, 
    type: "el-image", 
    props: { 
        src: "https://element-plus.gitee.io/images/element-plus-logo.svg", style: "height: 50px;" 
    } 
  },
])
</script>
<style lang="scss" scoped>
.list{
    padding: 20px;
}
</style>
