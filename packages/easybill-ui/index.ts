import type { Plugin } from "vue"
import ConstantStatus from "./components/ConstantStatus"
import FormDialog from "./components/FormDialog"
import CurdForm, { CurdFormItem } from "./components/CurdForm"
import CurdTable from "./components/CurdTable"
import TableFilter from "./components/TableFilter"
import DetailInfo from "./components/DetailInfo"
import { makeInstaller } from "./utils/vue/make-installer"

const Components = [ConstantStatus, FormDialog, CurdForm, CurdTable, TableFilter, DetailInfo, CurdFormItem] as Plugin[]
export { ConstantStatus, FormDialog, CurdForm, CurdFormItem, CurdTable, TableFilter, DetailInfo }
export * from "./components/ConstantStatus/src/types"
export * from "./components/FormDialog/src/types"
export * from "./components/CurdForm"
export * from "./components/CurdTable/src/types"
export * from "./components/DetailInfo/src/types"
export * from "./components/TableFilter/types"
export * from "./utils/hooks/useGlobalConfig"

export default makeInstaller([...Components])
