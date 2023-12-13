<template>
    <div class="list">
      <CurdForm ref="formRef2" v-model="form" :form-schema="formSchema2">
        <template #slot>
          <el-input  placeholder="Please input">
            <template #prepend>Http://</template>
          </el-input>
        </template>
      </CurdForm>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, Ref, markRaw } from "vue"
  import { Calendar, Search } from '@element-plus/icons-vue'
  const form = ref({})
  const formSchema2: Ref<FormSchema> = ref({
  formItem: [
    {
      label: "姓名",
      type: "input",
      prop:"name",
      tooltip: "input"
    },
    {
      label: "年龄",
      prop: "age1",
      type: "input-number",
      tooltip: "input-number",
    },
    {
      label: "年龄",
      prop: "age2",
      type: "input-number",
      tooltip: "input-number",
      props: () => ({ controls: false, min: 1, max: 100 }),
    },
    {
      label: "爱好",
      type: "input",
      prop:"tag",
      tooltip: "禁用状态",
      props: () =>({disabled:true,})
    },
    {
      label: "详情",
      type:"input",
      prop:"detail",
      tooltip:"一键清空",
      props:()=>({clearable:true})
    },
    {
      label: "密码",
      prop:"pwd",
      tooltip:"可切换显示隐藏的密码框",
      props:()=>({type:"password",showPassword:true})
    },
    {
      label: "备注",
      prop:"remark",
      tooltip:"文本域",
      props:()=>({type:"textarea",showPassword:true})
    },
    {
      label: "网址",
      prop:"slot",
    },
    {
      label: "尺寸",
      type: "input",
      prop:"name",
      tooltip: "尺寸，可选small、large",
      props:()=>({size:"small"}) 
    },
  ],
  labelWidth: 80,
  labelPosition: "left",
  gutter: 10,
})
  </script>
  
  <style lang="scss" scoped>
    .list{
      padding: 20px;
    }
  </style>