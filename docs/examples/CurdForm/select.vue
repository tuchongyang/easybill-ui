<template>
    <div class="list">
      <CurdForm ref="formRef" v-model="form" :form-schema="formSchema">
        <template #operate-button>
          <el-button @click="submit">提交</el-button>
        </template>
      </CurdForm>
    </div>
  </template>
  <script lang="ts" setup>
  import { CurdForm, FormSchema } from "easybill-ui/index"
  import { ref, Ref, markRaw } from "vue"
  import FormSuffixBtn from "./components/FormSuffixBtn.vue"
  import { ElMessage } from "element-plus"
  import FormTable from "./components/FormTable.vue"
  import formEmpty from "./components/formEmpty.vue"
  
  const form = ref({
    initData: { x: 1 },
    modelForm: {},
    name2: ["2"],
  })
  
  const formSchema: Ref<FormSchema> = ref({
    formItem: [
        {
            label:"基础用法",
            type:"select",
            prop:"base",
            options:[
                {label:"Option1",value:"1"},
                {label:"Option2",value:"2"},
                {label:"Option3",value:"3"}
            ],
            props:()=>({placeholder:"Select"})
        },
        {
            label:"异步获取选项",
            type:"select",
            prop:"async",
            asyncOptions: async() => {
                const list = [
                    { label: "aa" + Math.floor(Math.random() * 100), value: 1 },
                    { label: "bb" + Math.floor(Math.random() * 100), value: 2 },
                ]   
                return list
            },
            props:()=>({placeholder:"Select"})
        },
        {
            label:"部分选项禁用",
            type:"select",
            prop:"partDis",
            options:[
                {label:"Option1",value:"1",disabled:true},
                {label:"Option2",value:"2"},
                {label:"Option3",value:"3"}
            ],
            props:()=>({placeholder:"Select"})
        },
        {
            label:"全部禁用",
            type:"select",
            prop:"disabled",
            options:[
                {label:"Option1",value:"1"},
                {label:"Option2",value:"2"},
                {label:"Option3",value:"3"}
            ],
            props:()=>({placeholder:"Select",disabled:true,})
        },
        {
            label:"可清空单选",
            type:"select",
            prop:"clearable",
            options:[
                {label:"Option1",value:"1"},
                {label:"Option2",value:"2"},
                {label:"Option3",value:"3"}
            ],
            props:()=>({placeholder:"Select",clearable:true})
        },
        {
            label:"基础多选",
            type:"select",
            prop:"multiple",
            options:[
                {label:"Option1",value:"1"},
                {label:"Option2",value:"2"},
                {label:"Option3",value:"3"}
            ],
            props:()=>({placeholder:"Select",multiple:true})
        },
        {
            label:"选项内HTML",
            type:"select",
            prop:"html",
            options:[
                {label:"Option1",value:"1",html: "<div style='display:flex;justify-content:space-between;color:red;'><span>Options1</span><span style='color:#999'>11</span></div>" },
                {label:"Option2",value:"2"},
                {label:"Option3",value:"3"}
            ],
            props:()=>({placeholder:"Select",multiple:true})
        }
    ],
    labelWidth: 100,
    labelPosition: "left",
    gutter: 10,
  })
  const formRef = ref<InstanceType<typeof CurdForm>>()
  const submit = () => {
    formRef.value?.validate((valid) => {
      if (!valid) {
        return ElMessage.error("请检查参数是否完整")
      }
      console.log("form", form.value)
    })
  }
  setTimeout(() => {
    // form.value.age = 22
    // form.value = { name: "111" }
  }, 2000)
  </script>
  <style lang="scss" scoped>
  .list{
    padding: 20px;
  }
</style>