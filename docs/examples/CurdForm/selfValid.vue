<template>
    <div class="list">
        <CurdForm ref="formRef2" :form-schema="formSchema2">
            <template #operate-button>
                <el-button @click="submit" type="primary">提交</el-button>
            </template>
        </CurdForm>
    </div>
  </template>
  
  <script lang="ts" setup>
     import {ref} from "vue"
    const formRef2 = ref()
    
    const formSchema2 = ref({
        formItem:[
            {
                label:"联系人",
                prop:"name",
            },
            {
                label:"联系电话",
                prop:"tel",
                tooltip:"电话长度为11位"
            },
        ],
        rules:(form) =>{
            return {
                tel:[{required:true,message:"请输入联系电话"},
                    {validator:validatorTel,trigger: "blur"}]
            }
        }
    })
    function validatorTel(rule: any, value: any, callback: any){
        if (value === '') {
            callback(new Error('请输入联系电话'))
        } else {
            if (value.length !== 11) {
            callback(new Error("电话长度为11位"))
            }
            callback()
        }
    }
    const submit = () => {
        formRef2.value.validate((valid) => {
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
  