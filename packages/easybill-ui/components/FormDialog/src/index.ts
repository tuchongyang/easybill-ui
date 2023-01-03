// create-api.ts
import { createVNode, render, nextTick, App, VNode } from "vue"
import FormModal from "./FormDialog.vue"
import { FormDialogOptions } from "./types"
let _app: App<Element>

/**
 * 创建表单模态框
 */
const FormDialog = {
  show: (options: FormDialogOptions) => {
    // 组件实例
    let formModal: VNode | null
    const container = document.createElement("div")
    // 移除组件
    const remove = () => {
      formModal = null
      render(null, container)
      container.remove()
    }
    formModal = createVNode(FormModal, { ...options, remove })
    // 使当前模态框继承App实例上下文
    nextTick(() => {
      _app && formModal && (formModal.appContext = _app._instance?.appContext || _app._context || null)
      render(formModal, container)
      document.body.appendChild(container)
    })
    return formModal
  },
  // 暴露一个插件 API
  install: (app: App<Element>) => {
    _app = app
    app.config.globalProperties["$formDialog"] = FormDialog
  },
}
export { FormDialog }
export default FormDialog
