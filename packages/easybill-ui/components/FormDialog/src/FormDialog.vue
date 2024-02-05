<template>
  <el-dialog v-model="visible" :title="title" width="60%" :close-on-click-modal="false" v-bind="$attrs" :before-close="onBeforeClose">
    <el-steps v-if="stepSchemaList.length > 1" :active="step" align-center style="margin-bottom: 20px; position: sticky; top: 0; z-index: 2000; background: var(--el-bg-color)" v-bind="stepProps">
      <el-step v-for="(item, i) in stepSchemaList" :key="i" :title="item.name" :description="item.description" />
    </el-steps>
    <div v-loading="confirmLoading">
      <template v-for="(item, i) in stepSchemaList" :key="i">
        <curd-form v-show="step == i" ref="curdFormRef" v-model="form" :fields="fields" :form-schema="item.formSchema" :extend-context="extendContexts" style="margin: 0 40px 0 20px" />
      </template>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button :disabled="confirmLoading" type="default" @click="onCancel()">取消</el-button>
        <el-button v-if="stepSchemaList.length > 1 && step > 0" :disabled="confirmLoading" type="primary" plain @click="prev">上一步</el-button>
        <el-button v-if="stepSchemaList.length > 1 && step < stepSchemaList.length - 1" :disabled="confirmLoading" type="primary" plain @click="next">下一步</el-button>
        <el-button v-if="step >= stepSchemaList.length - 1" :disabled="confirmLoading" type="primary" :loading="confirmLoading" @click="onOk">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, reactive, shallowRef, toRefs, ref, PropType } from "vue"
import { CurdForm, FormSchema, Fields } from "../../CurdForm"
import { ElDialog, ElButton, ElSteps, ElStep } from "element-plus"
export default defineComponent({
  name: "FormDialog",
  components: { CurdForm, ElDialog, ElButton, ElSteps, ElStep },
  props: {
    title: {
      type: String,
      default: "",
    },
    remove: {
      // 移除模态框
      type: Function as PropType<() => void>,
      default: null,
    },
    stepSchema: {
      type: Array as PropType<{ name: string; description?: string; formSchema: FormSchema }[]>,
      default: () => [],
    },
    formSchema: {
      // 表单项
      type: Object as PropType<FormSchema>,
      default: () => ({}),
    },
    fields: {
      // 默认值，一般编辑时传入
      type: Object as PropType<Fields>,
      default: () => ({}),
    },
    setForm: {
      type: Function as PropType<(form: Fields) => void>,
      default: null,
    },
    handleOk: {
      // 点击确定
      type: Function,
      default: null,
    },
    stepProps: {
      type: Object as PropType<Fields>,
      default: () => ({}),
    },
    extendContext: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const curdFormRef = ref()
    const form = ref<Fields>({})
    const state = reactive({
      step: 0,
      visible: true,
      confirmLoading: false,
    })
    const stepSchemaList = props.stepSchema?.length ? shallowRef(props.stepSchema) : shallowRef([{ name: "step1", description: "", formSchema: props.formSchema }])
    const prev = () => {
      if (state.step > 0) {
        state.step--
      }
    }
    const next = () => {
      if (state.step < stepSchemaList.value.length - 1) {
        state.confirmLoading = true
        curdFormRef.value[state.step]?.validate((valid: boolean) => {
          state.confirmLoading = false
          valid && state.step++
        })
      }
    }
    const onOk = () => {
      state.confirmLoading = true
      curdFormRef.value[state.step]
        ?.validate()
        .then(async () => {
          const pass = await (props.handleOk && props.handleOk(form.value, state)).finally(() => (state.confirmLoading = false))
          if (typeof pass == "undefined" || pass) {
            state.visible = false
            onCancel()
          }
        })
        .catch((e: Error) => {
          console.error(e)
          state.confirmLoading = false
        })
    }
    const onCancel = () => {
      state.visible = false
      setTimeout(() => {
        props.remove && props.remove()
      }, 300)
    }
    const onBeforeClose = () => {
      state.visible = false
      setTimeout(() => {
        props.remove && props.remove()
      }, 300)
    }
    const loadOptions = (prop: string, config?: any) => {
      if (!stepSchemaList.value.length) return
      for (const i in stepSchemaList.value) {
        const group = stepSchemaList.value[i]
        const formItem = group.formSchema.formItem
        for (const j in formItem) {
          const item = formItem[j]
          if (item.prop == prop) {
            curdFormRef.value[i]?.loadOptions(prop, config)
          }
        }
      }
    }
    const extendContexts = {
      loadOptions,
      ...props.extendContext,
    }
    if (props.setForm) {
      props.setForm(form)
    }

    return {
      ...toRefs(state),
      onOk,
      onCancel,
      onBeforeClose,
      curdFormRef,
      stepSchemaList,
      form,
      prev,
      next,
      extendContexts,
    }
  },
})
</script>
