import { withInstall } from "../../utils"
import FormItem from "./src/CurdFormItem.vue"
import Instance from "./src/index"
export const CurdForm = withInstall(Instance)
export const CurdFormItem = withInstall(FormItem)
export default CurdForm
export * from "./src/directive"
export * from "./src/hooks"
export * from "./src/types"
