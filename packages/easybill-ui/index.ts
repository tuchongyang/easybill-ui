import type { Plugin } from "vue"
import ConstantStatus from "./components/ConstantStatus"
import CurdForm from "./components/CurdForm"
import CurdFormItem from "./components/CurdForm/src/CurdFormItem.vue"
import CurdTable from "./components/CurdTable"
import DetailInfo from "./components/DetailInfo"
import FormDialog from "./components/FormDialog"
import TableFilter from "./components/TableFilter"
import { makeInstaller } from "./utils/vue/make-installer"

const Components = [ConstantStatus, FormDialog, CurdForm, CurdTable, TableFilter, DetailInfo, CurdFormItem] as Plugin[]
export * from "./components/ConstantStatus/src/types"
export * from "./components/CurdForm"
export * from "./components/CurdTable/src/types"
export * from "./components/DetailInfo/src/types"
export * from "./components/FormDialog/src/types"
export * from "./components/TableFilter/types"
export * from "./utils/hooks/useGlobalConfig"
export { ConstantStatus, CurdForm, CurdFormItem, CurdTable, DetailInfo, FormDialog, TableFilter }

export default makeInstaller([...Components])
