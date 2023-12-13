<template>
    <div class="list">
        <CurdForm ref="formRef" :form-schema="formSchema">
        <template #operate-button>
            <el-button @click="submit" type="primary">提交</el-button>
        </template>
    </CurdForm>
    </div>
  </template>
  
  <script lang="ts" setup>
   import {ref} from "vue"
    const formRef = ref();
    const formSchema = ref({
        formItem:[
            {
                label:"姓名",
                prop:"name",
            },
            {
                label:"年龄",
                prop:"age",
            },
            {
                label:"爱好",
                prop:"hobby",
                type:"select",
                span:12,
                options:[
                    {
                        label:"唱歌",
                        value:"1"
                    },
                    {
                        label:"跳舞",
                        value:"2",
                    }
                ]
            }
        ],
        rules: (form) =>{
            return {
                name:[{required:true,message:"请输入名称", trigger: "blur" }],
                age:[{required:true,message:"请输入年龄", trigger: "blur" }],
                hobby:[{required:true,message:"请选择爱好", trigger: "blur" }]
            }
        }
    })
    const submit = () => {
        formRef.value.validate((valid) => {
            if(!valid){
                return 
            }
        })
    }
  </script>
  
  <style lang="scss" scoped>
  .list {
    padding: 20px;
  }
  </style>
  