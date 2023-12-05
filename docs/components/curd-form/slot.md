# 插槽
  <div>
    <h2>表单内容插槽</h2>
    <CurdForm ref="formRef" v-model="form" :form-schema="formSchema">
        <template #slotTable>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="date" label="Date" width="180" />
                <el-table-column prop="name" label="Name" width="180" />
                <el-table-column prop="address" label="Address" />
            </el-table>
        </template>
    </CurdForm>
    <h2>前后缀插槽</h2>
     <CurdForm ref="formRef2" v-model="form" :form-schema="formSchema2">
        <template #agePrefix>
            <span style="white-space:nowrap;margin-right:10px">前缀</span>
        </template>
        <template #ageSuffix>
            <span style="white-space:nowrap;">后缀</span>
        </template>
    </CurdForm>
    <h2>底部插槽</h2>
    <CurdForm ref="formRef3" v-model="form" :form-schema="formSchema3">
        <template #ageBottom>
            底部插槽
        </template>
    </CurdForm>
    <h2>表单项插槽</h2>
    <CurdForm ref="formRef3" v-model="form" :form-schema="formSchema3">
        <template #ageItem>
            表单项插槽
        </template>
    </CurdForm>
    <h2>操作按钮插槽</h2>
    <CurdForm ref="formRef3" v-model="form" :form-schema="formSchema3">
        <template #operate-button>
        <el-button>按钮1</el-button>
        <el-button>按钮2</el-button>
        <el-button>按钮3</el-button>
        </template>
    </CurdForm>
    <br/>
    <br/>
    <br/>
    <h2>插槽</h2>
      <el-table :data="tableData1">
        <el-table-column prop="name" label="插槽名" width="200" />
        <el-table-column prop="info" label="说明" width="180" />
        <el-table-column prop="type" label="类型" />
        <el-table-column prop="default" label="默认值" />
    </el-table>
  </div>


<script lang="ts" setup>
import { CurdForm, FormSchema } from "easybill-ui/index"
import { ref, Ref, markRaw } from "vue"
import FormSuffixBtn from "./components/FormSuffixBtn.vue"
import { ElMessage } from "element-plus"
import FormTable from "./components/FormTable.vue"
import formEmpty from "./components/formEmpty.vue"
const tableData1 = [
        {
            name: 'formItem.prop',
            info: '表单内容插槽'
        },
        {
            name: "formItem.prop + 'Prefix'",
            info: '前缀插槽'
        },
        {
            name: "formItem.prop + 'Suffix'",
            info: '后缀插槽'
        },
        {
            name: "formItem.prop + 'Bottom'",
            info: '底部插槽'
        },
        {
            name: "formItem.prop + 'Item'",
            info: '表单项插槽'
        },
        {
            name: 'operate-button',
            info: '操作按钮插槽'
        }
    ]
const form = ref({
//   initData: { x: 1 },
//   modelForm: {},
//   name2: ["2"],
})

const formSchema: Ref<FormSchema> = ref({
  formItem: [
    {
      label: "年龄",
      prop: "age",
      type: "input-number",
      tooltip: "这里是提示信息",
      props: () => ({ controls: false, min: 1, max: 100 }),
      formItemProps(formModel, formItem) {
        return { rules: [{ required: true, message: "请输入" + formItem.label, trigger: "blur" }] }
      },
    },
    {
      label: "爱好",
      prop: "name1",
      span: 12,
      type: "radio",
      options: [
        { label: "唱歌", value: "1" },
        { label: "跳舞", value: "2" },
      ],
      value: "1",
      tooltip: (form) => ({ content: form.name1 }),
    },
    {
      label: "爱好",
      prop: "name11",
      span: 12,
      type: "radio",
      props: { componentName: "button" },
      options: [
        { label: "唱歌", value: "1" },
        { label: "跳舞", value: "2" },
      ],
      value: "1",
      tooltip: (form) => ({ content: form.name1 }),
    },
    {
        label:"插槽",
        prop:"slotTable",
        type:"slotTable"
    }
  ],
  rules: (form) => {
    return {
      name: [{ required: form.name1 == 1, message: "名称不能为空", trigger: "blur" }],
    }
  },
  labelWidth: 120,
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
const formSchema2: Ref<FormSchema> = ref({
  formItem: [
    {
      label: "年龄",
      prop: "age",
      type: "input-number",
      tooltip: "这里是提示信息",
      props: () => ({ controls: false, min: 1, max: 100 }),
      formItemProps(formModel, formItem) {
        return { rules: [{ required: true, message: "请输入" + formItem.label, trigger: "blur" }] }
      },
    },
    {
      label: "爱好1",
      prop: "name1",
      type: "radio",
      suffix: [markRaw(FormSuffixBtn)],
      prefix: [markRaw(FormSuffixBtn)],
      options: [
        { label: "唱歌", value: "1" },
        { label: "跳舞", value: "2" },
      ],
      value: "1",
      tooltip: (form) => ({ content: form.name1 }),
    },
    {
      label: "爱好2",
      prop: "name11",
      type: "radio",
      props: { componentName: "button" },
      options: [
        { label: "唱歌", value: "1" },
        { label: "跳舞", value: "2" },
      ],
      value: "1",
      prefix: '<span style="color:red;white-space:nowrap;margin-right: 20px;">前缀</span>', 
      suffix: '<span style="color:orange;white-space:nowrap;margin-left: 20px;">后缀</span>',
      tooltip: (form) => ({ content: form.name1 }),
    },
  ],
  rules: (form) => {
    return {
      name: [{ required: form.name1 == 1, message: "名称不能为空", trigger: "blur" }],
    }
  },
  labelWidth: 80,
  labelPosition: "left",
  gutter: 10,
})
const formRef2 = ref<InstanceType<typeof CurdForm>>()
const submit2 = () => {
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

const formSchema3: Ref<FormSchema> = ref({
  formItem: [
    {
      label: "年龄",
      prop: "age",
      type: "input-number",
      tooltip: "这里是提示信息",
      props: () => ({ controls: false, min: 1, max: 100 }),
      formItemProps(formModel, formItem) {
        return { rules: [{ required: true, message: "请输入" + formItem.label, trigger: "blur" }] }
      },
    },
    {
      label: "爱好1",
      prop: "name1",
      type: "radio",
      options: [
        { label: "唱歌", value: "1" },
        { label: "跳舞", value: "2" },
      ],
      value: "1",
      tooltip: (form) => ({ content: form.name1 }),
    },
    {
      label: "爱好2",
      prop: "name2",
      type: "radio",
      props: { componentName: "button" },
      options: [
        { label: "唱歌", value: "1" },
        { label: "跳舞", value: "2" },
      ],
      value: "1",
      tooltip: (form) => ({ content: form.name1 }),
    },
  ],
  rules: (form) => {
    return {
      name: [{ required: form.name1 == 1, message: "名称不能为空", trigger: "blur" }],
    }
  },
  labelWidth: 120,
  labelPosition: "left",
  gutter: 10,
})
const formRef3 = ref<InstanceType<typeof CurdForm>>()
const submit3 = () => {
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

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
</script>

<style lang="scss" scoped>
    :deep(table){
        margin:0;
    }
</style>
