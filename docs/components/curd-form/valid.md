# 表单校验
通过 `rules` 属性传入验证规则

<div>
    <CurdForm ref="formRef" :form-schema="formSchema">
        <template #operate-button>
            <el-button @click="submit" type="primary">提交</el-button>
        </template>
    </CurdForm>
    <h2>自定义规则校验</h2>
    <CurdForm ref="formRef2" :form-schema="formSchema2">
    </CurdForm>
</div>

<script lang="ts" setup>
    import {ref} from "vue"
    const formRef = ref();
    const formRef2 = ref()
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
            if (value.length < 11) {
            callback(new Error("电话长度为11位"))
            }
            callback()
        }
    }
</script>

