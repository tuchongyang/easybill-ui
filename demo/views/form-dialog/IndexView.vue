<template>
  <div>
    <el-button @click="open">打开表单</el-button>
    <el-button @click="openStep">步骤表单</el-button>
  </div>
</template>
<script lang="ts" setup>
import { markRaw } from "vue"
import { ElMessage, ElSlider } from "element-plus"
import { FormDialog } from "easybill-ui/index"
const open = () => {
  FormDialog.show({
    title: "添加数据",
    width: "800px",
    formSchema: {
      formItem: [
        { label: "", prop: "anyway1", labelWidth: "0px", type: "el-alert", props: { title: "标题", description: "asdads", type: "warning", showIcon: true } },
        { label: "直接显示值", prop: "anyway", value: "1", type: "value" },
        { label: "名称", prop: "name" },
        { label: "年龄", prop: "age", tooltip: "这里是提示信息" },
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
        },
        {
          label: "名称",
          prop: "name2",
          span: 12,
          type: "checkbox",
          options: [
            { label: "唱歌", value: "1" },
            { label: "跳舞", value: "2" },
          ],
          value: ["1"],
        },
        {
          label: "自定义组件",
          prop: "slider",
          span: 12,
          type: "el-slider",
          value: 1,
        },
      ],
      rules: {
        name: [{ required: true, message: "名称不能为空", trigger: "blur" }],
      },
      labelWidth: "120px",
      labelPosition: "left",
    },
    handleOk: () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          ElMessage.success("保存成功")
          resolve()
        }, 500)
      })
    },
  })
}
const openStep = () => {
  FormDialog.show({
    title: "添加数据",
    width: "800px",
    stepProps: { alignCenter: true },
    stepSchema: [
      {
        name: "步骤一",
        formSchema: {
          formItem: [
            { label: "", prop: "anyway1", labelWidth: "0px", type: "el-alert", props: { title: "标题", description: "asdads", type: "warning", showIcon: true } },
            { label: "直接显示值", prop: "anyway", value: "1", type: "value" },
            { label: "名称", prop: "name", value: "111" },
            {
              label: "一级类型",
              prop: "cate1",
              type: "select",
              tooltip: "选择类型，去加载第二步的options",
              asyncOptions: async () => {
                console.log("加载cate1")
                return [
                  { label: "分类一", value: "分类一" },
                  { label: "分类二", value: "分类二" },
                ]
              },
              eventObject: {
                change(form, formItem, context) {
                  context.loadOptions("cate2")
                },
              },
            },
          ],
          rules: {
            name: [{ required: true, message: "名称不能为空", trigger: "blur" }],
          },
          labelWidth: "120px",
          labelPosition: "left",
        },
      },
      {
        name: "步骤二",
        formSchema: {
          formItem: [
            {
              label: "二级类型",
              prop: "cate2",
              span: 12,
              type: "radio",
              autoload: false,
              asyncOptions: async (form) => {
                return [
                  { label: form.cate1 + "1", value: form.cate1 + "1" },
                  { label: form.cate1 + "2", value: form.cate1 + "2" },
                ]
              },
              eventObject: {
                optionLoaded(form, formItem) {
                  const cur = formItem.options && formItem.options[0]
                  if (form.cate2 || cur) {
                    form.cate2 = cur?.value || ""
                  }
                },
              },
            },
            {
              label: "名称",
              prop: "name2",
              span: 24,
              type: "checkbox",
              options: [
                { label: "唱歌", value: "1" },
                { label: "跳舞", value: "2" },
              ],
              value: ["1"],
            },
            {
              label: "自定义组件",
              prop: "slider",
              span: 24,
              type: markRaw(ElSlider),
              value: 1,
            },
          ],
          rules: {
            name: [{ required: true, message: "名称不能为空", trigger: "blur" }],
          },
          labelWidth: "120px",
          labelPosition: "left",
        },
      },
      {
        name: "步骤三",
        formSchema: {
          formItem: [
            {
              label: "内容",
              prop: "content",
              span: 24,
              type: "input",
              props: { type: "textarea", rows: 5 },
            },
          ],
          rules: {
            name: [{ required: true, message: "名称不能为空", trigger: "blur" }],
          },
          labelWidth: "120px",
          labelPosition: "left",
        },
      },
    ],
    handleOk: () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          ElMessage.success("保存成功")
          resolve()
        }, 500)
      })
    },
  })
}
</script>
