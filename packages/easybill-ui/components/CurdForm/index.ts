import Instance from "./src/index"
import FormItem from "./src/CurdFormItem.vue"
import { withInstall } from "../../utils"
export const CurdForm = withInstall(Instance)
export const CurdFormItem = withInstall(FormItem)
export default CurdForm
export * from "./src/types"
export * from "./src/directive"
export * from "./src/hooks"
